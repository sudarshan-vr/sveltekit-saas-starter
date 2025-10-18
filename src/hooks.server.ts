// src/hooks.server.ts
// Authentication is now handled by external panel at https://app.craftuary.com
import type { Handle } from "@sveltejs/kit"

/**
 * Stub authentication - always returns null since auth is handled externally.
 * All protected routes redirect to https://app.craftuary.com/login
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Provide stub safeGetSession that always returns null
  // This triggers redirects to external auth panel in protected routes
  event.locals.safeGetSession = async () => {
    return { session: null, user: null, amr: null }
  }

  event.locals.session = null
  event.locals.user = null

  return resolve(event)
}
