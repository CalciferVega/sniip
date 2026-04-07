<script lang="ts">
  import { Upload, ChevronUp, Sparkles, Loader2, AlertCircle, CheckCircle2, Plus } from 'lucide-svelte';
  import { apiFetch } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  import BulkUploadModal from './BulkUploadModal.svelte';
  import UTMModal from './UTMModal.svelte';
  import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
  import TagInput from '$lib/components/ui/TagInput.svelte';

  // Svelte 5 Runes for state management
  let destination = $state('');
  let title = $state('');
  let tags = $state<string[]>([]);
  let customSlug = $state('');
  let isSubmitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);
  let bulkUploadModal = $state<ReturnType<typeof BulkUploadModal>>();
  let utmModal = $state<ReturnType<typeof UTMModal>>();
  let confirmModal = $state<ReturnType<typeof ConfirmModal>>();
  let pendingUtms = $state<any>(null);

  // Validation derived state
  const isUrlValid = $derived.by(() => {
    try {
      new URL(destination);
      return true;
    } catch {
      return false;
    }
  });

  async function handleCreateLink() {
    if (!destination) {
      error = 'Destination URL is required.';
      return;
    }

    if (!isUrlValid) {
      error = 'Please enter a valid URL (e.g., https://example.com)';
      return;
    }

    isSubmitting = true;
    error = null;
    success = false;

    try {
      await apiFetch('/links', {
        method: 'POST',
        body: JSON.stringify({
          originalUrl: destination,
          title: title || undefined,
          customSlug: customSlug || undefined,
          tags: tags.length > 0 ? tags : undefined
        })
      });

      success = true;
      setTimeout(() => {
        goto('/dashboard');
      }, 1200);
    } catch (err: any) {
      error = err.message || 'Something went wrong. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function handleGenerateSlug() {
    customSlug = Math.random().toString(36).substring(2, 8);
  }

  function handleUTMAdd(utmString: string) {
    if (!destination) return;
    
    try {
        const url = new URL(destination);
        // Create a new URL without the old UTMs if we want to replace them
        // or just append if they don't exist.
        // The most robust way is to rebuild the search params.
        
        // 1. Get base URL (origin + pathname)
        const baseUrl = url.origin + url.pathname;
        const params = new URLSearchParams(url.search);
        
        // 2. Remove existing UTMs
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        utmKeys.forEach(key => params.delete(key));
        
        // 3. Add new ones
        if (utmString) {
            const newParams = new URLSearchParams(utmString);
            newParams.forEach((value, key) => params.append(key, value));
        }
        
        const finalParams = params.toString();
        destination = baseUrl + (finalParams ? '?' + finalParams : '') + url.hash;
    } catch {
        // Fallback for non-standard URLs
        const connector = destination.includes('?') ? '&' : '?';
        destination = destination + connector + utmString;
    }
  }

  function handleOpenUTM() {
    if (!isUrlValid) return;
    
    try {
        const url = new URL(destination);
        const params = new URLSearchParams(url.search);
        
        const existingUtms = {
            source: params.get('utm_source') || '',
            medium: params.get('utm_medium') || '',
            campaign: params.get('utm_campaign') || '',
            term: params.get('utm_term') || '',
            content: params.get('utm_content') || ''
        };

        const hasUtms = Object.values(existingUtms).some(v => v !== '');
        
        if (hasUtms) {
            pendingUtms = existingUtms;
            confirmModal?.showModal();
        } else {
            utmModal?.showModal();
        }
    } catch {
        utmModal?.showModal();
    }
  }
</script>

<div class="min-h-full bg-slate-50 dark:bg-gray-950 p-4 sm:p-0 transition-colors duration-300">
  <div class="max-w-4xl mx-auto space-y-6">
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 class="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Create a new link</h1>
      <button 
        onclick={() => bulkUploadModal?.showModal()}
        class="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
      >
        <Upload class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        Bulk upload
      </button>
    </header>

    <BulkUploadModal bind:this={bulkUploadModal} />
    <UTMModal bind:this={utmModal} onAdd={handleUTMAdd} />
    <ConfirmModal 
        bind:this={confirmModal}
        title="Edit existing UTMs?"
        message="This URL already contains tracking parameters. Do you want to modify them?"
        confirmText="Edit UTMs"
        cancelText="Keep as is"
        onConfirm={() => utmModal?.showModal(pendingUtms)}
    />

    {#if error}
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
        <AlertCircle class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm font-medium">{error}</p>
      </div>
    {/if}

    {#if success}
      <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-300">
        <CheckCircle2 class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm font-medium">Link created successfully! Redirecting...</p>
      </div>
    {/if}

    <section class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-blue-900/5 border border-slate-100 dark:border-gray-800 transition-all">
      <div class="space-y-8">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Link details</h2>
            <p class="text-sm text-slate-500 dark:text-gray-400">
              Shorten long URLs into memorable, trackable links.
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
            <div class="relative group">
              <input
                type="url"
                id="destination"
                bind:value={destination}
                placeholder="https://example.com/my-long-url"
                class="w-full pl-4 pr-32 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
              />
              <div class="absolute inset-y-2 right-2 flex items-center">
                <button 
                  type="button"
                  onclick={handleOpenUTM}
                  disabled={!isUrlValid}
                  class="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
                >
                  <Plus class="w-3.5 h-3.5" strokeWidth={3} />
                  Add UTMs
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-2.5">
            <label for="title" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
              Title (optional)
            </label>
            <input
              type="text"
              id="title"
              bind:value={title}
              placeholder="Give your link a title"
              class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
            />
          </div>

          <TagInput bind:tags={tags} />

          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1.5fr] items-end gap-5">
            <div class="space-y-2.5">
              <label for="domain" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Domain
              </label>
              <div class="relative">
                <select
                  id="domain"
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
                  bind:value={customSlug}
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

        <div class="pt-8 border-t border-slate-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
          <button 
            type="button"
            onclick={() => goto('/dashboard')}
            class="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-transparent dark:border-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onclick={handleCreateLink}
            disabled={isSubmitting || success || !destination}
            class="w-full sm:w-auto px-10 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-gray-800 dark:disabled:text-gray-600 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            {#if isSubmitting}
              <Loader2 class="w-4 h-4 animate-spin" />
              Creating...
            {:else}
              Create Link
            {/if}
          </button>
        </div>
      </div>
    </section>
  </div>
</div>
