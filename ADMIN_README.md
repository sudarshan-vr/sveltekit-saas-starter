# Admin Theme Management System

A complete admin dashboard for managing and monetizing your Craftuary themes with built-in analytics tracking.

## 🎯 What's Included

### 1. Admin Dashboard (`/admin/themes`)
A fully-featured admin interface with:
- 📊 **Statistics Dashboard** - Total themes, downloads, and views
- ➕ **Add Themes** - Complete form with all theme fields
- ✏️ **Edit Themes** - Update any theme details
- 🗑️ **Delete Themes** - With confirmation protection
- 🔍 **Search & Filter** - Find themes quickly
- 📊 **Advanced Sorting** - By date, popularity, price
- 💰 **Monetization Fields** - Price, stock, featured status

### 2. Backend API Endpoints

#### Admin Operations (`/api/admin/themes`)
- **GET** - Fetch all themes (with filters)
- **POST** - Create new theme
- **PUT** - Update existing theme
- **DELETE** - Remove theme

#### Analytics Tracking (`/api/themes/track`)
- **POST** - Track user actions (view, download, deploy)
- **GET** - Retrieve statistics

### 3. Database Schema
Enhanced themes table with:
- `price` - Decimal(10,2) for pricing
- `downloads` - INT counter
- `views` - INT counter
- `stock_quantity` - INT for inventory (NULL = unlimited)
- `featured` - BOOLEAN flag
- `status` - ENUM (active, draft, archived)

### 4. Automatic Tracking
Public themes page automatically tracks:
- Preview clicks → increment views
- Download clicks → increment downloads
- Deploy clicks → increment downloads

## 📁 File Structure

```
src/
├── routes/
│   ├── admin/
│   │   └── themes/
│   │       └── +page.svelte              # Admin dashboard UI
│   ├── api/
│   │   ├── admin/
│   │   │   └── themes/
│   │   │       └── +server.ts            # CRUD API
│   │   └── themes/
│   │       ├── +server.ts                # Public API (updated)
│   │       └── track/
│   │           └── +server.ts            # Tracking API
│   └── (marketing)/
│       └── themes/
│           └── +page.svelte              # Public page (with tracking)
└── lib/
    ├── types/
    │   └── theme.ts                      # Updated type definitions
    └── server/
        └── db.ts                         # Database utilities

Database Files:
├── DATABASE_SCHEMA.sql                   # Original schema
├── DATABASE_SCHEMA_ADMIN.sql             # Admin updates
├── ADMIN_SETUP_QUICKSTART.md             # Quick setup guide
├── ADMIN_THEMES_GUIDE.md                 # Complete documentation
└── ADMIN_README.md                       # This file
```

## 🚀 Quick Start

### 1. Update Database
```bash
mysql -u root -p craftuary_db < DATABASE_SCHEMA_ADMIN.sql
```

### 2. Start Server
```bash
npm run dev
```

### 3. Access Admin
```
http://localhost:5173/admin/themes
```

## 💡 Key Features Explained

### Monetization
- **Free themes**: Set `is_free = true`, `price = 0`
- **Paid themes**: Set `is_free = false`, `price = 29.99`
- **Limited stock**: Set `stock_quantity = 100`
- **Unlimited stock**: Leave `stock_quantity = null`

### Status Management
- **Active**: Visible to public users
- **Draft**: Hidden, work in progress
- **Archived**: Removed from listings

### Featured Themes
Mark popular themes as featured to highlight them in your catalog.

### Real-time Statistics
Dashboard shows:
- Total themes count
- Aggregate downloads
- Aggregate views
- Individual theme metrics in table

## 📊 API Examples

### Create Theme (Admin)
```javascript
fetch('/api/admin/themes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Theme',
    description: 'Description',
    category: 'Business',
    technology: 'React',
    thumbnail: 'https://...',
    preview_url: 'https://...',
    download_url: 'https://...',
    deploy_url: 'https://...',
    is_free: false,
    price: 29.99,
    stock_quantity: 100,
    featured: true,
    status: 'active'
  })
})
```

### Track Download
```javascript
fetch('/api/themes/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    themeId: 1,
    actionType: 'download'
  })
})
```

### Get Statistics
```javascript
fetch('/api/themes/track')
  .then(r => r.json())
  .then(stats => {
    console.log(stats.total_downloads)
    console.log(stats.total_views)
  })
```

## 🔐 Security Note

**IMPORTANT**: This admin system does not include authentication!

Before deploying to production:
1. Add authentication middleware
2. Protect `/admin` routes
3. Validate user permissions
4. Use environment variables for sensitive data

Example authentication hook:
```typescript
// src/hooks.server.ts
import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/admin')) {
    const session = await event.locals.getSession()
    if (!session?.user?.isAdmin) {
      throw redirect(302, '/login')
    }
  }
  return resolve(event)
}
```

## 📈 Future Enhancements

Consider adding:
- [ ] User authentication
- [ ] Role-based permissions
- [ ] Bulk operations
- [ ] CSV import/export
- [ ] Advanced analytics charts
- [ ] Revenue tracking
- [ ] Email notifications
- [ ] Backup/restore functionality
- [ ] Theme versioning
- [ ] Review management

## 🎨 UI Components Used

The admin dashboard uses:
- **DaisyUI** - Component library
- **TailwindCSS** - Styling
- **Svelte** - Framework
- **Gradient themes** - Purple/primary color scheme

## 📚 Documentation Files

- **ADMIN_SETUP_QUICKSTART.md** - 5-minute setup guide
- **ADMIN_THEMES_GUIDE.md** - Complete documentation with examples
- **ADMIN_README.md** - This overview file

## 🤝 Contributing

To customize the admin panel:
1. Edit `/src/routes/admin/themes/+page.svelte` for UI changes
2. Modify `/src/routes/api/admin/themes/+server.ts` for API logic
3. Update `/src/lib/types/theme.ts` for new fields
4. Run schema updates for database changes

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the example code
3. Verify database schema is updated
4. Check server logs for errors

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Compatible With**: SvelteKit, MySQL 5.7+

---

Made with ❤️ for Craftuary
