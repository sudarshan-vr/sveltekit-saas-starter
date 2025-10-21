# Pre-Commit Checklist ✅

Run these tests before pushing to GitHub:

## 🧪 1. Database Connection Test

```bash
node test-db-connection.js
```

**Expected:** ✅ Connected successfully!

---

## 🔐 2. Environment Variables Check

Verify your `.env` file has:

```env
# Database
MYSQL_HOST=jhbhj
MYSQL_USER=ghvhgj
MYSQL_PASSWORD=gyjjhb.
MYSQL_DATABASE=hjkgh

# Admin Auth (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

**Status:** 
- [ ] Database credentials present
- [ ] Admin credentials set (not default values)

---

## 🚀 3. Development Server

```bash
npm run dev
```

**Test these URLs:**

### Public Pages (should work):
- [ ] http://localhost:5173 - Home page loads
- [ ] http://localhost:5173/themes - Themes page shows themes
- [ ] http://localhost:5173/pricing - Pricing page loads

### Admin Pages (should redirect to login):
- [ ] http://localhost:5173/admin/themes - Redirects to login
- [ ] http://localhost:5173/admin/login - Shows login form

---

## 🔑 4. Admin Authentication

### Test Login:
1. Go to http://localhost:5173/admin/login
2. Enter your credentials from `.env`
3. Click "Sign In"

**Expected:**
- [ ] Redirects to `/admin/themes`
- [ ] Shows dashboard with stats
- [ ] Can see list of themes
- [ ] Logout button visible

### Test Logout:
1. Click "Logout" button
2. **Expected:** Redirects to `/admin/login`
3. Try accessing `/admin/themes` again
4. **Expected:** Redirects back to login

---

## 📊 5. Admin Dashboard Functions

**After logging in, test:**

### View Themes:
- [ ] Statistics cards show numbers
- [ ] Themes table displays
- [ ] Can see theme thumbnails

### Search & Filter:
- [ ] Search box works
- [ ] Status filter works
- [ ] Sort options work

### Add Theme:
- [ ] Click "Add Theme" button
- [ ] Modal opens
- [ ] Fill in form fields
- [ ] Click "Create Theme"
- [ ] **Expected:** Success message, theme appears in list

### Edit Theme:
- [ ] Click edit button (pencil icon) on any theme
- [ ] Modal opens with theme data
- [ ] Change something (e.g., name)
- [ ] Click "Update Theme"
- [ ] **Expected:** Success message, change reflected

### Delete Theme (CAREFUL!):
- [ ] Click delete button (trash icon) on test theme
- [ ] Confirmation modal appears
- [ ] Click "Delete"
- [ ] **Expected:** Success message, theme removed

---

## 🎯 6. Public Tracking Test

1. Open http://localhost:5173/themes in **new incognito window**
2. Click "Preview" on any theme
3. Go back to admin dashboard
4. **Expected:** Views count increased by 1

---

## 🔍 7. File Checks

### Verify these files exist:
- [ ] `.env` (with your credentials)
- [ ] `.gitignore` (contains `.env`)
- [ ] `static/robots.txt` (contains `Disallow: /admin/`)
- [ ] `src/hooks.server.ts` (has auth middleware)
- [ ] `src/routes/admin/login/+page.svelte`
- [ ] `src/routes/admin/themes/+page.svelte`
- [ ] `src/routes/api/admin/auth/login/+server.ts`

### Verify `.env` is NOT in Git:
```bash
git status
```

**Expected:** `.env` should NOT appear in the list

---

## ⚠️ 8. Known Issues (Safe to Ignore)

### Build Warning:
```
Error: EPERM: operation not permitted, symlink
```
**Status:** ✅ SAFE - Windows symlink issue, won't affect Vercel deployment

### Svelte Check Warnings:
```
Warn: A form label must be associated with a control
```
**Status:** ✅ SAFE - Accessibility warnings, app still works

---

## 📝 9. Code Quality

### TypeScript Errors:
```bash
npm run check 2>&1 | findstr /C:"Error:"
```

**Expected:** Only accessibility warnings, no fatal errors

---

## 🎯 10. Pre-Push Final Check

### Before `git push`:

```bash
# Check what will be committed
git status

# Review changes
git diff

# Make sure .env is NOT included!
git diff --cached | findstr /C:".env"
```

**Expected:** No output (means .env is not being committed)

---

## ✅ All Clear! Ready to Push

If all checks pass:

```bash
git add .
git commit -m "Add secure admin theme management system"
git push origin main
```

---

## 🚨 Common Issues

### Issue: Can't login to admin

**Solutions:**
1. Check `.env` has `ADMIN_USERNAME` and `ADMIN_PASSWORD`
2. Restart dev server after changing `.env`
3. Clear browser cookies
4. Try incognito mode

### Issue: Database errors

**Solutions:**
1. Run `node test-db-connection.js`
2. Check Hostinger allows remote connections
3. Verify credentials in `.env`

### Issue: Themes not loading

**Solutions:**
1. Check database has themes: `node test-db-connection.js`
2. Check browser console for errors (F12)
3. Verify API endpoint works: http://localhost:5173/api/themes

### Issue: Build fails

**Solutions:**
1. If it's the symlink error → SAFE to ignore
2. If other errors → Share error message for help

---

## 📞 Need Help?

**Check logs:**
- Browser console (F12 → Console)
- Terminal where `npm run dev` is running

**Documentation:**
- `DEPLOYMENT_READY.md` - Quick start guide
- `ADMIN_AUTH_SETUP.md` - Authentication help
- `VERCEL_DEPLOYMENT_GUIDE.md` - Deployment guide

---

## ✨ Success Indicators

You're ready to push if:
- ✅ Dev server runs without fatal errors
- ✅ Can login to admin panel
- ✅ Can add/edit/delete themes
- ✅ Public themes page works
- ✅ `.env` is not in git status
- ✅ Admin credentials changed from defaults

**Good luck!** 🚀
