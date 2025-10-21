import { json, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ cookies }) => {
  // Delete the session cookie
  cookies.delete('admin_session', { path: '/' })
  
  return json({ success: true })
}
