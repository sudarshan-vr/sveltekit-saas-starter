import { Resend } from "resend"
import { env } from "$env/dynamic/private"
import { PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createClient, type User } from "@supabase/supabase-js"
import type { Database } from "../DatabaseDefinitions"

const PRIVATE_SUPABASE_SERVICE_ROLE = env.PRIVATE_SUPABASE_SERVICE_ROLE

if (!PRIVATE_SUPABASE_SERVICE_ROLE) {
  console.warn("PRIVATE_SUPABASE_SERVICE_ROLE environment variable is not set")
}

// Sends an email to the admin email address.
// Does not throw errors, but logs them.
export const sendAdminEmail = async ({
  subject,
  body,
}: {
  subject: string
  body: string
}) => {
  // Check admin email is setup
  if (!env.PRIVATE_ADMIN_EMAIL) {
    return
  }

  try {
    const resend = new Resend(env.PRIVATE_RESEND_API_KEY)
    const resp = await resend.emails.send({
      from: env.PRIVATE_FROM_ADMIN_EMAIL || env.PRIVATE_ADMIN_EMAIL,
      to: [env.PRIVATE_ADMIN_EMAIL],
      subject: "ADMIN_MAIL: " + subject,
      text: body,
    })

    if (resp.error) {
      console.log("Failed to send admin email, error:", resp.error)
    }
  } catch (e) {
    console.log("Failed to send admin email, error:", e)
  }
}

interface UserProfile {
  id: string
  email?: string
  unsubscribed?: boolean
  [key: string]: unknown
}

export const sendUserEmail = async ({
  user,
  from_email,
  template_name,
  template_properties,
}: {
  user: User
  from_email: string
  template_name: string
  template_properties: Record<string, string>
}) => {
  const email = user.email
  if (!email) {
    console.log("No email for user. Aborting email. ", user.id)
    return
  }

  if (!PRIVATE_SUPABASE_SERVICE_ROLE) {
    console.error("PRIVATE_SUPABASE_SERVICE_ROLE is not set")
    return
  }

  try {
    // Check if the user email is verified using the full user object from service role
    const serverSupabase = createClient<Database>(
      PUBLIC_SUPABASE_URL,
      PRIVATE_SUPABASE_SERVICE_ROLE,
      { auth: { persistSession: false } },
    )
    
    const { data: serviceUserData, error: userError } = await serverSupabase.auth.admin.getUserById(
      user.id
    )

    if (userError) {
      console.error("Error fetching user data:", userError)
      return
    }

    const emailVerified =
      serviceUserData.user?.email_confirmed_at ||
      serviceUserData.user?.user_metadata?.email_verified

    if (!emailVerified) {
      console.log("User email not verified. Aborting email. ", user.id, email)
      return
    }

    // Fetch user profile to check unsubscribed status
    const { data: profile, error: profileError } = await serverSupabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single<UserProfile>()

    if (profileError) {
      console.log("Error fetching user profile. Aborting email. ", user.id, email)
      return
    }

    if (profile?.unsubscribed) {
      console.log("User unsubscribed. Aborting email. ", user.id, email)
      return
    }

    await sendTemplatedEmail({
      to_emails: [email],
      from_email,
      template_name,
      template_properties,
    })
  } catch (error) {
    console.error("Error in sendUserEmail:", error)
  }
}

interface EmailTemplate {
  subject: string
  react: string
  text?: string
}

export const sendTemplatedEmail = async ({
  to_emails,
  from_email,
  template_name,
  template_properties,
}: {
  to_emails: string[]
  from_email: string
  template_name: string
  template_properties: Record<string, string>
}) => {
  if (!PRIVATE_SUPABASE_SERVICE_ROLE) {
    console.error("PRIVATE_SUPABASE_SERVICE_ROLE is not set")
    return { error: "Server configuration error" }
  }

  try {
    // Get the template from Supabase
    const supabaseAdmin = createClient(
      PUBLIC_SUPABASE_URL,
      PRIVATE_SUPABASE_SERVICE_ROLE,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    )

    const { data: templateData, error: templateError } = await supabaseAdmin
      .from("email_templates")
      .select("subject, react, text")
      .eq("name", template_name)
      .single<EmailTemplate>()

    if (templateError || !templateData) {
      console.error("Error getting email template:", templateError)
      return { error: "Template not found" }
    }

    if (!templateData.react) {
      console.error("Email template is missing React template")
      return { error: "Invalid template format" }
    }

    // Use Resend's React email templates
    const resend = new Resend(env.PRIVATE_RESEND_API_KEY)
    
    // Process template variables into the subject
    let processedSubject = templateData.subject
    for (const [key, value] of Object.entries(template_properties)) {
      processedSubject = processedSubject.replace(`{{${key}}}`, value)
    }

    const { data, error } = await resend.emails.send({
      from: from_email,
      to: to_emails,
      subject: processedSubject,
      react: templateData.react, // Use React email template
      text: templateData.text || undefined,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { error }
    }

    return { data }
  } catch (error) {
    console.error("Error in sendTemplatedEmail:", error)
    return { error: error instanceof Error ? error : new Error("Unknown error") }
  }
}
