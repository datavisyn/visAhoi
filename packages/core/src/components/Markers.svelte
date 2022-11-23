<script lang="ts">
  import {
    activeOnboardingStage,
    visHeight,
    visWidth,
    visXPosition,
    visYPosition,
    markerInformation,
    onboardingStages,
    onboardingMessages,
  } from "./stores";
  import Marker from "./Marker.svelte";
  import Backdrop from "./Backdrop.svelte";

  $: viewBox = `${$visXPosition + window.scrollX} ${
    $visYPosition + window.scrollY
  } ${$visWidth} ${$visHeight}`;

  let currentOnboardingStage;
  activeOnboardingStage.subscribe((value) => {
    currentOnboardingStage = value?.id;
  });
</script>

{#key $onboardingStages}
  <svg {viewBox} class="visahoi-markers">
    {#each $markerInformation.filter((m) => m.message.onboardingStage.id === $activeOnboardingStage?.id) as marker, index}
      <Marker markerInformation={marker} order={index + 1} />
    {/each}
  </svg>
{/key}

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
