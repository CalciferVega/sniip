<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
</script>

<div class="max-w-4xl mx-auto">
  <EmptyState
    title="No QR codes generated"
    description="Generate dynamic QR codes for your links. Customize colors, add logos, and track scans in real-time."
    buttonText="Generate your first QR code"
    href="/qrcodes/create"
    iconType="qr"
  />
</div>
