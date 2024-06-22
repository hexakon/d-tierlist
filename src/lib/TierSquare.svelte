<script lang="ts">
  export let tier = '';
  export let bigText = false;
  export let opacityrank = 1;
</script>

<div class={`text-center text-base font-bold figtree text-black aspect-square w-10 flex justify-center items-center`}
  class:text-lg={bigText}
  class:bg-s={tier==='s'}
  class:bg-a={tier==='a'}
  class:bg-b={tier==='b'}
  class:bg-c={tier==='c'}
  class:bg-d={tier==='d'}
  class:bg-e={tier==='e'}
  class:bg-f={tier==='f'}
  class:bg-slate-100={tier===''}
  style={`opacity: ${1-((opacityrank-1)*0.03)};`}
  ><slot /></div>