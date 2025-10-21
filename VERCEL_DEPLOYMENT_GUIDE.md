# Vercel Deployment Guide for Craftuary Admin

Complete guide for deploying your theme admin system to Vercel with GitHub integration.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository

```bash
# Make sure you're in the project directory
cd sveltekit-saas-starter

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add admin theme management system"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Configure Environment Variables in Vercel

**IMPORTANT**: Add these environment variables in Vercel Dashboard before deployment:

#### Required Variables:

```env
# Hostinger Database
MYSQL_HOST=hjgjhvkv
MYSQL_PORT=3306
MYSQL_USER=hgjhgh
MYSQL_PASSWORD=hghanhgh.
MYSQL_DATABASE=hgkv

# Admin Authentication (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Public URL
PUBLIC_WEBSITE_URL=https://your-app.vercel.app
```

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: SvelteKit
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.svelte-kit` (auto-detected)
5. Add environment variables (from step 2)
6. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to link to existing project or create new one
```

---

## 🔐 Security Configuration

### Admin Credentials Setup

**⚠️ CRITICAL: Change default admin credentials!**

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
ADMIN_USERNAME=craftuary_admin
ADMIN_PASSWORD=YourVerySecurePassword123!@#
```

**Best Practices:**
- Use a strong password (min 12 characters)
- Include uppercase, lowercase, numbers, and symbols
- Never commit credentials to GitHub
- Rotate passwords regularly

### Database Access

Your Hostinger database should already allow remote connections. If you face connection issues:

1. Login to **Hostinger Control Panel**
2. Go to **Databases** → **Remote MySQL**
3. Add Vercel's IP ranges (or allow all IPs if acceptable)
4. Test connection from Vercel deployment

---

## 🛡️ SEO & Search Engine Blocking

### Already Configured:

✅ **robots.txt** blocks `/admin/` from search engines:
```
Disallow: /admin/
```

✅ **Meta tags** on login page:
```html
<meta name="robots" content="noindex, nofollow">
```

✅ **Authentication required** - all `/admin/*` routes protected

---

## 📊 Vercel Configuration Files

### vercel.json (Optional)

