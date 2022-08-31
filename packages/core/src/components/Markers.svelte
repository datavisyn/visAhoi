<script lang="ts">
  import {
    activeOnboardingStage,
    visHeight,
    visWidth,
    visXPosition,
    visYPosition,
    markerInformation,
  } from "./stores";
  import Marker from "./Marker.svelte";
  import Backdrop from "./Backdrop.svelte";

  $: viewBox = `${$visXPosition + window.scrollX} ${
    $visYPosition + window.scrollY
  } ${$visWidth} ${$visHeight}`;

  $: markInfo = $markerInformation.sort((a, b) => {
    if (a.message.onboardingStage.title === b.message.onboardingStage.title) {
      return a.message?.order > b.message?.order ? -1 : 1;
    } else {
      return a.message.onboardingStage.title > b.message.onboardingStage.title
        ? -1
        : 1;
    }
  });

  let currentOnboardingStage;
  activeOnboardingStage.subscribe((value) => {
    currentOnboardingStage = value?.id;
  });
</script>

<svg {viewBox} class="visahoi-markers">
  {#each markInfo.filter((m) => m.message.onboardingStage.id === $activeOnboardingStage?.id) as marker, index}
    <Marker markerInformation={marker} order={index + 1} />
  {/each}
</svg>

<style>
  svg {
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }
</style>
