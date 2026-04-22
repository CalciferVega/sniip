<script lang="ts">
  import { 
    Copy, 
    MoreHorizontal,
    Pencil,
    Archive,
    Download
  } from 'lucide-svelte';
  import { toast } from '$lib/stores/toast.svelte.js';
  import { supabase } from '$lib/supabase';

  interface Props {
    qr: {
      id: string;
      imageUrl: string;
      link: {
        id: string;
        title: string;
        status: string;
        shortSlug: string;
        originalUrl: string;
        tags: string[];
      };
    };
  }

  let { qr }: Props = $props();
  let showOptions = $state(false);
  let currentStatus = $state(qr.link.status);

  function copyToClipboard(slug: string) {
    const fullUrl = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Short link copied to clipboard');
  }

  function downloadQr() {
    const link = document.createElement('a');
    link.href = qr.imageUrl;
    link.download = `QR-${qr.link.title || qr.link.shortSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Starting download...');
  }

  async function archiveQr() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { error: dbError } = await supabase
        .from('links')
        .update({ status: 'ARCHIVED' })
        .eq('id', qr.link.id)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      currentStatus = 'ARCHIVED';
      toast.success('QR Code archived successfully');
      showOptions = false;
    } catch (err: any) {
      toast.error(err.message || 'Failed to archive QR code');
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
        <span class="px-2 py-0.5 {currentStatus === 'ACTIVE' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-purple-100 dark:border-purple-800/30' : 'bg-slate-100 dark:bg-gray-800 text-slate-500 border-slate-200 dark:border-gray-700'} text-[10px] font-black uppercase tracking-widest rounded-md border">
          {currentStatus === 'ACTIVE' ? 'QR ASSET' : currentStatus}
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
        onclick={downloadQr}
        class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 font-bold"
        title="Download QR"
       >
        <Download class="w-5 h-5" />
        <span class="text-sm sm:hidden lg:inline">Download</span>
       </button>
       
       <div class="relative">
         <button 
          class="p-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:shadow-lg transition-all cursor-pointer {showOptions ? 'ring-2 ring-blue-500' : ''}"
          title="Options"
          onclick={toggleOptions}
         >
          <MoreHorizontal class="w-5 h-5" />
         </button>

         {#if showOptions}
           <div class="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
             <a 
              href="/qrcodes/edit/{qr.id}"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-left"
             >
               <Pencil class="w-4 h-4 text-blue-500" />
               <span>Edit QR Code</span>
             </a>
             {#if currentStatus !== 'ARCHIVED'}
               <button 
                onclick={archiveQr}
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
