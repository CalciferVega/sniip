<script lang="ts">
  import { 
    BarChart3, 
    Users, 
    MousePointerClick, 
    Globe2, 
    Smartphone, 
    Monitor,
    Tablet,
    ArrowUpRight, 
    ArrowDownRight,
    Calendar,
    ChevronDown,
    Filter
  } from 'lucide-svelte';

  // Placeholder data
  const stats = [
    { name: 'Total Clicks', value: '12,482', change: '+12.5%', trend: 'up', icon: MousePointerClick },
    { name: 'Unique Visitors', value: '8,932', change: '+8.2%', trend: 'up', icon: Users },
    { name: 'Avg. CTR', value: '4.2%', change: '-0.4%', trend: 'down', icon: BarChart3 },
    { name: 'Top Country', value: 'United States', subValue: '42% of traffic', icon: Globe2 },
  ];

  const countries = [
    { name: 'United States', clicks: 5240, percentage: 42 },
    { name: 'United Kingdom', clicks: 1850, percentage: 15 },
    { name: 'Germany', clicks: 1240, percentage: 10 },
    { name: 'Canada', clicks: 980, percentage: 8 },
    { name: 'France', clicks: 620, percentage: 5 },
  ];

  const referrers = [
    { name: 't.co (Twitter)', clicks: 4200, color: 'bg-blue-400' },
    { name: 'linkedin.com', clicks: 3100, color: 'bg-blue-700' },
    { name: 'facebook.com', clicks: 2400, color: 'bg-blue-600' },
    { name: 'Direct / Email', clicks: 1800, color: 'bg-slate-500' },
    { name: 'google.com', clicks: 982, color: 'bg-red-500' },
  ];

  // For the SVG Chart
  const chartData = [40, 35, 55, 45, 70, 65, 85, 75, 90, 80, 95, 100];
  
  // Construct path string for SVG
  const chartPath = chartData.map((v, i) => `${(i * 1000) / 11} ${100 - v}`).join(' L ');
</script>

<svelte:head>
  <title>Analytics | Sniip</title>
</svelte:head>

<div class="max-w-7xl mx-auto space-y-8 pb-12 transition-all">
  <!-- Header -->
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Analytics</h1>
      <p class="text-slate-500 dark:text-gray-400 mt-1">Real-time performance tracking for your Sniips.</p>
    </div>
    
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-gray-200 shadow-sm hover:border-slate-300 dark:hover:border-gray-700 transition-all cursor-pointer">
        <Calendar size={16} />
        <span>Last 30 Days</span>
        <ChevronDown size={14} class="text-slate-400" />
      </button>
      <button class="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer">
        <Filter size={18} />
      </button>
    </div>
  </header>

  <!-- Summary Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      {@const Icon = stat.icon}
      <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Icon size={20} />
          </div>
          {#if stat.change}
            <div class="flex items-center gap-1 text-xs font-bold {stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}">
              {stat.change}
              {#if stat.trend === 'up'}
                <ArrowUpRight size={14} />
              {:else}
                <ArrowDownRight size={14} />
              {/if}
            </div>
          {/if}
        </div>
        <p class="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.name}</p>
        <p class="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
        {#if stat.subValue}
          <p class="text-[10px] text-slate-400 dark:text-gray-500 font-medium mt-1">{stat.subValue}</p>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Main Chart Section -->
  <section class="bg-white dark:bg-gray-900 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm p-8 transition-colors">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">Click Trends</h2>
      <div class="flex gap-2">
        <span class="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <div class="w-2 h-2 rounded-full bg-blue-600"></div> Total Clicks
        </span>
      </div>
    </div>
    
    <div class="h-64 w-full relative">
      <svg class="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
          </linearGradient>
        </defs>
        <!-- Area -->
        <path 
          d="M 0 100 L {chartPath} L 1000 100 Z" 
          fill="url(#gradient)"
        />
        <!-- Line -->
        <path 
          d="M 0 {100 - chartData[0]} L {chartPath}" 
          fill="none" 
          stroke="#3b82f6" 
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Chart Labels (Simplified) -->
      <div class="absolute bottom-0 left-0 right-0 flex justify-between pt-4 border-t border-slate-50 dark:border-gray-800">
        {#each ['Oct 1', 'Oct 7', 'Oct 14', 'Oct 21', 'Oct 28'] as date}
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{date}</span>
        {/each}
      </div>
    </div>
  </section>

  <!-- Detailed Breakdown Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Top Countries -->
    <section class="bg-white dark:bg-gray-900 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm p-8 transition-colors">
      <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Globe2 size={20} class="text-blue-600" />
        Top Countries
      </h2>
      <div class="space-y-5">
        {#each countries as country}
          <div class="space-y-2">
            <div class="flex justify-between text-sm font-bold">
              <span class="text-slate-700 dark:text-gray-300">{country.name}</span>
              <span class="text-slate-900 dark:text-white">{country.clicks.toLocaleString()}</span>
            </div>
            <div class="h-2 w-full bg-slate-50 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 rounded-full transition-all duration-1000" style="width: {country.percentage}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Top Referrers -->
    <section class="bg-white dark:bg-gray-900 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm p-8 transition-colors">
      <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <MousePointerClick size={20} class="text-blue-600" />
        Traffic Sources
      </h2>
      <div class="space-y-4">
        {#each referrers as ref}
          <div class="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg {ref.color} opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <span class="text-sm font-bold text-slate-700 dark:text-gray-300">{ref.name}</span>
            </div>
            <span class="text-sm font-black text-slate-900 dark:text-white">{ref.clicks.toLocaleString()}</span>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  /* Fade in animation for chart */
  path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 2s ease-out forwards;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
