import { redirect } from "@sveltejs/kit"

export const actions = {
  signout: async () => {
    // Authentication is handled externally at https://panel.craftuary.com
    // Redirect to home page
    redirect(303, "/")
  },
}
