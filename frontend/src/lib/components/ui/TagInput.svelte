<script lang="ts">
  import { X, Hash } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';

  let { tags = $bindable([]) } = $props<{ tags: string[] }>();
  let inputValue = $state('');

  const colors = [
    'bg-blue-600',
    'bg-emerald-600',
    'bg-purple-600',
    'bg-amber-600',
    'bg-rose-600',
    'bg-indigo-600',
    'bg-cyan-600',
    'bg-fuchsia-600'
  ];

  function getTagColor(tag: string) {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  function addTag() {
    const cleanTag = inputValue.trim().replace(/[^a-zA-Z0-9]/g, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      tags = [...tags, cleanTag];
      inputValue = '';
    } else {
      inputValue = '';
    }
  }

  function removeTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }
</script>

<div class="space-y-2.5">
  <label for="tags" class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest px-1">
    Tags (optional)
  </label>
  
  <div class="flex flex-wrap gap-2 p-2 bg-slate-50/30 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all min-h-[56px]">
    {#each tags as tag, i}
      <div 
        in:scale={{ duration: 200, start: 0.9 }}
        out:fade={{ duration: 150 }}
        class="flex items-center gap-1.5 px-3 py-1.5 {getTagColor(tag)} text-white rounded-lg text-xs font-bold shadow-sm"
      >
        <Hash size={12} class="opacity-70" />
        <span>{tag}</span>
        <button 
          type="button"
          onclick={() => removeTag(i)}
          class="ml-1 hover:brightness-110 rounded-full p-0.5 transition-all cursor-pointer"
        >
          <X size={12} strokeWidth={3} />
        </button>
      </div>
    {/each}
    
    <input
      id="tags"
      type="text"
      bind:value={inputValue}
      onkeydown={handleKeyDown}
      onblur={addTag}
      placeholder={tags.length === 0 ? "Marketing, Sale, Social..." : ""}
      class="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 min-w-[120px]"
    />
  </div>
  <p class="text-[10px] text-slate-400 dark:text-gray-500 font-medium px-1">Press <kbd class="px-1 bg-slate-100 dark:bg-gray-800 rounded border border-slate-200 dark:border-gray-700">Space</kbd> or <kbd class="px-1 bg-slate-100 dark:bg-gray-800 rounded border border-slate-200 dark:border-gray-700">Enter</kbd> to add a tag.</p>
</div>
