import { PrismaClient } from '../generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

/**
 * Initializes the Prisma Client for the Cloudflare Worker environment.
 * Updated to be compatible with Supabase's Transaction Pooler (Port 6543).
 */
export const getPrisma = async (databaseUrl: string) => {
  const client = new pg.Client({ 
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  await client.connect();
  
  const adapter = new PrismaPg(client);
  return new PrismaClient({ adapter });
};
