<script lang="ts">
  import { loginWithEmail, authStore } from '../stores/auth.js';
  import { goto } from '$app/navigation';
  import { Loader2 } from 'lucide-svelte';

  let email = $state('');
  let password = $state('');

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      goto('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  }
</script>

<form onsubmit={handleLogin} class="space-y-4 w-full">
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      placeholder="you@company.com"
      class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    />
  </div>

  <div>
    <div class="flex items-center justify-between mb-1">
      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
      <a href="/forgot-password" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium">Forgot password?</a>
    </div>
    <input
      type="password"
      id="password"
      bind:value={password}
      required
      placeholder="••••••••"
      class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    />
  </div>

  <button
    type="submit"
    disabled={$authStore.loading}
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {#if $authStore.loading}
      <Loader2 class="w-5 h-5 animate-spin" />
      Logging in...
    {:else}
      Sign In
    {/if}
  </button>

  {#if $authStore.error}
    <p class="text-sm text-red-600 text-center font-medium">{$authStore.error}</p>
  {/if}
</form>
