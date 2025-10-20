import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

// MySQL connection configuration
const dbConfig = {
  host: env.MYSQL_HOST || 'localhost',
  port: Number(env.MYSQL_PORT) || 3306,
  user: env.MYSQL_USER || 'root',
  password: env.MYSQL_PASSWORD || '',
  database: env.MYSQL_DATABASE || 'craftuary',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
let pool: mysql.Pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Helper function to execute queries
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  const connection = await getPool().getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results as T;
  } finally {
    connection.release();
  }
}
