<script lang="ts">
  import { page } from "$app/stores";
  import { CircleSlash2, CodeXml, PencilLine, Move3D, ListOrdered, LineChart, Pointer, Microscope, Split, ClipboardList, Network, Cpu, Database, Blocks, Rotate3D, FileBox, Dices, Waypoints, BarChartHorizontal, MonitorCheck, Sprout, GraduationCap, Users, Check, CircleAlert } from 'lucide-svelte';
  import Haskell from '$lib/icon/Haskell.svelte';
  import Owl from '$lib/icon/Owl.svelte';
	import TierSquare from "$lib/TierSquare.svelte";

  const icons = { CircleSlash2, CodeXml, PencilLine, Move3D, ListOrdered, LineChart, Pointer, Microscope, Split, ClipboardList, Network, Cpu, Database, Blocks, Rotate3D, FileBox, Dices, Waypoints, BarChartHorizontal, MonitorCheck, Sprout, GraduationCap, Users, Haskell, Owl }
  
  export let kurskod;
  export let namn;
  export let namn2;
  export let ikon: string;
  export let medelvärde;
  export let median;
  export let typvärde;
  export let avvikelse;
  export let totalsvar;
  export let s;
  export let a;
  export let b;
  export let c;
  export let d;
  export let e;
  export let f;
  export let medelrank;
  export let avvikelserank;

  export let isLast = false;
</script>

<style>
  
</style>

<div class="p-4 transition-colors bg-opacity-5" id={kurskod} class:bg-yellow-500={$page.url.hash === "#"+kurskod} class:lg:col-start-2={isLast}>
  <a href={"#"+kurskod} class="flex flex-row h-12 gap-2 hover:bg-neutral-600 transition-colors">
    <div class="flex justify-center items-center text-black bg-off-white w-12"><svelte:component this={icons[ikon]} size={30} /></div>
    <div class="flex flex-col items-start justify-center figtree">
      <span class="font-bold text-xl leading-4 figtree">{kurskod}</span>
      <span class="leading-5">{namn}</span>
    </div>
  </a>
  <div class="my-2 text-neutral-500 flex gap-1">
    {#if totalsvar < 20}<CircleAlert />{:else}<Check />{/if} 
    {totalsvar} studenter rankade kursen {#if totalsvar < 20}(Låg svarsfrekvens){/if}</div>
  <div class="mb-2 grid grid-cols-2 gap-2">
    <div>
      <div class="flex gap-1 figtree items-center"><TierSquare bigText={true} tier={"fedcbas"[median]}>{"FEDCBAS"[median]}</TierSquare> Median</div>
    </div>
    <div>
      <div class="flex gap-1 figtree items-center"><TierSquare bigText={true} tier={"fedcbas"[typvärde]}>{"FEDCBAS"[typvärde]}</TierSquare> Typvärde</div>
    </div>
    <div>
      <div class="flex gap-1 figtree items-center leading-5"><TierSquare tier={"fedcbas"[Math.round(medelvärde)]}>#{medelrank}</TierSquare> Medelvärde:<br>{medelvärde.toFixed(3)} ({"FEDCBAS"[Math.round(medelvärde)]})</div>
    </div>
    <div>
      <div class="flex gap-1 figtree items-center leading-5"><TierSquare opacityrank={avvikelserank}>#{avvikelserank}</TierSquare> St. avvikelse:<br>{avvikelse.toFixed(3)}</div>
    </div>
  </div>

  <div class="relative border-b-2 border-l-2 flex items-end justify-evenly h-[7rem]">
    <div class="absolute left-0 border-b-2 border-dashed border-neutral-600 text-neutral-600 text-right w-full z-10" style={`bottom: ${totalsvar/10}rem;`}>50%</div>
    <div class="absolute left-0 border-b-2 border-dashed border-neutral-600 text-neutral-600 text-right w-full z-10" style={`bottom: ${totalsvar/20}rem;`}>25%</div>
    <div class="bg-s w-8 z-20" style={`height: ${s/5}rem;`}></div>
    <div class="bg-a w-8 z-20" style={`height: ${a/5}rem;`}></div>
    <div class="bg-b w-8 z-20" style={`height: ${b/5}rem;`}></div>
    <div class="bg-c w-8 z-20" style={`height: ${c/5}rem;`}></div>
    <div class="bg-d w-8 z-20" style={`height: ${d/5}rem;`}></div>
    <div class="bg-e w-8 z-20" style={`height: ${e/5}rem;`}></div>
    <div class="bg-f w-8 z-20" style={`height: ${f/5}rem;`}></div>
  </div>
  <div class="flex items-center justify-evenly h-[3.3rem]">
    <div class="text-center w-8"><span class="figtree font-bold">S</span><br><span class="">{s}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">A</span><br><span class="">{a}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">B</span><br><span class="">{b}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">C</span><br><span class="">{c}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">D</span><br><span class="">{d}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">E</span><br><span class="">{e}</span></div>
    <div class="text-center w-8"><span class="figtree font-bold">F</span><br><span class="">{f}</span></div>
  </div>

</div>