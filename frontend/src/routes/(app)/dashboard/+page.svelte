<script lang="ts">
  import { onMount } from 'svelte';
  import { apiFetch } from '$lib/utils/api';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { Loader2, ExternalLink, Copy, Calendar, BarChart3 } from 'lucide-svelte';

  let links = $state<any[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  async function fetchLinks() {
    try {
      links = await apiFetch<any[]>('/links');
    } catch (err: any) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchLinks();
  });

  function copyToClipboard(slug: string) {
    const fullUrl = `tynyamy.com${slug}`;
    navigator.clipboard.writeText(fullUrl);
    // In a real app, we'd show a toast here
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-24 animate-in fade-in duration-500">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
        <div class="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-6 text-slate-500 font-bold tracking-widest uppercase text-xs">Syncing your dashboard...</p>
    </div>
  {:else if error}
    <div class="bg-rose-50 border border-rose-100 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xl shadow-rose-900/5">
      <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">Connection Issue</h3>
      <p class="text-slate-600 font-medium mb-6 leading-relaxed">{error}</p>
      <button 
        onclick={() => window.location.reload()}
        class="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95 text-sm"
      >
        Retry Connection
      </button>
    </div>
  {:else if links.length === 0}
    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <EmptyState 
        title="Your workspace is empty"
        description="You haven't shortened any links yet. Start by creating your first link and watch the analytics roll in."
        buttonText="Create your first link"
        href="/links/create"
        iconType="link"
      />
    </div>
  {:else}
    <div class="space-y-10 animate-in fade-in duration-500">
      <!-- Welcome Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-1">
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p class="text-slate-500 font-medium">You have {links.length} active links in your workspace.</p>
        </div>
        <a 
          href="/links/create"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 group"
        >
          <span>Create new link</span>
          <ExternalLink class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
      
      <!-- Quick Stats (Placeholders) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Clicks</p>
          <p class="text-3xl font-black text-slate-900">0</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Average CTR</p>
          <p class="text-3xl font-black text-slate-900">0%</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Top Performer</p>
          <p class="text-lg font-black text-slate-900 truncate">None yet</p>
        </div>
      </div>

      <!-- Links Table/List -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 class="w-5 h-5 text-blue-600" />
          Recent performance
        </h2>
        
        <div class="grid grid-cols-1 gap-4">
          {#each links as link}
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
              <div class="flex-1 min-w-0 space-y-3">
                <div class="flex items-center gap-3">
                  <h3 class="font-black text-xl text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {link.title || link.originalUrl}
                  </h3>
                  {#if link.status === 'ACTIVE'}
                    <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-emerald-100">
                      Active
                    </span>
                  {/if}
                </div>
                
                <div class="flex flex-wrap items-center gap-y-2 gap-x-4">
                  <div class="flex items-center gap-1.5 group/link cursor-pointer" onclick={() => copyToClipboard(link.shortSlug)}>
                    <span class="text-base font-bold text-blue-600 hover:text-blue-700">tinyamy.com/{link.shortSlug}</span>
                    <Copy class="w-3.5 h-3.5 text-slate-300 group-hover/link:text-blue-400 transition-colors" />
                  </div>
                  <span class="hidden sm:inline text-slate-200 font-thin">|</span>
                  <a href={link.originalUrl} target="_blank" class="text-sm text-blue-600 truncate max-w-md hover:text-blue-700 transition-colors">
                    {link.originalUrl}
                  </a>
                </div>

                <div class="flex items-center gap-4 pt-1">
                  <div class="flex items-center gap-1.5 text-slate-400">
                    <Calendar class="w-4 h-4" />
                    <span class="text-xs font-medium">Created {new Date(link.createdAt).toLocaleDateString()}</span>
                  </div>
                  {#if link.tags && link.tags.length > 0}
                    <div class="flex items-center gap-1.5">
                      {#each link.tags as tag}
                        <span class="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end gap-10 bg-slate-50/50 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
                 <div class="text-right sm:px-6 sm:border-r sm:border-slate-100">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clicks</p>
                    <p class="text-2xl font-black text-slate-900">0</p>
                 </div>
                 
                 <div class="flex items-center gap-2">
                   <a 
                    href="/analytics?id={link.id}"
                    class="p-3 bg-white border border-slate-100 rounded-xl text-blue-600 hover:text-blue-700 hover:border-blue-100 hover:shadow-lg transition-all"
                   >
                    <BarChart3 class="w-5 h-5" />
                   </a>
                   <button 
                    onclick={() => copyToClipboard(link.shortSlug)}
                    class="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all"
                   >
                    <Copy class="w-5 h-5" />
                   </button>
                 </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
