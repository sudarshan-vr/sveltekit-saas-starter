// Check if database has the new columns
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

console.log('🔍 Checking database schema...\n');

async function checkSchema() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');
    
    // Check if themes table exists
    console.log('1️⃣  Checking themes table...');
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'themes'"
    );
    
    if (tables.length === 0) {
      console.log('❌ Themes table does NOT exist!');
      console.log('\n📝 You need to run DATABASE_SCHEMA.sql first\n');
      return;
    }
    
    console.log('✅ Themes table exists\n');
    
    // Check table structure
    console.log('2️⃣  Checking table columns...');
    const [columns] = await connection.query('DESCRIBE themes');
    
    const columnNames = columns.map(col => col.Field);
    
    // Required columns for admin system
    const requiredColumns = [
      'id',
      'name',
      'description',
      'category',
      'technology',
      'thumbnail',
      'preview_url',
      'download_url',
      'deploy_url',
      'is_free',
      'price',
      'downloads',
      'views',
      'stock_quantity',
      'featured',
      'status',
      'created_at'
    ];
    
    console.log('\nCurrent columns:', columnNames.join(', '));
    
    const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
    
    if (missingColumns.length > 0) {
      console.log('\n❌ MISSING COLUMNS:', missingColumns.join(', '));
      console.log('\n📝 You need to run DATABASE_SCHEMA_ADMIN.sql!');
      console.log('\nSteps:');
      console.log('1. Open Hostinger phpMyAdmin');
      console.log('2. Select database: u190097430_fapp');
      console.log('3. Click "SQL" tab');
      console.log('4. Copy contents from DATABASE_SCHEMA_ADMIN.sql');
      console.log('5. Paste and click "Go"');
    } else {
      console.log('\n✅ All required columns present!\n');
      
      // Count themes
      const [count] = await connection.query('SELECT COUNT(*) as count FROM themes');
      console.log('3️⃣  Theme count:', count[0].count);
      
      // Sample theme
      const [themes] = await connection.query('SELECT * FROM themes LIMIT 1');
      if (themes.length > 0) {
        console.log('\n4️⃣  Sample theme:');
        console.log(JSON.stringify(themes[0], null, 2));
      }
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n📝 Check your .env credentials');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n📝 Check MYSQL_HOST in .env');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkSchema();
