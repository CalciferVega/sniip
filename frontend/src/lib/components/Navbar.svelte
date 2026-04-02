<script lang="ts">
  import { authStore } from '../stores/auth';
  import { darkMode } from '../stores/darkMode.svelte';
  import { page } from '$app/stores';
  import { Sun, Moon, Link } from 'lucide-svelte';

  const isDashboard = $derived($page.url.pathname.startsWith('/dashboard') || 
                                $page.url.pathname.startsWith('/links') || 
                                $page.url.pathname.startsWith('/qrcodes') || 
                                $page.url.pathname.startsWith('/analytics') || 
                                $page.url.pathname.startsWith('/settings'));
</script>

<nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Link class="w-5 h-5 text-white" strokeWidth={3} />
        </div>
        <span class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Sniip</span>
      </a>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#product" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Product</a>
        <a href="#solutions" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Solutions</a>
        <a href="#customers" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Customers</a>
        <a href="#pricing" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
      </div>

      <!-- Auth Buttons & Toggle -->
      <div class="flex items-center gap-4">
        {#if isDashboard}
          <button 
            onclick={() => darkMode.toggle()}
            class="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-gray-200 dark:border-gray-700 shadow-sm"
            aria-label="Toggle dark mode"
          >
            {#if darkMode.isDark}
              <Sun size={18} />
            {:else}
              <Moon size={18} />
            {/if}
          </button>
        {/if}

        {#if $authStore.user}
          <a href="/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20">
            Dashboard
          </a>
        {:else}
          <a href="/login" class="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2">
            Log in
          </a>
          <a href="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md">
            Sign up free
          </a>
        {/if}
      </div>
    </div>
  </div>
</nav>
