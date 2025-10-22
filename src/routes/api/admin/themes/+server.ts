import { json, type RequestHandler } from '@sveltejs/kit'
import { query } from '$lib/server/db'
import type { Theme } from '$lib/types/theme'

interface InsertResult {
  insertId: number
  affectedRows: number
}

// GET - Fetch all themes for admin (including drafts and archived)
export const GET: RequestHandler = async ({ url }) => {
  try {
    const status = url.searchParams.get('status')
    const sortBy = url.searchParams.get('sortBy') || 'created_at'
    const order = url.searchParams.get('order') || 'DESC'

    let sql = 'SELECT * FROM themes WHERE 1=1'
    const params: string[] = []

    if (status && status !== 'all') {
      sql += ' AND status = ?'
      params.push(status)
    }

    // Validate sortBy to prevent SQL injection
    const validSortColumns = ['created_at', 'name', 'downloads', 'views', 'price', 'updated_at']
    const validOrder = ['ASC', 'DESC']
    
    const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : 'created_at'
    const safeOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC'

    sql += ` ORDER BY ${safeSortBy} ${safeOrder}`

    const themes = await query<Theme[]>(sql, params)
    
    return json(themes.map(theme => ({
      ...theme,
      is_free: Boolean(theme.is_free),
      featured: Boolean(theme.featured),
      categories: theme.categories ? JSON.parse(theme.categories as any) : [theme.category]
    })))
    
  } catch (error) {
    console.error('Admin themes GET error:', error)
    return json({ error: 'Failed to fetch themes' }, { status: 500 })
  }
}

// POST - Create a new theme
export const POST: RequestHandler = async ({ request }) => {
  try {
    const themeData = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'technology', 'thumbnail', 
                           'preview_url', 'download_url', 'deploy_url']
    
    for (const field of requiredFields) {
      if (!themeData[field]) {
        return json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Handle categories - support both single and multiple
    const categories = themeData.categories && Array.isArray(themeData.categories) 
      ? themeData.categories 
      : [themeData.category]
    
    const categoriesJson = JSON.stringify(categories)
    const primaryCategory = categories[0] || themeData.category

    const sql = `
      INSERT INTO themes (
        name, description, category, categories, technology, thumbnail, 
        preview_url, download_url, deploy_url, is_free, price, 
        stock_quantity, featured, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const params = [
      themeData.name,
      themeData.description,
      primaryCategory,
      categoriesJson,
      themeData.technology,
      themeData.thumbnail,
      themeData.preview_url,
      themeData.download_url,
      themeData.deploy_url,
      themeData.is_free ?? true,
      themeData.price ?? 0,
      themeData.stock_quantity ?? null,
      themeData.featured ?? false,
      themeData.status ?? 'active'
    ]

    const result = await query<InsertResult>(sql, params)
    
    return json({ 
      success: true, 
      id: result.insertId,
      message: 'Theme created successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Admin themes POST error:', error)
    return json({ error: 'Failed to create theme' }, { status: 500 })
  }
}

// PUT - Update an existing theme
export const PUT: RequestHandler = async ({ request, url }) => {
  try {
    const themeId = url.searchParams.get('id')
    
    if (!themeId) {
      return json({ error: 'Theme ID is required' }, { status: 400 })
    }

    const themeData = await request.json()
    
    // Handle categories - support both single and multiple
    const categories = themeData.categories && Array.isArray(themeData.categories) 
      ? themeData.categories 
      : [themeData.category]
    
    const categoriesJson = JSON.stringify(categories)
    const primaryCategory = categories[0] || themeData.category
    
    const sql = `
      UPDATE themes SET
        name = ?,
        description = ?,
        category = ?,
        categories = ?,
        technology = ?,
        thumbnail = ?,
        preview_url = ?,
        download_url = ?,
        deploy_url = ?,
        is_free = ?,
        price = ?,
        stock_quantity = ?,
        featured = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    
    const params = [
      themeData.name,
      themeData.description,
      primaryCategory,
      categoriesJson,
      themeData.technology,
      themeData.thumbnail,
      themeData.preview_url,
      themeData.download_url,
      themeData.deploy_url,
      themeData.is_free ?? true,
      themeData.price ?? 0,
      themeData.stock_quantity ?? null,
      themeData.featured ?? false,
      themeData.status ?? 'active',
      themeId
    ]

    await query(sql, params)
    
    return json({ 
      success: true, 
      message: 'Theme updated successfully' 
    })
    
  } catch (error) {
    console.error('Admin themes PUT error:', error)
    return json({ error: 'Failed to update theme' }, { status: 500 })
  }
}

// DELETE - Delete a theme
export const DELETE: RequestHandler = async ({ url }) => {
  try {
    const themeId = url.searchParams.get('id')
    
    if (!themeId) {
      return json({ error: 'Theme ID is required' }, { status: 400 })
    }

    const sql = 'DELETE FROM themes WHERE id = ?'
    await query(sql, [themeId])
    
    return json({ 
      success: true, 
      message: 'Theme deleted successfully' 
    })
    
  } catch (error) {
    console.error('Admin themes DELETE error:', error)
    return json({ error: 'Failed to delete theme' }, { status: 500 })
  }
}
