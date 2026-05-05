import { Pool } from 'pg';

// Connection pool — reused across requests in dev and production.
// Set DATABASE_URL in .env.local:
//   postgresql://YOURUSER:YOURPASS@localhost:5432/moreyeahs
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
});

export default pool;

// Convenience wrapper
export async function query<T = unknown>(
  text: string,
  values?: unknown[],
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, values);
    return res.rows as T[];
  } finally {
    client.release();
  }
}
