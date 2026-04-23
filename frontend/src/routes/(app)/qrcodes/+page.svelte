<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    QrCode as QrIcon, 
    Calendar,
    Loader2
  } from 'lucide-svelte';

  import { apiFetch } from '$lib/utils/api.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getTagColor } from '$lib/utils/tags';
  import QrCard from '$lib/components/QrCard.svelte';
  import { Hash, X } from 'lucide-svelte';

  // State
  let qrCodes = $state<any[]>([]);
  let userTags = $state<string[]>([]);
  let selectedTags = $state<string[]>([]);
  let isLoading = $state(true);
  let isFetching = $state(false);
  let error = $state<string | null>(null);
  let searchQuery = $state('');
  let startDate = $state('');
  let endDate = $state('');
  let dateLabel = $state('All Time');
  let showDateMenu = $state(false);

  async function fetchTags() {
    try {
      const data = await apiFetch<string[]>('/links/tags');
      userTags = data;
    } catch (err) {
      console.error('Failed to fetch tags', err);
    }
  }

  async function fetchQrCodes(isInitial = false) {
    try {
      if (isInitial) isLoading = true;
      else isFetching = true;

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const data = await apiFetch<any[]>(`/qrcodes?${params.toString()}`);
      qrCodes = data;
      
      // Requirement: Redirect if no QR codes created
      if (isInitial && qrCodes.length === 0 && !searchQuery && selectedTags.length === 0 && !startDate) {
        goto('/qrcodes/new');
      }
    } catch (err: any) {
      error = err.message || 'Failed to load QR codes';
      console.error(err);
    } finally {
      isLoading = false;
      isFetching = false;
    }
  }

  function setDateRange(range: 'all' | 'today' | '7d' | '30d' | 'custom') {
    const now = new Date();
    const start = new Date();
    
    if (range === 'all') {
      startDate = '';
      endDate = '';
      dateLabel = 'All Time';
    } else if (range === 'today') {
      start.setHours(0, 0, 0, 0);
      startDate = start.toISOString();
      endDate = '';
      dateLabel = 'Today';
    } else if (range === '7d') {
      start.setDate(now.getDate() - 7);
      startDate = start.toISOString();
      endDate = '';
      dateLabel = 'Last 7 Days';
    } else if (range === '30d') {
      start.setDate(now.getDate() - 30);
      startDate = start.toISOString();
      endDate = '';
      dateLabel = 'Last 30 Days';
    }
    
    if (range !== 'custom') {
      showDateMenu = false;
    } else {
      dateLabel = 'Custom Range';
    }
  }

  function handleCustomDateChange() {
    if (startDate && endDate) {
      dateLabel = `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
    }
  }

  onMount(() => {
    fetchQrCodes(true);
    fetchTags();
  });

  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  function clearTags() {
    selectedTags = [];
  }

  // Debounce search
  let searchTimeout: any;
  $effect(() => {
    // Track reactive variables
    const q = searchQuery;
    const t = selectedTags;
    const d1 = startDate;
    const d2 = endDate;
    
    if (isLoading) return;

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchQrCodes();
    }, 300);
  });

  // Close menus on click outside
  if (typeof window !== 'undefined') {
    window.addEventListener('click', () => {
      showDateMenu = false;
    });
  }
</script>

<svelte:head>
  <title>Your QR Codes | Sniip</title>
</svelte:head>

<div class="max-w-7xl mx-auto space-y-8 pb-12">
  <!-- Page Header -->
  <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your QR Codes</h1>
      <p class="text-slate-500 dark:text-gray-400 font-medium">Manage and download your custom branded QR assets.</p>
    </div>
    <a 
      href="/qrcodes/create"
      class="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 group cursor-pointer"
    >
      <Plus size={20} strokeWidth={3} />
      <span>Create QR Code</span>
    </a>
  </header>

  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 class="w-12 h-12 animate-spin text-blue-600" />
      <p class="text-slate-500 font-bold animate-pulse">Fetching your assets...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-8 rounded-3xl text-center space-y-4">
      <p class="text-red-600 dark:text-red-400 font-bold">{error}</p>
      <button 
        onclick={() => fetchQrCodes(true)}
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
          placeholder="Search QR codes..." 
          bind:value={searchQuery}
          class="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
        />
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <button 
            onclick={(e) => { e.stopPropagation(); showDateMenu = !showDateMenu; }}
            class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition-all cursor-pointer min-w-[140px] justify-between"
          >
            <div class="flex items-center gap-2">
              <Calendar size={16} />
              <span>{dateLabel}</span>
            </div>
          </button>

          {#if showDateMenu}
            <div 
              onclick={(e) => e.stopPropagation()}
              class="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl shadow-2xl z-50 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div class="grid grid-cols-2 gap-2">
                <button 
                  onclick={() => setDateRange('all')}
                  class="px-3 py-2 text-xs font-bold rounded-lg border border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 cursor-pointer"
                >
                  All Time
                </button>
                <button 
                  onclick={() => setDateRange('today')}
                  class="px-3 py-2 text-xs font-bold rounded-lg border border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 cursor-pointer"
                >
                  Today
                </button>
                <button 
                  onclick={() => setDateRange('7d')}
                  class="px-3 py-2 text-xs font-bold rounded-lg border border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 cursor-pointer"
                >
                  Last 7 Days
                </button>
                <button 
                  onclick={() => setDateRange('30d')}
                  class="px-3 py-2 text-xs font-bold rounded-lg border border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 cursor-pointer"
                >
                  Last 30 Days
                </button>
              </div>

              <div class="space-y-3 pt-2 border-t border-slate-50 dark:border-gray-800">
                <p class="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest px-1">Custom Range</p>
                <div class="space-y-2">
                  <div class="flex flex-col gap-1">
                    <label for="start" class="text-[10px] text-slate-400 font-bold px-1">Start Date</label>
                    <input 
                      id="start"
                      type="date" 
                      bind:value={startDate}
                      onchange={handleCustomDateChange}
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-gray-800 border-none rounded-lg text-xs dark:text-white"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="end" class="text-[10px] text-slate-400 font-bold px-1">End Date</label>
                    <input 
                      id="end"
                      type="date" 
                      bind:value={endDate}
                      onchange={handleCustomDateChange}
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-gray-800 border-none rounded-lg text-xs dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onclick={() => showDateMenu = false}
                class="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                Apply Range
              </button>
            </div>
          {/if}
        </div>
        
        <button class="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <!-- Tag Filter Bar -->
    {#if userTags.length > 0}
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-2 mr-2">
          <Hash size={16} class="text-slate-400" />
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Filter by Tag:</span>
        </div>
        
        {#each userTags as tag}
          {@const isSelected = selectedTags.includes(tag)}
          <button 
            onclick={() => toggleTag(tag)}
            class="px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5
              {isSelected 
                ? `${getTagColor(tag)} text-white border-transparent shadow-md scale-105` 
                : 'bg-white dark:bg-gray-900 text-slate-500 dark:text-gray-400 border-slate-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500'}"
          >
            {#if isSelected}
              <X size={12} strokeWidth={3} />
            {/if}
            {tag}
          </button>
        {/each}

        {#if selectedTags.length > 0}
          <button 
            onclick={clearTags}
            class="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 underline underline-offset-4 ml-2 cursor-pointer"
          >
            Clear all
          </button>
        {/if}
      </div>
    {/if}

    <!-- QR Code List -->
    <div class="grid grid-cols-1 gap-4">
      {#each qrCodes as qr}
        <QrCard {qr} />
      {:else}
        <div class="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-dashed border-slate-200 dark:border-gray-800 text-center space-y-4">
          <div class="w-16 h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <QrIcon size={32} />
          </div>
          <div class="space-y-1">
            <p class="text-lg font-black text-slate-900 dark:text-white">
              {searchQuery ? 'No matches found' : 'No QR codes found'}
            </p>
            <p class="text-slate-500 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search terms.' : 'Create your first branded QR code to see it here.'}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
