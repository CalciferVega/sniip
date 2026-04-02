<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  interface Props {
    used: number;
    total: number;
    plan: 'free' | 'pro';
    resetDate?: string;
  }

  let { used = 2, total = 25, plan = 'free', resetDate = 'Apr 25, 2026' }: Props = $props();

  const percentage = $derived(Math.min((used / total) * 100, 100));
</script>

<div class="space-y-4 px-1">
  <div class="flex items-center justify-between">
    <span class="text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">
      Usage
    </span>
  </div>

  <div class="space-y-3">
    <div class="space-y-2">
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-gray-600 dark:text-gray-400">Links</span>
        <span class="text-gray-900 dark:text-gray-200">{used} <span class="text-gray-400 font-medium">/ {total}</span></span>
      </div>
      <div class="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden p-[1px]">
        <div 
          class="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          style="width: {percentage}%"
        ></div>
      </div>
    </div>

    {#if plan === 'free'}
      <button
        class="w-full py-2.5 px-3 text-xs font-black text-amber-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
      >
        <span class="relative z-10">Upgrade to Pro</span>
        <ArrowRight class="w-3.5 h-3.5 relative z-10 transform group-hover:translate-x-0.5 transition-transform text-amber-950" strokeWidth={3} />
        <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
      </button>
    {/if}

    <p class="text-[10px] text-center font-medium text-gray-400 dark:text-gray-500 pt-1">
      Usage will reset <span class="text-gray-600 dark:text-gray-400 font-bold">{resetDate}</span>
    </p>
  </div>
</div>

<style>
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }
</style>
