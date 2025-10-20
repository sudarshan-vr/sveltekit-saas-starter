# Themes Page Setup Guide

This guide will help you set up the Themes page with MySQL database integration.

## 📋 Prerequisites

- MySQL database server (local or cloud)
- Node.js and npm installed

## 🚀 Quick Setup

### 1. Install MySQL2 Package

```bash
npm install mysql2
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=craftuary_db
```

### 3. Create Database and Table

Run the SQL commands from `DATABASE_SCHEMA.sql`:

```bash
mysql -u root -p < DATABASE_SCHEMA.sql
```

Or manually execute the SQL:

```sql
CREATE DATABASE IF NOT EXISTS craftuary_db;
USE craftuary_db;

-- Run the CREATE TABLE and INSERT statements from DATABASE_SCHEMA.sql
```

### 4. Test the Setup

Start your development server:

```bash
npm run dev
```

Visit: `http://localhost:5173/themes`

## 📁 File Structure

```
src/
├── lib/
│   ├── server/
│   │   └── db.ts                    # MySQL connection utility
│   └── types/
│       └── theme.ts                 # Theme type definitions
├── routes/
│   ├── api/
│   │   └── themes/
│   │       └── +server.ts          # API endpoint for themes
│   └── (marketing)/
│       └── themes/
│           └── +page.svelte        # Themes page UI
└── ...
```

## 🎨 Features

### Implemented

- ✅ MySQL database integration
- ✅ RESTful API endpoint (`/api/themes`)
- ✅ Search functionality
- ✅ Technology filter (HTML, React, Vue, etc.)
- ✅ Industry/Category filter (Business, Blog, Portfolio, etc.)
- ✅ Free themes filter
- ✅ Responsive grid layout
- ✅ Hover animations and transitions
- ✅ Purple-accented Craftuary theme
- ✅ Mobile-responsive design
- ✅ Preview, Deploy, and Download buttons
- ✅ SEO optimization

### Filter Options

**Technologies:**
- All, HTML, React, Vue, Svelte, WordPress, Next.js, Nuxt, Astro

**Industries/Categories:**
- All, Business, Blog, Portfolio, eCommerce, Agency, Education, SaaS, Landing Page, Dashboard

## 🔧 Customization

### Adding New Themes

Insert themes directly into MySQL:

```sql
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) 
VALUES (
  'Your Theme Name',
  'Theme description',
  'Business',
  'React',
  'https://example.com/image.jpg',
  'https://example.com/preview',
  'https://example.com/download',
  'https://vercel.com/deploy',
  true
);
```

### Modifying Filters

Edit `src/lib/types/theme.ts`:

```typescript
export const technologies = [
  "All",
  "Your New Tech",
  // ...
] as const

export const categories = [
  "All",
  "Your New Category",
  // ...
] as const
```

### Styling

The themes page uses:
- **TailwindCSS** for styling
- **DaisyUI** components (cards, badges, buttons)
- **Gradient colors** from primary, secondary, and accent
- **Hover effects** for interactivity

Customize colors in `tailwind.config.js`.

## 🌐 API Endpoints

### GET `/api/themes`

**Query Parameters:**
- `technology` - Filter by technology (e.g., `React`)
- `category` - Filter by category (e.g., `Business`)
- `search` - Search in name and description
- `is_free` - Filter free themes (`true` or omit)

**Example:**
```
/api/themes?technology=React&category=Business&is_free=true&search=modern
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
    "is_free": true
  }
]
```

## 🚨 Troubleshooting

### "Cannot connect to MySQL"

1. Check MySQL is running: `sudo service mysql status`
2. Verify credentials in `.env`
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### "Empty themes array"

1. Verify data exists: `SELECT COUNT(*) FROM themes;`
2. Check API route logs in terminal
3. The API returns empty array if database isn't set up (graceful degradation)

### Module not found errors

```bash
npm install mysql2
npm run dev
```

## 🎯 Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard
2. Use a cloud MySQL provider (PlanetScale, AWS RDS, etc.)
3. Update `MYSQL_HOST` to your cloud database URL

### Database Providers

**Recommended cloud MySQL providers:**
- [PlanetScale](https://planetscale.com/) - Free tier, serverless
- [AWS RDS](https://aws.amazon.com/rds/) - Scalable, managed
- [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases)
- [Railway](https://railway.app/) - Easy deployment

## 📊 Database Schema

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎨 Design Notes

The themes page follows Craftuary's design language:
- **Purple gradient headings** with primary/secondary/accent colors
- **Card-based layout** with hover animations
- **Shadow effects** on hover (`hover:shadow-2xl`)
- **Badge system** for Free/Premium labels
- **Smooth transitions** (300ms duration)
- **Responsive grid** (1 col mobile, 2 cols tablet, 3 cols desktop)

## 📝 Next Steps

- [ ] Add theme ratings/reviews
- [ ] Implement theme favorites/bookmarks
- [ ] Add pagination for large datasets
- [ ] Create theme detail pages
- [ ] Add theme screenshots carousel
- [ ] Implement theme tags system
- [ ] Add "Recently Added" section
- [ ] Create theme submission form
- [ ] Add analytics tracking

## 🤝 Contributing

To add more sample themes, run:

```sql
INSERT INTO themes (...) VALUES (...);
```

Or create a theme submission interface for users!

---

**Need help?** Check the main README or open an issue.
