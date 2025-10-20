import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import type { Theme } from '$lib/types/theme'

// Mock data fallback for when database connection fails
const mockThemes: Theme[] = [
  {
    id: 1,
    name: 'Modern Business Pro',
    description: 'A sleek and professional business website template with modern design elements.',
    category: 'Business',
    technology: 'React',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    preview_url: 'https://preview.craftuary.com/modern-business',
    download_url: 'https://github.com/craftuary/modern-business',
    deploy_url: 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/modern-business',
    is_free: true
  },
  {
    id: 2,
    name: 'Tech Blog Minimalist',
    description: 'Beautiful minimalist blog template optimized for technical content.',
    category: 'Blog',
    technology: 'Next.js',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    preview_url: 'https://preview.craftuary.com/tech-blog',
    download_url: 'https://github.com/craftuary/tech-blog',
    deploy_url: 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/tech-blog',
    is_free: true
  },
  {
    id: 3,
    name: 'Portfolio Pro',
    description: 'Showcase your work beautifully with this stunning portfolio template.',
    category: 'Portfolio',
    technology: 'Vue',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    preview_url: 'https://preview.craftuary.com/portfolio-pro',
    download_url: 'https://github.com/craftuary/portfolio-pro',
    deploy_url: 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/portfolio-pro',
    is_free: true
  }
]

export const GET: RequestHandler = async ({ url }) => {
  try {
    const technology = url.searchParams.get('technology')
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')
    const isFree = url.searchParams.get('is_free')

    // Try to fetch from MySQL database
    try {
      let sql = 'SELECT * FROM themes WHERE 1=1'
      const params: string[] = []

      // Add filters
      if (technology && technology !== 'All') {
        sql += ' AND technology = ?'
        params.push(technology)
      }

      if (category && category !== 'All') {
        sql += ' AND category = ?'
        params.push(category)
      }

      if (isFree === 'true') {
        sql += ' AND is_free = 1'
      }

      if (search && search.trim() !== '') {
        sql += ' AND (name LIKE ? OR description LIKE ?)'
        const searchTerm = `%${search}%`
        params.push(searchTerm, searchTerm)
      }

      sql += ' ORDER BY created_at DESC'

      const themes = await query<Theme[]>(sql, params)
      
      // If we got results from the database, return them
      if (themes && Array.isArray(themes) && themes.length > 0) {
        return json(themes.map(theme => ({
          ...theme,
          is_free: Boolean(theme.is_free)
        })))
      }
      
      // If no results, fall through to mock data
      console.log('No themes found in database, using mock data')
      
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError)
    }
    
    // Fallback to mock data if no results from database or database error
    let filteredThemes = [...mockThemes]
    
    if (technology && technology !== 'All') {
      filteredThemes = filteredThemes.filter(t => t.technology === technology)
    }
    
    if (category && category !== 'All') {
      filteredThemes = filteredThemes.filter(t => t.category === category)
    }
    
    if (isFree === 'true') {
      filteredThemes = filteredThemes.filter(t => t.is_free)
    }
    
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase()
      filteredThemes = filteredThemes.filter(t => 
        t.name.toLowerCase().includes(searchLower) || 
        t.description.toLowerCase().includes(searchLower)
      )
    }
    
    return json(filteredThemes)
    
  } catch (error) {
    console.error('Unexpected error in themes API:', error)
    return json({ error: 'Failed to fetch themes' }, { status: 500 })
  }
}
