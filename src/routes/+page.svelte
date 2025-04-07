<script lang="ts">
  import Stationlist from "$lib/Stationlist.svelte";
  import { fade } from "svelte/transition";
  import start from "$lib/icons/map-pin.svg";
  import stop from "$lib/icons/house.svg";
  import { goto } from "$app/navigation";
  import { booleansToNumber } from "$lib/booltils";

  let returnMSG: string = $state("");

  function search(e: SubmitEvent) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const startStation = data.get("start") as string;
    const destinationStation = data.get("destination") as string;

    if (!startStation || !destinationStation) {
      return (returnMSG = "Please select a start and destination");
    }
    if (startStation === destinationStation) {
      return (returnMSG = "Start and destination can't be the same");
    }
    if (!startStation.endsWith("\u2063")) {
      return (returnMSG = "Please select a valid start station");
    }
    if (!destinationStation.endsWith("\u2063")) {
      return (returnMSG = "Please select a valid destination station");
    }

    // @ts-ignore
    const params: boolean[] = [
      !data.get("warp"),
      !data.get("iceway"),
      !data.get("pistonbolt"),
      !data.get("railway"),
      !data.get("boatway"),
      !data.get("street"),
      !data.get("walk"),
    ];

    goto(
      `/search?start=${startStation.substring(0, startStation.length - 1)}&dest=${destinationStation.substring(0, destinationStation.length - 1)}&searchparams=${booleansToNumber(params)}`
    );
  }
</script>

<svelte:head>
  <title>UVNAV | UV Navigator</title>
</svelte:head>

<div class="absolute left-1/2 top-12 -translate-x-1/2" in:fade out:fade>
  <div class="blurry-box shadow-xl mb-5">
    <h1 class="text-3xl font-bold">Welcome to UVNAV!</h1>
    <h2 class="text-xl font-medium">
      The useful <a
        href="https://ultravanilla.world/"
        target="_blank"
        class="text-blue-800 underline"
      >
        UltraVanilla
      </a> Navigator
    </h2>
  </div>

  <div class="blurry-box shadow-xl">
    <p class="text-xl">Search:</p>
    <form onsubmit={search}>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="start" class="mr-1 font-light flex gap-0.5">
                <img src={start} alt="Start" />
                Start:
              </label>
            </td>
            <td>
              <input
                type="text"
                list="stationlist"
                name="start"
                placeholder="Enter your start here..."
                class="shadow-md w-60"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="destination" class="mr-1 font-light flex gap-0.5">
                <img src={stop} alt="Destionation" />
                Destination:
              </label>
            </td>
            <td>
              <input
                type="text"
                list="stationlist"
                name="destination"
                placeholder="Enter your destination here..."
                class="shadow-md w-60"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {#each ["warp", "iceway", "pistonbolt", "railway", "boatway", "street", "walk"] as item}
        <label>
          <input type="checkbox" name={item} checked />
          Include {item}
          <br />
        </label>
      {/each}
      <p class="text-red-900">{returnMSG}</p>
      <button type="submit" class="shadow-md">Search</button>
    </form>
  </div>
</div>

<Stationlist />
