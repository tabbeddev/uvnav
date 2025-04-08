export function convTicksToTime(t: number): string {
  const d = new Date(t * 3600 + 18000000);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function calcSpeedFactor(transfer: Map.Transfer): number {
  switch (transfer) {
    case "railway":
    case "boatway":
    case "street":
      return 8;

    case "iceway":
      return 70;

    case "pistonbolt":
      return 50;

    case "warp":
      return 0;

    case "walk":
      return 6.5;
  }
}

export function assembleDynmapLink(coordinates: Navigation.Coordinates): string {
  return "https://ultravanilla.world/#Z1," + coordinates.join(",");
}
