// src/routes/auth/callback/+server.js
// OAuth callback - now redirects to external panel
import { redirect } from "@sveltejs/kit"

export const GET = async () => {
  // All authentication is handled externally at https://panel.craftuary.com
  redirect(303, "https://app.craftuary.com/login")
}
