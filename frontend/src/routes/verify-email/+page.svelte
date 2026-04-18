<script lang="ts">
  import { Mail, ArrowRight, ShieldCheck, Inbox, Loader2 } from 'lucide-svelte';
  import AuthHeader from '$lib/components/AuthHeader.svelte';
  import { page } from '$app/state';
  import { resendVerification, authStore } from '$lib/stores/auth';
  import { toast } from '$lib/stores/toast.svelte';
  import { onMount } from 'svelte';

  const email = page.url.searchParams.get('email') || 'your email';
  
  // Timer state
  let countdown = $state(180); // 3 minutes in seconds
  let canResend = $derived(countdown === 0);
  
  let timerInterval: any;

  function startTimer() {
    clearInterval(timerInterval);
    countdown = 180;
    timerInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  onMount(() => {
    startTimer();
    return () => clearInterval(timerInterval);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  async function handleResend() {
    if (!canResend || $authStore.loading) return;
    
    try {
      await resendVerification(email);
      toast.success('Verification email resent successfully!');
      startTimer();
    } catch (err: any) {
      toast.error(err.message || 'Failed to resend email');
    }
  }
</script>

<AuthHeader />

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-md w-full space-y-8 flex flex-col items-center">
    <!-- Icon Animation Container -->
    <div class="relative">
      <div class="absolute -inset-4 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div class="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 rotate-3">
        <Mail class="w-10 h-10 text-white" strokeWidth={2.5} />
      </div>
      <div class="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 dark:border-gray-950">
        <ShieldCheck class="w-4 h-4 text-white" />
      </div>
    </div>

    <div class="text-center space-y-3">
      <h2 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
        Verify your email
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
        We've sent a verification link to <span class="font-bold text-gray-900 dark:text-white">{email}</span>.
      </p>
    </div>

    <!-- Instruction Cards -->
    <div class="w-full space-y-4">
      <div class="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm flex gap-4 items-start">
        <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
          <Inbox class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white">Check your Inbox</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Click the link in the email to activate your Sniip account instantly.
          </p>
        </div>
      </div>

      <div class="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm flex gap-4 items-start">
        <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
          <ShieldCheck class="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white">Not there? Check Spam</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Sometimes verification emails land in the junk folder. Mark it as "not spam" for better delivery.
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-6 w-full pt-4">
      <div class="h-px w-12 bg-gray-200 dark:bg-gray-800"></div>
      
      <div class="flex flex-col items-center gap-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive anything? 
        </p>
        
        <button 
          onclick={handleResend}
          disabled={!canResend || $authStore.loading}
          class="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-50 hover:underline cursor-pointer disabled:text-gray-400 dark:disabled:text-gray-600 disabled:no-underline disabled:cursor-not-allowed transition-all"
        >
          {#if $authStore.loading}
            <Loader2 class="w-4 h-4 animate-spin" />
            Resending...
          {:else}
            Resend email
          {/if}
        </button>

        {#if !canResend}
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-600 animate-pulse">
            Available in {formatTime(countdown)}
          </p>
        {/if}
      </div>

      <a href="/login" class="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group">
        Return to login
        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
</div>
