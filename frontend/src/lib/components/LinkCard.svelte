<script lang="ts">
  import { 
    Copy, 
    Clock, 
    BarChart3, 
    MoreHorizontal,
    Pencil,
    Archive
  } from 'lucide-svelte';
  import { toast } from '$lib/stores/toast.svelte.js';
  import { supabase } from '$lib/supabase';

  interface Props {
    link: {
      id: string;
      title: string;
      status: string;
      shortSlug: string;
      originalUrl: string;
      createdAt: string;
      tags: string[];
      _count?: {
        clicksAnalytics: number;
      };
    };
  }

  let { link }: Props = $props();
  let showOptions = $state(false);
  let currentStatus = $state(link.status);

  function copyToClipboard(slug: string) {
    const fullUrl = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard');
  }

  async function archiveLink() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { error: dbError } = await supabase
        .from('links')
        .update({ status: 'ARCHIVED' })
        .eq('short_slug', link.shortSlug)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      currentStatus = 'ARCHIVED';
      toast.success('Link archived successfully');
      showOptions = false;
    } catch (err: any) {
      toast.error(err.message || 'Failed to archive link');
    }
  }

  function toggleOptions(e: MouseEvent) {
    e.stopPropagation();
    showOptions = !showOptions;
  }

  // Close menu when clicking outside
  if (typeof window !== 'undefined') {
    window.addEventListener('click', () => {
      showOptions = false;
    });
  }
</script>

<div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group relative">
  <div class="flex-1 min-w-0 space-y-3">
    <div class="flex items-center gap-3">
      <h3 class="font-black text-xl text-slate-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
        {link.title || 'Untitled Link'}
      </h3>
      <span class="px-2 py-0.5 {currentStatus === 'ACTIVE' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-slate-100 dark:bg-gray-800 text-slate-500'} text-[10px] font-black uppercase tracking-widest rounded-md border {currentStatus === 'ACTIVE' ? 'border-emerald-100 dark:border-emerald-800/30' : 'border-slate-200 dark:border-gray-700'}">
        {currentStatus}
      </span>
    </div>
    
    <div class="flex flex-wrap items-center gap-y-2 gap-x-4">
      <button 
        class="flex items-center gap-1.5 group/link cursor-pointer" 
        onclick={() => copyToClipboard(link.shortSlug)}
      >
        <span class="text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all">sniip.io/{link.shortSlug}</span>
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
       <div class="relative">
         <button 
          class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-800 rounded-xl text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:shadow-lg transition-all cursor-pointer {showOptions ? 'ring-2 ring-blue-500' : ''}"
          title="Options"
          onclick={toggleOptions}
         >
          <MoreHorizontal class="w-5 h-5" />
         </button>

         {#if showOptions}
           <div class="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
             <a 
              href="/links/edit/{link.shortSlug}"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-left"
             >
               <Pencil class="w-4 h-4 text-blue-500" />
               <span>Edit Sniip</span>
             </a>
             {#if currentStatus !== 'ARCHIVED'}
               <button 
                onclick={archiveLink}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-left"
               >
                <Archive class="w-4 h-4 text-amber-500" />
                <span>Archive</span>
               </button>
             {/if}
           </div>
         {/if}
       </div>
     </div>
  </div>
</div>
