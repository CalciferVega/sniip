<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  $effect(() => {
    if ($authStore.user) {
      goto('/dashboard');
    }
  });
</script>

<svelte:head>
  <title>Sniip | The Enterprise URL Shortener & QR Generator</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
  <Navbar />

  <!-- Hero Section -->
  <header class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-950">
    <div class="max-w-5xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in border border-blue-200 dark:border-blue-800">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        New: Dynamic QR Codes with Analytics
      </div>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
        Own your links.<br />
        <span class="text-blue-600 dark:text-blue-500">Drive every click.</span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Sniip is the enterprise-grade connection platform that helps you build, share, and track every digital point of contact at scale.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]">
          Get started for free
        </a>
        <a href="#product" class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-sm">
          See how it works
        </a>
      </div>
    </div>
  </header>

  <!-- Social Proof (Customers) -->
  <section id="customers" class="py-20 border-y border-gray-50 dark:border-gray-900">
    <div class="max-w-7xl mx-auto px-4">
      <p class="text-center text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-12">Trusted by teams at</p>
      <div class="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale dark:invert">
        <span class="text-2xl font-bold italic">AcmeCorp</span>
        <span class="text-2xl font-bold italic">Globex</span>
        <span class="text-2xl font-bold italic">SoylentCorp</span>
        <span class="text-2xl font-bold italic">Initech</span>
        <span class="text-2xl font-bold italic">Umbrella</span>
      </div>
    </div>
  </section>

  <!-- Product/Features -->
  <section id="product" class="py-24 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 class="text-4xl font-extrabold mb-6 leading-tight dark:text-white">Beyond just a link shortener.</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Create branded links that build trust. Every link you share is a reflection of your brand. With Sniip, you control the destination and the aesthetic.
          </p>
          <ul class="space-y-4">
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="font-medium dark:text-gray-200">Custom branded domains</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="font-medium dark:text-gray-200">Real-time engagement analytics</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="font-medium dark:text-gray-200">Bulk link creation via CSV</span>
            </li>
          </ul>
        </div>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl">
           <div class="absolute inset-0 bg-linear-to-tr from-blue-600/10 to-transparent"></div>
           <div class="w-64 h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded"></div>
                <div class="h-4 w-1/2 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
              <div class="h-32 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center">
                 <svg class="w-16 h-16 text-blue-200 dark:text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
              </div>
           </div>
           <div class="absolute bottom-12 right-12 w-48 h-16 bg-blue-600 rounded-lg shadow-xl flex items-center justify-center text-white font-bold">
              sniip.com/summer-sale
           </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Solutions Section -->
  <section id="solutions" class="py-24 bg-gray-900 dark:bg-gray-950 text-white px-4 border-y border-gray-800 dark:border-gray-900">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Solutions for every channel.</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">Sniip connects your offline marketing to online success.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gray-800 dark:bg-gray-900 p-8 rounded-2xl hover:bg-gray-750 dark:hover:bg-gray-800/80 transition-colors border border-gray-700 dark:border-gray-800">
          <div class="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Retail & Print</h3>
          <p class="text-gray-400 leading-relaxed">Dynamic QR codes for packaging, posters, and in-store displays that can be updated after printing.</p>
        </div>
        <div class="bg-gray-800 dark:bg-gray-900 p-8 rounded-2xl hover:bg-gray-750 dark:hover:bg-gray-800/80 transition-colors border border-gray-700 dark:border-gray-800">
          <div class="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Social Media</h3>
          <p class="text-gray-400 leading-relaxed">Short, memorable links for Instagram bios, YouTube descriptions, and Twitter threads.</p>
        </div>
        <div class="bg-gray-800 dark:bg-gray-900 p-8 rounded-2xl hover:bg-gray-750 dark:hover:bg-gray-800/80 transition-colors border border-gray-700 dark:border-gray-800">
          <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Enterprise IT</h3>
          <p class="text-gray-400 leading-relaxed">SSO integration, team permissions, and API access for high-volume automated shortening.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-24 px-4 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 dark:text-white transition-none">Simple, transparent pricing.</h2>
        <p class="text-gray-600 dark:text-gray-400 transition-none">Start for free, upgrade as you grow.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <!-- Free Tier -->
        <div class="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative">
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500"></div>
          <div class="mb-8 relative">
            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Free</h3>
            <p class="text-gray-500 dark:text-gray-400">For personal projects.</p>
          </div>
          <div class="text-4xl font-extrabold mb-8 dark:text-white relative">$0<span class="text-lg font-medium text-gray-400">/mo</span></div>
          <ul class="space-y-4 mb-10 flex-grow relative">
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              25 links per month
            </li>
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Basic analytics
            </li>
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Standard QR codes
            </li>
          </ul>
          <a href="/signup" class="block text-center py-4 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all relative z-10">Get Started</a>
        </div>

        <!-- Pro Tier (Animated Rainbow Glass) -->
        <div class="group relative p-[4px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-2 scale-105 z-20">
          <!-- The Rainbow Beam Background -->
          <div class="absolute inset-[-200%] bg-[conic-gradient(from_0deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] animate-spin-slow opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          
          <!-- Inner Glass Card -->
          <div class="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl h-full w-full rounded-[calc(2rem-4px)] p-10 flex flex-col z-10 border border-white/50 dark:border-gray-800/50">
            <!-- Popular Tag -->
            <div 
              class="absolute bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 z-30 shadow-lg"
              style="border-radius: 0 28px 0 8px; top: -1px; right: -1px;"
            >
              Popular
            </div>
            
            <div class="mb-8 relative">
              <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Pro</h3>
              <p class="text-slate-500 dark:text-blue-200">For creators & small biz.</p>
            </div>
            <div class="text-4xl font-extrabold mb-8 text-blue-600 dark:text-blue-400 relative">$19<span class="text-lg font-medium text-slate-400">/mo</span></div>
            <ul class="space-y-4 mb-10 flex-grow relative">
              <li class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                1,000 links per month
              </li>
              <li class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Advanced geolocation
              </li>
              <li class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Custom logo QR codes
              </li>
              <li class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                No ads on redirect
              </li>
            </ul>
            <a href="/signup" class="block text-center py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 relative group/btn overflow-hidden">
               <span class="relative z-10">Start Free Trial</span>
               <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
            </a>
          </div>
        </div>

        <!-- Teams Tier -->
        <div class="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative">
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500"></div>
          <div class="mb-8 relative">
            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Teams</h3>
            <p class="text-gray-500 dark:text-gray-400">For growing agencies.</p>
          </div>
          <div class="text-4xl font-extrabold mb-8 dark:text-white relative">$99<span class="text-lg font-medium text-gray-400">/mo</span></div>
          <ul class="space-y-4 mb-10 flex-grow relative">
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              3,000 links per month
            </li>
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Team collaboration
            </li>
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Bulk CSV importing
            </li>
            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Priority support
            </li>
          </ul>
          <a href="/signup" class="block text-center py-4 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all relative z-10">Contact Sales</a>
        </div>

      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 px-4 bg-white dark:bg-gray-950 text-center">
    <div class="max-w-4xl mx-auto bg-blue-50 dark:bg-blue-900/10 rounded-[3rem] py-16 px-8 border border-blue-100 dark:border-blue-900/30">
      <h2 class="text-4xl font-extrabold mb-6 dark:text-white">Ready to scale your connections?</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">Join 10,000+ companies using Sniip to power their digital growth.</p>
      <a href="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl inline-block">
        Get started for free
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 py-12 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
        </div>
        <span class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Sniip</span>
      </div>
      <div class="flex gap-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Status</a>
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Twitter</a>
      </div>
      <p class="text-sm text-gray-400 dark:text-gray-500">© 2026 Sniip Inc. Built for the modern web.</p>
    </div>
  </footer>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 6s linear infinite;
  }

  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }

  @keyframes pulse-slow {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.05); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
</style>
