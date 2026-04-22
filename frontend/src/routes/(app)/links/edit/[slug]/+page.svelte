<script lang="ts">
  import { ChevronUp, Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import TagInput from '$lib/components/ui/TagInput.svelte';

  const slug = page.params.slug;

  // State
  let destination = $state('');
  let title = $state('');
  let tags = $state<string[]>([]);
  let domain = $state('sniip.io');
  let currentSlug = $state(slug);
  
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

  async function fetchLinkData() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const cleanSlug = slug.trim();

      const { data, error: dbError } = await supabase
        .from('links')
        .select('*')
        .eq('short_slug', cleanSlug)
        .maybeSingle();

      if (dbError) throw dbError;
      
      if (!data) {
        error = `Link with slug "${cleanSlug}" not found.`;
        isLoading = false;
        return;
      }

      // Check ownership manually to distinguish between "not found" and "unauthorized"
      if (data.user_id !== user.id) {
        error = 'You do not have permission to edit this link.';
        isLoading = false;
        return;
      }

      // Map snake_case from DB to local state
      destination = data.original_url || '';
      title = data.title || '';
      tags = data.tags || [];
      domain = data.domain || 'sniip.io';
      currentSlug = data.short_slug;
    } catch (err: any) {
      error = err.message || 'Failed to load link data';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchLinkData();
  });

  async function handleUpdateLink() {
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

      const { error: dbError } = await supabase
        .from('links')
        .update({
          original_url: destination,
          title: title || null,
          tags: tags.length > 0 ? tags : []
        })
        .eq('short_slug', slug.trim())
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      success = true;
      setTimeout(() => {
        goto('/links');
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
      <h1 class="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Edit link</h1>
    </header>

    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 class="w-12 h-12 animate-spin text-blue-600" />
        <p class="text-slate-500 font-bold animate-pulse">Loading link details...</p>
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
          <p class="text-sm font-medium">Link updated successfully! Redirecting...</p>
        </div>
      {/if}

      <section class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-blue-900/5 border border-slate-100 dark:border-gray-800 transition-all">
        <div class="space-y-8">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Link details</h2>
              <p class="text-sm text-slate-500 dark:text-gray-400">
                Update your link information. Note that the domain and back-half cannot be changed.
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
                placeholder="Give your link a title"
                class="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50/30 dark:bg-gray-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all"
              />
            </div>

            <TagInput bind:tags={tags} />

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1.5fr] items-end gap-5 opacity-60 grayscale">
                <div class="space-y-2.5">
                  <label for="domain" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                    Domain
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="domain"
                      value={domain}
                      disabled
                      class="w-full px-4 py-4 rounded-xl border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-800 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div class="hidden md:flex items-center justify-center h-14 pb-2">
                  <span class="text-3xl text-slate-200 dark:text-gray-800 font-extralight">/</span>
                </div>

                <div class="space-y-2.5">
                  <label for="slug" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                    Custom back-half
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={currentSlug}
                    disabled
                    class="w-full px-4 py-4 rounded-xl border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-800 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div class="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
                <Info class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  <strong>Domain and Back-half are permanent.</strong> Once created, these identifiers cannot be modified to ensure your existing links never break.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-8 border-t border-slate-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            <button 
              type="button"
              onclick={() => goto('/links')}
              class="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-transparent dark:border-gray-800 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onclick={handleUpdateLink}
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
