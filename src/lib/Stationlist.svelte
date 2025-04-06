<script lang="ts">
  import network from "../network";
	const t = "\u2063"
</script>

<datalist id="stationlist">
  {#each Object.keys(network.places) as place}
    <option>{place}{t}</option>
  {/each}
</datalist>
