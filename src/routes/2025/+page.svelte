<title>Datas 2025 Tier List</title>
<svelte:head>
  <script lang="ts">
    document.documentElement.classList.add("dark", localStorage.theme === "dark" || !localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  </script>
</svelte:head>

<script lang="ts">

  import { ArrowUpToLine } from 'lucide-svelte';
  
  import yeardata from '$lib/data/2025.json';

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
  let sortMode = "avvikelserank";
  let detailSortMode = "äldst";

  let courseList = structuredClone(yeardata);

  $: {
    switch (detailSortMode) {
      case 'äldst':
        courseList = structuredClone(yeardata);
        break;
      case 'nyast':
        courseList = yeardata.toReversed();
        break;
      case 'medel1':
        courseList = yeardata.toSorted((a,b) => a.medelrank - b.medelrank);
        break;
      case 'medel2':
        courseList = yeardata.toSorted((a,b) => -(a.medelrank - b.medelrank));
        break;
      case 'median1':
        courseList = yeardata.toSorted((a,b) => -(a.median - b.median) || (sortMode === "startdatum" ? 0 : a[sortMode] - b[sortMode]) );
        break;
      case 'median2':
        courseList = yeardata.toSorted((a,b) => a.median - b.median || (sortMode === "startdatum" ? 0 : -(a[sortMode] - b[sortMode])) );
        break;
      case 'typ1':
        courseList = yeardata.toSorted((a,b) => -(a.typvärde - b.typvärde) || (sortMode === "startdatum" ? 0 : a[sortMode] - b[sortMode]) );
        break;
      case 'typ2':
        courseList = yeardata.toSorted((a,b) => a.typvärde - b.typvärde || (sortMode === "startdatum" ? 0 : -(a[sortMode] - b[sortMode])) );
        break;
      case 'av1':
        courseList = yeardata.toSorted((a,b) => a.avvikelserank - b.avvikelserank);
        break;
      case 'av2':
        courseList = yeardata.toSorted((a,b) => -(a.avvikelserank - b.avvikelserank));
        break;
      case 'svar1':
        courseList = yeardata.toSorted((a,b) => -(a.totalsvar - b.totalsvar) || (sortMode === "startdatum" ? 0 : a[sortMode] - b[sortMode]) );
        break;
      case 'svar2':
        courseList = yeardata.toSorted((a,b) => a.totalsvar - b.totalsvar || (sortMode === "startdatum" ? 0 : -(a[sortMode] - b[sortMode])) );
      case 'az1':
        courseList = yeardata.toSorted((a,b) => a.kurskod < b.kurskod ? -1 : 1);
        break;
      case 'az2':
        courseList = yeardata.toSorted((a,b) => a.kurskod < b.kurskod ? 1 : -1);
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
  <span class="px-2">Vi frågade <span class="text-cerise font-bold">63</span> st dataloger på sektionens Discord att skapa en</span>
  <div class="my-1 p-1 text-5xl font-extrabold text-off-white bg-cerise-strong text-center">DATAS 2025 TIER LIST</div>
  <span class="px-2">för <span class="text-cerise font-bold">25</span> gemensamma kandidatkurser...</span>
  <span class="my-4 px-4 text-neutral-400 text-lg leading-5">Rankningen bestäms av svarens {rankingMode}, och sorteras {sortMode === 'avvikelserank' ? 'med minst kontroversiella kurser (lägst standardavvikelse) först' : sortMode === 'medelrank' ? 'med högst medelvärde först' : 'efter kursernas startdatum'}.</span>
</div>

{#key [rankingMode, sortMode]}
<div class="w-fit mx-auto border-2 border-b-0 border-black">
  <TierRow tier="s" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="a" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="b" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="c" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="d" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="e" {rankingMode} {sortMode} {yeardata} />
  <TierRow tier="f" {rankingMode} {sortMode} {yeardata} />
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
      <option value="medelrank">medelvärde</option>
      <option value="avvikelserank">standardavvikelse</option>
      <option value="startdatum">kursens startdatum</option>
    </select>
  </span>
</div>


<div class="mt-8 mb-4 p-3 mx-auto max-w-[50rem] text-bold text-3xl text-center border-white border-b-2">DETALJERAD STATISTIK</div>

<div class="flex flex-col gap-1 justify-center text-xl text-center my-6 leading-relaxed">

  <span>Sortera 
    <select bind:value={detailSortMode} class="bg-[#1a1a17] border border-black p-1 rounded-md text-cerise-light">
      <option value="äldst">tidigast kursstart</option>
      <option value="nyast">senast kursstart</option>
      <option value="medel1">högst medelvärde</option>
      <option value="medel2">lägst medelvärde</option>
      <option value="median1">bäst median</option>
      <option value="median2">sämst median</option>
      <option value="typ1">bäst typvärde</option>
      <option value="typ2">sämst typvärde</option>
      <option value="av1">minst kontroversiellt</option>
      <option value="av2">mest kontroversiellt</option>
      <option value="svar1">flest svar</option>
      <option value="svar2">färst svar</option>
      <option value="az1">kurskod A-Z</option>
      <option value="az2">kurskod Z-A</option>
    </select> först
  </span>
</div>

<div class="grid grid-cols-1 xs2:grid-cols-2 lg:grid-cols-3 max-w-[80rem] mx-auto center-last-item">
  {#key courseList}
    {#each courseList as course, index}
      <CourseDetails {...course} isLast={index === 24} totalsvar_max=63 />
    {/each}
  {/key}
</div>

<div class="mt-16 py-12 flex flex-col gap-2 justify-center items-center bg-neutral-800 text-neutral-400 text-center">
  <div>© hexakon, <a href="https://datasektionen.se/" class="underline text-cerise">Konglig Datasektionen</a> 2024-2025</div>
  <div>Data för <span class="text-off-yellow">Datas 2025 Tier List</span> samlades in via enkät mellan 5 juni ~ 30 juni 2025</div>
  <div>Permalänk till tier lists: <a href="/d21" class="text-cerise underline">D-21</a>, <a href="/d22" class="text-cerise underline">D-22</a>, <a href="/2025" class="text-cerise underline">Datas 2025</a></div>
  <div>Tack till alla anonyma studenter som deltog i undersökningen <span class="text-cerise">❤</span></div>
  <div>Skåda min skitig kod på <a href="https://github.com/hexakon/d-tierlist" target="_blank" class="underline text-cerise">guthib</a></div>
  <div>Ikoner från <a href="https://lucide.dev/" class="underline text-cerise">Lucide</a></div>
</div>

<a href="#" class="fixed right-4 bottom-4 w-12 h-12 flex justify-center items-center opacity-50 bg-off-white text-off-black transition-opacity" class:hidden={hideToTop}><ArrowUpToLine size={32} /></a>