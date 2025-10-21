# Admin Theme Management Guide

Complete guide for managing and monetizing themes through the admin dashboard.

## 📋 Table of Contents

1. [Setup](#setup)
2. [Features](#features)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Admin Dashboard](#admin-dashboard)
6. [Tracking Metrics](#tracking-metrics)
7. [Usage Examples](#usage-examples)

---

## 🚀 Setup

### 1. Update Database Schema

Run the admin schema update to add metrics tracking fields:

```bash
mysql -u root -p < DATABASE_SCHEMA_ADMIN.sql
```

Or manually execute:

```sql
USE craftuary_db;

ALTER TABLE themes
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS downloads INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS views INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS stock_quantity INT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status ENUM('active', 'draft', 'archived') DEFAULT 'active';
```

### 2. Access Admin Dashboard

Navigate to:
```
http://localhost:5173/admin/themes
```

---

## ✨ Features

### Dashboard Statistics
- **Total Themes**: Count of all themes in the system
- **Total Downloads**: Aggregate download count across all themes
- **Total Views**: Aggregate view count across all themes

### Theme Management
- ✅ **Add** new themes with full details
- ✅ **Edit** existing themes
- ✅ **Delete** themes with confirmation
- ✅ **Search** themes by name or description
- ✅ **Filter** by status (Active, Draft, Archived)
- ✅ **Sort** by multiple fields (date, name, downloads, views, price)

### Monetization Tracking
- **Price**: Set custom pricing or mark as free
- **Downloads**: Track download count automatically
- **Views**: Monitor theme page views
- **Stock Quantity**: Set limited or unlimited stock
- **Featured**: Highlight popular themes

### Theme Status
- **Active**: Visible to users
- **Draft**: Hidden from public view
- **Archived**: Removed from active listings

---

## 🗄️ Database Schema

### Themes Table (Updated)

```sql
CREATE TABLE themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  technology VARCHAR(100) NOT NULL,
  thumbnail VARCHAR(500) NOT NULL,
  preview_url VARCHAR(500) NOT NULL,
  download_url VARCHAR(500) NOT NULL,
  deploy_url VARCHAR(500) NOT NULL,
  is_free BOOLEAN DEFAULT true,
  
  -- New monetization fields
  price DECIMAL(10, 2) DEFAULT 0.00,
  downloads INT DEFAULT 0,
  views INT DEFAULT 0,
  stock_quantity INT DEFAULT NULL,  -- NULL = unlimited
  featured BOOLEAN DEFAULT false,
  status ENUM('active', 'draft', 'archived') DEFAULT 'active',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_category (category),
  INDEX idx_technology (technology),
  INDEX idx_is_free (is_free),
  INDEX idx_featured (featured),
  INDEX idx_status (status),
  INDEX idx_price (price)
);
```

### Analytics Table (Optional)

Track detailed user actions:

```sql
CREATE TABLE theme_analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  theme_id INT NOT NULL,
  action_type ENUM('view', 'download', 'preview', 'deploy') NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);
```

---

## 🔌 API Endpoints

### Admin Endpoints

#### GET `/api/admin/themes`
Fetch all themes (including drafts and archived)

**Query Parameters:**
- `status` - Filter by status (all, active, draft, archived)
- `sortBy` - Sort field (created_at, name, downloads, views, price, updated_at)
- `order` - Sort order (ASC, DESC)

**Example:**
```javascript
fetch('/api/admin/themes?status=active&sortBy=downloads&order=DESC')
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Modern Business",
    "description": "...",
    "category": "Business",
    "technology": "React",
    "thumbnail": "...",
    "preview_url": "...",
    "download_url": "...",
    "deploy_url": "...",
    "is_free": true,
    "price": 0.00,
    "downloads": 150,
    "views": 1200,
    "stock_quantity": null,
    "featured": true,
    "status": "active",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-15T00:00:00.000Z"
  }
]
```

---

#### POST `/api/admin/themes`
Create a new theme

**Request Body:**
```json
{
  "name": "New Theme",
  "description": "Theme description",
  "category": "Business",
  "technology": "React",
  "thumbnail": "https://example.com/thumb.jpg",
  "preview_url": "https://example.com/preview",
  "download_url": "https://example.com/download",
  "deploy_url": "https://vercel.com/deploy",
  "is_free": false,
  "price": 29.99,
  "stock_quantity": 100,
  "featured": false,
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "id": 15,
  "message": "Theme created successfully"
}
```

---

#### PUT `/api/admin/themes?id={themeId}`
Update an existing theme

**Request Body:** (same as POST)

**Response:**
```json
{
  "success": true,
  "message": "Theme updated successfully"
}
```

---

#### DELETE `/api/admin/themes?id={themeId}`
Delete a theme

**Response:**
```json
{
  "success": true,
  "message": "Theme deleted successfully"
}
```

---

### Tracking Endpoints

#### POST `/api/themes/track`
Track user actions (downloads, views)

**Request Body:**
```json
{
  "themeId": 1,
  "actionType": "download"  // view, download, preview, deploy
}
```

**Response:**
```json
{
  "success": true,
  "message": "Action tracked successfully"
}
```

---

#### GET `/api/themes/track`
Get theme statistics

**Query Parameters:**
- `themeId` - (optional) Get stats for specific theme

**Example (Specific Theme):**
```javascript
fetch('/api/themes/track?themeId=1')
```

**Response:**
```json
{
  "id": 1,
  "name": "Modern Business",
  "downloads": 150,
  "views": 1200
}
```

**Example (Overall Stats):**
```javascript
fetch('/api/themes/track')
```

**Response:**
```json
{
  "total_themes": 12,
  "total_downloads": 5420,
  "total_views": 48300,
  "avg_downloads": 451.67,
  "avg_views": 4025.00
}
```

---

## 🎨 Admin Dashboard

### Dashboard Layout

The admin dashboard (`/admin/themes`) includes:

1. **Header** - Title and description
2. **Statistics Cards** - Key metrics at a glance
3. **Control Panel** - Search, filters, sorting, and "Add Theme" button
4. **Themes Table** - Complete list of all themes with actions

### Theme Table Columns

| Column | Description |
|--------|-------------|
| Thumbnail | Theme preview image |
| Name | Theme name (with featured badge if applicable) |
| Category | Business, Blog, Portfolio, etc. |
| Technology | React, Vue, Next.js, etc. |
| Price | Free badge or price amount |
| Downloads | Download count with icon |
| Views | View count with icon |
| Stock | Available quantity (∞ for unlimited) |
| Status | Active, Draft, or Archived badge |
| Actions | Edit and Delete buttons |

### Adding a Theme

1. Click **"Add Theme"** button
2. Fill in required fields:
   - Name, Description
   - Category, Technology
   - URLs (Thumbnail, Preview, Download, Deploy)
3. Set pricing:
   - Check "Free Theme" for free themes
   - Enter price for paid themes
4. Set stock (leave blank for unlimited)
5. Choose status (Active, Draft, Archived)
6. Optional: Mark as "Featured"
7. Click **"Create Theme"**

### Editing a Theme

1. Click the **Edit** button (pencil icon) on any theme row
2. Modify fields as needed
3. Click **"Update Theme"**

### Deleting a Theme

1. Click the **Delete** button (trash icon) on any theme row
2. Confirm deletion in the modal
3. Theme and all related analytics will be removed

---

## 📊 Tracking Metrics

### Automatic Tracking

To automatically track metrics on your public themes page, integrate the tracking API:

**Example: Track View**
```javascript
// When theme page loads
async function trackThemeView(themeId) {
  await fetch('/api/themes/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      themeId: themeId,
      actionType: 'view'
    })
  })
}
```

**Example: Track Download**
```javascript
// When download button is clicked
async function handleDownload(themeId, downloadUrl) {
  await fetch('/api/themes/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      themeId: themeId,
      actionType: 'download'
    })
  })
  
  // Then redirect to download
  window.location.href = downloadUrl
}
```

### Integrating with Public Themes Page

Update your themes page to track views:

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  
  let themes = []
  
  onMount(async () => {
    // Fetch themes
    const response = await fetch('/api/themes')
    themes = await response.json()
  })
  
  async function trackAction(themeId: number, actionType: string) {
    try {
      await fetch('/api/themes/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, actionType })
      })
    } catch (err) {
      console.error('Tracking failed:', err)
    }
  }
  
  function handlePreview(theme) {
    trackAction(theme.id, 'view')
    window.open(theme.preview_url, '_blank')
  }
  
  function handleDownload(theme) {
    trackAction(theme.id, 'download')
    window.location.href = theme.download_url
  }
</script>
```

---

## 💡 Usage Examples

### Example 1: Featured Themes Section

Query featured themes only:

```javascript
const response = await fetch('/api/themes?featured=true&status=active')
const featuredThemes = await response.json()
```

### Example 2: Best Selling Themes

Get themes sorted by downloads:

```javascript
const response = await fetch('/api/admin/themes?sortBy=downloads&order=DESC')
const bestSellers = await response.json()
```

### Example 3: Limited Stock Management

Check if theme is still available:

```javascript
function isAvailable(theme) {
  return theme.stock_quantity === null || theme.stock_quantity > 0
}

// When someone "purchases" a theme
async function purchaseTheme(themeId) {
  // Decrease stock count
  const theme = await getTheme(themeId)
  
  if (!isAvailable(theme)) {
    alert('Out of stock!')
    return
  }
  
  // Update stock
  await fetch(`/api/admin/themes?id=${themeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...theme,
      stock_quantity: theme.stock_quantity === null 
        ? null 
        : theme.stock_quantity - 1
    })
  })
}
```

### Example 4: Revenue Calculation

Calculate total potential revenue:

```javascript
async function calculateRevenue() {
  const response = await fetch('/api/admin/themes?status=active')
  const themes = await response.json()
  
  const revenue = themes
    .filter(t => !t.is_free)
    .reduce((sum, t) => sum + (t.price * t.downloads), 0)
  
  return revenue
}
```

---

## 🔐 Security Considerations

### Authentication (Recommended)

The admin panel currently has **no authentication**. For production use, add authentication:

1. **SvelteKit Auth**: Use `@auth/sveltekit`
2. **Server-side validation**: Add middleware to verify admin users
3. **Environment variables**: Store admin credentials securely

**Example Hook:**
```typescript
// src/hooks.server.ts
export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/admin')) {
    // Check if user is admin
    const session = await getSession(event)
    if (!session?.user?.isAdmin) {
      throw redirect(302, '/login')
    }
  }
  return resolve(event)
}
```

---

## 📈 Analytics Dashboard (Future Enhancement)

Consider adding:
- **Charts**: Visualize downloads/views over time
- **Revenue tracking**: Integration with payment processors
- **Export**: CSV/Excel export of theme data
- **Bulk operations**: Update multiple themes at once
- **Categories management**: Add/edit categories dynamically
- **Technology management**: Add/edit tech stack options

---

## 🐛 Troubleshooting

### Issue: Metrics not updating

**Solution:** Ensure the `DATABASE_SCHEMA_ADMIN.sql` was run correctly:

```sql
SHOW COLUMNS FROM themes;
```

Verify `downloads`, `views`, `price`, etc. columns exist.

---

### Issue: Admin page shows errors

**Solution:** Check browser console and server logs:

```bash
npm run dev
```

Verify database connection in `.env`:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=craftuary_db
```

---

### Issue: Cannot delete themes

**Solution:** Check foreign key constraints in analytics table. If analytics table exists, theme deletions cascade automatically.

---

## 📝 License

This admin system is part of Craftuary and follows the same license as the main project.

---

**Need Help?** Check the main README or open an issue on GitHub.
