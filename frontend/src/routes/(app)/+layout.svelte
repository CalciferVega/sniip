<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { authStore } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';

  let { children } = $props();

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
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar />
    <main class="flex-1 ml-64 p-8">
      {@render children()}
    </main>
  </div>
{/if}
