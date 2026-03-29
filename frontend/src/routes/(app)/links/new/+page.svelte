<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
</script>

<div class="max-w-4xl mx-auto">
  <EmptyState
    title="You don't have any links yet"
    description="Create your first short link to start tracking clicks, geographic data, and more. It only takes a few seconds."
    buttonText="Create your first link"
    href="/links/create"
    iconType="link"
  />
</div>
