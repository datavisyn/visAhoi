<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import { fade } from "svelte/transition";
  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  import { onMount } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  import { getMarkerInformation } from "./getMarkerInformation";
  import { VisahoiState } from "./state";
  import { debounce } from "lodash";

  export let ref;
  // state for one specific visahoi Instance (usually a vis)
  export let visState: VisahoiState;
  const {
    showOnboarding,
    visElement,
    visXPosition,
    visYPosition,
    visHeight,
    visWidth,
    onboardingMessages,
    markerInformation,
    activeMarker,
    activeOnboardingStage,
    showBackdrop,
  } = visState;


  const setMarkerInformation = (visElement) => {
    const updatedMarkerInformation = getMarkerInformation(
      visElement,
      $onboardingMessages
    );
    markerInformation.set(updatedMarkerInformation);
    // update data of active marker
    activeMarker.set(
      updatedMarkerInformation.find(
        (m) => m.marker.id === $activeMarker?.marker.id
      ) || null
    );
  };

  const resizeUpdate = (entry: ResizeObserverEntry) => {
    const newVisElement = entry.contentRect;
    // console.log("resizeobserver: ", entries, newVisElement.width)
    visXPosition.set(newVisElement.x);
    visYPosition.set(newVisElement.y);
    visWidth.set(newVisElement.width);
    visHeight.set(newVisElement.height);
    visElement.set(entry.target);
    setMarkerInformation(entry.target);
  };
  // use debounce as the chart is also rendered when resizing ends
  const debouncedResizeUpdate = debounce(resizeUpdate, 100);

  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      debouncedResizeUpdate(entries[0]);
    });
    if($visElement !== null) {
      resizeObserver.observe($visElement);
      setMarkerInformation($visElement);

    }
  });
</script>

{#if $showOnboarding}
  <div
    transition:fade={{ duration: 150 }}
    class="visahoi-onboarding-ui"
    style="width:{$visWidth + 'px'}; height:{$visHeight +
      'px'}; top:{$visYPosition + window.scrollY + 'px'}; left:{$visXPosition +
      window.scrollX +
      'px'}; position: 'absolute'"
  >
    <Markers {visState} />
    <Tooltips {visElement} {visState} />
    <OnboardingNavigation {visState} />
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
