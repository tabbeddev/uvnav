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

function calcBounding(coordsX: number[], coordsZ: number[]): Boundings {
  return {
    startX: Math.floor(Math.min(...coordsX) / 1024) * 1024,
    startZ: Math.floor(Math.min(...coordsZ) / 1024) * 1024,
    endX: Math.ceil(Math.max(...coordsX) / 1024) * 1024,
    endZ: Math.ceil(Math.max(...coordsZ) / 1024) * 1024,
  };
}

type Boundings = {
  startX: number;
  startZ: number;
  endX: number;
  endZ: number;
};

export function calculateMapBounding(
  paths: Navigation.NavigationResult["path"]
): Boundings {
  const coordsX = paths.map((plc) => network.places[plc].coordinates[0]);
  const coordsZ = paths.map((plc) => network.places[plc].coordinates[1]);
  return calcBounding(coordsX, coordsZ);
}

export function calculateMapBoundingByMarkers(
  markers: Map.Marker[]
): Boundings {
  const coordsX = markers.map((mk) => mk.x);
  const coordsZ = markers.map((mk) => mk.z);
  return calcBounding(coordsX, coordsZ);
}
