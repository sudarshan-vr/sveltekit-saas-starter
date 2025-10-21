// src/hooks.server.ts
// Authentication is now handled by external panel at https://app.craftuary.com
import type { Handle } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

/**
 * Stub authentication - always returns null since auth is handled externally.
 * All protected routes redirect to https://app.craftuary.com/login
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Admin authentication check
  if (event.url.pathname.startsWith('/admin')) {
    // Allow login page
    if (event.url.pathname === '/admin/login') {
      return resolve(event)
    }

    // Check for admin session cookie
    const adminSession = event.cookies.get('admin_session')
    
    if (!adminSession || adminSession !== 'authenticated') {
      throw redirect(302, '/admin/login')
    }
  }

  // Protect admin API routes
  if (event.url.pathname.startsWith('/api/admin') && 
      !event.url.pathname.startsWith('/api/admin/auth')) {
    const adminSession = event.cookies.get('admin_session')
    
    if (!adminSession || adminSession !== 'authenticated') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }

  // Provide stub safeGetSession that always returns null
  // This triggers redirects to external auth panel in protected routes
  event.locals.safeGetSession = async () => {
    return { session: null, user: null, amr: null }
  }

  event.locals.session = null
  event.locals.user = null

  return resolve(event)
}
