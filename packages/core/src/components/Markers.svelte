<script lang="ts">
  import {
    activeOnboardingStage,
    onboardingMessages,
    visHeight,
    visWidth,
    visXPosition,
    visYPosition,
  } from "./stores";
  import { getMarkerInformation } from "./getMarkerInformation";
  import Marker from "./Marker.svelte";

  $: viewBox = `${$visXPosition + window.scrollX} ${
    $visYPosition + window.scrollY
  } ${$visWidth} ${$visHeight}`;

  const markerInformation = getMarkerInformation($onboardingMessages);

  let currentOnboardingStage;
  activeOnboardingStage.subscribe((value) => {
    currentOnboardingStage = value?.id;
  });
</script>

<svg viewBox={viewBox} class="visahoi-markers">
  {#each markerInformation.filter((m) => m.message.onboardingStage.id === $activeOnboardingStage?.id) as marker, index}
    <Marker markerInformation={marker} order={index + 1} />
  {/each}
</svg>

<style>
  svg {
    pointer-events: all;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }
</style>
