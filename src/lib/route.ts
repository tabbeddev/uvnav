import network from "../network";
import { calcSpeedFactor } from "./minecraftLib";

export function sortResultsByShortest(
  results: Navigation.NavigationResult[]
): typeof results {
  return results.toSorted((a, b) => {
    return a.totalDistance - b.totalDistance;
  });
}

export function sortResultsBySimplest(
  results: Navigation.NavigationResult[]
): typeof results {
  return results.toSorted((a, b) => {
    return compactItinerary(a.steps).length - compactItinerary(b.steps).length;
  });
}

export function sortResultsByFastes(
  results: Navigation.NavigationResult[]
): typeof results {
  return results.toSorted((a, b) => {
    return a.totalTime - b.totalTime;
  });
}

export function findAllRoutes(
  start: string,
  end: string,
  options: Navigation.FindOptions = {}
): Navigation.NavigationResult[] {
  const results: Navigation.NavigationResult[] = [];
  const visited = new Set<string>();
  const avoid = new Set(options.avoid || []);

  // Build methodName -> groupSet Map
  const methodToGroupMap = new Map<string, Set<string>>();
  if (network.sameMethods) {
    for (const group of network.sameMethods) {
      const set = new Set(group);
      for (const method of group) {
        methodToGroupMap.set(method, set);
      }
    }
  }

  dfs(start, [], 0, [], new Set<string>(), new Set<string>());

  // Warps (only at start)
  const warpStarts =
    network.warps?.filter(
      (w) => w !== start && Object.keys(network.places).includes(w)
    ) ?? [];

  if (!options.avoid?.includes("warp")) {
    for (const initialStart of warpStarts) {
      dfs(
        initialStart,
        [start, initialStart],
        0,
        [
          {
            distance: 0,
            from: start,
            to: initialStart,
            methodNames: [initialStart + " Warp"],
            transfer: "warp",
            time: 0,
          },
        ],
        new Set<string>(),
        new Set<string>()
      );
    }
  }

  function dfs(
    current: string,
    path: string[],
    distance: number,
    steps: Navigation.NavigationResult["steps"],
    usedGroupedMethods: Set<string>,
    currentMethodGroup: Set<string> | null
  ) {
    if (visited.has(current)) return;
    visited.add(current);

    const newPath = [...path, current];
    if (current === end) {
      results.push({
        path: newPath,
        totalDistance: distance,
        steps: [...steps],
        totalTime: Math.round(
          steps.reduce((pre, cur) => {
            return pre + cur.time;
          }, 0)
        ),
      });
      visited.delete(current);
      return;
    }

    const place = network.places[current];
    if (!place || !place.methods) {
      visited.delete(current);
      return;
    }

    for (const [transfer, routes] of Object.entries(place.methods) as [
      Map.Transfer,
      Navigation.Routes
    ][]) {
      if (avoid.has(transfer)) continue;

      for (const [neighbor, route] of Object.entries(routes)) {
        if (visited.has(neighbor)) continue;

        let routeGroup: Set<string> | null = null;

        for (const name of route.methodNames) {
          if (methodToGroupMap.has(name)) {
            routeGroup = methodToGroupMap.get(name)!;
            break;
          }
        }

        // Block if this new group has already been used
        if (
          routeGroup &&
          [...routeGroup!].some((name) => usedGroupedMethods.has(name))
        ) {
          continue;
        }

        const changedGroup =
          currentMethodGroup && routeGroup && currentMethodGroup !== routeGroup;

        // Neue Kopien für Rekursion
        const newUsedGroupedMethods = new Set(usedGroupedMethods);
        const newCurrentGroup =
          changedGroup || (currentMethodGroup && !routeGroup)
            ? null // Wir verlassen die Gruppe
            : routeGroup ?? null;

        // Wenn Gruppe verlassen wurde, trage alte ein
        if (changedGroup && currentMethodGroup) {
          for (const name of currentMethodGroup) {
            newUsedGroupedMethods.add(name);
          }
        }

        dfs(
          neighbor,
          newPath,
          distance + route.distance,
          [
            ...steps,
            {
              from: current,
              to: neighbor,
              transfer,
              methodNames: route.methodNames,
              distance: route.distance,
              time: route.distance / calcSpeedFactor(transfer),
            },
          ],
          newUsedGroupedMethods,
          newCurrentGroup
        );
      }
    }

    visited.delete(current);
  }

  return results;
}

export function compactItinerary(
  route: Navigation.NavigationResult["steps"]
): typeof route {
  const newSteps: typeof route = [];
  let startStation: string | null = null;
  let usedMethod: string[] | null = null;
  let totalDistance: number | null = null;
  let totalTime: number | null = null;

  for (const [i, stop] of route.entries()) {
    if (
      startStation === null ||
      !usedMethod ||
      totalDistance === null ||
      totalTime === null
    ) {
      startStation = stop.from;
      usedMethod = stop.methodNames;
      totalDistance = 0;
      totalTime = 0;
    }

    totalDistance += stop.distance;
    totalTime += stop.time;

    if (
      i + 1 === route.length ||
      JSON.stringify(route[i + 1].methodNames) !== JSON.stringify(usedMethod) // Javascript being silly
    ) {
      newSteps.push({
        from: startStation,
        to: stop.to,
        distance: totalDistance,
        methodNames: usedMethod,
        time: totalTime,
        transfer: stop.transfer,
      });
      startStation = null;
    }
  }
  return newSteps;
}
