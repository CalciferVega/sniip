import 'dotenv/config';
import Fastify from 'fastify';
import authMiddleware from './middleware/auth.js';
import redirectionRoutes from './routes/redirection.js';
import linksRoutes from './routes/links.js';

const fastify = Fastify({
  logger: true,
  // We enable trustProxy if we're behind a load balancer (common for enterprise)
  // to get the real client IP.
  trustProxy: true,
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
