import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const { x, z } = params;

  // Zoom 3 (ZZZ)
  // const chunkX = Math.round(Number(x) / 1024);
  // const chunkZ = Math.round(Number(z) / 1024) * -1;
  // const tileX = Math.ceil(Number(x) / 32 / 8) * 8 - 8;
  // const tileZ = Math.ceil(Number(z) / 32 / 8) * (-8) + 8;
  // const zoom = 3;

  // Zoom 5 (ZZZZZ)
  const chunkX = Math.floor(Number(x) / 1024);
  const chunkZ = Math.floor(Number(z) / 1024) * -1;
  const tileX = chunkX * 32;
  const tileZ = chunkZ * 32;
  const zoom = 5;

  const res = await fetch(
    `https://ultravanilla.world/tiles/world/flat/${chunkX}_${chunkZ}/${
      "z".repeat(
        zoom,
      )
    }_${tileX}_${tileZ}.png`,
  );

  if (!res.ok) {
    return error(res.status, "Tile not found!");
  }

  const tile = await res.arrayBuffer();
  return new Response(tile, {
    headers: {
      "Content-Type": "image/png",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
