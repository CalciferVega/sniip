<script lang="ts">
  import { X, AlertTriangle } from 'lucide-svelte';

  let { 
    title = 'Confirm Action', 
    message = 'Are you sure you want to proceed?', 
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
  } = $props<{
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }>();

  let dialogElement = $state<HTMLDialogElement | null>(null);

  export const showModal = () => dialogElement?.showModal();
  export const closeModal = () => dialogElement?.close();

  function handleConfirm() {
    onConfirm();
    closeModal();
  }

  function handleCancel() {
    if (onCancel) onCancel();
    closeModal();
  }
</script>

<dialog
  bind:this={dialogElement}
  class="relative p-0 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border-none max-w-md w-full overflow-hidden backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm animate-in fade-in zoom-in duration-200"
>
  <div class="p-6 sm:p-8 space-y-6">
    <div class="flex flex-col items-center text-center space-y-4">
      <div class="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
        <AlertTriangle size={32} />
      </div>
      
      <div class="space-y-2">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        <p class="text-sm text-slate-500 dark:text-gray-400 font-medium leading-relaxed">{message}</p>
      </div>
    </div>

    <div class="flex flex-col gap-3 pt-2">
      <button
        onclick={handleConfirm}
        class="w-full py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
      >
        {confirmText}
      </button>
      <button
        onclick={handleCancel}
        class="w-full py-3 text-sm font-bold text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-all cursor-pointer"
      >
        {cancelText}
      </button>
    </div>
  </div>
</dialog>

<style>
  dialog {
    width: calc(100% - 2rem);
    margin: auto;
  }
</style>
