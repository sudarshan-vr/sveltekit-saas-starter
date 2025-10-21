# MySQL Database Setup Guide for Craftuary

## ✅ What Has Been Fixed

1. **Installed Required Dependencies**
   - `mysql2` - MySQL driver for Node.js
   - `tslib` - TypeScript runtime library

2. **Created Database Connection File**
   - Location: `src/lib/server/db.ts`
   - Properly configured for Hostinger MySQL

3. **Updated Themes API**
   - Replaced Supabase with MySQL
   - Location: `src/routes/api/themes/+server.ts`
   - Falls back to mock data if database connection fails

4. **Updated Theme Type**
   - Added `created_at` field to match database schema

## 🔧 Setup Instructions

### Step 1: Create Your `.env` File

Create a file named `.env` in the project root with your Hostinger credentials:

```env
# MySQL Database Configuration - HOSTINGER
MYSQL_HOST=gvyugg
MYSQL_PORT=3306
MYSQL_USER=gfvhjytj
MYSQL_PASSWORD=yuhygyf3.
MYSQL_DATABASE=ytfgfju

# Website URL
PUBLIC_WEBSITE_URL=http://localhost:5173
```

**Note about the password:**
- The `$` character in your password should work as-is in the `.env` file
- If you encounter issues, you can try wrapping it in quotes: `MYSQL_PASSWORD="jhgyjfg"`

### Step 2: Enable Remote MySQL Access in Hostinger

Hostinger blocks external connections by default. You need to:

1. Log into **Hostinger Control Panel**
2. Go to **Databases** → **Remote MySQL**
3. **Add your IP address** to the whitelist:
   - Find your IP at: https://whatismyipaddress.com/
   - Or use `%` to allow all IPs (less secure, but easier for development)
4. Click **Save**

### Step 3: Verify Database Table Exists

Make sure you've run the SQL in your Hostinger database (`u190097430_fapp`):

```sql
CREATE TABLE IF NOT EXISTS themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  technology VARCHAR(100),
  thumbnail VARCHAR(500),
  preview_url VARCHAR(500),
  download_url VARCHAR(500),
  deploy_url VARCHAR(500),
  is_free BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) VALUES
('Modern Business Pro', 'A sleek and professional business website template with modern design elements.', 'Business', 'React', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://preview.craftuary.com/modern-business', 'https://github.com/craftuary/modern-business', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/modern-business', TRUE),
('Tech Blog Minimalist', 'Beautiful minimalist blog template optimized for technical content.', 'Blog', 'Next.js', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop', 'https://preview.craftuary.com/tech-blog', 'https://github.com/craftuary/tech-blog', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/tech-blog', TRUE),
('Portfolio Pro', 'Showcase your work beautifully with this stunning portfolio template.', 'Portfolio', 'Vue', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop', 'https://preview.craftuary.com/portfolio-pro', 'https://github.com/craftuary/portfolio-pro', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/portfolio-pro', TRUE);
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Test the Themes Page

Visit: `http://localhost:5173/themes`

## 🎯 How It Works

1. **Primary Mode**: The app tries to connect to your Hostinger MySQL database
2. **Fallback Mode**: If the database connection fails, it shows mock data (3 sample themes)
3. **Benefits**: The site works even if database is unavailable

## 🐛 Troubleshooting

### Error: "Access denied for user"
- **Cause**: Password issue or incorrect credentials
- **Fix**: Double-check your password in `.env` file
- **Alternative**: Try wrapping password in quotes: `MYSQL_PASSWORD="hgbhjbjgvg."`

### Error: "Can't connect to MySQL server"
- **Cause**: Remote MySQL not enabled in Hostinger
- **Fix**: Follow Step 2 above to enable remote access
- **Test**: Use a MySQL client like MySQL Workbench to test the connection

### Page shows mock data instead of real data
- **Cause**: Database connection failed OR no data in database
- **Check console**: Look for error messages in your browser console or terminal
- **Verify**: Make sure you've run the SQL to create the table and insert data

### Still seeing old errors
- **Solution 1**: Stop the server (Ctrl+C) and restart with `npm run dev`
- **Solution 2**: Clear browser cache and refresh

## 📁 File Structure

```
src/
├── lib/
│   ├── server/
│   │   └── db.ts              # MySQL connection
│   └── types/
│       └── theme.ts           # Theme type definition
└── routes/
    ├── api/
    │   └── themes/
    │       └── +server.ts     # Themes API endpoint
    └── (marketing)/
        └── themes/
            └── +page.svelte   # Themes page UI
```

## 🚀 Next Steps

Once your themes page is working:
1. Add more themes to your database
2. Customize the design in `+page.svelte`
3. Add authentication to create/edit themes
4. Deploy to Vercel or your preferred host

## 📞 Need Help?

Check the console output for detailed error messages. The system logs helpful information about:
- Database connection attempts
- Whether it's using real data or mock data
- Any errors that occur
