<script lang="ts">
  import { authStore } from '$lib/stores/auth.js';
  import { Link } from 'lucide-svelte';
</script>

<header class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 z-40 flex items-center justify-between px-6 transition-colors duration-300">
  <!-- Logo -->
  <a href="/dashboard" class="flex items-center gap-2">
    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
      <Link class="w-5 h-5 text-white" strokeWidth={3} />
    </div>
    <span class="text-xl font-black text-gray-900 dark:text-white tracking-tight">Sniip</span>
  </a>

  <!-- User Avatar -->
  {#if $authStore.user}
    <div class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-sm border border-blue-200/50 dark:border-blue-800/30">
      {$authStore.user.email?.[0].toUpperCase() || 'U'}
    </div>
  {/if}
</header>
