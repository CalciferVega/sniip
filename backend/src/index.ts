import { config } from 'dotenv';
config({ override: true });
import Fastify from 'fastify';
import cors from '@fastify/cors';
import authMiddleware from './middlewares/authMiddleware.js';
import redirectionRoutes from './routes/redirection.js';
import linksRoutes from './routes/links.js';
import analyticsRoutes from './routes/analytics.js';
import dashboardRoutes from './routes/dashboard.js';
import qrCodeRoutes from './routes/qrcodes.js';
import domainRoutes from './routes/domains.js';

const fastify = Fastify({
  logger: true,
  // We enable trustProxy if we're behind a load balancer (common for enterprise)
  // to get the real client IP.
  trustProxy: true,
});

// Register CORS to allow requests from the frontend
await fastify.register(cors, {
  origin: true // In production, replace with your specific domain
});

const PORT = Number(process.env.PORT) || 3000;

// Health check endpoint
fastify.get('/health', async (_request, _reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// 1. Register public routes (e.g., redirection)
// The redirection route handles GET /:slug
fastify.register(redirectionRoutes);

// 2. Register protected API routes
// We use a scoped registration to apply authMiddleware only to /api/* routes
fastify.register(async (apiInstance) => {
  // Apply Firebase Auth validation to all routes in this scope
  apiInstance.register(authMiddleware);
  
  // Register link management routes under /api/links
  apiInstance.register(linksRoutes, { prefix: '/links' });

  // Register analytics routes under /api/analytics
  apiInstance.register(analyticsRoutes, { prefix: '/analytics' });

  // Register dashboard routes under /api/dashboard
  apiInstance.register(dashboardRoutes, { prefix: '/dashboard' });
  
  // Register QR code management routes under /api/qrcodes
  apiInstance.register(qrCodeRoutes, { prefix: '/qrcodes' });

  // Register domain management routes under /api/domains
  apiInstance.register(domainRoutes, { prefix: '/domains' });
  
  // Note: Future epics like QR Codes or Settings would also go here
}, { prefix: '/api' });

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Server listening on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
