<script lang="ts">
  import { CircleSlash2, CodeXml, PencilLine, Move3D, ListOrdered, LineChart, Pointer, Microscope, Split, ClipboardList, Network, Cpu, Database, Blocks, Rotate3D, FileBox, Dices, Waypoints, BarChartHorizontal, MonitorCheck, Sprout, GraduationCap, Users } from 'lucide-svelte';

  import Haskell from '$lib/icon/Haskell.svelte';
  import Owl from '$lib/icon/Owl.svelte';

  const icons = { CircleSlash2, CodeXml, PencilLine, Move3D, ListOrdered, LineChart, Pointer, Microscope, Split, ClipboardList, Network, Cpu, Database, Blocks, Rotate3D, FileBox, Dices, Waypoints, BarChartHorizontal, MonitorCheck, Sprout, GraduationCap, Users, Haskell, Owl }
  
  export let ikon: string;
  export let kurskod;
  export let namn2;
</script>

<a href={`#${kurskod}`} class="bg-neutral-700 text-white flex flex-col items-center justify-center aspect-square transition-all hover:bg-opacity-75 figtree">
  <svelte:component this={icons[ikon]} />
  <span class="font-bold leading-3 mt-2">{kurskod}</span>
  <span>{namn2}</span>
</a>