<script lang="ts">
  import { onMount } from "svelte";
  import { calculateDeltaMap } from "./mapCalculating";
  import board from "$lib/icons/board.svg";
  import change from "$lib/icons/change.svg";
  import drive_by from "$lib/icons/drive-by.svg";
  import leave from "$lib/icons/leave.svg";
  import {
    getBGColorByStationType,
    getHexColorByConnectionType,
    getLineTypeByConnectionType,
  } from "./convColor";

  const {
    x1,
    z1,
    x2,
    z2,
    markers,
    lines,
  }: {
    x1: number;
    z1: number;
    x2: number;
    z2: number;
    markers: Map.Marker[];
    lines: Map.ConnectedLine[];
  } = $props();

  const tileSize = 1024;
  const pixelsPerTile = 128;

  const { dx, dz, x, z, xEnd, zEnd } = calculateDeltaMap(x1, z1, x2, z2);

  // @ts-ignore
  let canvas: HTMLCanvasElement = $state();
  // @ts-ignore
  let ctx: CanvasRenderingContext2D;

  let loadedTiles: number = $state(0);
  let maxTiles: number = 0;

  function getClientCoords(pos_x: number, pos_z: number): [number, number] {
    const posX = convXToPixel(pos_x);
    const posZ = convZToPixel(pos_z) + 34;
    return [posX, posZ];
  }

  function convXToPixel(pos_x: number): number {
    return ((pos_x - x) / tileSize) * pixelsPerTile;
  }

  function convZToPixel(pos_z: number): number {
    return ((pos_z - z) / tileSize) * pixelsPerTile;
  }

  function getTileUrl(x: number, z: number): string {
    return `/api/tile/${x}/${z}`;
  }

  function loadTile(
    x: number,
    z: number,
    screenX: number,
    screenZ: number
  ): void {
    const url = getTileUrl(x, z);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, screenX, screenZ, pixelsPerTile, pixelsPerTile);
      loadedTiles++;
    };
    img.onerror = () => {
      ctx.fillStyle = "#444";
      ctx.fillRect(screenX, screenZ, pixelsPerTile, pixelsPerTile);
      ctx.fillStyle = "#fff";
      ctx.fillText(
        "?",
        screenX + pixelsPerTile / 2,
        screenZ + pixelsPerTile / 2
      );
    };
    img.src = url;
  }

  onMount(() => {
    canvas = document.getElementById("map") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (let l_dx = 0; l_dx < dx; l_dx++) {
      for (let l_dz = 0; l_dz < dz; l_dz++) {
        const tileX = x + l_dx * tileSize;
        const tileZ = z + l_dz * tileSize;
        const screenX = l_dx * pixelsPerTile;
        const screenZ = l_dz * pixelsPerTile;
        maxTiles++;
        loadTile(tileX, tileZ, screenX, screenZ);
      }
    }
  });

  $effect(() => {
    if (loadedTiles >= maxTiles) {
      for (const line of lines) {
        ctx.beginPath();
        ctx.moveTo(convXToPixel(line.startX), convZToPixel(line.startZ));
        ctx.lineTo(convXToPixel(line.endX), convZToPixel(line.endZ));
        ctx.lineWidth = 5;
        ctx.strokeStyle = getHexColorByConnectionType(line.type);

        if (getLineTypeByConnectionType(line.type) === "double") {
          ctx.setLineDash([7, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      }
    }
  });
</script>

<canvas
  id="map"
  width={dx * pixelsPerTile}
  height={dz * pixelsPerTile}
  class="border-gray-300 rounded-xl border-4"
>
</canvas>
{#if canvas}
  {#each markers as marker}
    {@const [cX, cY] = getClientCoords(marker.x, marker.z)}
    <a
      class={"p-0.5 absolute rounded-xs tooltip " +
        getBGColorByStationType(marker.type)}
      style:left={`${cX}px`}
      style:top={`${cY}px`}
      href={marker.url}
      target="_blank"
    >
      {#if marker.type === "stop"}
        <span class="tooltip-text">
          <strong>Leave at:</strong><br />{marker.text}
        </span>
        <img src={leave} alt="Leave" />
      {:else if marker.type === "change"}
        <span class="tooltip-text">
          <strong>Change to</strong><br />{marker.subtext}<br /><strong
            >at</strong
          >
          {marker.text}
        </span>
        <img src={change} alt="Change" />
      {:else if marker.type === "start"}
        <span class="tooltip-text">
          <strong>Board</strong><br />{marker.subtext}<br /><strong>at</strong>
          {marker.text}
        </span>
        <img src={board} alt="Board" />
      {:else if marker.type === "drive-by"}
        <span class="tooltip-text">
          <strong>Drive by:</strong><br />{marker.text}
        </span>
        <img src={drive_by} alt="Drive By" />
      {/if}
    </a>
  {/each}
{/if}

<style>
  .tooltip .tooltip-text {
    visibility: hidden;
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
    font-size: 10pt;
    border-radius: 0.5rem;
    border: black solid 1px;
    backdrop-filter: blur(2px);

    position: absolute;
    z-index: 2;
    width: fit-content;
    padding: 0.25rem 0.5rem;

    transform: translate(-40%, -110%);
    white-space: nowrap;

    transition: all 350ms ease;
  }

  .tooltip:hover > .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
</style>
