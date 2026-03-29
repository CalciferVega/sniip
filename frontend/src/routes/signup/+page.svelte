<script lang="ts">
  import GoogleButton from '$lib/components/GoogleButton.svelte';
  import EmailSignup from '$lib/components/EmailSignup.svelte';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-md w-full space-y-8 flex flex-col items-center">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
        Create your account
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Join Sniip and start shortening your links today.
      </p>
    </div>
    
    <div class="w-full space-y-6">
      <EmailSignup />

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </div>

      <GoogleButton text="Sign up with Google" />
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Already have an account? 
        <a href="/login" class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          Sign in
        </a>
      </p>
    </div>

    <p class="text-xs text-gray-400 dark:text-gray-500 text-center">
      By signing up, you agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
