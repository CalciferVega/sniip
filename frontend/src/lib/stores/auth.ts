import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const authStore = writable<AuthState>({
  user: null,
  loading: true,
  error: null,
});

/**
 * Initialize auth listener
 */
export const initAuth = async () => {
  // Get initial session
  const { data: { session } } = await supabase.auth.getSession();
  authStore.update((s) => ({ ...s, user: session?.user ?? null, loading: false }));

  // Listen for changes
  supabase.auth.onAuthStateChange((_event, session) => {
    authStore.update((s) => ({ ...s, user: session?.user ?? null, loading: false }));
  });
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
    if (error) throw error;
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Sign up with email and password
 */
export const signupWithEmail = async (email: string, pass: string, name: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;
    return data.user;
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Login with email and password
 */
export const loginWithEmail = async (email: string, pass: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data.user;
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/settings',
    });
    if (error) throw error;
    authStore.update((s) => ({ ...s, loading: false, error: null }));
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Update user password
 */
export const updatePassword = async (newPass: string, _currentPass: string) => {
  // Supabase usually handles re-auth via flow or just allows update if session is fresh.
  // For simplicity, we update directly.
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPass
    });
    if (error) throw error;
    authStore.update((s) => ({ ...s, loading: false, error: null }));
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Resend verification email
 */
export const resendVerification = async (email: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard',
      },
    });
    if (error) throw error;
    authStore.update((s) => ({ ...s, loading: false, error: null }));
  } catch (error: any) {
    authStore.update((s) => ({ ...s, loading: false, error: error.message }));
    throw error;
  }
};

/**
 * Sign out
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Logout error:', error);
  }
};
