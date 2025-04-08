// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {}

  namespace Map {
    type Transfer =
      | "warp"
      // | "nether"
      | "iceway"
      | "pistonbolt"
      | "railway"
      | "boatway"
      | "street"
      | "walk";

    interface Marker {
      x: number;
      z: number;
      type: "start" | "stop" | "change" | "drive-by" | "place" | "connection";
      text: string;
      subtext?: string;
      url?: string;
    }

    interface ConnectedLine {
      startX: number;
      startZ: number;
      endX: number;
      endZ: number;
      type: Transfer;
    }
  }

  namespace Navigation {
    type Coordinates = [number, number];
    type PlaceType =
      | "Hub"
      | "Town"
      | "POI"
      | "Separate station / Crossing"
      | "District";

    type Methods = Partial<Record<Map.Transfer, Routes>>;
    type Routes = Record<string, Route>;

    interface Route {
      methodNames: string[]; // Line name or similar
      distance: number;
    }

    interface Place {
      coordinates: Coordinates;
      type: PlaceType;
      methods: Methods;
    }

    interface Network {
      places: { [key: string]: Place }; // The key is the places name
      operators: { [key: string]: string }; // Operators for methods of transport
      warps: string[];
      sameMethods: string[][]; // Same as doublelines
    }

    interface NavigationResult {
      path: string[];
      totalDistance: number;
			totalTime: number;
      steps: {
        from: string;
        to: string;
        transfer: Map.Transfer;
        methodNames: string[];
        distance: number;
				time: number;
      }[];
    }

    interface FindOptions {
      avoid?: Map.Transfer[];
    }
  }
}

export {};
