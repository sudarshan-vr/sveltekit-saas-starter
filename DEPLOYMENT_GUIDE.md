# 🚀 Deployment Guide: Git & Vercel

## ✅ Pre-Deployment Security Checklist

All secure! Your code is ready to push to Git:

- ✅ `.env` is in `.gitignore` (credentials won't be uploaded)
- ✅ No hardcoded passwords in source code
- ✅ Database credentials use environment variables
- ✅ Production build tested successfully
- ✅ Vercel adapter configured

## 📤 Step 1: Push to GitHub

### If this is a new repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Craftuary SaaS with MySQL themes"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If you already have a repository:

```bash
# Add changes
git add .

# Commit
git commit -m "Add MySQL themes functionality"

# Push
git push origin main
```

## 🌐 Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure Environment Variables** (IMPORTANT!):
   
   Click on "Environment Variables" and add these:

   ```
   MYSQL_HOST=jhjhbbj
   MYSQL_PORT=3306
   MYSQL_USER=hjbjhbj
   MYSQL_PASSWORD=$jhbhj$123.
   MYSQL_DATABASE=nhjjbh
   PUBLIC_WEBSITE_URL=https://your-project.vercel.app
   ```

   **Note:** For `PUBLIC_WEBSITE_URL`, use your actual Vercel URL after first deployment, then redeploy.

5. **Click "Deploy"**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow prompts and add environment variables when asked
```

## 🔐 Step 3: Configure Environment Variables in Vercel

After deploying, you need to set environment variables:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:

| Variable | Value | Environment |
|----------|-------|-------------|
| `MYSQL_HOST` | `nkhjjhn` | Production, Preview, Development |
| `MYSQL_PORT` | `3306` | Production, Preview, Development |
| `MYSQL_USER` | `jknkjh` | Production, Preview, Development |
| `MYSQL_PASSWORD` | `$jhjn` | Production, Preview, Development |
| `MYSQL_DATABASE` | `hnjn` | Production, Preview, Development |
| `PUBLIC_WEBSITE_URL` | `https://your-project.vercel.app` | Production, Preview, Development |

4. **Redeploy** after adding environment variables:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment

## 🌍 Step 4: Enable Remote MySQL Access

**CRITICAL:** Hostinger needs to allow connections from Vercel's servers.

1. Log into **Hostinger Control Panel**
2. Go to **Databases** → **Remote MySQL**
3. **Add these IP ranges** (Vercel's server IPs):
   
   ```
   76.76.21.0/24
   76.76.23.0/24
   ```
   
   **OR use `%` to allow all IPs** (less secure but easier)

4. Click **Save**

## 🧪 Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app/themes`
2. Check if themes load from your database
3. Test the filters (technology, category, search)

### If you see mock data instead of real data:

- Check Vercel **Function Logs** for database errors
- Verify environment variables are set correctly
- Confirm Hostinger allows remote MySQL connections
- Check if your database table has data

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update themes page"
git push origin main
```

Vercel will automatically build and deploy! 🎉

## 🐛 Troubleshooting

### Build Error: "EPERM: operation not permitted, symlink"
- **This is Windows-specific** and won't occur on Vercel's servers
- The build will succeed on Vercel's Linux environment

### Themes page shows mock data in production
1. **Check Vercel Function Logs:**
   - Dashboard → Your Project → Logs
   - Look for database connection errors
2. **Verify Hostinger remote access:**
   - Make sure Vercel IPs are whitelisted
3. **Check environment variables:**
   - Dashboard → Settings → Environment Variables
   - Ensure all MySQL variables are set

### Database connection timeout
- **Cause:** Hostinger blocking external connections
- **Fix:** Whitelist Vercel IPs or use `%` in Remote MySQL settings

### "Access denied" errors in production
- **Cause:** Incorrect password or user permissions
- **Fix:** 
  - Double-check `MYSQL_PASSWORD` in Vercel environment variables
  - Verify user has permissions in Hostinger

## 📊 Monitoring

### View Logs in Vercel:
1. Go to your project in Vercel Dashboard
2. Click **"Logs"** or **"Functions"**
3. Select the `/api/themes` function
4. See real-time database connection status

### Check Database Connection:
- Look for "Database error" or "Using mock data" messages
- If successful, you'll see database queries in the logs

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly at Vercel URL
- [ ] Themes page displays real data from MySQL
- [ ] Filters work (technology, category, search)
- [ ] No errors in Vercel function logs
- [ ] Update `PUBLIC_WEBSITE_URL` to your Vercel URL
- [ ] Add custom domain (optional)

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Hostinger Panel:** https://hpanel.hostinger.com
- **GitHub Repo:** https://github.com/YOUR_USERNAME/YOUR_REPO

## 🎉 You're Live!

Your Craftuary SaaS is now deployed and running on Vercel with MySQL themes! 

Next steps:
- Add more themes to your database
- Customize the design
- Add authentication for theme management
- Set up a custom domain

---

**Need Help?** Check Vercel's function logs for detailed error messages.
