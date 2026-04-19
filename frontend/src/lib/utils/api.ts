import { supabase } from '../supabase.js';

// Now integrated into SvelteKit routes
const API_BASE_URL = '/api';

/**
 * Universal fetch wrapper for authenticated API calls.
 * Automatically injects the Supabase access token in the Authorization header.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('You must be logged in to perform this action.');
  }

  const token = session.access_token;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  };

  // We use relative path since it's now internal to SvelteKit
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // Handle successful responses that might be empty (e.g., 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
