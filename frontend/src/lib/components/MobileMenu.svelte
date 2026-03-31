<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { authStore, logout } from '$lib/stores/auth.js';
  import { page } from '$app/state';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Links', href: '/links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { name: 'QR Codes', href: '/qrcodes', icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z' },
    { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Settings', href: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  function isActive(href: string) {
    if (href === '/dashboard') return page.url.pathname === '/dashboard';
    return page.url.pathname.startsWith(href);
  }
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
    <div class="max-w-md mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl rounded-[3rem] border border-white/30 dark:border-white/10 shadow-2xl overflow-hidden p-6 space-y-4">
      
      <!-- Navigation Grid -->
      <div class="grid grid-cols-3 gap-4">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={onClose}
            class="flex flex-col items-center justify-center p-4 rounded-[2rem] transition-all active:scale-90 {isActive(item.href) ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'}"
          >
            <svg class="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={item.icon}></path>
            </svg>
            <span class="text-[9px] font-black uppercase tracking-widest">{item.name}</span>
          </a>
        {/each}
        
        <button
          onclick={() => { logout(); onClose(); }}
          class="flex flex-col items-center justify-center p-4 rounded-[2rem] text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all active:scale-90 cursor-pointer"
        >
          <svg class="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span class="text-[9px] font-black uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </div>
  </div>
{/if}
