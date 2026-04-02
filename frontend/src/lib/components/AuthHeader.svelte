<script lang="ts">
  import { Link } from 'lucide-svelte';
</script>

<header class="absolute top-0 left-0 right-0 py-8 flex justify-center z-10">
  <a href="/" class="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
    <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
      <Link class="w-6 h-6 text-white" strokeWidth={3} />
    </div>
    <span class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Sniip</span>
  </a>
</header>
