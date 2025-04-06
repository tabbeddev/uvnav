<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import {
    compactItinerary,
    findAllRoutes,
    sortResultsByFastes,
    sortResultsByShortest,
    sortResultsBySimplest,
  } from "../../lib/route";
  import {
    getHexColorByConnectionType,
    getIconByConnectionType,
  } from "$lib/convColor";
  import { numberToBooleans } from "$lib/booltils";
  import { secondStringify } from "$lib/timeLib";

  function sort(results: Navigation.NavigationResult[]): typeof results {
    return sortIndex[sortOption][0](results);
  }

  function openConnection(connection: Navigation.NavigationResult) {
    goto("/route?connection=" + JSON.stringify(connection));
  }

  function convertToList(number: number): Map.Transfer[] {
    const bools = numberToBooleans(number, 7);
    const options: Map.Transfer[] = [];
    if (bools[0]) options.push("warp");
    if (bools[1]) options.push("iceway");
    if (bools[2]) options.push("pistonbolt");
    if (bools[3]) options.push("railway");
    if (bools[4]) options.push("boatway");
    if (bools[5]) options.push("street");
    if (bools[6]) options.push("walk");
    return options;
  }

  const sortIndex: Record<
    string,
    [(r: Navigation.NavigationResult[]) => typeof r, string]
  > = {
    Fastest: [sortResultsByFastes, "Shortest Time"],
    Shortest: [sortResultsByShortest, "Shortest Distance"],
    Simplest: [sortResultsBySimplest, "Least Changes"],
  };

  const params = new URLSearchParams(location.search);
  const start = params.get("start");
  const dest = params.get("dest");
  const searchparams = params.get("searchparams");
  const isInvalid = !start || !dest || !searchparams;
  const searchOptions = convertToList(searchparams as unknown as number);

  let sortOption: keyof typeof sortIndex = $state("Fastest");
</script>

<svelte:head>
  <title
    >{isInvalid
      ? "UVNAV | UV Navigator"
      : `${params.get("start")} → ${params.get("dest")} | UVNAV | UV Navigator`}</title
  >
</svelte:head>

{#if isInvalid}
  <div class="absolute left-1/2 top-12 -translate-x-1/2 blurry-box shadow-2xl">
    <h1 class="text-3xl font-bold">That's not searchable!</h1>
    <h2 class="text-lg">
      This URL is not valid.<br />Please go back and search again
    </h2>
    <button
      type="button"
      onclick={() => {
        goto("/");
      }}>Go back</button
    >
  </div>
{:else}
  {@const results = findAllRoutes(start, dest, { avoid: searchOptions })}
  <div class="absolute left-1/2 top-12 -translate-x-1/2" in:fade out:fade>
    <div class="blurry-box shadow-xl mb-5">
      <h1 class="text-3xl font-bold">{results.length} search results for:</h1>
      <h2 class="text-xl font-medium">{start} → {dest}</h2>
      <label>
        Sort by:
        <select bind:value={sortOption}>
          {#each Object.entries(sortIndex) as [key, [_, description]], index}
            <option selected={index === 0} value={key}
              >{key} ({description})</option
            >
          {/each}
        </select>
      </label>
      <br />
      <button
        type="button"
        onclick={() => {
          goto("/");
        }}>Search another connection</button
      >
    </div>

    {#if results.length > 0}
      {#each sort(results) as result}
        <div
          class="blurry-box shadow-xl mb-5 min-w-[60vw] cursor-pointer"
          onclick={() => {
            openConnection(result);
          }}
        >
          <p class="text-lg font-medium">{secondStringify(result.totalTime)}</p>
          <p>Distance: {result.totalDistance} blocks</p>
          <div class="flex gap-1">
            {#each compactItinerary(result.steps) as step}
              {@const isSoloWarped =
                step.transfer === "warp" && result.steps.length === 1}
              <div
                class="rounded-sm px-1 flex min-w-fit justify-center gap-0.5"
                style:background-color={getHexColorByConnectionType(
                  step.transfer
                )}
                style:width={(isSoloWarped
                  ? "100"
                  : (step.distance / result.totalDistance) * 100) + "%"}
                title={`${step.from} → ${step.to}\nby: ${step.methodNames.join(" / ")} (${step.transfer})\n\nDistance: ${step.distance} blocks\nTime: ${secondStringify(step.time)}`}
              >
                <img src={getIconByConnectionType(step.transfer)} />
                {#if step.distance / result.totalDistance > 0.1 || isSoloWarped}
                  {step.methodNames
                    .join(" / ")
                    .replaceAll("UltraStar Express", "USTe")
                    .replaceAll("UltraStar", "UST")}
                {/if}
              </div>
            {/each}
          </div>
          <p class="font-light italic">Click to see more details</p>
        </div>
      {/each}
    {:else}
      <div class="blurry-box shadow-xl mb-5">
        <h1 class="text-xl">No connections found. Sorry :(</h1>
      </div>
    {/if}
  </div>
{/if}
