import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async () => {
  // Authentication is handled externally at https://panel.craftuary.com
  return {}
}
