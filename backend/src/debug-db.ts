import prisma from './utils/prisma.js';

async function debug() {
  console.log('--- Database Debug ---');
  try {
    const plansCount = await prisma.plan.count();
    console.log('Plans in DB:', plansCount);

    if (plansCount > 0) {
      const plans = await prisma.plan.findMany();
      console.log('Available Plans:', plans.map(p => p.tierName));
    }

    const usersCount = await prisma.user.count();
    console.log('Users in DB:', usersCount);

    if (usersCount > 0) {
      const users = await prisma.user.findMany({ take: 5 });
      console.log('First 5 Users:', users.map(u => ({ id: u.id, email: u.email })));
    }
    
    console.log('--- End Debug ---');
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

debug();
