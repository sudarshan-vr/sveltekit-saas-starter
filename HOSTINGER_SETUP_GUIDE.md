# Hostinger Database Setup Guide

Follow these steps to set up your themes database on Hostinger.

## 📋 Step 1: Get Your Database Credentials

1. Log into **Hostinger Control Panel**
2. Go to **Databases** → **MySQL Databases**
3. Note down these details:
   - Database Name (e.g., `u123456789_craftuary`)
   - Database Username (e.g., `u123456789_admin`)
   - Database Password
   - Database Host (usually `localhost` or specific host like `mysql.hostinger.com`)

## 🗄️ Step 2: Create the Themes Table

1. In Hostinger, click **Manage** next to your database
2. Click **phpMyAdmin** to open it
3. Select your database from the left sidebar
4. Click the **SQL** tab at the top
5. Copy and paste the entire content from `HOSTINGER_SETUP.sql`
6. Click **Go** to execute

✅ This will create the `themes` table and insert 10 sample themes.

## 🔧 Step 3: Configure Local Environment

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` with your Hostinger credentials:

```env
# Hostinger MySQL Configuration
MYSQL_HOST=localhost
# OR use: MYSQL_HOST=mysql.hostinger.com (check your Hostinger panel)

MYSQL_USER=u123456789_admin
# Replace with your actual database username

MYSQL_PASSWORD=YourSecurePassword123
# Replace with your actual database password

MYSQL_DATABASE=u123456789_craftuary
# Replace with your actual database name

# Other settings (keep as is for now)
PUBLIC_WEBSITE_URL=http://localhost:5173
```

## 🧪 Step 4: Test the Connection Locally

1. Make sure MySQL credentials are correct in `.env`
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Visit: `http://localhost:5173/themes`
4. You should see your themes!

## 🚀 Step 5: Configure for Vercel Deployment

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   MYSQL_HOST = [your-hostinger-host]
   MYSQL_USER = [your-database-username]
   MYSQL_PASSWORD = [your-database-password]
   MYSQL_DATABASE = [your-database-name]
   ```

⚠️ **Important:** Use the **external host** for production:
- Check your Hostinger database panel for "Remote MySQL" settings
- You may need to enable external connections
- Host might be something like: `mysql.hostinger.com` or specific IP

## 🔒 Security Checklist

Before pushing to GitHub:

- ✅ Make sure `.env` is in `.gitignore` (already done)
- ✅ Never commit real database passwords
- ✅ Use `.env.example` for template (no real credentials)
- ✅ Test locally before deploying

## 🎨 Customize Your Themes

After setup, you can add more themes via phpMyAdmin:

1. Go to phpMyAdmin → Your Database → `themes` table
2. Click **Insert** tab
3. Fill in the form with your theme details:
   - **name**: Theme name
   - **description**: Short description
   - **category**: Business, Blog, Portfolio, etc.
   - **technology**: React, Vue, HTML, etc.
   - **thumbnail**: Image URL (800x600 recommended)
   - **preview_url**: Link to live preview
   - **download_url**: Download/GitHub link
   - **deploy_url**: Vercel deploy button URL
   - **is_free**: 1 for free, 0 for premium

Or run SQL INSERT:
```sql
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) 
VALUES (
  'Your Theme Name',
  'Theme description here',
  'Business',
  'React',
  'https://your-image-url.jpg',
  'https://preview-url.com',
  'https://github.com/download-url',
  'https://vercel.com/deploy-url',
  1
);
```

## 🔧 Troubleshooting

### Can't connect to database:
1. Check credentials in `.env`
2. Verify database exists in Hostinger
3. Check if external connections are enabled (for Vercel)

### Empty themes array:
1. Verify data exists: Run `SELECT * FROM themes;` in phpMyAdmin
2. Check console for errors: `npm run dev`
3. Verify table name is `themes` (lowercase)

### Vercel deployment issues:
1. Ensure environment variables are set in Vercel dashboard
2. Use external database host (not `localhost`)
3. Enable remote MySQL access in Hostinger

## 📝 Next Steps

1. ✅ Set up database in Hostinger
2. ✅ Test locally with `npm run dev`
3. ✅ Add your own themes
4. ✅ Commit to GitHub (without .env file)
5. ✅ Deploy to Vercel with environment variables

---

**Ready to push to GitHub?** Make sure:
- `.env` is NOT committed (check `.gitignore`)
- `.env.example` has template values only
- Database credentials are secure
