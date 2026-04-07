<script lang="ts">
  import QRCode from 'qrcode';
  import DragDropUploader from '$lib/components/ui/DragDropUploader.svelte';
  import TagInput from '$lib/components/ui/TagInput.svelte';
  import { 
    Download, 
    ChevronDown, 
    ChevronUp,
    Sparkles, 
    Link2, 
    Palette, 
    Image as ImageIcon,
    X,
    Plus,
    Loader2
  } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { apiFetch } from '$lib/utils/api';
  import { toast } from '$lib/stores/toast.svelte';

  // State management using Svelte 5 runes
  let qrConfig = $state({
    url: '',
    title: '',
    tags: [] as string[],
    customSlug: '',
    domain: 'sniip.io',
    fgColor: '#000000',
    bgColor: '#ffffff',
    margin: 4
  });

  let logoFile = $state<File | null>(null);
  let canvasElement = $state<HTMLCanvasElement | null>(null);
  let isSubmitting = $state(false);

  function handleCancel() {
    goto('/dashboard');
  }

  function handleGenerateSlug() {
    qrConfig.customSlug = Math.random().toString(36).substring(2, 8);
  }

  function generatePreview() {
    if (canvasElement && (qrConfig.url || qrConfig.customSlug)) {
      // Preview strictly based on domain and slug
      const previewData = `https://${qrConfig.domain}/${qrConfig.customSlug || 'xxxxxx'}`;
      QRCode.toCanvas(canvasElement, previewData, {
        color: {
          dark: qrConfig.fgColor,
          light: qrConfig.bgColor
        },
        margin: qrConfig.margin,
        width: 250, // Fixed width for the preview canvas
        errorCorrectionLevel: 'H'
      }).catch(err => console.error('QR Generate Error:', err));
    }
  }

  /**
   * Generates the final 1000x1000px QR code as a Base64 string.
   */
  async function generateFinalImage(text: string): Promise<string> {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1000;
    finalCanvas.height = 1000;

    await QRCode.toCanvas(finalCanvas, text, {
      errorCorrectionLevel: 'H',
      width: 1000,
      margin: qrConfig.margin,
      color: {
        dark: qrConfig.fgColor,
        light: qrConfig.bgColor
      }
    });

    // Handle logo overlay for the final image if present
    if (logoFile) {
      const ctx = finalCanvas.getContext('2d');
      if (ctx) {
        const logoImg = new Image();
        logoImg.src = URL.createObjectURL(logoFile);
        
        await new Promise((resolve) => {
          logoImg.onload = resolve;
        });

        const logoSize = 200; // 20% of 1000
        const x = (1000 - logoSize) / 2;
        const y = (1000 - logoSize) / 2;

        // Draw background for logo
        ctx.fillStyle = qrConfig.bgColor;
        ctx.fillRect(x - 10, y - 10, logoSize + 20, logoSize + 20);
        
        // Draw logo
        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
      }
    }

    return finalCanvas.toDataURL('image/png');
  }

  async function handleCreateQR() {
    if (!qrConfig.url) {
      toast.error('Destination URL is required');
      return;
    }

    isSubmitting = true;
    try {
      // 1. Create the link first
      const link = await apiFetch<any>('/links', {
        method: 'POST',
        body: JSON.stringify({
          originalUrl: qrConfig.url,
          title: qrConfig.title || undefined,
          customSlug: qrConfig.customSlug || undefined,
          tags: qrConfig.tags.length > 0 ? qrConfig.tags : undefined
        })
      });

      // 2. Generate the final 1000x1000px Base64 image
      const shortUrl = `https://${qrConfig.domain}/${link.shortSlug}`;
      const base64Image = await generateFinalImage(shortUrl);

      // 3. Create the QR Code record
      await apiFetch('/qrcodes', {
        method: 'POST',
        body: JSON.stringify({
          linkId: link.id,
          designConfig: {
            fgColor: qrConfig.fgColor,
            bgColor: qrConfig.bgColor,
            margin: qrConfig.margin,
            domain: qrConfig.domain
          },
          imageUrl: base64Image
        })
      });

      toast.success('QR Code created successfully!');
      goto('/qrcodes');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create QR Code');
      console.error(err);
    } finally {
      isSubmitting = false;
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
      class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
    >
      <X size={18} />
      Cancel
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left Column: Configuration -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- 1. Destination & Details -->
      <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 sm:p-8 transition-colors">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">1</div>
          <h2 class="text-slate-800 dark:text-white font-semibold text-lg flex items-center gap-2">
            <Link2 size={20} class="text-slate-400 dark:text-gray-500" />
            QR Link Details
          </h2>
        </div>
        
        <div class="space-y-8">
          <!-- URL Input -->
          <div class="space-y-2.5">
            <label for="url" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
              Destination URL
            </label>
            <input 
              type="url" 
              id="url"
              bind:value={qrConfig.url}
              placeholder="https://example.com/promo"
              class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
            />
          </div>

          <!-- Title Input -->
          <div class="space-y-2.5">
            <label for="title" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
              Title (optional)
            </label>
            <input
              type="text"
              id="title"
              bind:value={qrConfig.title}
              placeholder="Give your QR code a title"
              class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
            />
          </div>

          <!-- Tags Input -->
          <TagInput bind:tags={qrConfig.tags} />

          <!-- Domain & Slug -->
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1.5fr] items-end gap-5">
            <div class="space-y-2.5">
              <label for="domain" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Domain
              </label>
              <div class="relative">
                <select
                  id="domain"
                  bind:value={qrConfig.domain}
                  class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="sniip.io">sniip.io</option>
                  <option value="custom.site">custom.site</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <ChevronUp class="w-4 h-4 text-slate-400 dark:text-gray-500 rotate-180" />
                </div>
              </div>
            </div>

            <div class="hidden md:flex items-center justify-center h-14 pb-2">
              <span class="text-3xl text-slate-200 dark:text-gray-800 font-extralight">/</span>
            </div>

            <div class="space-y-2.5">
              <label for="slug" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Custom back-half (optional)
              </label>
              <div class="relative group">
                <input
                  type="text"
                  id="slug"
                  bind:value={qrConfig.customSlug}
                  placeholder="custom-slug"
                  class="w-full pl-4 pr-32 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
                />
                <div class="absolute inset-y-2 right-2 flex items-center">
                  <button 
                    type="button"
                    onclick={handleGenerateSlug}
                    class="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Sparkles class="w-3.5 h-3.5" />
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Colors -->
      <section class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 p-6 transition-colors">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">2</div>
          <h2 class="text-slate-800 dark:text-white font-semibold text-lg flex items-center gap-2">
            <Palette size={20} class="text-slate-400 dark:text-gray-500" />
            Design & Colors
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
          
          <div class="bg-slate-50 dark:bg-gray-800/50 flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 dark:border-gray-800 mt-4 relative group p-8 transition-colors">
            {#if !qrConfig.url && !qrConfig.customSlug}
              <div class="w-full max-w-[180px] aspect-square mx-auto bg-slate-100 dark:bg-gray-800 flex items-center justify-center rounded-xl border border-slate-200 dark:border-gray-700">
                <span class="text-slate-400 dark:text-gray-500 text-xs font-medium text-center px-4">Enter a URL to preview</span>
              </div>
            {:else}
              <div class="relative w-full max-w-[180px] aspect-square mx-auto flex items-center justify-center shadow-lg rounded-xl overflow-hidden bg-white">
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
              onclick={handleCreateQR}
              disabled={isSubmitting || !qrConfig.url}
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
            >
              {#if isSubmitting}
                <Loader2 size={18} class="animate-spin" />
                Creating...
              {:else}
                <Sparkles size={18} class="group-hover:animate-pulse" />
                Create QR Code
              {/if}
            </button>
            
            <div class="relative group">
              <button 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <Download size={18} class="text-white" />
                  <span>Download preview</span>
                </div>
                <ChevronDown size={18} class="text-white" />
              </button>
              
              <!-- Download Dropdown -->
              <div class="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-10 transition-colors">
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 border-b border-slate-50 dark:border-gray-700 transition-colors cursor-pointer">PNG Image</button>
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 border-b border-slate-50 dark:border-gray-700 transition-colors cursor-pointer">SVG Vector</button>
                <button class="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">PDF Document</button>
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
