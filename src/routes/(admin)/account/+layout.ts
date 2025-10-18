import { redirect } from "@sveltejs/kit"

export const load = async () => {
  // Authentication is handled externally at https://cpanel.craftuary.com
  // Redirect all account access to external login
  redirect(303, "https://app.craftuary.com/login")
}
