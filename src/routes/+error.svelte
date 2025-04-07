<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
</script>

<svelte:head>
  <title>{page.status} | UVNAV | UV Navigator</title>
</svelte:head>

<div
  class="absolute left-1/2 top-12 -translate-x-1/2 blurry-box shadow-2xl"
  in:fade
  out:fade
>
  <h1 class="text-3xl font-bold">{page.status}</h1>
  <h2 class="text-xl font-medium">{page.error?.message}</h2>
  <button
    type="button"
    onclick={() => {
      goto("/");
    }}>Go back</button
  >
</div>
