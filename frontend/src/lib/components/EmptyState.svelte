<script lang="ts">
  import { Link, QrCode, Plus } from 'lucide-svelte';
  let { title, description, buttonText, href, iconType = 'link' } = $props();
</script>

<div class="flex flex-col items-center justify-center py-20 px-4 text-center transition-colors duration-300">
  <div class="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 transition-colors">
    {#if iconType === 'link'}
      <Link class="w-12 h-12 text-blue-600 dark:text-blue-400" />
    {:else if iconType === 'qr'}
      <QrCode class="w-12 h-12 text-blue-600 dark:text-blue-400" />
    {/if}
  </div>
  
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
  <p class="text-gray-600 dark:text-gray-400 max-w-md mb-8">
    {description}
  </p>
  
  <a
    {href}
    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg shadow-blue-600/20 text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
  >
    <Plus class="w-5 h-5 mr-2" strokeWidth={3} />
    {buttonText}
  </a>
</div>
