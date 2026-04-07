import prisma from './utils/prisma.js';

async function debug() {
  console.log('--- Database Debug (Deep) ---');
  try {
    // 1. Check Plans
    const plans = await prisma.plan.findMany();
    console.log('Plans found:', plans.length);
    const freePlan = plans.find(p => p.tierName === 'FREE');
    
    if (!freePlan) {
      console.error('ERROR: FREE plan not found!');
      return;
    }
    console.log('FREE plan ID:', freePlan.id);

    // 2. Test User Upsert (Simulate Auth Middleware)
    console.log('Testing User Upsert...');
    const testUid = 'debug-user-' + Date.now();
    const testEmail = 'debug@example.com';

    const dbUser = await prisma.user.upsert({
      where: { id: testUid },
      update: { email: testEmail },
      create: {
        id: testUid,
        email: testEmail,
        role: 'USER',
        plan: 'free',
        planTier: {
          connect: { id: freePlan.id }
        }
      }
    });

    console.log('Upsert Successful! User ID:', dbUser.id);
    console.log('User Plan (String):', dbUser.plan);

    // 3. Clean up
    await prisma.user.delete({ where: { id: testUid } });
    console.log('Cleanup Successful.');
    
    console.log('--- End Debug ---');
  } catch (err: any) {
    console.error('DATABASE ERROR:', err.message);
    if (err.code) console.error('Error Code:', err.code);
  } finally {
    await prisma.$disconnect();
  }
}

debug();
