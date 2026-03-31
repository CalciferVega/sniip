<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import MobileMenu from '$lib/components/MobileMenu.svelte';
  import MobileHeader from '$lib/components/MobileHeader.svelte';
  import { authStore } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';

  let { children } = $props();
  let isMobileNavOpen = $state(false);

  $effect(() => {
    if (!$authStore.loading && !$authStore.user) {
      goto('/signup');
    }
  });
</script>

{#if $authStore.loading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
{:else if $authStore.user}
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300 relative overflow-x-hidden">
    <Sidebar />
    <MobileHeader />
    
    <!-- Mobile Menu Component -->
    <MobileMenu isOpen={isMobileNavOpen} onClose={() => isMobileNavOpen = false} />

    <!-- Mobile Nav Trigger (Floating Button) -->
    <button 
      onclick={() => isMobileNavOpen = !isMobileNavOpen}
      class="lg:hidden fixed bottom-6 right-6 z-[80] w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center transition-all active:scale-90 hover:scale-110 group cursor-pointer"
      aria-label="Toggle menu"
    >
      <div class="relative w-5 h-5">
        <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 {isMobileNavOpen ? 'rotate-180 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
        <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 {!isMobileNavOpen ? '-rotate-180 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </button>

    <main class="flex-1 ml-0 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 transition-all duration-500 {isMobileNavOpen ? 'blur-xl scale-[0.96] opacity-50 pointer-events-none' : 'blur-0 scale-100 opacity-100'}">
      <div class="max-w-7xl mx-auto">
        {@render children()}
      </div>
    </main>
  </div>
{/if}
