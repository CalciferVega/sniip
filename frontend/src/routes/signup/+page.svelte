<script lang="ts">
  import GoogleButton from '$lib/components/GoogleButton.svelte';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 text-center">
    <div>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Join TinyAny and start shortening your links today.
      </p>
    </div>
    
    <div class="mt-8 flex justify-center">
      <GoogleButton text="Sign up with Google" />
    </div>

    <p class="text-xs text-gray-500 mt-4">
      By signing up, you agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
