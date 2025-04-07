import network from "../network";

export function calculateDeltaMap(
  startX: number,
  startZ: number,
  endX: number,
  endZ: number
): {
  dx: number;
  dz: number;
  x: number;
  z: number;
} {
  [endX, startX] = [startX, endX].toSorted();
  [endZ, startZ] = [startZ, endZ].toSorted();

  return {
    dx: Math.ceil((endX - startX) / 1024),
    dz: Math.ceil((endZ - startZ) / 1024),
    x: Math.floor(startX / 1024) * 1024,
    z: Math.floor(startZ / 1024) * 1024,
  };
}

export function calculateMapBounding(
  paths: Navigation.NavigationResult["path"]
): {
  startX: number;
  startZ: number;
  endX: number;
  endZ: number;
} {
  const coordsX = paths.map((plc) => network.places[plc].coordinates[0]);
  const coordsZ = paths.map((plc) => network.places[plc].coordinates[1]);
  return {
    startX: Math.floor(Math.min(...coordsX) / 1024) * 1024,
    startZ: Math.floor(Math.min(...coordsZ) / 1024) * 1024,
    endX: Math.ceil(Math.max(...coordsX) / 1024) * 1024,
    endZ: Math.ceil(Math.max(...coordsZ) / 1024) * 1024,
  };
}