Create `vercel.json` for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".svelte-kit",
  "framework": "sveltekit",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "NODE_VERSION": "18"
  },
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/admin/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        },
        {
          "key": "Cache-Control",
          "value": "no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## ✅ Pre-Deployment Checklist

### Code & Files
- [ ] All code committed to GitHub
- [ ] `.env` is in `.gitignore` (DO NOT commit)
- [ ] Database schema updated on Hostinger
- [ ] Admin authentication tested locally

### Environment Variables
- [ ] `MYSQL_HOST` set to Hostinger host
- [ ] `MYSQL_USER` set to Hostinger username
- [ ] `MYSQL_PASSWORD` set to Hostinger password
- [ ] `MYSQL_DATABASE` set to database name
- [ ] `ADMIN_USERNAME` set (changed from default)
- [ ] `ADMIN_PASSWORD` set (strong password)
- [ ] `PUBLIC_WEBSITE_URL` set to Vercel URL

### Database
- [ ] Themes table has new columns (price, downloads, views, etc.)
- [ ] Can connect to Hostinger from local machine
- [ ] Remote access enabled on Hostinger

### Security
- [ ] Changed default admin credentials
- [ ] robots.txt blocks /admin/
- [ ] Admin routes protected by authentication
- [ ] HTTPS enabled (automatic on Vercel)

---

## 🧪 Testing After Deployment

### 1. Test Public Pages
- Visit `https://your-app.vercel.app`
- Check themes page: `https://your-app.vercel.app/themes`
- Verify themes load from Hostinger database

### 2. Test Admin Access
- Visit `https://your-app.vercel.app/admin/themes`
- Should redirect to login page
- Login with your credentials
- Test CRUD operations:
  - Add a theme
  - Edit a theme
  - Delete a theme
  - Search and filter

### 3. Test Tracking
- Visit public themes page
- Click Preview, Download, Deploy buttons
- Go to admin dashboard
- Verify metrics increased

### 4. Test Security
- Logout from admin
- Try accessing `/admin/themes` directly
- Should redirect to `/admin/login`
- Try accessing `/api/admin/themes` without auth
- Should return 401 Unauthorized

---

## 🐛 Troubleshooting

### Database Connection Errors

**Error**: `Access denied for user`

**Solution**:
1. Check environment variables in Vercel
2. Verify Hostinger allows remote connections
3. Confirm credentials are correct
4. Check IP whitelist in Hostinger

**Add SSL if required**:
```typescript
// src/lib/server/db.ts
const dbConfig = {
  // ... other config
  ssl: {
    rejectUnauthorized: false
  }
}
```

### Build Failures

**Error**: Module not found

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Update dependencies"
git push
```

### Admin Login Not Working

**Error**: Credentials don't work

**Solution**:
1. Check environment variables are set in Vercel
2. Redeploy after adding env vars
3. Clear browser cookies
4. Try incognito/private mode

### Environment Variables Not Loading

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Ensure variables are set for **Production** environment
3. Redeploy: Deployments → ... → Redeploy

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your commit message"
git push

# Vercel automatically builds and deploys
```

### Branch Deployments

- **main** branch → Production deployment
- Other branches → Preview deployments

### Rollback

If deployment fails:
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**

---

## 📈 Monitoring & Logs

### View Logs in Vercel

1. Go to your project in Vercel Dashboard
2. Click **"Deployments"**
3. Select a deployment
4. Click **"Runtime Logs"** or **"Build Logs"**

### Database Monitoring

Monitor through Hostinger phpMyAdmin:
- Active connections
- Query performance
- Table sizes
- Error logs

---

## 🎯 Post-Deployment Tasks

### Update URLs

1. Update `PUBLIC_WEBSITE_URL` in Vercel env vars
2. Update sitemap.xml with production URL
3. Update robots.txt if needed

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

### Analytics (Optional)

Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

```typescript
// src/routes/+layout.svelte
import { inject } from '@vercel/analytics';
inject();
```

---

## 📱 Mobile Responsive Check

Test on different devices:
- [ ] Desktop (admin dashboard)
- [ ] Tablet (admin dashboard)
- [ ] Mobile (public themes page)
- [ ] Mobile (admin login)

---

## 🔒 Additional Security Recommendations

### Rate Limiting

Consider adding rate limiting for admin login:

```typescript
// src/routes/api/admin/auth/login/+server.ts
import rateLimit from '@fastify/rate-limit'

// Add rate limiting logic
const attempts = new Map()
```

### IP Whitelisting (Optional)

Restrict admin access to specific IPs:

```typescript
// src/hooks.server.ts
const ALLOWED_IPS = ['your.ip.address']

if (event.url.pathname.startsWith('/admin')) {
  const clientIP = event.request.headers.get('x-forwarded-for')
  if (!ALLOWED_IPS.includes(clientIP)) {
    throw redirect(302, '/')
  }
}
```

### Two-Factor Authentication (Future)

Consider implementing 2FA for enhanced security.

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **SvelteKit Docs**: https://kit.svelte.dev
- **Hostinger Support**: https://www.hostinger.com/support
- **GitHub Issues**: Create issues in your repository

---

## ✨ Success Indicators

After successful deployment:

✅ Public site loads correctly
✅ Themes display from Hostinger database
✅ Admin login works
✅ Admin dashboard accessible after login
✅ Can add/edit/delete themes
✅ Tracking works on public page
✅ Statistics update in real-time
✅ Search engines blocked from /admin/
✅ HTTPS enabled
✅ No console errors

---

**Congratulations! Your admin system is now live on Vercel!** 🎉

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls
```

---

**Need help?** Check the main documentation in `ADMIN_README.md` or `ADMIN_THEMES_GUIDE.md`
