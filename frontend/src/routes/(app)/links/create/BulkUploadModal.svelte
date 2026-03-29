<script lang="ts">
  import { X, AlertCircle, Loader2 } from 'lucide-svelte';
  import DragDropUploader from '$lib/components/ui/DragDropUploader.svelte';

  // Svelte 5 state management
  let dialogElement = $state<HTMLDialogElement | null>(null);
  let selectedFile = $state<File | null>(null);

  // Export functions to control the modal
  export const showModal = () => dialogElement?.showModal();
  export const closeModal = () => {
    dialogElement?.close();
    resetState();
  };

  function resetState() {
    selectedFile = null;
  }

  function handleUpload() {
    if (!selectedFile) return;
    // In a real implementation, we would process the CSV here
    console.log('Uploading file:', selectedFile.name);
    // For now, just close after a tiny delay to simulate progress
    setTimeout(() => {
        closeModal();
    }, 500);
  }
</script>

<dialog
  bind:this={dialogElement}
  class="relative p-0 rounded-2xl bg-white shadow-2xl border-none max-w-lg w-full overflow-hidden backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm animate-in fade-in zoom-in duration-200"
  onclose={resetState}
>
  <div class="p-6 sm:p-8 space-y-6">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-xl font-bold text-slate-900">Bulk upload links</h2>
        <p class="text-sm text-slate-500 font-medium">Upload a CSV file to generate multiple links at once.</p>
      </div>
      <button 
        onclick={closeModal}
        class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- Drop Zone -->
    <DragDropUploader 
      accept=".csv"
      title="Drag and drop your .csv file here"
      subtitle="or click to browse your local files"
      helperText="Max file size: 5MB"
      maxSizeMB={5}
      bind:selectedFile={selectedFile}
    />

    <!-- Alert for CSV Format -->
    <div class="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 text-amber-800">
        <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div class="space-y-1">
            <p class="text-sm font-bold">Important format note</p>
            <p class="text-xs font-medium opacity-80 leading-relaxed">Your CSV must contain 'title' and 'url' columns. Custom slugs are optional.</p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="flex items-center justify-end gap-3 pt-2">
      <button
        onclick={closeModal}
        class="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
      >
        Cancel
      </button>
      <button
        onclick={handleUpload}
        disabled={!selectedFile}
        class="px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
      >
        Upload and Generate
      </button>
    </footer>
  </div>
</dialog>

<style>
  /* Custom shake animation for the trash icon */
  @keyframes shake {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }

  :global(.group-hover\/btn\:shake) {
    animation: shake 0.2s ease-in-out infinite;
  }

  /* Ensure dialog takes standard padding behavior on smaller screens */
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
