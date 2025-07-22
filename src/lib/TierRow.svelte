<script lang="ts">
	import CourseTierCard from './CourseTierCard.svelte';

  export let tier: string;
  export let rankingMode: string;
  export let sortMode: string;
  export let yeardata: Array<Object>;

  const tiers = "fedcbas"

  let courses = yeardata.filter((c) => Math.floor(c[rankingMode]) == tiers.indexOf(tier))
  
  if (sortMode !== 'startdatum') courses.sort((a,b) => a[sortMode] - b[sortMode]);
</script>

<div class="flex border-b-2 border-black flex-row max-w-[60rem]">
  <div class={`flex justify-center items-center font-bold text-2xl figtree text-black w-[10%] max-w-10`}
  class:bg-s={tier==='s'}
  class:bg-a={tier==='a'}
  class:bg-b={tier==='b'}
  class:bg-c={tier==='c'}
  class:bg-d={tier==='d'}
  class:bg-e={tier==='e'}
  class:bg-f={tier==='f'}
  >{tier.toUpperCase()}</div>

  <div class="bg-[#1a1a17] grid grid-cols-3 xs:grid-cols-4 xs2:grid-cols-5 sm:grid-cols-6 sm2:grid-cols-7 md:grid-cols-8 gap-2 p-2 w-full">
    {#each courses as course}
      <CourseTierCard {...course} />
    {/each}
    {#if courses.length === 0}
      <div class="aspect-square flex items-center justify-center text-neutral-500 text-center">inga kurser i denna tier!</div>
    {/if}
  </div>
</div>