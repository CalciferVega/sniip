<script lang="ts">
  import QRCode from 'qrcode';
  import DragDropUploader from '$lib/components/ui/DragDropUploader.svelte';
  import { 
    Download, 
    ChevronDown, 
    Sparkles, 
    Link2, 
    Palette, 
    Image as ImageIcon,
    X
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  // State management using Svelte 5 runes
  let qrConfig = $state({
    url: 'https://example.com',
    fgColor: '#000000',
    bgColor: '#ffffff',
    margin: 2
  });

  let logoFile = $state<File | null>(null);
  let canvasElement = $state<HTMLCanvasElement | null>(null);

  function handleCancel() {
    goto('/dashboard');
  }

  function generatePreview() {
    if (canvasElement && qrConfig.url) {
      QRCode.toCanvas(canvasElement, qrConfig.url, {
        color: {
          dark: qrConfig.fgColor,
          light: qrConfig.bgColor
        },
        margin: qrConfig.margin
      }).catch(err => console.error('QR Generate Error:', err));
    }
  }

  $effect(() => {
    // Svelte 5 will track dependencies read inside generatePreview
    generatePreview();
  });
</script>

<div class="min-h-full bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
  <!-- Page Header -->
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Create a new QR code</h1>
    <button 
      onclick={handleCancel}
      class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20"
    >
      <X size={18} />
      Cancel
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left Column: Configuration -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- 1. Destination -->
      <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 transition-colors">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">1</div>
          <h2 class="text-slate-800 dark:text-white font-semibold text-lg flex items-center gap-2">
            <Link2 size={20} class="text-slate-400 dark:text-gray-500" />
            Destination
          </h2>
        </div>
        
        <div class="space-y-2">
          <label for="url" class="block text-sm font-medium text-slate-700 dark:text-gray-300">Destination URL</label>
          <input 
            type="url" 
            id="url"
            bind:value={qrConfig.url}
            placeholder="https://example.com/promo"
            class="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500"
          />
        </div>
      </section>

      <!-- 2. Colors -->
      <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 transition-colors">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">2</div>
          <h2 class="text-slate-800 dark:text-white font-semibold text-lg flex items-center gap-2">
            <Palette size={20} class="text-slate-400 dark:text-gray-500" />
            Colors
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Foreground Color -->
          <div class="space-y-3">
            <label for="qrColor" class="block text-sm font-medium text-slate-700 dark:text-gray-300">QR Color (Foreground)</label>
            <div class="flex items-center gap-3 p-2 border border-slate-300 dark:border-gray-700 rounded-md bg-slate-50/30 dark:bg-gray-800/50">
              <div 
                class="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 shadow-inner relative overflow-hidden"
                style="background-color: {qrConfig.fgColor}"
              >
                <input 
                  type="color" 
                  bind:value={qrConfig.fgColor}
                  class="absolute inset-0 opacity-0 cursor-pointer scale-150"
                />
              </div>
              <input 
                type="text" 
                bind:value={qrConfig.fgColor}
                class="flex-1 bg-transparent border-none text-slate-700 dark:text-gray-200 font-mono text-sm uppercase focus:ring-0"
              />
            </div>
          </div>

          <!-- Background Color -->
          <div class="space-y-3">
            <label for="bgColor" class="block text-sm font-medium text-slate-700 dark:text-gray-300">Background Color</label>
            <div class="flex items-center gap-3 p-2 border border-slate-300 dark:border-gray-700 rounded-md bg-slate-50/30 dark:bg-gray-800/50">
              <div 
                class="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 shadow-inner relative overflow-hidden"
                style="background-color: {qrConfig.bgColor}"
              >
                <input 
                  type="color" 
                  bind:value={qrConfig.bgColor}
                  class="absolute inset-0 opacity-0 cursor-pointer scale-150"
                />
              </div>
              <input 
                type="text" 
                bind:value={qrConfig.bgColor}
                class="flex-1 bg-transparent border-none text-slate-700 dark:text-gray-200 font-mono text-sm uppercase focus:ring-0"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Logo Overlay -->
      <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 transition-colors">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">3</div>
          <h2 class="text-slate-800 dark:text-white font-semibold text-lg flex items-center gap-2">
            <ImageIcon size={20} class="text-slate-400 dark:text-gray-500" />
            Logo Overlay (Optional)
          </h2>
        </div>

        <DragDropUploader 
          accept="image/png, image/jpeg, image/svg+xml"
          title="Drag and drop your logo"
          helperText="Max file size: 2MB. Recommended: 400x400px square."
          maxSizeMB={2}
          bind:selectedFile={logoFile}
        />
      </section>
    </div>

    <!-- Right Column: Sticky Preview -->
    <div class="lg:col-span-1">
      <div class="lg:sticky lg:top-8 space-y-6">
        <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 transition-colors">
          <h3 class="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">Preview</h3>
          
          <div class="aspect-square bg-slate-50 dark:bg-gray-800/50 flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 dark:border-gray-800 mt-4 relative group p-4 transition-colors">
            {#if !qrConfig.url}
              <div class="w-full max-w-[250px] aspect-square mx-auto bg-slate-100 dark:bg-gray-800 flex items-center justify-center rounded-xl border border-slate-200 dark:border-gray-700">
                <span class="text-slate-400 dark:text-gray-500 text-sm font-medium text-center px-4">Enter a URL to preview</span>
              </div>
            {:else}
              <div class="relative w-full max-w-[250px] aspect-square mx-auto flex items-center justify-center">
                <canvas bind:this={canvasElement} class="w-full aspect-square"></canvas>
                {#if logoFile}
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="w-1/4 h-1/4 bg-white dark:bg-gray-900 rounded-lg border border-slate-200 dark:border-gray-700 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                      <img src={URL.createObjectURL(logoFile)} alt="Logo overlay" class="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
            
            <p class="mt-4 text-xs text-slate-400 dark:text-gray-500 text-center px-4 italic">
              Actual QR will be generated after creation
            </p>
          </div>

          <div class="mt-8 space-y-3">
            <button 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <Sparkles size={18} class="group-hover:animate-pulse" />
              Create QR Code
            </button>
            
            <div class="relative group">
              <button 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between group active:scale-[0.98]"
              >
                <div class="flex items-center gap-2">
                  <Download size={18} class="text-white" />
                  <span>Download preview</span>
                </div>
                <ChevronDown size={18} class="text-white" />
              </button>
              
              <!-- Download Dropdown -->
              <div class="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-10 transition-colors">
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 border-b border-slate-50 dark:border-gray-700 transition-colors">PNG Image</button>
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 border-b border-slate-50 dark:border-gray-700 transition-colors">SVG Vector</button>
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">PDF Document</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Dynamic Tip/Info Card -->
        <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30 transition-colors">
          <h4 class="text-amber-800 dark:text-amber-400 text-sm font-bold flex items-center gap-2 mb-2">
            💡 Pro Tip
          </h4>
          <p class="text-amber-700/80 dark:text-amber-500/80 text-xs leading-relaxed">
            High contrast between foreground and background ensures the best scanning experience. Avoid using light colors for the QR code itself.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom color input styling to remove native border/padding */
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 9999px;
  }
  input[type="color"]::-moz-color-swatch {
    border: none;
    border-radius: 9999px;
  }
</style>
