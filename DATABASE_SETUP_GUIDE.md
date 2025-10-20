# 🗄️ Database Setup Guide

## Quick Fix for "Unable to get themes from database"

### ✅ Step-by-Step Solution

#### 1. **Install MySQL** (if not already installed)

**Windows:**
- Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- Or use [XAMPP](https://www.apachefriends.org/) (includes MySQL)
- Or use [Docker](https://hub.docker.com/_/mysql): `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest`

#### 2. **Configure Environment Variables**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` file with your MySQL credentials:
```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_actual_password
MYSQL_DATABASE=craftuary_db
```

#### 3. **Create Database and Tables**

**Option A: Using PowerShell Script (Recommended)**
```powershell
.\setup-db.ps1
```

**Option B: Manual Setup**
```bash
# Connect to MySQL
mysql -u root -p

# Run the schema file
source DATABASE_SCHEMA.sql

# Or in one command:
mysql -u root -p < DATABASE_SCHEMA.sql
```

**Option C: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Open `DATABASE_SCHEMA.sql`
4. Execute the script

#### 4. **Verify Database Setup**

Connect to MySQL and check:
```sql
USE craftuary_db;
SHOW TABLES;
SELECT COUNT(*) FROM themes;
```

You should see:
- `themes` table exists
- 9 sample themes inserted

#### 5. **Start Your Application**

```bash
npm run dev
```

Visit: http://localhost:5173/themes

---

## 🔍 Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"

**Solution:** 
- Verify your MySQL password in `.env`
- Reset MySQL root password if needed

### Issue: "Can't connect to MySQL server"

**Solution:**
- Check if MySQL is running: `mysql --version`
- Windows: Check Services → MySQL is started
- Docker: `docker ps` to verify container is running

### Issue: "Database 'craftuary_db' doesn't exist"

**Solution:**
- Run `DATABASE_SCHEMA.sql` which creates the database
- Or manually: `CREATE DATABASE craftuary_db;`

### Issue: "Still seeing mock data"

**Solutions:**
1. Check terminal/console for error messages
2. Verify `.env` file exists (not just `.env.example`)
3. Restart dev server after updating `.env`
4. Check database connection:
   ```bash
   mysql -u root -p -e "SELECT COUNT(*) FROM craftuary_db.themes;"
   ```

---

## 🌐 Alternative: Use Cloud Database

If you don't want to run MySQL locally:

### PlanetScale (Free Tier)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection string
4. Update `.env`:
   ```env
   MYSQL_HOST=your-db.planetscale.com
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=your_database
   ```

### Railway
1. Sign up at [railway.app](https://railway.app)
2. Create MySQL database
3. Copy credentials to `.env`

---

## 📊 Current Database Schema

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

## ✨ What Happens After Setup

Once configured correctly:
- ✅ Themes load from MySQL database
- ✅ Filters work (technology, category, search)
- ✅ Real-time data (no mock data)
- ✅ Can add/edit themes in database

---

## 🆘 Still Having Issues?

1. Check the terminal output when starting dev server
2. Look for MySQL connection errors
3. Verify all environment variables are set
4. Ensure MySQL is running and accessible
5. Try connecting with MySQL Workbench to verify credentials

**Need more help?** See `THEMES_SETUP.md` for detailed documentation.
