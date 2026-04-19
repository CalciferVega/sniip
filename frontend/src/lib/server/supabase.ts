import { createClient } from '@supabase/supabase-js';

// 1. Las variables públicas (URL y Anon Key) vienen de $env/static/public
import { 
  PUBLIC_SUPABASE_URL, 
  PUBLIC_SUPABASE_ANON_KEY 
} from '$env/static/public';

// 2. Las variables secretas (Service Role) vienen de $env/static/private
// SvelteKit garantiza que estas NUNCA se filtrarán al navegador
import { 
  SUPABASE_SERVICE_ROLE_KEY 
} from '$env/static/private';

export const createServerClient = (accessToken?: string) => {
  // Si nos pasan un accessToken (del usuario), usamos la Anon Key para respetar las reglas RLS de la base de datos.
  // Si no hay token, usamos el Service Key (con poderes de administrador).
  const keyToUse = accessToken ? PUBLIC_SUPABASE_ANON_KEY : SUPABASE_SERVICE_ROLE_KEY;

  return createClient(
    PUBLIC_SUPABASE_URL,
    keyToUse,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        // Si hay token del usuario, lo inyectamos para que actúe en su nombre
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      },
    }
  );
};