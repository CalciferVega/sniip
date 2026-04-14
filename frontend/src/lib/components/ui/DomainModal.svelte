<script lang="ts">
  import { X, Globe, Plus, AlertCircle, CheckCircle2, Trash2, Loader2, Info, ExternalLink, Copy, Check } from 'lucide-svelte';
  import { apiFetch } from '$lib/utils/api.js';
  import { fade, scale, fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  interface Domain {
    id: string;
    hostname: string;
    verified: boolean;
    createdAt: string;
  }

  let dialogElement = $state<HTMLDialogElement | null>(null);
  let domains = $state<Domain[]>([]);
  let newHostname = $state('');
  let isLoading = $state(false);
  let isAdding = $state(false);
  let error = $state<string | null>(null);
  let success = $state<string | null>(null);
  let verifyingId = $state<string | null>(null);
  let copied = $state(false);
  let isOpen = $state(false);

  export const showModal = () => {
    isOpen = true;
    dialogElement?.showModal();
    fetchDomains();
  };

  export const closeModal = () => {
    dialogElement?.close();
  };

  async function fetchDomains() {
    isLoading = true;
    try {
      domains = await apiFetch<Domain[]>('/domains');
    } catch (err: any) {
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  async function handleAddDomain() {
    if (!newHostname) return;
    
    isAdding = true;
    error = null;
    try {
      const newDomain = await apiFetch<Domain>('/domains', {
        method: 'POST',
        body: JSON.stringify({ hostname: newHostname })
      });
      domains = [newDomain, ...domains];
      newHostname = '';
      success = 'Domain registered! Update your DNS to verify.';
      setTimeout(() => success = null, 5000);
    } catch (err: any) {
      error = err.message;
    } finally {
      isAdding = false;
    }
  }

  async function verifyDomain(id: string) {
    verifyingId = id;
    error = null;
    try {
      const result = await apiFetch<{ success: boolean, domain: Domain }>(`/domains/${id}/verify`, {
        method: 'POST'
      });
      
      if (result.success) {
        domains = domains.map(d => d.id === id ? result.domain : d);
        success = 'Domain verified successfully!';
        setTimeout(() => success = null, 3000);
      }
    } catch (err: any) {
      error = err.message;
    } finally {
      verifyingId = null;
    }
  }

  async function deleteDomain(id: string) {
    if (!confirm('Remove this domain? This will affect any links using it.')) return;
    
    try {
      await apiFetch(`/domains/${id}`, { method: 'DELETE' });
      domains = domains.filter(d => d.id !== id);
    } catch (err: any) {
      error = err.message;
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText('cname.sniip.io');
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function handleReset() {
    isOpen = false;
    newHostname = '';
    error = null;
    success = null;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogElement}
  onclick={(e) => e.target === dialogElement && closeModal()}
  onclose={handleReset}
  class="m-auto p-0 bg-transparent overflow-visible backdrop:bg-slate-900/90 backdrop:backdrop-blur-md group outline-none"
>
  {#if isOpen}
    <div 
      transition:scale={{ duration: 400, start: 0.95, easing: backOut }}
      class="relative w-[calc(100vw-2rem)] max-w-2xl bg-white dark:bg-gray-950 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200/60 dark:border-gray-800/60 overflow-hidden flex flex-col max-h-[85vh]"
    >
      <!-- Header -->
      <header class="relative p-8 pb-6 flex items-center justify-between border-b border-slate-100 dark:border-gray-800/50 bg-linear-to-b from-slate-50/50 to-white dark:from-gray-900/50 dark:to-gray-950">
        <div class="flex items-center gap-5">
          <div class="relative">
            <div class="absolute inset-0 bg-blue-600 blur-xl opacity-20"></div>
            <div class="relative w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Globe size={28} strokeWidth={2.2} />
            </div>
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Custom Domains</h2>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">Enterprise Feature</p>
            </div>
          </div>
        </div>
        <button 
          onclick={closeModal}
          class="p-3 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90 cursor-pointer"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </header>

      <div class="flex-1 overflow-y-auto p-8 space-y-10">
        <!-- Add Domain Input Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <label for="hostname" class="text-[10px] font-black uppercase text-slate-400 dark:text-gray-500 tracking-[0.2em]">Add new hostname</label>
            <span class="text-[10px] font-medium text-slate-400 dark:text-gray-600 italic">e.g. links.mybrand.com</span>
          </div>
          <div class="relative group">
            <input
              id="hostname"
              type="text"
              bind:value={newHostname}
              placeholder="Enter your custom domain..."
              class="w-full pl-6 pr-44 py-5 rounded-[1.5rem] border border-slate-200 dark:border-gray-800 bg-slate-50/30 dark:bg-gray-900/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all font-bold text-lg"
            />
            <div class="absolute inset-y-2 right-2 flex items-center">
              <button
                onclick={handleAddDomain}
                disabled={!newHostname || isAdding}
                class="h-full px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center gap-3 cursor-pointer"
              >
                {#if isAdding}
                  <Loader2 size={16} class="animate-spin" />
                {:else}
                  <Plus size={16} strokeWidth={3} />
                {/if}
                Register
              </button>
            </div>
          </div>

          {#if error}
            <div transition:fly={{ y: -10, duration: 400 }} class="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle size={18} />
              <p class="text-sm font-bold">{error}</p>
            </div>
          {/if}

          {#if success}
            <div transition:fly={{ y: -10, duration: 400 }} class="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={18} />
              <p class="text-sm font-bold">{success}</p>
            </div>
          {/if}
        </section>

        <!-- DNS Configuration Card -->
        <section class="relative overflow-hidden bg-slate-900 dark:bg-black rounded-[2rem] p-8 shadow-2xl border border-white/5">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
          
          <div class="relative z-10 space-y-6">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Info size={18} strokeWidth={2.5} />
              </div>
              <h3 class="font-black text-xs uppercase tracking-[0.15em] text-white">DNS Configuration Guide</h3>
            </div>
            
            <p class="text-sm text-slate-400 leading-relaxed font-medium">
              Point your domain to our servers by creating the following record in your DNS provider (Cloudflare, AWS, etc).
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <span class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Record Type</span>
                <div class="px-5 py-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm font-black text-blue-400">CNAME</div>
              </div>
              <div class="space-y-2">
                <span class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Target Value</span>
                <div class="relative group/copy">
                  <div class="px-5 py-4 pr-12 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm font-black text-blue-400 overflow-hidden text-ellipsis">cname.sniip.io</div>
                  <button 
                    onclick={handleCopy}
                    class="absolute inset-y-0 right-0 px-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {#if copied}
                      <Check size={16} class="text-emerald-400" />
                    {:else}
                      <Copy size={16} />
                    {/if}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Domain List -->
        <section class="space-y-6 pb-4">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">Registered Domains</h3>
            {#if domains.length > 0}
              <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400">{domains.length} Active</span>
            {/if}
          </div>
          
          <div class="space-y-4">
            {#if isLoading}
              {#each Array(2) as _}
                <div class="h-24 bg-slate-50 dark:bg-gray-900 rounded-[2rem] animate-pulse border border-slate-100 dark:border-gray-800"></div>
              {/each}
            {:else if domains.length === 0}
              <div class="py-16 text-center space-y-4 bg-slate-50/50 dark:bg-gray-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-gray-800">
                <div class="w-20 h-20 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto text-slate-200 dark:text-gray-700 shadow-sm">
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div class="space-y-1">
                  <p class="text-base font-bold text-slate-900 dark:text-white">No custom domains</p>
                  <p class="text-sm text-slate-400 font-medium">Your links will use sniip.io by default.</p>
                </div>
              </div>
            {:else}
              {#each domains as domain (domain.id)}
                <div 
                  transition:fly={{ y: 20, duration: 400 }}
                  class="flex items-center justify-between p-6 bg-white dark:bg-gray-900/50 rounded-[2rem] border border-slate-200/60 dark:border-gray-800 group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all"
                >
                  <div class="flex items-center gap-5">
                    <div class="relative">
                      <div class="w-14 h-14 rounded-2xl {domain.verified ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-gray-800 text-slate-400 dark:text-gray-600'} flex items-center justify-center transition-colors">
                        {#if domain.verified}
                          <CheckCircle2 size={24} strokeWidth={2.2} />
                        {:else}
                          <Globe size={24} strokeWidth={2.2} />
                        {/if}
                      </div>
                      {#if !domain.verified}
                        <div class="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      {/if}
                    </div>
                    <div class="space-y-1">
                      <p class="text-slate-900 dark:text-white font-black text-lg tracking-tight leading-none">{domain.hostname}</p>
                      <div class="flex items-center gap-3">
                        <span class="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md {domain.verified ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}">
                          {domain.verified ? 'Verified' : 'Pending'}
                        </span>
                        <span class="text-[10px] text-slate-300 dark:text-gray-700 font-medium">{new Date(domain.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    {#if !domain.verified}
                      <button
                        onclick={() => verifyDomain(domain.id)}
                        disabled={verifyingId === domain.id}
                        class="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
                      >
                        {#if verifyingId === domain.id}
                          <Loader2 size={12} class="animate-spin" />
                        {/if}
                        Verify
                      </button>
                    {/if}
                    <button 
                      onclick={() => deleteDomain(domain.id)}
                      class="p-3 text-slate-300 hover:text-red-500 dark:text-gray-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all active:scale-90 cursor-pointer"
                    >
                      <Trash2 size={20} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </section>
      </div>

      <!-- Footer Action -->
      <footer class="p-8 bg-slate-50/50 dark:bg-gray-900/50 border-t border-slate-100 dark:border-gray-800 flex justify-center">
          <button
            onclick={closeModal}
            class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Close Settings
          </button>
      </footer>
    </div>
  {/if}
</dialog>

<style>
  dialog::backdrop {
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
  }

  /* Custom Scrollbar for a more professional look */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
  }
  :global(.dark) .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
  }
</style>
