<script lang="ts">
  import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Copy, 
    ExternalLink, 
    BarChart3, 
    QrCode, 
    Calendar,
    MousePointerClick,
    Link2,
    CheckCircle2,
    Clock,
    Loader2
  } from 'lucide-svelte';

  import { apiFetch } from '$lib/utils/api.js';
  import { onMount } from 'svelte';

  // State
  let stats = $state({
    totalClicks: 0,
    activeLinks: 0,
    qrScans: 0,
    averageCtr: 0,
    totalLinks: 0
  });
  let links = $state<any[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Metrics derived from stats
  const metrics = $derived([
    { name: 'Total Clicks', value: stats.totalClicks.toLocaleString(), icon: MousePointerClick, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Active Sniips', value: stats.activeLinks.toString(), icon: Link2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'QR Scans', value: stats.qrScans.toLocaleString(), icon: QrCode, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Avg. CTR', value: `${stats.averageCtr}%`, icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ]);

  let searchQuery = $state('');
  let statusFilter = $state('All Status');

  async function fetchDashboardData() {
    try {
      isLoading = true;
      const [statsData, linksData] = await Promise.all([
        apiFetch<any>('/dashboard'),
        apiFetch<any[]>('/links')
      ]);
      stats = statsData;
      links = linksData;
    } catch (err: any) {
      error = err.message || 'Failed to load dashboard data';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchDashboardData();
  });

  function copyToClipboard(slug: string) {
    const fullUrl = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    // In a real app, show a toast
  }
</script>

<svelte:head>
  <title>Dashboard | Sniip</title>
</svelte:head>

<div class="max-w-7xl mx-auto space-y-10 pb-12">
  <!-- Welcome Header -->
  <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div class="space-y-1">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
      <p class="text-slate-500 dark:text-gray-400 font-medium">Welcome back! Here's what's happening with your links.</p>
    </div>
    <a 
      href="/links/create"
      class="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 group"
    >
      <Plus size={20} strokeWidth={3} />
      <span>Create Sniip</span>
    </a>
  </header>

  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 class="w-12 h-12 animate-spin text-blue-600" />
      <p class="text-slate-500 font-bold animate-pulse">Syncing your data...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-8 rounded-3xl text-center space-y-4">
      <p class="text-red-600 dark:text-red-400 font-bold">{error}</p>
      <button 
        onclick={fetchDashboardData}
        class="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all cursor-pointer"
      >
        Retry
      </button>
    </div>
  {:else}
    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each metrics as metric}
        {@const Icon = metric.icon}
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl {metric.bg} {metric.color} flex items-center justify-center transition-transform group-hover:scale-110">
              <Icon size={24} />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">{metric.name}</p>
              <p class="text-2xl font-black text-slate-900 dark:text-white">{metric.value}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Links Section -->
    <div class="space-y-6">
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
      {#if links.length === 0}
        <div class="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-dashed border-slate-200 dark:border-gray-800 text-center space-y-4">
          <div class="w-16 h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Link2 size={32} />
          </div>
          <div class="space-y-1">
            <p class="text-lg font-black text-slate-900 dark:text-white">No links yet</p>
            <p class="text-slate-500 dark:text-gray-400">Start by creating your first short link!</p>
          </div>
          <a 
            href="/links/create"
            class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Create First Sniip</span>
          </a>
        </div>
      {:else}
        <div class="grid grid-cols-1 gap-4">
          {#each links as link}
            <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
              <div class="flex-1 min-w-0 space-y-3">
                <div class="flex items-center gap-3">
                  <h3 class="font-black text-xl text-slate-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {link.title || 'Untitled Link'}
                  </h3>
                  <span class="px-2 py-0.5 {link.status === 'ACTIVE' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-slate-100 dark:bg-gray-800 text-slate-500'} text-[10px] font-black uppercase tracking-widest rounded-md border {link.status === 'ACTIVE' ? 'border-emerald-100 dark:border-emerald-800/30' : 'border-slate-200 dark:border-gray-700'}">
                    {link.status}
                  </span>
                </div>
                
                <div class="flex flex-wrap items-center gap-y-2 gap-x-4">
                  <button 
                    class="flex items-center gap-1.5 group/link cursor-pointer" 
                    onclick={() => copyToClipboard(link.shortSlug)}
                  >
                    <span class="text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">sniip.com/{link.shortSlug}</span>
                    <Copy class="w-3.5 h-3.5 text-slate-300 dark:text-gray-600 group-hover/link:text-blue-400 transition-colors" />
                  </button>
                  <span class="hidden sm:inline text-slate-200 dark:text-gray-800 font-thin">|</span>
                  <a href={link.originalUrl} target="_blank" class="text-sm text-slate-400 dark:text-gray-500 truncate max-w-md hover:text-blue-600 transition-colors">
                    {link.originalUrl}
                  </a>
                </div>

                <div class="flex items-center gap-4 pt-1">
                  <div class="flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
                    <Clock class="w-4 h-4" />
                    <span class="text-xs font-medium">Created {new Date(link.createdAt).toLocaleDateString()}</span>
                  </div>
                  {#if link.tags && link.tags.length > 0}
                    <div class="flex items-center gap-1.5">
                      {#each link.tags as tag}
                        <span class="text-[10px] font-bold bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded-full border border-slate-100 dark:border-gray-700">{tag}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end gap-10 bg-slate-50/50 dark:bg-gray-800/30 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
                 <div class="text-right sm:px-6 sm:border-r sm:border-slate-100 dark:sm:border-gray-800">
                    <p class="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">Clicks</p>
                    <p class="text-2xl font-black text-slate-900 dark:text-white">{link._count?.clicksAnalytics || 0}</p>
                 </div>
                 
                 <div class="flex items-center gap-2">
                   <a 
                    href="/analytics?id={link.id}"
                    class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg transition-all"
                    title="View Analytics"
                   >
                    <BarChart3 class="w-5 h-5" />
                   </a>
                   <button 
                    class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:shadow-lg transition-all cursor-pointer"
                    title="Options"
                   >
                    <MoreHorizontal class="w-5 h-5" />
                   </button>
                 </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
