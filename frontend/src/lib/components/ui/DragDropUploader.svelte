<script lang="ts">
  import { Upload, FileText, Trash2 } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';

  let {
    accept = '*/*',
    title = 'Drag and drop your file here',
    subtitle = 'or click to browse',
    helperText = '',
    maxSizeMB = 5,
    selectedFile = $bindable(null)
  }: {
    accept?: string;
    title?: string;
    subtitle?: string;
    helperText?: string;
    maxSizeMB?: number;
    selectedFile?: File | null;
  } = $props();

  let isDragging = $state(false);
  let fileInput = $state<HTMLInputElement | null>(null);

  function resetState() {
    selectedFile = null;
    isDragging = false;
    if (fileInput) fileInput.value = '';
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase());
      
      const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) return fileExtension === type;
          if (type.endsWith('/*')) return file.type.startsWith(type.replace('/*', ''));
          return file.type === type;
      });

      if (isAccepted || accept === '*/*') {
        if (file.size <= maxSizeMB * 1024 * 1024) {
          selectedFile = file;
        } else {
            alert(`File is too large. Max size is ${maxSizeMB}MB.`);
        }
      } else {
        alert(`Invalid file type. Accepted types: ${accept}`);
      }
    }
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file.size <= maxSizeMB * 1024 * 1024) {
        selectedFile = file;
      } else {
        alert(`File is too large. Max size is ${maxSizeMB}MB.`);
        resetState();
      }
    }
  }

  function removeFile(e: MouseEvent) {
    e.stopPropagation();
    resetState();
  }

  function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={() => fileInput?.click()}
  ondragover={handleDragOver}
  ondragenter={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  class="relative group cursor-pointer transition-all duration-300"
>
  <input
    bind:this={fileInput}
    type="file"
    {accept}
    class="hidden"
    onchange={handleFileSelect}
  />
  
  <div
    class="flex flex-col items-center justify-center min-h-[220px] rounded-2xl border-2 border-dashed transition-all duration-300
    {isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/30 hover:border-blue-400 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5'}"
  >
    {#if !selectedFile}
      <div class="flex flex-col items-center text-center p-6 space-y-4" in:fade>
        <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <Upload class="w-6 h-6" />
        </div>
        <div class="space-y-1">
          <p class="text-slate-900 font-bold">{title}</p>
          <p class="text-slate-500 text-sm font-medium">{subtitle}</p>
        </div>
        {#if helperText}
          <div class="px-3 py-1 bg-slate-100 rounded-full">
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">{helperText}</span>
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex flex-col items-center text-center p-6 space-y-4 w-full" in:scale={{ start: 0.95 }}>
        <div class="w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center text-white">
          <FileText class="w-8 h-8" />
        </div>
        <div class="space-y-1 max-w-full">
          <p class="text-slate-900 font-bold truncate px-4">{selectedFile.name}</p>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wider">{formatFileSize(selectedFile.size)}</p>
        </div>
        
        <button
          onclick={removeFile}
          class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors group/btn"
        >
          <Trash2 class="w-3.5 h-3.5 group-hover/btn:shake" />
          Remove file
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes shake {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }

  :global(.group-hover\/btn\:shake) {
    animation: shake 0.2s ease-in-out infinite;
  }
</style>