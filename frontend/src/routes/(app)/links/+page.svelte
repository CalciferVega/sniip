<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    Calendar,
    Link2,
    Loader2
  } from 'lucide-svelte';

  import { apiFetch } from '$lib/utils/api.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LinkCard from '$lib/components/LinkCard.svelte';

  // State
  let links = $state<any[]>([]);
  let isLoading = $state(true);
  let isFetching = $state(false);
  let error = $state<string | null>(null);
  let searchQuery = $state('');
  let statusFilter = $state('All Status');

  async function fetchLinks(isInitial = false) {
    try {
      if (isInitial) isLoading = true;
      else isFetching = true;

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'All Status') params.append('status', statusFilter.toUpperCase());

      const data = await apiFetch<any[]>(`/links?${params.toString()}`);
      links = data;
      
      // Requirement: Redirect if no links created (only on initial load and if truly no links at all)
      if (isInitial && links.length === 0 && !searchQuery && statusFilter === 'All Status') {
        goto('/links/new');
      }
    } catch (err: any) {
      error = err.message || 'Failed to load links';
      console.error(err);
    } finally {
      isLoading = false;
      isFetching = false;
    }
  }

  onMount(() => {
    fetchLinks(true);
  });

  // Debounce search
  let searchTimeout: any;
  $effect(() => {
    // Track reactive variables
    const q = searchQuery;
    const s = statusFilter;
    
    if (isLoading) return;

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchLinks();
    }, 300);
  });
</script>

<svelte:head>
  <title>Your Links | Sniip</title>
</svelte:head>

<div class="max-w-7xl mx-auto space-y-8 pb-12">
  <!-- Page Header -->
  <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Links</h1>
      <p class="text-slate-500 dark:text-gray-400 font-medium">Manage and track all your shortened URLs in one place.</p>
    </div>
    <a 
      href="/links/create"
      class="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 group cursor-pointer"
    >
      <Plus size={20} strokeWidth={3} />
      <span>Create Sniip</span>
    </a>
  </header>

  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 class="w-12 h-12 animate-spin text-blue-600" />
      <p class="text-slate-500 font-bold animate-pulse">Syncing your links...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-8 rounded-3xl text-center space-y-4">
      <p class="text-red-600 dark:text-red-400 font-bold">{error}</p>
      <button 
        onclick={() => fetchLinks(true)}
        class="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all cursor-pointer"
      >
        Retry
      </button>
    </div>
  {:else}
    <!-- Filters & Search -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-xs">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search links, titles or tags..." 
          bind:value={searchQuery}
          class="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
        />
        {#if isFetching}
          <div class="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader2 class="w-4 h-4 animate-spin text-blue-600" />
          </div>
        {/if}
      </div>
      
      <div class="flex flex-wrap items-center gap-3">
        <select 
          bind:value={statusFilter}
          class="px-4 py-2.5 bg-slate-50 dark:bg-gray-800 border-none rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none min-w-[140px]"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Archived</option>
        </select>
        
        <button class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-750 transition-all cursor-pointer">
          <Calendar size={16} />
          <span>All Time</span>
        </button>

        <button class="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <!-- Link List -->
    <div class="grid grid-cols-1 gap-4">
      {#each links as link}
        <LinkCard {link} />
      {:else}
        {#if !isLoading}
          <div class="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-dashed border-slate-200 dark:border-gray-800 text-center space-y-4">
            <div class="w-16 h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
              <Link2 size={32} />
            </div>
            <div class="space-y-1">
              <p class="text-lg font-black text-slate-900 dark:text-white">
                {searchQuery || statusFilter !== 'All Status' ? 'No matches found' : 'No links found'}
              </p>
              <p class="text-slate-500 dark:text-gray-400">
                {searchQuery || statusFilter !== 'All Status' ? 'Try adjusting your filters.' : 'Start by creating your first short link!'}
              </p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
