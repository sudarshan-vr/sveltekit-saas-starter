# Admin Theme Management - Quick Setup

## 🚀 5-Minute Setup Guide

### Step 1: Update Database Schema

Run the admin schema update:

```bash
mysql -u root -p craftuary_db < DATABASE_SCHEMA_ADMIN.sql
```

This adds the following columns to your themes table:
- `price` - Theme pricing
- `downloads` - Download counter
- `views` - View counter
- `stock_quantity` - Inventory management
- `featured` - Featured flag
- `status` - Active/Draft/Archived

### Step 2: Verify Installation

All required files have been created:

✅ **Backend (API Routes)**
- `/src/routes/api/admin/themes/+server.ts` - CRUD operations
- `/src/routes/api/themes/track/+server.ts` - Metrics tracking

✅ **Frontend**
- `/src/routes/admin/themes/+page.svelte` - Admin dashboard

✅ **Types**
- `/src/lib/types/theme.ts` - Updated with new fields

✅ **Public Integration**
- `/src/routes/(marketing)/themes/+page.svelte` - Auto-tracks user actions

### Step 3: Access Admin Dashboard

Start your dev server:

```bash
npm run dev
```

Navigate to:
```
http://localhost:5173/admin/themes
```

### Step 4: Test the System

1. **Add a test theme** using the "Add Theme" button
2. **Edit** an existing theme
3. **Track metrics** by visiting the public themes page at `/themes`
4. **View statistics** in the admin dashboard

---

## 📊 Features Overview

### Admin Dashboard Features
- 📈 **Real-time statistics** - Total themes, downloads, views
- ➕ **Add themes** - Full form with all fields
- ✏️ **Edit themes** - Modify any theme details
- 🗑️ **Delete themes** - With confirmation modal
- 🔍 **Search & filter** - By name, status, category
- 📊 **Sort options** - By date, downloads, views, price
- 💰 **Monetization** - Set prices, track stock

### Automated Tracking
The public themes page now automatically tracks:
- 👁️ **Preview clicks** - Increment views
- 📥 **Download clicks** - Increment downloads
- 🚀 **Deploy clicks** - Increment downloads

---

## 🎯 Quick Actions

### Add a Free Theme
```sql
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free, price, status)
VALUES ('My Theme', 'Description here', 'Business', 'React', 'https://image.url', 'https://preview.url', 'https://download.url', 'https://deploy.url', true, 0, 'active');
```

### Add a Premium Theme
```sql
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free, price, featured, status)
VALUES ('Premium Theme', 'Description', 'SaaS', 'Next.js', 'https://image.url', 'https://preview.url', 'https://download.url', 'https://deploy.url', false, 49.99, true, 'active');
```

### View Current Statistics
```sql
SELECT 
  COUNT(*) as total_themes,
  SUM(downloads) as total_downloads,
  SUM(views) as total_views
FROM themes 
WHERE status = 'active';
```

---

## 🔐 Important: Add Authentication

**WARNING**: The admin panel has NO authentication by default!

For production, add authentication:

```typescript
// src/hooks.server.ts
export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/admin')) {
    // Add your auth check here
    const session = await getSession(event)
    if (!session?.user?.isAdmin) {
      throw redirect(302, '/login')
    }
  }
  return resolve(event)
}
```

---

## 📝 API Quick Reference

### Admin APIs

**GET** `/api/admin/themes` - Fetch all themes
**POST** `/api/admin/themes` - Create theme
**PUT** `/api/admin/themes?id={id}` - Update theme
**DELETE** `/api/admin/themes?id={id}` - Delete theme

### Tracking APIs

**POST** `/api/themes/track` - Track action
```json
{ "themeId": 1, "actionType": "download" }
```

**GET** `/api/themes/track` - Get statistics

---

## 📚 Full Documentation

See `ADMIN_THEMES_GUIDE.md` for complete documentation.

---

## ✅ Checklist

- [ ] Database schema updated
- [ ] Can access `/admin/themes`
- [ ] Can add/edit/delete themes
- [ ] Metrics tracking works on public page
- [ ] Statistics display correctly
- [ ] Added authentication (production only)

---

**Need help?** Open an issue or check the full guide!
