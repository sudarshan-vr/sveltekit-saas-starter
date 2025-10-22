# Troubleshooting: Themes Not Loading in Admin

## Issue: Themes stuck loading (spinner shows but no themes appear)

### Quick Fix #1: Check Browser Console

1. Open admin page: `http://localhost:5173/admin/themes`
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Look for red error messages

#### Common Errors:

**Error: "401 Unauthorized" or "Failed to fetch themes"**
- **Cause:** Your admin session cookie expired
- **Fix:** 
  ```
  1. Click "Logout" button
  2. Login again at /admin/login
  3. Dashboard should now load themes
  ```

**Error: "Unexpected API response"**
- **Cause:** API returning error object instead of array
- **Fix:** Check Network tab (see below)

---

### Quick Fix #2: Check Network Tab

1. Press **F12** → Click **Network** tab
2. Refresh the admin page
3. Find the request to **`/api/admin/themes`**
4. Click on it to see details

#### Check Response:

**Status 200 (Green):**
- Click "Response" tab
- Should see an array: `[{...}, {...}]`
- If you see `{"error": "..."}` → API error

**Status 401 (Red):**
- Means: Not authenticated
- Fix: Logout and login again

**Status 500 (Red):**
- Means: Server error
- Check terminal where `npm run dev` is running
- Look for database connection errors

---

### Quick Fix #3: Clear Cookies & Re-login

```
1. Open Developer Tools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Cookies" → Select your site
4. Find "admin_session" → Right-click → Delete
5. Refresh page → You'll be redirected to login
6. Login again
```

---

###  Quick Fix #4: Check Database Connection

Run this test:

```bash
node check-db-schema.js
```

**Expected output:**
```
✅ Connected to database
✅ Themes table exists
✅ All required columns present!
3️⃣  Theme count: 21
```

**If you see errors:**
- Check `.env` has correct database credentials
- Verify Hostinger allows remote connections

---

### Quick Fix #5: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

Then:
1. Go to `/admin/login`
2. Login with your credentials
3. Try accessing dashboard

---

### Quick Fix #6: Check `.env` Admin Credentials

Open `.env` file and verify:

```env
ADMIN_USERNAME=your_username  # Should be set
ADMIN_PASSWORD=your_password  # Should be set, NOT "changeme123"
```

**If missing or default:**
1. Add them to `.env`
2. Restart dev server
3. Try login again

---

## Detailed Debugging

### Step 1: Test API Directly

Open new browser tab (not incognito):

```
http://localhost:5173/api/admin/themes
```

**Expected:**
- If logged in → Should see JSON array of themes
- If not logged in → Should see `{"error":"Unauthorized"}`

### Step 2: Test Database Query

```bash
node test-db-connection.js
```

Should show:
```
✅ Connected successfully!
🎨 Number of themes: 21
```

### Step 3: Check Admin Page Console Logs

I've added console logging. Check browser console for:

```
Fetch themes error: ...
```

This will show you the exact error.

---

## Common Scenarios

### Scenario A: Just logged in, but themes won't load

**Symptoms:**
- Stats show correct numbers
- Themes section shows loading spinner forever
- No error messages visible

**Cause:** JavaScript error preventing themes from displaying

**Fix:**
1. F12 → Console tab
2. Look for red errors
3. Share the error message if you need help

---

### Scenario B: Shows "Failed to fetch themes" error

**Cause:** API endpoint returning 401 or 500

**Fix:**
1. F12 → Network tab
2. Find `/api/admin/themes` request
3. Check status code:
   - **401** → Re-login
   - **500** → Check database connection

---

### Scenario C: Stats show 0 themes, but database has 21

**Cause:** API not connecting to database

**Fix:**
```bash
# Test database
node check-db-schema.js

# Should show: Theme count: 21
# If shows 0 or error → check .env credentials
```

---

### Scenario D: After running for a while, stops working

**Cause:** Session expired (24-hour limit)

**Fix:**
```
Click "Logout" → Login again
```

To extend session, edit:
`src/routes/api/admin/auth/login/+server.ts`

Change:
```typescript
maxAge: 60 * 60 * 24  // 24 hours
```

To:
```typescript
maxAge: 60 * 60 * 24 * 7  // 7 days
```

---

## Still Not Working?

### Collect This Info:

1. **Browser Console Errors**
   - F12 → Console → Copy any red errors

2. **Network Request Details**
   - F12 → Network → `/api/admin/themes`
   - Status code: ?
   - Response: ?

3. **Terminal Output**
   - What does `npm run dev` terminal show?
   - Any errors?

4. **Database Test**
   ```bash
   node check-db-schema.js
   ```
   - Copy the output

5. **Environment**
   - Are credentials set in `.env`?
   - Did you restart server after changing `.env`?

---

## Emergency Reset

If nothing works, try this:

```bash
# 1. Stop server
Ctrl+C

# 2. Clear browser data
# - Open incognito/private window
# - Or clear cookies for localhost

# 3. Verify .env
cat .env  # or type .env on Windows

# Should have:
# MYSQL_HOST=...
# MYSQL_USER=...
# MYSQL_PASSWORD=...
# MYSQL_DATABASE=...
# ADMIN_USERNAME=...
# ADMIN_PASSWORD=...

# 4. Test database
node check-db-schema.js

# 5. Start fresh
npm run dev

# 6. Login
http://localhost:5173/admin/login
```

---

## Prevention

### To avoid this issue:

1. **Don't let session expire**
   - Login regularly
   - Or extend session time (see Scenario D)

2. **Keep dev server running**
   - Don't close terminal
   - If closed, restart: `npm run dev`

3. **Monitor console**
   - Keep F12 open while developing
   - Watch for errors

4. **Test regularly**
   - Run `node check-db-schema.js` if suspicious
   - Verify database connection

---

## Quick Reference Commands

```bash
# Test database
node check-db-schema.js

# Test connection
node test-db-connection.js

# Start server
npm run dev

# Check for errors
npm run check
```

---

**Most Common Fix:** Just logout and login again! 90% of the time, it's an expired or missing session cookie.
