import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Routes
import redirection from './routes/redirection';
import links from './routes/links';
import qrcodes from './routes/qrcodes';
import analytics from './routes/analytics';
import dashboard from './routes/dashboard';

// Middleware
import { supabaseAuth } from './middleware/auth';

type Bindings = {
  DATABASE_URL: string;
  SUPABASE_URL: string;
  VITE_SUPABASE_URL?: string;
};

type Variables = {
  user: any;
};

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// Global Middlewares
app.use('*', logger());
app.use('/api/*', cors());

// Redirection (Public, no auth)
app.route('/', redirection);

// API Routes (Protected)
app.use('/api/*', (c, next) => supabaseAuth()(c, next));

app.route('/api/links', links);
app.route('/api/qrcodes', qrcodes);
app.route('/api/analytics', analytics);
app.route('/api/dashboard', dashboard);

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', runtime: 'cloudflare-workers' });
});

export default app;
