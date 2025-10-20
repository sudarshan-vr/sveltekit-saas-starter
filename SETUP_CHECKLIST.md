# 📋 Setup Checklist - Before GitHub Push

## ✅ Hostinger Database Setup (Do This First)

### 1. Access Hostinger phpMyAdmin
- [ ] Log into Hostinger Control Panel
- [ ] Go to **Databases** → **MySQL Databases**
- [ ] Note your database credentials:
  - Database Name: `u______`
  - Username: `u______`
  - Password: `******`
  - Host: `localhost` or `mysql.hostinger.com`

### 2. Create Themes Table
- [ ] Open phpMyAdmin from your Hostinger database panel
- [ ] Select your database from left sidebar
- [ ] Click **SQL** tab
- [ ] Copy entire content from `HOSTINGER_SETUP.sql`
- [ ] Paste and click **Go**
- [ ] Verify: You should see success message and 10 rows inserted

### 3. Verify Data
- [ ] In phpMyAdmin, click on `themes` table
- [ ] Click **Browse** tab
- [ ] You should see 10 themes listed
- [ ] If yes, ✅ Database setup complete!

## 🔧 Local Environment Setup

### 4. Create .env File
- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`
- [ ] Edit `.env` with your Hostinger credentials:
  ```env
  MYSQL_HOST=localhost
  MYSQL_USER=u123456789_youruser
  MYSQL_PASSWORD=your_password
  MYSQL_DATABASE=u123456789_yourdb
  ```

### 5. Test Locally
- [ ] Run: `npm run dev`
- [ ] Open: `http://localhost:5173/themes`
- [ ] ✅ You should see 10 themes displayed
- [ ] ✅ Try filtering by Technology (React, Vue, etc.)
- [ ] ✅ Try searching for a theme
- [ ] ✅ Click Preview/Download buttons (they should open)

## 📝 Optional: Add Your Own Themes

### 6. Customize Sample Data (Optional)
If you want to add your real themes before pushing:

- [ ] Open phpMyAdmin → `themes` table
- [ ] Click **Insert** or use SQL to add themes
- [ ] Update existing themes with real data
- [ ] Test again at `http://localhost:5173/themes`

Example SQL to add a theme:
```sql
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) 
VALUES (
  'My Custom Theme',
  'Description of my awesome theme',
  'Business',
  'React',
  'https://images.unsplash.com/photo-1234?w=800',
  'https://preview.yoursite.com',
  'https://github.com/yourrepo/archive/main.zip',
  'https://vercel.com/new/clone?repository-url=...',
  1
);
```

## 🔒 Pre-GitHub Security Check

### 7. Verify Git Safety
- [ ] Run: `git status`
- [ ] ⚠️ IMPORTANT: Verify `.env` is NOT in the list
- [ ] `.env` should NOT appear (it's in `.gitignore`)
- [ ] If `.env` appears, STOP and check `.gitignore`

### 8. Check Files to Commit
Files that SHOULD be committed:
- [x] `.env.example` (template only, no real passwords)
- [x] `DATABASE_SCHEMA.sql`
- [x] `HOSTINGER_SETUP.sql`
- [x] `HOSTINGER_SETUP_GUIDE.md`
- [x] `THEMES_SETUP.md`
- [x] `src/lib/types/theme.ts`
- [x] `src/lib/server/db.ts`
- [x] `src/routes/api/themes/+server.ts`
- [x] `src/routes/(marketing)/themes/+page.svelte`
- [x] `package.json` (with mysql2)
- [x] All other theme-related files

Files that should NOT be committed:
- [ ] `.env` (your real credentials)
- [ ] `node_modules/`
- [ ] `.svelte-kit/`
- [ ] Any file with real passwords

## 🚀 Ready to Push to GitHub

### 9. Stage and Commit
Once everything above is ✅:

```bash
# Stage all changes
git add -A

# Check what will be committed (verify .env is NOT here)
git status

# Commit with a good message
git commit -m "Add themes page with MySQL integration and sample data"

# Push to GitHub
git push origin main
```

### 10. Deploy to Vercel

After pushing to GitHub:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Your project should auto-deploy from GitHub
3. Go to **Project Settings** → **Environment Variables**
4. Add these variables:
   ```
   MYSQL_HOST = [your-hostinger-host]
   MYSQL_USER = [your-hostinger-username]
   MYSQL_PASSWORD = [your-hostinger-password]
   MYSQL_DATABASE = [your-hostinger-database]
   ```
5. **Important:** For Vercel, you may need to:
   - Enable **Remote MySQL** in Hostinger
   - Use external host (not `localhost`)
   - Check Hostinger docs for external connection setup

6. Redeploy from Vercel dashboard
7. Visit: `https://your-site.vercel.app/themes`
8. ✅ Themes should load!

## 🎉 Success Checklist

- [ ] Database created in Hostinger ✅
- [ ] 10 sample themes inserted ✅
- [ ] Tested locally and works ✅
- [ ] `.env` not committed ✅
- [ ] Pushed to GitHub ✅
- [ ] Vercel environment variables set ✅
- [ ] Production site works ✅

---

## 🆘 Need Help?

Check these files:
- `HOSTINGER_SETUP_GUIDE.md` - Detailed Hostinger setup
- `THEMES_SETUP.md` - General themes documentation
- `SEO_GUIDE.md` - SEO features documentation

**If stuck:** The themes page will show empty array if database isn't connected (graceful fallback).
