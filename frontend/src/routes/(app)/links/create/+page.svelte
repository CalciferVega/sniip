<script lang="ts">
  import { Upload, ChevronUp, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-svelte';
  import { apiFetch } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  import BulkUploadModal from './BulkUploadModal.svelte';

  // Svelte 5 Runes for state management
  let destination = $state('');
  let title = $state('');
  let customSlug = $state('');
  let isSubmitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);
  let bulkUploadModal = $state<ReturnType<typeof BulkUploadModal>>();

  async function handleCreateLink() {
    if (!destination) {
      error = 'Destination URL is required.';
      return;
    }

    // Basic URL validation
    try {
      new URL(destination);
    } catch {
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
          customSlug: customSlug || undefined
        })
      });

      success = true;
      // Navigate to dashboard after success feedback
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
    // Generate a 6-char random string for the UI preview
    customSlug = Math.random().toString(36).substring(2, 8);
  }
</script>

<div class="min-h-full bg-slate-50 p-4 sm:p-0">
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Create a new link</h1>
      <button 
        onclick={() => bulkUploadModal?.showModal()}
        class="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
      >
        <Upload class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        Bulk upload
      </button>
    </header>

    <BulkUploadModal bind:this={bulkUploadModal} />

    <!-- Feedback Alerts -->
    {#if error}
      <div class="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
        <AlertCircle class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm font-medium">{error}</p>
      </div>
    {/if}

    {#if success}
      <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-700 animate-in fade-in slide-in-from-top-2 duration-300">
        <CheckCircle2 class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm font-medium">Link created successfully! Redirecting...</p>
      </div>
    {/if}

    <!-- Main Card -->
    <section class="bg-white rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all">
      <div class="space-y-8">
        <!-- Section Header -->
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <h2 class="text-xl font-bold text-slate-900">Link details</h2>
            <p class="text-sm text-slate-500">
              Shorten long URLs into memorable, trackable links.
            </p>
          </div>
          <button class="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronUp class="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div class="grid grid-cols-1 gap-8">
          <!-- Destination URL -->
          <div class="space-y-2.5">
            <label for="destination" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
              Destination URL
            </label>
            <input
              type="url"
              id="destination"
              bind:value={destination}
              placeholder="https://example.com/my-long-url"
              class="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <!-- Title -->
          <div class="space-y-2.5">
            <label for="title" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
              Title (optional)
            </label>
            <input
              type="text"
              id="title"
              bind:value={title}
              placeholder="Give your link a title"
              class="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <!-- Domain & Slug Group -->
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1.5fr] items-end gap-5">
            <!-- Domain Selection -->
            <div class="space-y-2.5">
              <label for="domain" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Domain
              </label>
              <div class="relative">
                <select
                  id="domain"
                  class="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="tinyamy.com">tinyamy.com</option>
                  <option value="custom.site">custom.site</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <ChevronUp class="w-4 h-4 text-slate-400 rotate-180" />
                </div>
              </div>
            </div>

            <!-- Separator -->
            <div class="hidden md:flex items-center justify-center h-14 pb-2">
              <span class="text-3xl text-slate-200 font-extralight">/</span>
            </div>

            <!-- Slug Input -->
            <div class="space-y-2.5">
              <label for="slug" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Custom back-half (optional)
              </label>
              <div class="relative group">
                <input
                  type="text"
                  id="slug"
                  bind:value={customSlug}
                  placeholder="custom-slug"
                  class="w-full pl-4 pr-32 py-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                />
                <div class="absolute inset-y-2 right-2 flex items-center">
                  <button 
                    type="button"
                    onclick={handleGenerateSlug}
                    class="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50/50 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                  >
                    <Sparkles class="w-3.5 h-3.5" />
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
          <button 
            type="button"
            onclick={() => goto('/dashboard')}
            class="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onclick={handleCreateLink}
            disabled={isSubmitting || success}
            class="w-full sm:w-auto px-10 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
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
