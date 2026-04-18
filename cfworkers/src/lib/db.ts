import postgres from 'postgres';

/**
 * Direct Postgres connection using the 'postgres' (postgres.js) library.
 * Highly compatible with Cloudflare Workers.
 */
export const getSql = (databaseUrl: string) => {
  return postgres(databaseUrl, {
    ssl: 'require',
    prepare: false, // Important for Supabase Transaction Pooler
  });
};
