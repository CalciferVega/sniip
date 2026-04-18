import { config } from 'dotenv';
config({ override: true });
import { PrismaClient } from '../src/generated/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding plans...');

  const plans = [
    {
      tierName: 'FREE',
      publicName: 'Free Forever',
      monthlyLinks: 10,
      monthlyQrCodes: 5,
      maxOrganizations: 0,
      price: 0,
    },
    {
      tierName: 'PRO',
      publicName: 'Professional',
      monthlyLinks: 100,
      monthlyQrCodes: 50,
      maxOrganizations: 1,
      price: 19,
    },
    {
      tierName: 'TEAMS',
      publicName: 'Enterprise Teams',
      monthlyLinks: 1000,
      monthlyQrCodes: 500,
      maxOrganizations: 2,
      price: 99,
    },
    {
      tierName: 'ENTERPRISE',
      publicName: 'Enterprise Plus',
      monthlyLinks: 10000,
      monthlyQrCodes: 5000,
      maxOrganizations: 10,
      price: 499,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { tierName: plan.tierName },
      update: plan,
      create: plan,
    });
  }

  console.log('Plans seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
