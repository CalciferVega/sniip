<script lang="ts">
  import { Sparkles, Check, ArrowRight, X,Zap, BarChart3, Globe, QrCode } from 'lucide-svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  interface Props {
    title?: string;
    message?: string;
  }

  let { 
    title = "You've reached your link limit", 
    message = "Upgrade to Sniip Pro to unlock unlimited links, custom domains, and advanced analytics." 
  }: Props = $props();

  let dialog: HTMLDialogElement;
  let isOpen = $state(false);

  export function showModal() {
    isOpen = true;
    dialog.showModal();
  }

  export function close() {
    dialog.close();
  }

  const features = [
    { icon: Zap, text: "1000 links and 500 QRs", color: "text-amber-500" },
    { icon: Globe, text: "Custom Branded Domains", color: "text-blue-500" },
    { icon: BarChart3, text: "Deep Analytics & Geolocation", color: "text-emerald-500" },
    { icon: QrCode, text: "High-Resolution QR Assets", color: "text-purple-500" }
  ];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  onclick={(e) => e.target === dialog && close()}
  onclose={() => isOpen = false}
  class="m-auto p-0 bg-transparent overflow-visible backdrop:bg-slate-900/80 backdrop:backdrop-blur-sm group outline-none"
>
  {#if isOpen}
    <div 
      transition:scale={{ duration: 400, start: 0.9, easing: backOut }}
      class="relative w-[calc(100vw-2rem)] max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden"
    >
      <!-- Rainbow Glass Header Decor -->
      <div class="absolute top-0 left-0 right-0 h-32 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 blur-3xl -translate-y-16"></div>
      
      <!-- Close Button -->
      <button 
        onclick={close}
        class="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors z-20 cursor-pointer"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="relative z-10 p-8 sm:p-10 pt-12 text-center space-y-8">
        <!-- Animated Icon Container -->
        <div class="flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse"></div>
            <div class="relative w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Sparkles class="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {title}
          </h2>
          <p class="text-slate-500 dark:text-gray-400 font-medium">
            {message}
          </p>
        </div>

        <!-- Feature List -->
        <div class="grid grid-cols-1 gap-4 text-left bg-slate-50/50 dark:bg-gray-800/40 p-6 rounded-3xl border border-slate-100 dark:border-gray-800">
          {#each features as feature, i}
            <div 
              transition:fly={{ x: -20, delay: 100 * i, duration: 400 }}
              class="flex items-center gap-3"
            >
              <div class="p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                <feature.icon class="w-4 h-4 {feature.color}" strokeWidth={2.5} />
              </div>
              <span class="text-sm font-bold text-slate-700 dark:text-gray-300">{feature.text}</span>
              <Check class="w-4 h-4 text-emerald-500 ml-auto" strokeWidth={3} />
            </div>
          {/each}
        </div>

        <!-- CTA Action -->
        <div class="space-y-4 pt-2">
          <button
            class="w-full py-4 px-8 text-base font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
          >
            <span class="relative z-10">Upgrade to Sniip Pro</span>
            <ArrowRight class="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            
            <!-- Animated Shimmer -->
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
          
          <button 
            onclick={close}
            class="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  {/if}
</dialog>

<style>
  dialog::backdrop {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(4px);
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }
</style>
