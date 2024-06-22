<title>D-21 Tier List</title>
<svelte:head>
  <script lang="ts">
    document.documentElement.classList.add("dark", localStorage.theme === "dark" || !localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  </script>
</svelte:head>

<script lang="ts">

  import { ArrowUpToLine } from 'lucide-svelte';
  
  import d21 from '$lib/data/d21.json';

  import CourseDetails from '$lib/CourseDetails.svelte';
  import TierRow from '$lib/TierRow.svelte';

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","light");
    }
  }

  let rankingMode = "median";
  let sortMode = "avvikelse";
  let detailSortMode = "äldst";

  let courseList = structuredClone(d21);

  $: {
    switch (detailSortMode) {
      case 'äldst':
        courseList = structuredClone(d21);
        break;
      case 'nyast':
        courseList = d21.toReversed();
        break;
      case 'medel1':
        courseList = d21.toSorted((a,b) => a.medelrank - b.medelrank);
        break;
      case 'medel2':
        courseList = d21.toSorted((a,b) => -(a.medelrank - b.medelrank));
        break;
      case 'median1':
        courseList = d21.toSorted((a,b) => -(a.median - b.median) || a.medelrank - b.medelrank );
        break;
      case 'median2':
        courseList = d21.toSorted((a,b) => a.median - b.median || a.medelrank - b.medelrank );
        break;
      case 'typ1':
        courseList = d21.toSorted((a,b) => -(a.typvärde - b.typvärde) || a.avvikelserank - b.avvikelserank);
        break;
      case 'typ2':
        courseList = d21.toSorted((a,b) => a.typvärde - b.typvärde || -(a.avvikelserank - b.avvikelserank));
        break;
      case 'av1':
        courseList = d21.toSorted((a,b) => a.avvikelserank - b.avvikelserank);
        break;
      case 'av2':
        courseList = d21.toSorted((a,b) => -(a.avvikelserank - b.avvikelserank));
        break;
    }
    courseList = courseList;
  }

  let scrollY: number;
	let hideToTop = true;
	$: hideToTop = !(scrollY > 0);
</script>
<svelte:window bind:scrollY={scrollY} />

<style>
  .center-last-item:nth-last-child(1) {
    grid-column: 1 / span 2;
  }
</style>

<div class="mt-8 w-full text-center flex flex-col text-neutral-500">
  <span class="px-2">Vi frågade <span class="text-cerise font-bold">56</span> st D-21:or att skapa en</span>
  <div class="my-1 p-1 text-5xl font-extrabold text-off-white bg-cerise-strong text-center">D-21 TIER LIST</div>
  <span class="px-2">för <span class="text-cerise font-bold">25</span> gemensamma kandidatkurser...</span>
  <span class="my-4 px-4 text-neutral-400 text-lg leading-5">Rankningen bestäms av svarens {rankingMode}, och sorteras {sortMode === 'avvikelse' ? 'med minst kontroversiella kurser (lägst standardavvikelse) först' : sortMode === 'medelvärde' ? 'med bäst medelvärde först' : 'efter kursernas startdatum'}.</span>
</div>

{#key [rankingMode, sortMode]}
<div class="w-fit mx-auto border-2 border-b-0 border-black">
  <TierRow tier="s" {rankingMode} {sortMode} />
  <TierRow tier="a" {rankingMode} {sortMode} />
  <TierRow tier="b" {rankingMode} {sortMode} />
  <TierRow tier="c" {rankingMode} {sortMode} />
  <TierRow tier="d" {rankingMode} {sortMode} />
  <TierRow tier="e" {rankingMode} {sortMode} />
  <TierRow tier="f" {rankingMode} {sortMode} />
</div>
{/key}

<div class="flex flex-col gap-1 justify-center text-xl text-center p-4 leading-relaxed">
  
  <span class="text-neutral-300 text-base mb-4">Klicka på en ruta för att hoppa till detaljerad statstik om kursen!</span>

  <span class="text-neutral-400 text-base">Ifall du föredrar andra visualiseringar:</span>

  <span>Ranka efter svarens
    <select bind:value={rankingMode} class="bg-[#1a1a17] border border-black p-1 rounded-md text-off-yellow">
      <option value="medelvärde">medelvärde</option>
      <option value="median">median</option>
      <option value="typvärde">typvärde</option>
    </select>
  </span>
  
  <span>och sortera efter
    <select bind:value={sortMode} class="bg-[#1a1a17] border border-black p-1 rounded-md text-cerise-light">
      <option value="medelvärde">medelvärde</option>
      <option value="avvikelse">standardavvikelse</option>
      <option value="startdatum">kursens startdatum</option>
    </select>
  </span>
</div>


<div class="mt-8 mb-4 p-3 mx-auto max-w-[50rem] text-bold text-3xl text-center border-white border-b-2">DETALJERAD STATISTIK</div>

<div class="flex flex-col gap-1 justify-center text-xl text-center my-6 leading-relaxed">

  <span>Sortera 
    <select bind:value={detailSortMode} class="bg-[#1a1a17] border border-black p-1 rounded-md text-cerise-light">
      <option value="äldst">äldst kursstart</option>
      <option value="nyast">senast kursstart</option>
      <option value="medel1">högst medelvärde</option>
      <option value="medel2">lägst medelvärde</option>
      <option value="median1">bäst median</option>
      <option value="median2">sämst median</option>
      <option value="typ1">bäst typvärde</option>
      <option value="typ2">sämst typvärde</option>
      <option value="av1">minst kontroversiellt</option>
      <option value="av2">mest kontroversiellt</option>
    </select> först
  </span>
</div>

<div class="grid grid-cols-1 xs2:grid-cols-2 lg:grid-cols-3 max-w-[80rem] mx-auto center-last-item">
  {#key courseList}
    {#each courseList as course, index}
      <CourseDetails {...course} isLast={index === 24} />
    {/each}
  {/key}
</div>

<div class="mt-12 mb-16 flex flex-col items-center">
  <span class="text-neutral-600">Obligatorisk bonusfråga:</span>
  <span class="font-bold text-2xl text-center">HATAR DU DATA?</span>
  <div class="bg-f my-2 w-full max-w-[80rem] h-8 outline outline-black">
    <div class="bg-s h-full w-[7.14%]"></div>
  </div>
  <div class="w-full max-w-[80rem] flex justify-between px-1 leading-5">
    <div class="text-s"><b>JA</b><br>4 st (7.1%)</div>
    <div class="text-f text-right"><b>INGEN KOMMENTAR</b><br>52 st (92.9%)</div>
  </div>
  
  <span class="mt-4 font-bold text-2xl text-center">TYSTNADEN ÄR BEDÖVANDE</span>
</div>

<div class="py-12 flex flex-col gap-2 justify-center items-center bg-neutral-800 text-neutral-400">
  <div>© hexakon, <a href="https://datasektionen.se/" class="underline text-cerise">Konglig Datasektionen</a> 2024</div>
  <div>All data samlades från en enkät som löptes från 10 juni till 20 juni</div>
  <div>Tack till alla anonyma studenter som deltog i undersökningen <span class="text-cerise">❤</span></div>
  <div>Skåda min skitig kod på <a href="https://github.com/hexakon/d-tierlist" target="_blank" class="underline text-cerise">guthib</a></div>
</div>

<a href="#" class="fixed right-4 bottom-4 w-12 h-12 flex justify-center items-center opacity-50 bg-off-white text-off-black transition-opacity" class:hidden={hideToTop}><ArrowUpToLine size={32} /></a>