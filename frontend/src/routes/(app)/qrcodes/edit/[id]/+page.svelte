<script lang="ts">
  import { ChevronUp, Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import TagInput from '$lib/components/ui/TagInput.svelte';
  import QRCode from 'qrcode';

  const id = page.params.id;

  // State
  let destination = $state('');
  let title = $state('');
  let tags = $state<string[]>([]);
  let designConfig = $state<any>(null);
  let linkId = $state('');
  let domain = $state('sniip.io');
  let shortSlug = $state('');
  
  let isLoading = $state(true);
  let isSubmitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);

  // Validation derived state
  const isUrlValid = $derived.by(() => {
    try {
      new URL(destination);
      return true;
    } catch {
      return false;
    }
  });

  async function fetchQrData() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const { data, error: dbError } = await supabase
        .from('qr_codes')
        .select('*, link:links!inner(*)')
        .eq('id', id)
        .maybeSingle();

      if (dbError) throw dbError;
      
      if (!data) {
        error = 'QR Code not found.';
        isLoading = false;
        return;
      }

      if (data.link.user_id !== user.id) {
        error = 'You do not have permission to edit this QR code.';
        isLoading = false;
        return;
      }

      // Populate state
      linkId = data.link_id;
      destination = data.link.original_url;
      title = data.link.title || '';
      tags = data.link.tags || [];
      designConfig = data.design_config;
      domain = data.link.domain || 'sniip.io';
      shortSlug = data.link.short_slug;

    } catch (err: any) {
      error = err.message || 'Failed to load QR data';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchQrData();
  });

  /**
   * Generates a new 1000x1000px QR code if needed.
   */
  async function generateNewImage(text: string): Promise<string> {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1000;
    finalCanvas.height = 1000;

    await QRCode.toCanvas(finalCanvas, text, {
      errorCorrectionLevel: 'H',
      width: 1000,
      margin: designConfig?.margin || 4,
      color: {
        dark: designConfig?.fgColor || '#000000',
        light: designConfig?.bgColor || '#ffffff'
      }
    });

    return finalCanvas.toDataURL('image/png');
  }

  async function handleUpdateQR() {
    if (!destination) {
      error = 'Destination URL is required.';
      return;
    }

    isSubmitting = true;
    error = null;
    success = false;

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      // 1. Update the Link first
      const { data: updatedLink, error: linkUpdateError } = await supabase
        .from('links')
        .update({
          original_url: destination,
          title: title || null,
          tags: tags.length > 0 ? tags : []
        })
        .eq('id', linkId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (linkUpdateError) throw linkUpdateError;

      // 2. Since Destination Link changed, we should regenerate the QR if it's dynamic
      // Actually, if it's dynamic (points to sniip.io/slug), the image doesn't NEED to change
      // because the slug remains the same.
      // But if the design config WAS editable (it's not here), or if the user changed the slug (not allowed)...
      // If the destination URL changed, the short link redirection target changes in the DB, 
      // but the QR code image (pointing to sniip.io/slug) stays valid!
      // So we don't strictly need to regenerate the image unless the user wants to change design.
      
      success = true;
      setTimeout(() => {
        goto('/qrcodes');
      }, 1200);
    } catch (err: any) {
      error = err.message || 'Something went wrong. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="min-h-full bg-slate-50 dark:bg-gray-950 p-4 sm:p-0 transition-colors duration-300">
  <div class="max-w-4xl mx-auto space-y-6">
    <header>
      <h1 class="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Edit QR code</h1>
    </header>

    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 class="w-12 h-12 animate-spin text-blue-600" />
        <p class="text-slate-500 font-bold animate-pulse">Loading QR details...</p>
      </div>
    {:else}
      {#if error && !success}
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle class="w-5 h-5 flex-shrink-0" />
          <p class="text-sm font-medium">{error}</p>
        </div>
      {/if}

      {#if success}
        <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 class="w-5 h-5 flex-shrink-0" />
          <p class="text-sm font-medium">QR Code updated successfully! Redirecting...</p>
        </div>
      {/if}

      <section class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-blue-900/5 border border-slate-100 dark:border-gray-800 transition-all">
        <div class="space-y-8">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">QR Details</h2>
              <p class="text-sm text-slate-500 dark:text-gray-400">
                Update your QR code information. Note that visual design and short slug cannot be changed.
              </p>
            </div>
            <button class="p-2 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <ChevronUp class="w-5 h-5 text-slate-400 dark:text-gray-500" />
            </button>
          </div>

          <div class="grid grid-cols-1 gap-8">
            <div class="space-y-2.5">
              <label for="destination" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Destination URL
              </label>
              <input
                type="url"
                id="destination"
                bind:value={destination}
                placeholder="https://example.com/my-long-url"
                class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
              />
            </div>

            <div class="space-y-2.5">
              <label for="title" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Title (optional)
              </label>
              <input
                type="text"
                id="title"
                bind:value={title}
                placeholder="Give your QR code a title"
                class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
              />
            </div>

            <TagInput bind:tags={tags} />

            <div class="space-y-4">
               <div class="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
                <Info class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  <strong>Design and Back-half are permanent.</strong> The QR code image remains the same because it points to your permanent short link (<code>{domain}/{shortSlug}</code>).
                </p>
              </div>
            </div>
          </div>

          <div class="pt-8 border-t border-slate-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            <button 
              type="button"
              onclick={() => goto('/qrcodes')}
              class="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-transparent dark:border-gray-800 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onclick={handleUpdateQR}
              disabled={isSubmitting || success || !destination}
              class="w-full sm:w-auto px-10 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-gray-800 dark:disabled:text-gray-600 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {#if isSubmitting}
                <Loader2 class="w-4 h-4 animate-spin" />
                Saving...
              {:else}
                Save and Apply
              {/if}
            </button>
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>
