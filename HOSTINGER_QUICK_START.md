# ⚡ Hostinger Quick Start Guide

## 3-Step Setup for Hostinger Remote Database

### Step 1: Get Hostinger Credentials 📝

Login to Hostinger → **Websites → Databases → Manage**

Copy these values:
- Host: `mysql.hostingersite.com` (or `srv###.hostinger.com`)
- Database Name: `u123456789_dbname`
- Username: `u123456789_user`
- Password: `your_password`

### Step 2: Enable Remote Access 🔓

In Hostinger panel → **Databases → Remote MySQL**

Add your IP address or use `%` for all IPs

### Step 3: Configure .env File ⚙️

Create `.env` file in project root:

```env
MYSQL_HOST=mysql.hostingersite.com
MYSQL_PORT=3306
MYSQL_USER=u123456789_user
MYSQL_PASSWORD=your_actual_password
MYSQL_DATABASE=u123456789_dbname
```

### Step 4: Create Themes Table 🗃️

In Hostinger → **phpMyAdmin → SQL tab**

Copy-paste contents of `HOSTINGER_SETUP.sql` and click **Go**

### Step 5: Test Connection ✅

```bash
npm run dev
```

Visit: `http://localhost:5173/themes`

**Expected:** 10 themes from database (not mock data)

---

## ✅ Verification Checklist

- [ ] Got database credentials from Hostinger
- [ ] Enabled Remote MySQL for my IP
- [ ] Created `.env` with correct values  
- [ ] Ran `HOSTINGER_SETUP.sql` in phpMyAdmin
- [ ] Restarted dev server
- [ ] Seeing real themes (not mock data)

---

## 🚨 Common Issues

### "Can't connect to MySQL server"
→ Enable Remote MySQL access in Hostinger panel

### "Access denied"
→ Double-check username/password in `.env`

### Still seeing mock data
→ Check terminal for error messages
→ Verify `.env` exists (not just `.env.example`)

---

## 📚 Full Documentation

See `HOSTINGER_REMOTE_DB_GUIDE.md` for detailed troubleshooting

---

**Need help? Check your terminal for specific error messages!**
