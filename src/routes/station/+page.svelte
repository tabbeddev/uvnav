<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    getHexColorByConnectionType,
    getIconByConnectionType,
  } from "$lib/convColor";
  import Map from "$lib/Map.svelte";
  import { calculateMapBoundingByMarkers } from "$lib/mapCalculating";
  import { assembleDynmapLink, calcSpeedFactor } from "$lib/minecraftLib";
  import { secondStringify } from "$lib/timeLib";
  import network from "../../network";

  const params = new URLSearchParams(location.search);
  const stationString = params.get("station");

  function* listMarkers(station: Navigation.Place) {
    for (const [_, routes] of Object.entries(station.methods)) {
      for (const [dest, details] of Object.entries(routes)) {
        const [x, z] = network.places[dest].coordinates;
        yield {
          type: "connection",
          text: dest,
          x,
          z,
          subtext: details.methodNames.join(" / "),
          url: "/station?station=" + dest,
        } as Map.Marker;
      }
    }
  }

  function* listLines(station: Navigation.Place) {
    const [startX, startZ] = station.coordinates;
    for (const [type, routes] of Object.entries(station.methods)) {
      for (const [dest, _] of Object.entries(routes)) {
        const [endX, endZ] = network.places[dest].coordinates;
        yield {
          type,
          startX,
          startZ,
          endX,
          endZ,
        } as Map.ConnectedLine;
      }
    }
  }
</script>

<svelte:head>
  <title>{stationString} | UVNAV | UV Navigator</title>
</svelte:head>

{#if stationString && network.places[stationString]}
  {@const station = network.places[stationString]}
  {@const markers: Map.Marker[] = [
            {
              type: "place",
              x: station.coordinates[0],
              z: station.coordinates[1],
              text: stationString,
              url: assembleDynmapLink(station.coordinates),
            },
            ...listMarkers(station),
          ]}
  {@const boundings = calculateMapBoundingByMarkers(markers)}

  <div class="absolute left-1/2 top-12 -translate-x-1/2 flex gap-4">
    <div>
      <div class="blurry-box shadow-2xl mb-5">
        <h1 class="text-2xl font-bold">{stationString}</h1>
        <p><strong>Type:</strong> {station.type}</p>
        <a href={assembleDynmapLink(station.coordinates)} class="text-blue-900">
          <strong>Coordinates:</strong>
          {station.coordinates.join(", ")}
        </a>
      </div>
      <div class="blurry-box shadow-2xl mb-6">
        <Map
          x1={boundings.startX}
          z1={boundings.startZ}
          x2={boundings.endX}
          z2={boundings.endZ}
          markers={markers.toReversed()}
          lines={listLines(station).toArray()}
        />
      </div>
    </div>
    <div class="min-w-fit">
      <p class="blurry-box shadow-2xl mb-5 font-bold text-xl">
        Connections from {stationString}:
      </p>
      {#each Object.entries(station.methods) as [type, transfers]}
        {#each Object.entries(transfers) as [dest, details]}
          <div
            class="blurry-box shadow-2xl mb-5 border-l-6 flex items-center gap-2"
            style:border-color={getHexColorByConnectionType(
              type as Map.Transfer
            )}
          >
            <img
              src={getIconByConnectionType(type as Map.Transfer)}
              class="h-8"
            />
            <div>
              <p
                class="rounded-sm w-fit p-1 my-1 gap-1 backdrop-brightness-50 flex items-center shadow-md text-lg font-medium"
                style:background-color={getHexColorByConnectionType(
                  type as Map.Transfer
                )}
              >
                {details.methodNames.join(" / ")}
              </p>

              <p>
                to <a
                  class="font-medium text-blue-900"
                  href={"/station?station=" + dest}
                  target="_blank">{dest}</a
                >
              </p>
              <p class="text-sm">Distance: {details.distance} blocks</p>
              <p class="text-sm">
                Time: {secondStringify(
                  details.distance / calcSpeedFactor(type as Map.Transfer)
                )}
              </p>
            </div>
          </div>
        {/each}
      {/each}
    </div>
  </div>
{:else}
  <div class="absolute left-1/2 top-12 -translate-x-1/2 blurry-box shadow-2xl">
    <h1 class="text-3xl font-bold">That's not a station!</h1>
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
