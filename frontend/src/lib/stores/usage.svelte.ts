import { apiFetch } from '$lib/utils/api.js';
import { authStore } from './auth.js';
import { get } from 'svelte/store';

export interface Usage {
  used: number;
  total: number;
  plan: 'free' | 'pro' | 'teams';
  resetDate: string;
}

class UsageStore {
  usage = $state<Usage | null>(null);
  loading = $state(false);
  error = $state<string | null>(null);

  async fetchUsage() {
    const { user } = get(authStore);
    if (!user) return;

    this.loading = true;
    this.error = null;

    try {
      const data = await apiFetch<Usage>('/dashboard/usage');
      this.usage = data;
    } catch (err) {
      console.error('Failed to fetch usage:', err);
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  // Helper to refresh usage after creating a link
  refresh() {
    return this.fetchUsage();
  }
}

export const usageStore = new UsageStore();
