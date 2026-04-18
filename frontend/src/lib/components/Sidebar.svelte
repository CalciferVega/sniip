<script lang="ts">
  import { page } from '$app/state';
  import { authStore, logout } from '$lib/stores/auth.js';
  import { usageStore } from '$lib/stores/usage.svelte.js';
  import UsageLimit from './UsageLimit.svelte';
  import { House, Link, QrCode, BarChart3, Settings, LogOut } from 'lucide-svelte';

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: House },
    { name: 'Links', href: '/links', icon: Link },
    { name: 'QR Codes', href: '/qrcodes', icon: QrCode },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  function isActive(href: string) {
    if (href === '/dashboard') {
      return page.url.pathname === '/dashboard';
    }
    return page.url.pathname.startsWith(href);
  }

  // Fetch usage when user state changes
  $effect(() => {
    if ($authStore.user && !usageStore.usage && !usageStore.loading && !usageStore.error) {
      usageStore.fetchUsage();
    }
  });
</script>

<aside class="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed left-0 top-0 transition-colors duration-300">
  <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800 px-4">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
        <Link class="w-5 h-5 text-white" strokeWidth={3} />
      </div>
      <span class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Sniip</span>
    </div>
  </div>

  <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
    {#each navItems as item}
      <a
        href={item.href}
        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors {isActive(item.href) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}"
      >
        <item.icon
          class="w-5 h-5 mr-3 {isActive(item.href) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}"
        />
        {item.name}
      </a>
    {/each}
  </nav>

  <div class="p-4 border-t border-gray-200 dark:border-gray-800">
    {#if $authStore.user}
      {#if usageStore.usage}
        <UsageLimit 
          used={usageStore.usage.used} 
          total={usageStore.usage.total} 
          plan={usageStore.usage.plan} 
          resetDate={usageStore.usage.resetDate}
        />
      {:else if usageStore.loading}
        <div class="animate-pulse space-y-3 px-1">
          <div class="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
          <div class="space-y-2">
            <div class="flex justify-between h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            <div class="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      {/if}
      <div class="flex items-center mt-6 mb-4">
        <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold mr-3">
          {$authStore.user.email?.[0].toUpperCase() || 'U'}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-gray-900 dark:text-gray-200 truncate">
            {$authStore.user.email}
          </p>
        </div>
      </div>
    {/if}
    <button
      onclick={logout}
      class="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
    >
      <LogOut class="w-5 h-5 mr-3" />
      Logout
    </button>
  </div>
</aside>
