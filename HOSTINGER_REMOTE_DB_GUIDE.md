# 🌐 Hostinger Remote Database Setup Guide

Complete guide for connecting your SvelteKit app to Hostinger's remote MySQL database.

---

## 📋 Prerequisites

- Hostinger hosting account with MySQL database
- Access to Hostinger control panel
- Your database credentials from Hostinger

---

## ✅ Step 1: Get Your Hostinger Database Credentials

1. Login to your **Hostinger Control Panel** (hPanel)
2. Navigate to: **Websites → Manage → Databases**
3. Find your MySQL database or create a new one
4. Click **"Manage"** next to your database
5. Note down these credentials:

```
Database Host: mysql.hostingersite.com (or srv123.hostinger.com)
Database Name: u123456789_dbname
Database User: u123456789_user
Password: your_password
Port: 3306 (default)
```

**Screenshot location in Hostinger:**
- Go to: `Websites → [Your Website] → Advanced → Databases → Manage`
- Look for "Remote MySQL" section for the host address

---

## ✅ Step 2: Enable Remote MySQL Access (Important!)

Hostinger requires you to whitelist IPs for remote access:

1. In Hostinger panel, go to **Databases → Remote MySQL**
2. Add your IP address or use `%` for all IPs (less secure)
3. Click **Add**

**For development:** Add your current IP address
**For production:** Add your deployment server's IP (Vercel, Netlify, etc.)

---

## ✅ Step 3: Configure Your .env File

Create or update your `.env` file in the project root:

```env
# Hostinger Remote MySQL Configuration
MYSQL_HOST=mysql.hostingersite.com
MYSQL_USER=u123456789_user
MYSQL_PASSWORD=your_actual_password
MYSQL_DATABASE=u123456789_dbname
MYSQL_PORT=3306

# Optional: If using Supabase
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: If using Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
PUBLIC_STRIPE_KEY=your_public_stripe_key

# Application URL
PUBLIC_WEBSITE_URL=http://localhost:5173
```

**⚠️ Important:** 
- Replace all `u123456789_*` values with your actual Hostinger credentials
- Never commit `.env` file to Git (it's already in `.gitignore`)
- Use the exact host address from Hostinger (might be `srv###.hostinger.com`)

---

## ✅ Step 4: Create the Themes Table

### Option A: Using phpMyAdmin (Easiest)

1. Login to Hostinger Panel
2. Go to **Databases → phpMyAdmin**
3. Select your database from the left sidebar
4. Click **"SQL"** tab at the top
5. Open the `HOSTINGER_SETUP.sql` file from your project
6. Copy all SQL content and paste it into phpMyAdmin
7. Click **"Go"** to execute

### Option B: Using MySQL Command Line

From your local machine (if you have MySQL installed):

```bash
mysql -h mysql.hostingersite.com -u u123456789_user -p u123456789_dbname < HOSTINGER_SETUP.sql
```

Enter your password when prompted.

---

## ✅ Step 5: Verify Database Setup

In phpMyAdmin or MySQL client, run:

```sql
USE u123456789_dbname;
SHOW TABLES;
SELECT COUNT(*) FROM themes;
```

**Expected output:**
- Table `themes` exists
- 10 sample themes inserted

---

## ✅ Step 6: Update Database Connection (If Needed)

If Hostinger uses a non-standard port, update `src/lib/server/db.ts`:

```typescript
const dbConfig = {
  host: env.MYSQL_HOST || 'localhost',
  user: env.MYSQL_USER || 'root',
  password: env.MYSQL_PASSWORD || '',
  database: env.MYSQL_DATABASE || 'craftuary_db',
  port: parseInt(env.MYSQL_PORT || '3306'), // Add this line
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}
```

---

## ✅ Step 7: Test the Connection

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Check terminal output:**
   - ✅ No MySQL connection errors
   - ❌ If you see "Using mock data" → connection failed

3. **Visit your themes page:**
   ```
   http://localhost:5173/themes
   ```

4. **You should see 10 themes** loaded from the database

---

## 🔍 Troubleshooting

### Error: "Can't connect to MySQL server"

**Solutions:**
1. **Check Remote MySQL is enabled:**
   - Hostinger Panel → Databases → Remote MySQL
   - Add your current IP address

2. **Verify credentials in .env:**
   - Double-check host, user, password, database name
   - Ensure no extra spaces or quotes

3. **Test connection manually:**
   ```bash
   mysql -h mysql.hostingersite.com -u u123456789_user -p
   ```

### Error: "Access denied for user"

**Solutions:**
- Verify username and password are correct
- Check that the user has privileges on the database
- In phpMyAdmin, go to User Accounts and verify permissions

### Error: "Unknown database"

**Solutions:**
- Verify the database name in .env matches exactly
- Create the database in Hostinger panel if it doesn't exist
- Run `SHOW DATABASES;` in phpMyAdmin to see available databases

### Still seeing mock data

**Solutions:**
1. Check server terminal for specific error messages
2. Verify `.env` file exists (not `.env.example`)
3. Restart dev server after changing `.env`
4. Enable remote access for your IP in Hostinger
5. Check database has data:
   ```sql
   SELECT * FROM themes LIMIT 1;
   ```

---

## 🚀 Production Deployment (Vercel)

When deploying to Vercel:

1. **Add environment variables in Vercel dashboard:**
   - Go to: Project Settings → Environment Variables
   - Add all MYSQL_* variables from your `.env`

2. **Enable Remote MySQL for Vercel IPs:**
   - In Hostinger, add Vercel's IP ranges
   - Or use `%` for all IPs (less secure but works)

3. **Redeploy your application**

---

## 🔐 Security Best Practices

1. **Never expose .env file** - Already in `.gitignore`
2. **Use strong database passwords**
3. **Limit Remote MySQL access** to specific IPs when possible
4. **Use environment variables** for all sensitive data
5. **Rotate passwords regularly**

---

## 📊 Database Schema Reference

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

---

## ✨ Next Steps

After successful setup:

- ✅ Themes load from Hostinger database
- ✅ Add/edit themes via phpMyAdmin
- ✅ Filters and search work with real data
- ✅ Ready for production deployment

---

## 🆘 Need Help?

1. Check Hostinger documentation on Remote MySQL
2. Verify all credentials match exactly
3. Test database connection with MySQL Workbench
4. Check application logs for specific errors

**Quick test command:**
```bash
# Test if database is accessible
mysql -h YOUR_HOST -u YOUR_USER -p -e "SELECT COUNT(*) FROM themes;" YOUR_DATABASE
```

---

## 📝 Checklist

- [ ] Got database credentials from Hostinger
- [ ] Enabled Remote MySQL access for my IP
- [ ] Created/updated .env file with correct values
- [ ] Ran HOSTINGER_SETUP.sql in phpMyAdmin
- [ ] Verified themes table exists and has data
- [ ] Restarted dev server
- [ ] Tested /themes page - seeing real data

---

**All set? Your application should now be connected to Hostinger's remote MySQL database! 🎉**
