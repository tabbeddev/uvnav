import colors from "tailwindcss/colors";
import boatway from "$lib/icons/transfer/boatway.svg";
import iceway from "$lib/icons/transfer/iceway.svg";
import pistonbolt from "$lib/icons/transfer/pistonbolt.svg";
import railway from "$lib/icons/transfer/railway.svg";
import street from "$lib/icons/transfer/street.svg";
import warp from "$lib/icons/transfer/warp.svg";
import walk from "$lib/icons/change.svg";

export function getBGColorByStationType(type: Map.Marker["type"]): string {
  switch (type) {
    case "start":
      return "bg-blue-300";
    case "change":
      return "bg-purple-400";
    case "stop":
      return "bg-green-300";
    case "drive-by":
      return "bg-yellow-300";
  }
}

export function getColorByConnectionType(type: Map.Transfer): string {
  switch (type) {
    case "boatway":
      return "blue-500";
    case "iceway":
      return "blue-300";
    case "pistonbolt":
      return "gray-500";
    case "railway":
      return "purple-400";
    case "street":
      return "yellow-600";
    case "walk":
      return "cyan-500";
    case "warp":
      return "fuchsia-500";
  }
}

export function getHexColorByConnectionType(type: Map.Transfer): string {
  const bg_class = getColorByConnectionType(type).split("-");
  // @ts-ignore
  return colors[bg_class[0]][bg_class[1]];
}

export function getLineTypeByConnectionType(type: Map.Transfer): string {
  switch (type) {
    case "warp":
      return "double";

    default:
      return "solid";
  }
}

export function getIconByConnectionType(type: Map.Transfer): string {
  switch (type) {
    case "boatway":
      return boatway;
    case "iceway":
      return iceway;
    case "pistonbolt":
      return pistonbolt;
    case "railway":
      return railway;
    case "street":
      return street;
    case "walk":
      return walk;
    case "warp":
      return warp;
  }
}
