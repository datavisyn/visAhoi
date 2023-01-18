<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import { fade } from "svelte/transition";
  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  import { getMarkerInformation } from "./getMarkerInformation";
  import { VisahoiState } from "./state";

  export let ref;
  // state for one specific visahoi Instance (usually a vis)
  export let visState: VisahoiState;
  const {showOnboarding, visElement, visXPosition, visYPosition, visHeight, visWidth, onboardingMessages, markerInformation, activeMarker, activeOnboardingStage, showBackdrop} = visState


  const setVisElementPosition = () => {
    visXPosition.set($visElement.getBoundingClientRect().x);
    visYPosition.set($visElement.getBoundingClientRect().y);
    visWidth.set($visElement.clientWidth);
    visHeight.set($visElement.clientHeight);
  };

  const setMarkerInformation = () => {
    const updatedMarkerInformation = getMarkerInformation($visElement, $onboardingMessages);

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

  onMount(() => {
    setVisElementPosition();
    setMarkerInformation();
  });

</script>
{#if $showOnboarding}
<div
  transition:fade="{{duration: 150}}"
  class="visahoi-onboarding-ui"
  style="width:{$visWidth + 'px'}; height:{$visHeight +
    'px'}; top:{$visYPosition + window.scrollY + 'px'}; left:{$visXPosition +
    window.scrollX +
    'px'}; position: 'absolute'"
>
  <Markers {visState} />
  <Tooltips {visElement} {visState} />
  <OnboardingNavigation visState={visState} />
  {#if $activeOnboardingStage && $showBackdrop}
    <Backdrop {visState} />
  {/if}
</div>
{/if}

<style>
  .visahoi-onboarding-ui {
    position: absolute;
    pointer-events: none;
  }
</style>
