import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  // Authentication and subscriptions are handled externally at https://cpanel.craftuary.com
  redirect(303, "https://cpanel.craftuary.com/pricing")
}
