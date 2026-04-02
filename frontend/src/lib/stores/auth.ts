import { writable } from 'svelte/store';
import { onAuthStateChanged, type User, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
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
 * Sign up with email and password
 */
export const signupWithEmail = async (email: string, pass: string, name: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(result.user, { displayName: name });
    return result.user;
  } catch (error: any) {
    let errorMessage = 'Failed to create account. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    authStore.update((s) => ({ ...s, loading: false, error: errorMessage }));
    throw error;
  }
};

/**
 * Login with email and password
 */
export const loginWithEmail = async (email: string, pass: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error: any) {
    let errorMessage = 'Invalid email or password.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later.';
    }
    authStore.update((s) => ({ ...s, loading: false, error: errorMessage }));
    throw error;
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  authStore.update((s) => ({ ...s, loading: true, error: null }));
  try {
    await sendPasswordResetEmail(auth, email);
    authStore.update((s) => ({ ...s, loading: false, error: null }));
  } catch (error: any) {
    let errorMessage = 'Failed to send reset email. Please try again.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
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
