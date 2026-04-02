<script lang="ts">
  import { darkMode } from '$lib/stores/darkMode.svelte';
  import { Sun, Moon, Monitor, Check, ShieldCheck, Key } from 'lucide-svelte';
  import PasswordModal from '$lib/components/ui/PasswordModal.svelte';

  const themes = [
    { 
      id: 'light', 
      name: 'Light', 
      icon: Sun, 
      description: 'Classic light appearance'
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      icon: Moon, 
      description: 'Easy on the eyes in low light'
    },
    { 
      id: 'system', 
      name: 'System', 
      icon: Monitor, 
      description: 'Follow your system settings'
    }
  ] as const;

  let isPasswordModalOpen = $state(false);
</script>

<svelte:head>
  <title>Settings | Sniip</title>
</svelte:head>

<div class="max-w-4xl mx-auto space-y-10">
  <!-- Header -->
  <header>
    <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight text-balance">Settings</h1>
    <p class="text-slate-500 dark:text-gray-400 mt-1">Manage your account preferences and application theme.</p>
  </header>

  <!-- Appearance Section -->
  <section class="space-y-6">
    <div class="flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
      <h2 class="text-xl font-bold text-slate-800 dark:text-gray-100">Appearance</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each themes as theme}
        <button
          onclick={() => darkMode.setTheme(theme.id)}
          class="relative flex flex-col items-stretch p-2 rounded-2xl border-2 transition-all group overflow-hidden cursor-pointer
          {darkMode.theme === theme.id 
            ? 'border-blue-600 ring-4 ring-blue-500/10 bg-white dark:bg-gray-900' 
            : 'border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-slate-200 dark:hover:border-gray-700'}"
        >
          <!-- Visual Preview Component -->
          <div class="aspect-video rounded-xl mb-4 overflow-hidden relative border border-slate-100 dark:border-gray-800 pointer-events-none">
            {#if theme.id === 'light'}
              <div class="absolute inset-0 bg-gray-50 p-3 space-y-2">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                  <div class="h-1.5 w-12 bg-slate-300 rounded-full"></div>
                </div>
                <div class="h-2 w-full bg-white rounded shadow-xs"></div>
                <div class="h-2 w-2/3 bg-white rounded shadow-xs"></div>
              </div>
            {:else if theme.id === 'dark'}
              <div class="absolute inset-0 bg-gray-950 p-3 space-y-2">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div class="h-1.5 w-12 bg-gray-700 rounded-full"></div>
                </div>
                <div class="h-2 w-full bg-gray-900 rounded border border-gray-800"></div>
                <div class="h-2 w-2/3 bg-gray-900 rounded border border-gray-800"></div>
              </div>
            {:else}
              <div class="absolute inset-0 flex">
                <div class="w-1/2 bg-gray-50 p-3 space-y-2 border-r border-slate-200">
                  <div class="h-1.5 w-8 bg-slate-300 rounded-full mb-2"></div>
                  <div class="h-2 w-full bg-white rounded shadow-xs"></div>
                </div>
                <div class="w-1/2 bg-gray-950 p-3 space-y-2">
                  <div class="h-1.5 w-8 bg-gray-700 rounded-full mb-2"></div>
                  <div class="h-2 w-full bg-gray-900 rounded border border-gray-800"></div>
                </div>
              </div>
            {/if}
            
            {#if darkMode.theme === theme.id}
              <div class="absolute inset-0 bg-blue-600/5 flex items-center justify-center">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-200">
                  <Check size={18} strokeWidth={3} />
                </div>
              </div>
            {/if}
          </div>

          <div class="px-3 pb-3 space-y-1">
            <div class="flex items-center gap-2">
              <theme.icon size={14} class={darkMode.theme === theme.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
              <p class="font-bold text-sm text-slate-900 dark:text-white">{theme.name}</p>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-gray-400 font-medium leading-tight">{theme.description}</p>
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Notification Preference Placeholder -->
  <section class="space-y-6 pt-4">
    <div class="flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
      <h2 class="text-xl font-bold text-slate-800 dark:text-gray-100">Account Security</h2>
    </div>
    
    <div class="grid grid-cols-1 gap-4">
        <!-- Change Password -->
        <div class="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 group hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Key size={20} />
              </div>
              <div class="space-y-1">
                  <p class="text-slate-900 dark:text-white font-bold">Account Password</p>
                  <p class="text-xs text-slate-500 dark:text-gray-400">Update your login credentials regularly.</p>
              </div>
            </div>
            <button 
              onclick={() => isPasswordModalOpen = true}
              class="px-4 py-2 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
                Change
            </button>
        </div>

        <!-- 2FA Placeholder -->
        <div class="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 group hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-gray-800/50 flex items-center justify-center text-slate-400 dark:text-gray-500">
                <ShieldCheck size={20} />
              </div>
              <div class="space-y-1">
                  <p class="text-slate-900 dark:text-white font-bold">Two-Factor Authentication</p>
                  <p class="text-xs text-slate-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button class="px-4 py-2 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                Enable
            </button>
        </div>
    </div>
  </section>

  <!-- Modals -->
  <PasswordModal bind:open={isPasswordModalOpen} />
</div>
