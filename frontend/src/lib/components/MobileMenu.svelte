<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { authStore, logout } from '$lib/stores/auth.js';
  import { usageStore } from '$lib/stores/usage.svelte.js';
  import UsageLimit from './UsageLimit.svelte';
  import { page } from '$app/state';
  import { House, Link, QrCode, BarChart3, Settings, LogOut } from 'lucide-svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: House },
    { name: 'Links', href: '/links', icon: Link },
    { name: 'QR Codes', href: '/qrcodes', icon: QrCode },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  function isActive(href: string) {
    if (href === '/dashboard') return page.url.pathname === '/dashboard';
    return page.url.pathname.startsWith(href);
  }

  // Fetch usage when menu opens if not already loaded
  $effect(() => {
    if (isOpen && $authStore.user && !usageStore.usage && !usageStore.loading && !usageStore.error) {
      usageStore.fetchUsage();
    }
  });
</script>

{#if isOpen}
  <!-- Glass Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 z-[60] bg-white/10 dark:bg-black/20 backdrop-blur-xl transition-all duration-500"
    transition:fade={{ duration: 400 }}
    onclick={onClose}
  ></div>

  <!-- Mobile Menu Content -->
  <div 
    class="fixed bottom-0 left-0 right-0 z-[70] p-6 pb-24 md:p-8"
    transition:fly={{ y: 200, duration: 600, easing: quintOut }}
  >
    <div class="max-w-md mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl rounded-[3rem] border border-white/30 dark:border-white/10 shadow-2xl overflow-hidden p-6 space-y-6">
      
      {#if $authStore.user}
        <div class="px-2">
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
        </div>
      {/if}

      <!-- Navigation Grid -->
      <div class="grid grid-cols-3 gap-4">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={onClose}
            class="flex flex-col items-center justify-center p-4 rounded-[2rem] transition-all active:scale-90 {isActive(item.href) ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'}"
          >
            <item.icon class="w-7 h-7 mb-2" strokeWidth={2.5} />
            <span class="text-[9px] font-black uppercase tracking-widest">{item.name}</span>
          </a>
        {/each}
        
        <button
          onclick={() => { logout(); onClose(); }}
          class="flex flex-col items-center justify-center p-4 rounded-[2rem] text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all active:scale-90 cursor-pointer"
        >
          <LogOut class="w-7 h-7 mb-2" strokeWidth={2.5} />
          <span class="text-[9px] font-black uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </div>
  </div>
{/if}
