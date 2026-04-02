<script lang="ts">
  import { updatePassword, authStore } from '$lib/stores/auth';
  import { toast } from '$lib/stores/toast.svelte';
  import { X, Lock, Eye, EyeOff, Loader2 } from 'lucide-svelte';

  let { open = $bindable(false) } = $props();

  let currentPassword = $state('');
  let newPassword = $state('');
  let confirmPassword = $state('');
  let showCurrent = $state(false);
  let showNew = $state(false);
  let showConfirm = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await updatePassword(newPassword, currentPassword);
      toast.success('Password updated successfully');
      open = false;
      resetForm();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    }
  }

  function resetForm() {
    currentPassword = '';
    newPassword = '';
    confirmPassword = '';
  }

  function handleClose() {
    open = false;
    resetForm();
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      onclick={handleClose}
    ></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200">
      <div class="p-6 sm:p-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Lock size={20} />
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white leading-tight">Change Password</h3>
              <p class="text-xs text-slate-500 dark:text-gray-400 font-medium">Update your account security.</p>
            </div>
          </div>
          <button 
            onclick={handleClose}
            class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <!-- Form -->
        <form onsubmit={handleSubmit} class="space-y-5">
          <!-- Current Password -->
          <div class="space-y-1.5">
            <label for="current-password" class="text-xs font-bold text-slate-700 dark:text-gray-300 ml-1">Current Password</label>
            <div class="relative group">
              <input
                id="current-password"
                type={showCurrent ? 'text' : 'password'}
                bind:value={currentPassword}
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onclick={() => showCurrent = !showCurrent}
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {#if showCurrent}
                  <EyeOff size={16} />
                {:else}
                  <Eye size={16} />
                {/if}
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="space-y-1.5">
            <label for="new-password" class="text-xs font-bold text-slate-700 dark:text-gray-300 ml-1">New Password</label>
            <div class="relative group">
              <input
                id="new-password"
                type={showNew ? 'text' : 'password'}
                bind:value={newPassword}
                required
                minlength="6"
                placeholder="Min. 6 characters"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onclick={() => showNew = !showNew}
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {#if showNew}
                  <EyeOff size={16} />
                {:else}
                  <Eye size={16} />
                {/if}
              </button>
            </div>
          </div>

          <!-- Confirm New Password -->
          <div class="space-y-1.5">
            <label for="confirm-password" class="text-xs font-bold text-slate-700 dark:text-gray-300 ml-1">Confirm New Password</label>
            <div class="relative group">
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                bind:value={confirmPassword}
                required
                placeholder="Confirm new password"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onclick={() => showConfirm = !showConfirm}
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {#if showConfirm}
                  <EyeOff size={16} />
                {:else}
                  <Eye size={16} />
                {/if}
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={$authStore.loading}
              class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {#if $authStore.loading}
                <Loader2 size={18} class="animate-spin" />
                <span>Updating Password...</span>
              {:else}
                <span>Update Password</span>
              {/if}
            </button>
            <button
              type="button"
              onclick={handleClose}
              class="w-full py-3 text-slate-500 dark:text-gray-400 font-bold hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
