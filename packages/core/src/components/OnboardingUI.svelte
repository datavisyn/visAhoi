<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import {
    showOnboarding,
    showBackdrop,
    activeOnboardingStage,
    resetStore,
    visHeight,
    visWidth,
    visXPosition,
    visYPosition,
    onboardingMessages,
    markerInformation,
    activeMarker,
  } from "./stores.js";
  import { fade } from "svelte/transition";
  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  import { onDestroy, onMount } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  import { getMarkerInformation } from "./getMarkerInformation";

  export let ref;
  export let visElement: Element;

  const setVisElementPosition = () => {
    visXPosition.set(visElement.getBoundingClientRect().x);
    visYPosition.set(visElement.getBoundingClientRect().y);
    visWidth.set(visElement.clientWidth);
    visHeight.set(visElement.clientHeight);
  };

  const setMarkerInformation = () => {
    const updatedMarkerInformation = getMarkerInformation($onboardingMessages);
    markerInformation.set(updatedMarkerInformation);
    // update data of active marker
    activeMarker.set(
      updatedMarkerInformation.find(
        (m) => m.marker.id === $activeMarker?.marker.id
      ) || null
    );
  };

  ref.update = () => {
    setVisElementPosition();
    setMarkerInformation();
  };

  let show = true;
  showOnboarding.subscribe((value) => {
    show = value;
  });

  onMount(() => {
    setVisElementPosition();
    setMarkerInformation();
  });
  onDestroy(() => {
    resetStore();
  });
</script>

<div
  transition:fade
  class="visahoi-onboarding-ui"
  style="width:{$visWidth + 'px'}; height:{$visHeight +
    'px'}; top:{$visYPosition + window.scrollY + 'px'}; left:{$visXPosition +
    window.scrollX +
    'px'} position: absolute"
>
  <Markers />
  <Tooltips {visElement} />
  <OnboardingNavigation height={$visHeight} />
  {#if $activeOnboardingStage && $showBackdrop}
    <Backdrop />
  {/if}
</div>

<style>
  .visahoi-onboarding-ui {
    position: absolute;
    pointer-events: none;
  }
</style>
