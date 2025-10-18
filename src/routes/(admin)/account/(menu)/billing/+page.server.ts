import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  // Authentication and billing are handled externally at https://cpanel.craftuary.com
  redirect(303, "https://cpanel.craftuary.com/account/billing")
}
