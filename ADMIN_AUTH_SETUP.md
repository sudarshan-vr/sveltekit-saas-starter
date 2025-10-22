# Admin Authentication Setup

## 🔐 Local Setup (Development)

### 1. Add Admin Credentials to `.env`

Open your `.env` file and add these lines:

```env
# Admin Panel Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

**Example:**
```env
# Hostinger Remote MySQL Database Configuration
MYSQL_HOST=srv1837.hstgr.io
MYSQL_PORT=3306
MYSQL_USER=u190097430_appcraftuary
MYSQL_PASSWORD=$ghbh$123.
MYSQL_DATABASE=u190097430_fapp

# Admin Panel Authentication
ADMIN_USERNAME=craftuary_admin
ADMIN_PASSWORD=MySecurePass123!

# Public URL
PUBLIC_WEBSITE_URL=http://localhost:5173
```

### 2. Test Locally

```bash
# Start dev server
npm run dev

# Visit admin login
http://localhost:5173/admin/login

# Login with your credentials
Username: craftuary_admin
Password: MySecurePass123!
```

---

## 🚀 Production Setup (Vercel)

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MYSQL_HOST` | `srv1837.hstgr.io` | Production, Preview |
| `MYSQL_PORT` | `3306` | Production, Preview |
| `MYSQL_USER` | `u190097430_appcraftuary` | Production, Preview |
| `MYSQL_PASSWORD` | `your_database_password` | Production, Preview |
| `MYSQL_DATABASE` | `u190097430_fapp` | Production, Preview |
| `ADMIN_USERNAME` | **Your admin username** | Production, Preview |
| `ADMIN_PASSWORD` | **Your secure password** | Production, Preview |
| `PUBLIC_WEBSITE_URL` | `https://your-app.vercel.app` | Production, Preview |

3. Click **Save**
4. **Redeploy** your app

---

## 🔒 Security Features

### What's Protected:

✅ **All `/admin/*` routes** - Requires login
- `/admin/themes` → Admin dashboard
- `/admin/*` → Any admin page

✅ **All `/api/admin/*` routes** - Requires authentication
- `/api/admin/themes` → CRUD operations
- Except `/api/admin/auth/login` and `/api/admin/auth/logout`

✅ **Search engines blocked**
- `robots.txt` disallows `/admin/`
- Login page has `noindex, nofollow` meta tag

✅ **Session-based authentication**
- Secure HTTP-only cookies
- 24-hour session expiry
- Secure flag in production

---

## 📋 Access URLs

### Local Development
- **Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/themes`

### Production (Vercel)
- **Login**: `https://your-app.vercel.app/admin/login`
- **Dashboard**: `https://your-app.vercel.app/admin/themes`

---

## 🎯 Testing Authentication

### Test Login Flow:
1. Visit `/admin/themes` (without logging in)
2. Should redirect to `/admin/login`
3. Enter username and password
4. Should redirect to `/admin/themes` on success

### Test Logout:
1. Click "Logout" button in dashboard header
2. Should redirect to `/admin/login`
3. Try accessing `/admin/themes`
4. Should redirect back to login

### Test API Protection:
```bash
# Without auth - should fail
curl https://your-app.vercel.app/api/admin/themes

# Response: {"error":"Unauthorized"}
```

---

## 🛡️ Password Requirements

**Recommended password format:**
- Minimum 12 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*)

**Good examples:**
- `Admin@Craft2024!`
- `SecurePass#789`
- `MyTheme$Admin99`

**Bad examples:**
- `admin123` (too simple)
- `password` (too common)
- `12345678` (no letters)

---

## 🔄 Changing Credentials

### Local (Development):
1. Edit `.env` file
2. Update `ADMIN_USERNAME` and/or `ADMIN_PASSWORD`
3. Restart dev server: `npm run dev`

### Production (Vercel):
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Edit `ADMIN_USERNAME` and/or `ADMIN_PASSWORD`
3. Save changes
4. Redeploy: Deployments → ... → Redeploy

---

## 🚨 Troubleshooting

### "Invalid credentials" error

**Check:**
1. Username and password are correct
2. No extra spaces in `.env` file
3. Environment variables loaded in Vercel
4. Clear browser cookies and try again

### Can't access admin after deployment

**Solution:**
1. Verify environment variables in Vercel
2. Check they're set for "Production" environment
3. Redeploy the app
4. Clear browser cache
5. Try incognito/private browsing mode

### Session expires too quickly

**Current:** 24 hours

**To change:** Edit `/api/admin/auth/login/+server.ts`:
```typescript
cookies.set('admin_session', 'authenticated', {
  // ...
  maxAge: 60 * 60 * 24 * 7  // 7 days instead of 1
})
```

---

## 📱 Multi-User Support (Future)

Currently supports single admin user. To add multiple users:

### Option 1: Multiple Environment Variables
```env
ADMIN_USERNAME_1=admin1
ADMIN_PASSWORD_1=pass1
ADMIN_USERNAME_2=admin2
ADMIN_PASSWORD_2=pass2
```

### Option 2: Database Table
Create `admin_users` table and store hashed passwords.

### Option 3: External Auth Service
Integrate with Auth0, Firebase Auth, or Supabase Auth.

---

## 🔐 Enhanced Security (Optional)

### Add Rate Limiting

Prevent brute force attacks:
```bash
npm install rate-limiter-flexible
```

### Add IP Restrictions

Allow admin access only from specific IPs:
```typescript
// src/hooks.server.ts
const ALLOWED_IPS = ['123.456.789.0']
```

### Add Two-Factor Authentication

Use authenticator apps for extra security.

---

## ✅ Quick Checklist

Before going live:
- [ ] Changed default admin username
- [ ] Set strong admin password
- [ ] Added credentials to Vercel
- [ ] Tested login locally
- [ ] Tested login on production
- [ ] Confirmed logout works
- [ ] Verified `/admin` blocked by robots.txt
- [ ] Tested unauthorized access blocked

---

## 📞 Default Credentials (Development Only)

**⚠️ CHANGE THESE IMMEDIATELY FOR PRODUCTION!**

Default credentials (if not set in `.env`):
- Username: `admin`
- Password: `changeme123`

**These are only for testing and should NEVER be used in production!**

---

## 🎉 Summary

Your admin panel is now secured with:
- ✅ Username/password authentication
- ✅ Session-based access control
- ✅ Protected routes (pages and APIs)
- ✅ Search engine blocking
- ✅ Logout functionality
- ✅ Production-ready security

**Ready to deploy!** Follow `VERCEL_DEPLOYMENT_GUIDE.md` for deployment instructions.
