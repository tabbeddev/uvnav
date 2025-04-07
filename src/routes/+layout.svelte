<script lang="ts">
  import { getUpdateByProxy } from "$lib/dynmapUpdateCracker";
  import { convTicksToTime } from "$lib/minecraftLib";
  import clock from "$lib/icons/clock.svg";
  import earth from "$lib/icons/earth.svg";
  import users from "$lib/icons/users.svg";
  import gamepad from "$lib/icons/gamepad-2.svg";
  import "../app.css";
  import { goto } from "$app/navigation";

  let { children } = $props();
  let servertime: number = $state(0);
  let players: number = $state(0);
  let timestring: string = $derived(convTicksToTime(servertime));
  let realtime: string = $state(new Date().toLocaleTimeString());

  getUpdateByProxy().then((update) => {
    servertime = update.servertime;
    players = update.players.length;

    setInterval(() => {
      servertime += 20;
      if (servertime >= 24000) {
        servertime -= 24000;
      }

      realtime = new Date().toLocaleTimeString();
    }, 1000);

    setInterval(
      () => {
        getUpdateByProxy().then((u) => {
          players = update.players.length;
        });
      },
      5 * 60 * 1000
    );
  });
</script>

<svelte:head>
  <meta property="og:title" content="UltraVanilla Navigator Project" />
  <meta property="description" content="The useful UltraVanilla Router" />
  <meta property="og:description" content="The useful UltraVanilla Router" />
</svelte:head>

{@render children()}

<nav
  class="bg-gray-300 flex justify-around p-1 shadow-md fixed min-w-screen top-0 left-0"
>
  <p class="flex gap-1 text-lg min-w-64">
    <img src={clock} alt="Time" title="Time" />
    :
    <img src={gamepad} alt="Ingame Time" title="Ingame Time" />
    {timestring},
    <img src={earth} alt="Real Time" title="Real Time" />
    {realtime}
  </p>
  <p class="text-xl">
    <span class="font-semibold">UltraVanilla Navigator</span> Project
    <button
      type="button"
      class="text-sm m-0! min-w-16"
      onclick={() => {
        goto("/");
      }}>Home</button
    >
  </p>
  <p class="flex gap-1 text-lg min-w-48">
    <img src={users} alt="Online Players" title="Online Players" />
    {players}
  </p>
</nav>
