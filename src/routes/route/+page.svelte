<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    getHexColorByConnectionType,
    getIconByConnectionType,
    getLineTypeByConnectionType,
  } from "$lib/convColor";
  import change from "$lib/icons/change.svg";
  import pin from "$lib/icons/map-pin.svg";
  import start from "$lib/icons/board.svg";
  import dest from "$lib/icons/leave.svg";
  import Map from "$lib/Map.svelte";
  import network from "../../network";
  import { calculateMapBounding } from "$lib/mapCalculating";
  import { compactItinerary } from "$lib/route";
  import { secondStringify } from "$lib/timeLib";
  import { assembleDynmapLink } from "$lib/minecraftLib";

  function parse(str: string): Navigation.NavigationResult {
    return JSON.parse(str);
  }

  function* listMarkers(connection: Navigation.NavigationResult) {
    for (const [i, stop] of connection.steps.entries()) {
      if (i === connection.steps.length - 1) {
        const [x, z] = network.places[stop.to].coordinates;
        yield {
          x,
          z,
          text: stop.to,
          type: "stop",
          url: "/station?station=" + stop.to,
        } as Map.Marker;
      }
      const [x, z] = network.places[stop.from].coordinates;

      const isDriveBy =
        i === 0
          ? false
          : JSON.stringify(stop.methodNames) ===
            JSON.stringify(connection.steps[i - 1].methodNames);

      yield {
        x,
        z,
        text: stop.from,
        type: i === 0 ? "start" : isDriveBy ? "drive-by" : "change",
        subtext: stop.methodNames.join(" / "),
        url: "/station?station=" + stop.from,
      } as Map.Marker;
    }
  }

  function* listLines(connection: Navigation.NavigationResult) {
    for (const stop of connection.steps) {
      const [startX, startZ] = network.places[stop.from].coordinates;
      const [endX, endZ] = network.places[stop.to].coordinates;
      yield {
        startX,
        startZ,
        endX,
        endZ,
        type: stop.transfer,
      } as Map.ConnectedLine;
    }
  }

  const params = new URLSearchParams(location.search);
  const connectionString = params.get("connection");
</script>

<svelte:head>
  <title>Route | UVNAV | UV Navigator</title>
</svelte:head>

{#if connectionString}
  {@const connection = parse(connectionString)}
  {@const itinerary = compactItinerary(connection.steps)}
  {@const bounding = calculateMapBounding(connection.path)}
  <div class="absolute left-1/2 top-12 -translate-x-1/2 flex gap-4">
    <div class="blurry-box shadow-2xl min-w-[25vw] h-fit">
      <h1 class="font-bold text-xl">Itinerary:</h1>
      <h2 class="text-lg">
        From {connection.path[0]} → {connection.path[
          connection.path.length - 1
        ]}
      </h2>
      <p class="font-light">
        Total Distance: {connection.totalDistance} blocks
      </p>
      <p class="font-light">
        Total Travel time: {secondStringify(connection.totalTime)}
      </p>
      <hr />
      {#each itinerary as step, index}
        <div
          class="border-l-4 pl-2 py-1.5"
          style={`border-color: ${getHexColorByConnectionType(step.transfer)}; border-style: ${getLineTypeByConnectionType(step.transfer)}`}
        >
          <a
            class="text-xl font-semibold flex my-2 gap-1 text-blue-900"
            href={"/station?station=" + step.from}
            target="_blank"
          >
            <img src={index === 0 ? start : pin} />
            {step.from}
          </a>
          <p
            class="rounded-sm w-fit p-1 my-1 gap-1 backdrop-brightness-50 flex items-center shadow-md"
            style:background-color={getHexColorByConnectionType(step.transfer)}
            title={step.transfer}
          >
            <img
              src={getIconByConnectionType(step.transfer)}
              alt={step.transfer}
            />
            {step.methodNames.join(" / ")}
          </p>
          <p class="text-sm">
            Operator: {network.operators[step.methodNames[0]]}
          </p>
          <a
            class="text-xl font-semibold flex my-2 gap-1 text-blue-900"
            href={"/station?station=" + step.to}
            target="_blank"
          >
            <img src={index === connection.steps.length - 1 ? dest : pin} />
            {step.to}
          </a>
          <hr />
          {#if step.distance > 0}
            <p>Distance: {step.distance} blocks</p>
          {/if}
          <p class="mb-2">
            Travel time: {secondStringify(step.time)}
          </p>
        </div>
        {#if index !== itinerary.length - 1}
          <div
            class="border-l-4 pl-2 border-dotted border-gray-500 flex py-3 rounded-r-sm bg-gray-400"
          >
            <img src={change} alt="Change" /> Change here...
          </div>
        {:else}
          <div
            class="border-l-4 border-b-4 border-green-700 rounded-b-sm pl-2 font-bold text-xl border-double"
          >
            <p>You're there!</p>
          </div>
        {/if}
      {/each}
    </div>

    <div class="blurry-box shadow-2xl h-fit">
      {#if bounding.endX - bounding.startX > 20480 || bounding.endZ - bounding.startZ > 20480}
        <p>Distance too large to display on the map.</p>
      {:else}
        <h1 class="text-xl font-bold">Map:</h1>
        <Map
          x1={bounding.startX}
          z1={bounding.startZ}
          x2={bounding.endX}
          z2={bounding.endZ}
          markers={listMarkers(connection).toArray().toReversed()}
          lines={listLines(connection).toArray()}
        />
      {/if}
    </div>
  </div>
{:else}
  <div class="absolute left-1/2 top-12 -translate-x-1/2 blurry-box shadow-2xl">
    <h1 class="text-3xl font-bold">That's not a route!</h1>
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
{/if}
