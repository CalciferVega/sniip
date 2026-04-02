<script lang="ts">
  import { resetPassword, authStore } from '$lib/stores/auth';
  import { toast } from '$lib/stores/toast.svelte';
  import { fade } from 'svelte/transition';
  import { Check, Loader2 } from 'lucide-svelte';

  let email = $state('');
  let success = $state(false);
  let hasError = $derived(!!$authStore.error);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    try {
      await resetPassword(email);
      success = true;
      toast.success('Reset link sent successfully!');
    } catch (err: any) {
      console.error('Reset password failed', err);
      toast.warning($authStore.error || 'Could not find an account with that email.');
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-md w-full space-y-8 flex flex-col items-center">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
        Reset your password
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    <div class="w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      {#if success}
        <div in:fade class="text-center space-y-4">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
            <Check class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Check your email</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            We've sent a password reset link to <span class="font-semibold text-gray-900 dark:text-white">{email}</span>.
          </p>
          <div class="pt-4">
            <a
              href="/login"
              class="w-full inline-flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Back to login
            </a>
          </div>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              placeholder="you@company.com"
              class="w-full px-4 py-2.5 border rounded-lg outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white {hasError ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}"
            />
            {#if hasError}
              <p class="mt-1.5 text-xs text-red-600 font-medium">{$authStore.error}</p>
            {/if}
          </div>

          <button
            type="submit"
            disabled={$authStore.loading}
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {#if $authStore.loading}
              <Loader2 class="w-5 h-5 animate-spin" />
              Sending link...
            {:else}
              Send reset link
            {/if}
          </button>
        </form>
      {/if}
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Remembered your password? 
        <a href="/login" class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          Sign in
        </a>
      </p>
    </div>
  </div>
</div>
