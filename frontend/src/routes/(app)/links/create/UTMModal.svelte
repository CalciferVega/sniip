<script lang="ts">
  import { X, Share2, Layers, Megaphone, Type, FileText, Plus, RotateCcw, Info } from 'lucide-svelte';

  let { onAdd } = $props<{ onAdd: (utmString: string) => void }>();

  let dialogElement = $state<HTMLDialogElement | null>(null);
  
  let utms = $state({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: ''
  });

  // Export functions to control the modal
  export const showModal = (initialData?: typeof utms) => {
    if (initialData) {
        utms = { ...initialData };
    } else {
        resetState();
    }
    dialogElement?.showModal();
  };

  export const closeModal = () => {
    dialogElement?.close();
  };

  function resetState() {
    utms = {
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: ''
    };
  }

  function handleAdd() {
    const params = new URLSearchParams();
    if (utms.source) params.append('utm_source', utms.source);
    if (utms.medium) params.append('utm_medium', utms.medium);
    if (utms.campaign) params.append('utm_campaign', utms.campaign);
    if (utms.term) params.append('utm_term', utms.term);
    if (utms.content) params.append('utm_content', utms.content);

    const utmString = params.toString();
    onAdd(utmString);
    closeModal();
  }

  const utmFields = [
    { id: 'source', label: 'Source', icon: Share2, placeholder: 'google', desc: 'The referrer (e.g. google, newsletter)' },
    { id: 'medium', label: 'Medium', icon: Layers, placeholder: 'cpc', desc: 'Marketing medium (e.g. cpc, email)' },
    { id: 'campaign', label: 'Campaign', icon: Megaphone, placeholder: 'spring_sale', desc: 'Product or promo code' },
    { id: 'term', label: 'Term', icon: Type, placeholder: 'running+shoes', desc: 'Identify paid keywords' },
    { id: 'content', label: 'Content', icon: FileText, placeholder: 'logolink', desc: 'Use to differentiate ads' },
  ];
</script>

<dialog
  bind:this={dialogElement}
  class="relative p-0 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border-none max-w-2xl w-full overflow-hidden backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm animate-in fade-in zoom-in duration-200"
>
  <div class="p-6 sm:p-8 space-y-6">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">UTM Builder</h2>
        <p class="text-sm text-slate-500 dark:text-gray-400 font-medium">Add tracking parameters to your URL.</p>
      </div>
      <div class="flex items-center gap-2">
        <button 
            onclick={resetState}
            class="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all cursor-pointer"
            title="Reset Fields"
        >
            <RotateCcw size={18} />
        </button>
        <button 
            onclick={closeModal}
            class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
            <X class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- UTM Fields Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {#each utmFields as field}
        <div class="group {field.id === 'content' ? 'md:col-span-2' : ''}">
          <div class="flex items-center justify-between mb-1.5 px-1">
            <div class="flex items-center gap-2">
                <field.icon size={14} class="text-blue-600 dark:text-blue-400" />
                <label for={field.id} class="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">{field.label}</label>
            </div>
            <div class="relative group/tip">
                <Info size={12} class="text-slate-300 dark:text-gray-600 cursor-help" />
                <div class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                    {field.desc}
                </div>
            </div>
          </div>
          <input
            type="text"
            id={field.id}
            bind:value={utms[field.id as keyof typeof utms]}
            placeholder={field.placeholder}
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
          />
        </div>
      {/each}
    </div>

    <!-- Footer -->
    <footer class="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-gray-800">
      <button
        onclick={closeModal}
        class="px-6 py-2.5 text-sm font-bold text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-all cursor-pointer"
      >
        Cancel
      </button>
      <button
        onclick={handleAdd}
        class="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
      >
        <Plus size={18} strokeWidth={3} />
        {utms.source || utms.medium || utms.campaign ? 'Update UTMs' : 'Add UTMs'}
      </button>
    </footer>
  </div>
</dialog>

<style>
  dialog {
    width: calc(100% - 2rem);
    margin: auto;
  }
  
  @media (min-width: 640px) {
    dialog {
      width: 100%;
    }
  }
</style>
