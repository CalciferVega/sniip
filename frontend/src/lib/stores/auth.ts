import { writable } from 'svelte/store';
import { onAuthStateChanged, type User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.js';

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
export const initAuth = () => {
  onAuthStateChanged(auth, (user) => {
    authStore.update((s) => ({ ...s, user, loading: false }));
  });
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    let errorMessage = 'Authentication was canceled. Please try again.';
    
    if (error.code === 'auth/popup-blocked') {
      errorMessage = 'The login popup was blocked by your browser. Please allow popups for this site.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'A network error occurred. Please check your connection.';
    }

    authStore.update((s) => ({ ...s, loading: false, error: errorMessage }));
    throw error;
  }
};

/**
 * Sign out
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};
