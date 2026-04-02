<script lang="ts">
  import { toast } from '$lib/stores/toast.svelte';
  import { flip } from 'svelte/animate';
  import { fly, fade } from 'svelte/transition';
  import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-svelte';

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  };

  const iconColors = {
    success: 'text-green-500 dark:text-green-400',
    error: 'text-red-500 dark:text-red-400',
    warning: 'text-amber-500 dark:text-amber-400',
    info: 'text-blue-500 dark:text-blue-400'
  };
</script>

<div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
  {#each toast.toasts as t (t.id)}
    <div
      animate:flip={{ duration: 300 }}
      in:fly={{ x: 100, duration: 300 }}
      out:fade={{ duration: 200 }}
      class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md {colors[t.type]}"
    >
      <div class="mt-0.5 {iconColors[t.type]}">
        <svelte:component this={icons[t.type]} size={20} />
      </div>
      
      <div class="flex-1 text-sm font-medium leading-tight">
        {t.message}
      </div>

      <button
        onclick={() => toast.remove(t.id)}
        class="ml-auto -mr-1 -mt-1 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <X size={16} class="opacity-50" />
      </button>
    </div>
  {/each}
</div>
