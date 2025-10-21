import { json, type RequestHandler } from '@sveltejs/kit'
import { query } from '$lib/server/db'

// POST - Track theme action (view, download, preview, deploy)
export const POST: RequestHandler = async ({ request }) => {
  try {
    const { themeId, actionType } = await request.json()
    
    if (!themeId || !actionType) {
      return json({ error: 'Theme ID and action type are required' }, { status: 400 })
    }

    const validActions = ['view', 'download', 'preview', 'deploy']
    if (!validActions.includes(actionType)) {
      return json({ error: 'Invalid action type' }, { status: 400 })
    }

    // Update the theme metrics based on action type
    let updateSql = ''
    
    switch (actionType) {
      case 'view':
        updateSql = 'UPDATE themes SET views = views + 1 WHERE id = ?'
        break
      case 'download':
        updateSql = 'UPDATE themes SET downloads = downloads + 1 WHERE id = ?'
        break
      case 'preview':
        updateSql = 'UPDATE themes SET views = views + 1 WHERE id = ?'
        break
      case 'deploy':
        updateSql = 'UPDATE themes SET downloads = downloads + 1 WHERE id = ?'
        break
    }

    // Update the main metrics
    await query(updateSql, [themeId])

    // Log the action in analytics table (optional, for detailed tracking)
    try {
      const analyticsInsert = `
        INSERT INTO theme_analytics (theme_id, action_type)
        VALUES (?, ?)
      `
      await query(analyticsInsert, [themeId, actionType])
    } catch (analyticsError) {
      // If analytics table doesn't exist yet, just continue
      console.log('Analytics logging skipped:', analyticsError)
    }

    return json({ 
      success: true, 
      message: 'Action tracked successfully' 
    })
    
  } catch (error) {
    console.error('Theme tracking error:', error)
    return json({ error: 'Failed to track action' }, { status: 500 })
  }
}

// GET - Get theme statistics
export const GET: RequestHandler = async ({ url }) => {
  try {
    const themeId = url.searchParams.get('themeId')
    
    if (themeId) {
      // Get specific theme stats
      const sql = 'SELECT id, name, downloads, views FROM themes WHERE id = ?'
      const result = await query<any[]>(sql, [themeId])
      
      if (result.length === 0) {
        return json({ error: 'Theme not found' }, { status: 404 })
      }
      
      return json(result[0])
    } else {
      // Get overall statistics
      const sql = `
        SELECT 
          COUNT(*) as total_themes,
          SUM(downloads) as total_downloads,
          SUM(views) as total_views,
          AVG(downloads) as avg_downloads,
          AVG(views) as avg_views
        FROM themes
        WHERE status = 'active'
      `
      const stats = await query<any[]>(sql, [])
      
      return json(stats[0])
    }
    
  } catch (error) {
    console.error('Theme stats error:', error)
    return json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}
