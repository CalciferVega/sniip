import 'dotenv/config';
import Fastify from 'fastify';
import redirectionRoutes from './routes/redirection.js';
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
// Register routes
// The redirection route handles GET /:slug
fastify.register(redirectionRoutes);
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        fastify.log.info(`Server listening on http://localhost:${PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
