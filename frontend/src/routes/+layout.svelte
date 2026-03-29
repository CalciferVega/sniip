<script lang="ts">
  import { onMount } from 'svelte';
  import { initAuth } from '$lib/stores/auth';
  import { darkMode } from '$lib/stores/darkMode.svelte';
  import '../app.css';

  let { children } = $props();

  onMount(() => {
    initAuth();
  });
</script>

{@render children()}
