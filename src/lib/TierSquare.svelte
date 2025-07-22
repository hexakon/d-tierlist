<script lang="ts">
  export let tier = '';
  export let bigText = false;
  export let opacityrank = 1;
  export let isInteger = true;
</script>

{#if isInteger}
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
{:else}
  <div class={`text-center text-base font-bold figtree text-black aspect-square w-10 flex justify-center items-center bg-gradient-to-tr from-50% to-50%`}
    class:text-lg={bigText}
    class:from-a={tier==='a'}
    class:to-s={tier==='a'}
    class:from-b={tier==='b'}
    class:to-a={tier==='b'}
    class:from-c={tier==='c'}
    class:to-b={tier==='c'}
    class:from-d={tier==='d'}
    class:to-c={tier==='d'}
    class:from-e={tier==='e'}
    class:to-d={tier==='e'}
    class:from-f={tier==='f'}
    class:to-e={tier==='f'}
    class:bg-slate-100={tier===''}
    style={`opacity: ${1-((opacityrank-1)*0.03)};`}
    ><slot /></div>
{/if}