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
  import QrCard from '$lib/components/QrCard.svelte';

  // State
  let qrCodes = $state<any[]>([]);
  let isLoading = $state(true);
  let isFetching = $state(false);
  let error = $state<string | null>(null);
  let searchQuery = $state('');

  async function fetchQrCodes(isInitial = false) {
    try {
      if (isInitial) isLoading = true;
      else isFetching = true;

      const data = await apiFetch<any[]>('/qrcodes');
      qrCodes = data;
      
      // Requirement: Redirect if no QR codes created
      if (isInitial && qrCodes.length === 0) {
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

  onMount(() => {
    fetchQrCodes(true);
  });

  // Filtered QR Codes (Frontend search)
  const filteredQrs = $derived(
    qrCodes.filter(qr => {
      const q = searchQuery.toLowerCase();
      const titleMatch = qr.link?.title?.toLowerCase().includes(q);
      const slugMatch = qr.link?.shortSlug?.toLowerCase().includes(q);
      const urlMatch = qr.link?.originalUrl?.toLowerCase().includes(q);
      const tagMatch = qr.link?.tags?.some((t: string) => t.toLowerCase().includes(q));
      return !searchQuery || titleMatch || slugMatch || urlMatch || tagMatch;
    })
  );
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
        <button class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-750 transition-all cursor-pointer">
          <Calendar size={16} />
          <span>All Time</span>
        </button>
        <button class="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <!-- QR Code List -->
    <div class="grid grid-cols-1 gap-4">
      {#each filteredQrs as qr}
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
