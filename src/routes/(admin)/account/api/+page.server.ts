import { redirect } from "@sveltejs/kit"

// Authentication is handled externally at https://panel.craftuary.com
// All account management actions redirect to external panel

export const actions = {
  toggleEmailSubscription: async () => {
    redirect(303, "https://app.craftuary.com")
  },
  updateEmail: async () => {
    redirect(303, "https://app.craftuary.com/")
  },
  updatePassword: async () => {
    redirect(303, "https://app.craftuary.com/")
  },
  deleteAccount: async () => {
    redirect(303, "https://app.craftuary.com/")
  },
  updateProfile: async () => {
    redirect(303, "https://app.craftuary.com/")
  },
  signout: async () => {
    redirect(303, "/")
  },
}
