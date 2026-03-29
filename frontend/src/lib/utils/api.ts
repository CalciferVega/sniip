import { authStore } from '../stores/auth.js';
import { get } from 'svelte/store';

// Default to backend on port 3000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Universal fetch wrapper for authenticated API calls.
 * Automatically injects the Firebase ID Token in the Authorization header.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { user } = get(authStore);

  if (!user) {
    throw new Error('You must be logged in to perform this action.');
  }

  // Ensure the token is fresh (Firebase SDK handles caching/refreshing)
  const idToken = await user.getIdToken();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      ...options.headers,
    },
  };

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
