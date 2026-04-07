<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Download,
    ExternalLink, 
    QrCode as QrIcon, 
    Calendar,
    Link2,
    Clock,
    Loader2,
    Copy,
    Image as ImageIcon,
    FileDown
  } from 'lucide-svelte';

  import { apiFetch } from '$lib/utils/api.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/stores/toast.svelte.js';

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

      // Note: We'll use the search query on the frontend for now 
      // as the backend qrcodes list doesn't have filters yet
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

  function copyToClipboard(slug: string) {
    const fullUrl = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Short link copied to clipboard');
  }

  function downloadQr(imageUrl: string, title: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `QR-${title || 'sniip'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Starting download...');
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
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
          
          <div class="flex items-center gap-6 flex-1 min-w-0">
            <!-- QR Thumbnail -->
            <div class="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
               <img src={qr.imageUrl} alt="QR Code" class="w-full h-full object-contain p-2" />
            </div>

            <div class="flex-1 min-w-0 space-y-3">
              <div class="flex items-center gap-3">
                <h3 class="font-black text-xl text-slate-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {qr.link?.title || 'Untitled QR'}
                </h3>
                <span class="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-purple-100 dark:border-purple-800/30">
                  QR ASSET
                </span>
              </div>
              
              <div class="flex flex-wrap items-center gap-y-2 gap-x-4">
                <button 
                  class="flex items-center gap-1.5 group/link cursor-pointer" 
                  onclick={() => copyToClipboard(qr.link?.shortSlug)}
                >
                  <span class="text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all">sniip.io/{qr.link?.shortSlug}</span>
                  <Copy class="w-3.5 h-3.5 text-slate-300 dark:text-gray-600 group-hover/link:text-blue-400 transition-colors" />
                </button>
                <span class="hidden sm:inline text-slate-200 dark:text-gray-800 font-thin">|</span>
                <span class="text-sm text-slate-400 dark:text-gray-500 truncate max-w-md">
                  {qr.link?.originalUrl}
                </span>
              </div>

              {#if qr.link?.tags && qr.link?.tags.length > 0}
                <div class="flex flex-wrap items-center gap-1.5">
                  {#each qr.link.tags as tag}
                    <span class="text-[10px] font-bold bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded-full border border-slate-100 dark:border-gray-700">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-10 bg-slate-50/50 dark:bg-gray-800/30 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
             <div class="flex items-center gap-2">
               <button 
                onclick={() => downloadQr(qr.imageUrl, qr.link?.title || qr.link?.shortSlug)}
                class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 font-bold"
                title="Download QR"
               >
                <Download class="w-5 h-5" />
                <span class="text-sm sm:hidden lg:inline">Download</span>
               </button>
               <button 
                class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:shadow-lg transition-all cursor-pointer"
                title="Options"
               >
                <MoreHorizontal class="w-5 h-5" />
               </button>
             </div>
          </div>
        </div>
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
