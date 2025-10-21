import { json, type RequestHandler } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json()

    // Get admin credentials from environment variables
    const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'changeme123'

    // Verify credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session cookie
      cookies.set('admin_session', 'authenticated', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return json({ success: true })
    }

    return json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return json({ error: 'Login failed' }, { status: 500 })
  }
}
