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
      sql += ' AND is_free = true'
    }

    if (search && search.trim() !== '') {
      sql += ' AND (name LIKE ? OR description LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    sql += ' ORDER BY created_at DESC'

    const themes = await query<Theme[]>(sql, params)

    // Convert is_free from 1/0 to boolean
    const formattedThemes = themes.map(theme => ({
      ...theme,
      is_free: Boolean(theme.is_free)
    }))

    return json(formattedThemes)
  } catch (error) {
    console.error('Error fetching themes:', error)
    console.log('⚠️  Using mock data - Database connection failed')
    
    // Return mock data with filters applied
    let filteredMockThemes = [...mockThemes]
    
    const technology = url.searchParams.get('technology')
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')
    const isFree = url.searchParams.get('is_free')
    
    if (technology && technology !== 'All') {
      filteredMockThemes = filteredMockThemes.filter(t => t.technology === technology)
    }
    
    if (category && category !== 'All') {
      filteredMockThemes = filteredMockThemes.filter(t => t.category === category)
    }
    
    if (isFree === 'true') {
      filteredMockThemes = filteredMockThemes.filter(t => t.is_free)
    }
    
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase()
      filteredMockThemes = filteredMockThemes.filter(t => 
        t.name.toLowerCase().includes(searchLower) || 
        t.description.toLowerCase().includes(searchLower)
      )
    }
    
    return json(filteredMockThemes)
  }
}
