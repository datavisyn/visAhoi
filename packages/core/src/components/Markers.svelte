<script lang="ts">
  import {
    activeOnboardingStage,
    onboardingMessages,
    onboardingStages,
  } from "./stores";
  import { getMarkerInformation } from "./getMarkerInformation";
  import Marker from "./Marker.svelte";
  import OnboardingNavigation from "./OnboardingNavigation.svelte";

  export let left: number;
  export let top: number;
  export let width: number;
  export let height: number;
  const viewBox = `${left +  window.scrollX} ${top +  window.scrollY} ${width} ${height}`;

  const markerInformation = getMarkerInformation($onboardingMessages);
  console.log("---> ", markerInformation);

  let currentOnboardingStage;
  activeOnboardingStage.subscribe((value) => {
    currentOnboardingStage = value?.id;
  });
</script>
<!-- "viewBox",
      plotX + " " + plotY + " " + plotWidth + " " + plotHeight -->
<svg viewBox={viewBox} class="visahoi-markers">
  {#each markerInformation.filter((m) => m.message.onboardingStage.id === $activeOnboardingStage?.id) as marker, index}
    <!-- {#if marker.message.onboardingStage.id === $activeOnboardingStage?.id} -->
      {console.log(marker, index)}
      <Marker markerInformation={marker} order={index+1} />
    <!-- {/if} -->
  {/each}
</svg>

<style>
  svg {
    background-color: rgba(115, 115, 275, 0.2);
    pointer-events: all;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
