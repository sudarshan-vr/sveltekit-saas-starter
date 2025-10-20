// Quick database connection test
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

console.log('Testing connection with:');
console.log('Host:', dbConfig.host);
console.log('Port:', dbConfig.port);
console.log('User:', dbConfig.user);
console.log('Database:', dbConfig.database);
console.log('Password:', dbConfig.password ? '***' + dbConfig.password.slice(-3) : 'NOT SET');
console.log('\nConnecting...\n');

try {
  const connection = await mysql.createConnection(dbConfig);
  console.log('✅ Connected successfully!');
  
  const [tables] = await connection.query('SHOW TABLES');
  console.log('\n📊 Tables in database:');
  console.log(tables);
  
  const [themes] = await connection.query('SELECT COUNT(*) as count FROM themes');
  console.log('\n🎨 Number of themes:', themes[0].count);
  
  await connection.end();
  console.log('\n✅ Test completed successfully!');
} catch (error) {
  console.error('\n❌ Connection failed!');
  console.error('Error:', error.message);
  console.error('\nCommon issues:');
  console.error('1. Remote MySQL not enabled in Hostinger panel');
  console.error('2. Your IP not whitelisted in Hostinger');
  console.error('3. Incorrect credentials');
  console.error('4. Database or table does not exist');
  process.exit(1);
}
