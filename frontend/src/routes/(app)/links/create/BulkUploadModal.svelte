<script lang="ts">
  import { X, AlertCircle, Loader2, CheckCircle2, AlertTriangle } from 'lucide-svelte';
  import DragDropUploader from '$lib/components/ui/DragDropUploader.svelte';
  import { usageStore } from '$lib/stores/usage.svelte';
  import UpgradeModal from '$lib/components/ui/UpgradeModal.svelte';
  import { apiFetch } from '$lib/utils/api';

  interface Props {
    upgradeModal?: ReturnType<typeof UpgradeModal>;
  }

  let { upgradeModal }: Props = $props();

  // Svelte 5 state management
  let dialogElement = $state<HTMLDialogElement | null>(null);
  let selectedFile = $state<File | null>(null);
  let isProcessing = $state(false);
  let uploadStatus = $state<'idle' | 'parsing' | 'uploading' | 'summary'>('idle');
  
  // Results summary
  let summary = $state({
    total: 0,
    created: 0,
    errors: 0,
    errorList: [] as string[]
  });

  // Export functions to control the modal
  export const showModal = () => dialogElement?.showModal();
  export const closeModal = () => {
    dialogElement?.close();
    resetState();
  };

  function resetState() {
    selectedFile = null;
    isProcessing = false;
    uploadStatus = 'idle';
    summary = { total: 0, created: 0, errors: 0, errorList: [] };
  }

  /**
   * Simple CSV Parser that handles basic quotes and commas
   */
  function parseCSV(text: string) {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/^["'](.+)["']$/, '$1'));
    
    // Validate required columns
    const titleIdx = headers.indexOf('title');
    const urlIdx = headers.indexOf('url');
    const slugIdx = headers.indexOf('slug');

    if (titleIdx === -1 || urlIdx === -1) {
        throw new Error("CSV missing required columns: 'title' and 'url'");
    }

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(v => v.trim().replace(/^["'](.+)["']$/, '$1'));
        if (row.length < 2) continue;

        data.push({
            title: row[titleIdx],
            originalUrl: row[urlIdx],
            customSlug: slugIdx !== -1 ? row[slugIdx] : undefined
        });
    }

    return data;
  }

  async function handleUpload() {
    if (!selectedFile) return;

    isProcessing = true;
    uploadStatus = 'parsing';

    try {
        const text = await selectedFile.text();
        const rows = parseCSV(text);
        
        if (rows.length === 0) {
            throw new Error("The CSV file is empty or invalid.");
        }

        summary.total = rows.length;

        // 1. Check Usage Limits
        const totalAfterUpload = (usageStore.usage?.used || 0) + rows.length;
        const limit = usageStore.usage?.total || 25;

        if (totalAfterUpload > limit) {
            const needed = rows.length;
            const available = Math.max(0, limit - (usageStore.usage?.used || 0));
            throw new Error(`Usage limit exceeded: You want to upload ${needed} links, but only have space for ${available}. Please remove some links from your CSV or upgrade your plan.`);
        }

        // 2. Upload row by row
        uploadStatus = 'uploading';
        for (const row of rows) {
            try {
                await apiFetch('/links', {
                    method: 'POST',
                    body: JSON.stringify(row)
                });
                summary.created++;
            } catch (err: any) {
                summary.errors++;
                summary.errorList.push(`Row "${row.title}": ${err.message}`);
            }
        }

        // 3. Finalize
        usageStore.refresh();
        uploadStatus = 'summary';

    } catch (err: any) {
        summary.errorList.push(err.message);
        summary.errors = summary.total || 1;
        uploadStatus = 'summary';
    } finally {
        isProcessing = false;
    }
  }
</script>

<dialog
  bind:this={dialogElement}
  class="relative p-0 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border-none max-w-xl w-full overflow-hidden backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm animate-in fade-in zoom-in duration-200"
  onclose={resetState}
>
  <div class="p-6 sm:p-10 space-y-6">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Bulk upload</h2>
        <p class="text-sm text-slate-500 dark:text-gray-400 font-medium">Generate multiple short links from a CSV file.</p>
      </div>
      <button 
        onclick={closeModal}
        class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 cursor-pointer"
      >
        <X class="w-6 h-6" />
      </button>
    </header>

    {#if uploadStatus === 'idle' || uploadStatus === 'parsing'}
        <div class="space-y-6">
            <DragDropUploader 
                accept=".csv"
                title="Drag and drop your .csv file here"
                subtitle="or click to browse your local files"
                helperText="Max file size: 5MB"
                maxSizeMB={5}
                bind:selectedFile={selectedFile}
            />

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-2xl flex gap-4 text-blue-800 dark:text-blue-300">
                <AlertCircle class="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div class="space-y-1">
                    <p class="text-sm font-bold">CSV Structure Requirements</p>
                    <p class="text-xs font-medium opacity-80 leading-relaxed">
                        Required columns: <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-700 dark:text-blue-200 font-bold">title</code>, <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-700 dark:text-blue-200 font-bold">url</code>.<br/>
                        Optional column: <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-700 dark:text-blue-200 font-bold">slug</code>.
                    </p>
                </div>
            </div>
        </div>
    {:else if uploadStatus === 'uploading'}
        <div class="py-12 flex flex-col items-center justify-center space-y-6">
            <div class="relative w-20 h-20">
                <Loader2 class="w-full h-full animate-spin text-blue-600" />
                <div class="absolute inset-0 flex items-center justify-center font-black text-blue-600 text-sm">
                    {Math.round((summary.created + summary.errors) / summary.total * 100)}%
                </div>
            </div>
            <div class="text-center space-y-2">
                <p class="text-lg font-black text-slate-900 dark:text-white">Uploading links...</p>
                <p class="text-slate-500 dark:text-gray-400 font-medium">Processing row {summary.created + summary.errors + 1} of {summary.total}</p>
            </div>
        </div>
    {:else if uploadStatus === 'summary'}
        <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl text-center">
                    <div class="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                        <CheckCircle2 size={18} />
                        <span class="text-xs font-bold uppercase tracking-widest">Success</span>
                    </div>
                    <p class="text-3xl font-black text-slate-900 dark:text-white">{summary.created}</p>
                </div>
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl text-center">
                    <div class="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-1">
                        <AlertTriangle size={18} />
                        <span class="text-xs font-bold uppercase tracking-widest">Errors</span>
                    </div>
                    <p class="text-3xl font-black text-slate-900 dark:text-white">{summary.errors}</p>
                </div>
            </div>

            {#if summary.errorList.length > 0}
                <div class="bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800 overflow-hidden">
                    <div class="px-4 py-3 border-b border-slate-100 dark:border-gray-800 bg-slate-100/50 dark:bg-gray-800 font-bold text-xs text-slate-500 uppercase tracking-widest">
                        Error Details
                    </div>
                    <div class="max-h-40 overflow-y-auto p-4 space-y-2">
                        {#each summary.errorList as err}
                            <p class="text-xs font-medium text-red-600 dark:text-red-400 flex items-start gap-2">
                                <span class="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0"></span>
                                {err}
                            </p>
                        {/each}
                    </div>
                </div>
            {/if}

            {#if summary.errorList.some(e => e.toLowerCase().includes('limit'))}
                <button 
                    onclick={() => { closeModal(); upgradeModal?.showModal(); }}
                    class="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                    Upgrade to increase limits
                </button>
            {/if}
        </div>
    {/if}

    <footer class="flex items-center justify-end gap-3 pt-2">
      {#if uploadStatus === 'idle'}
          <button
            onclick={closeModal}
            class="px-6 py-3 text-sm font-bold text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-2xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onclick={handleUpload}
            disabled={!selectedFile || isProcessing}
            class="px-10 py-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-gray-800 disabled:text-slate-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {#if isProcessing}
                <Loader2 size={18} class="animate-spin" />
                Parsing...
            {:else}
                Upload and Generate
            {/if}
          </button>
      {:else if uploadStatus === 'summary'}
          <button
            onclick={closeModal}
            class="w-full px-10 py-4 text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            Got it, thanks!
          </button>
      {/if}
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
