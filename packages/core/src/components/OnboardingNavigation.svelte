<script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
    selectedMarker,
    activeMarker,
    previousMarkerId,
    showOnboardingNavigation,
  } from "./stores.js";
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";
  import { getMarkerDomId } from "../utils.js";

  $: nextHeight = $markerInformation.length * 80 + "px";
  $: prevHeight = $markerInformation.length * 80 - 50 + "px";
  let index: number;

  const navNext = () => {
    if ($previousMarkerId) {
      const elementId = `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`;
      document.getElementById(elementId)?.style.opacity = 0.5;
    }

    const elementId = document.getElementById("navigation-previous");
    elementId?.style.pointerEvents = "all";
    elementId?.style.opacity = 1;

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          index = i + 1;
          if (index + 1 === $markerInformation.length) {
            const elementId = document.getElementById("navigation-next");
            elementId?.style.pointerEvents = "none";
            elementId?.style.opacity = 0.5;
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      activeOnboardingStage.update(
        (v) => $selectedMarker?.message.onboardingStage
      );
      previousMarkerId.set($selectedMarker.marker.id);
      activeMarker.set($selectedMarker);
      const markerId = getMarkerDomId($selectedMarker.marker.id);
      const elementId = `visahoi-marker-navigation-${markerId}`;
      document.getElementById(elementId)?.style.opacity = 1;
    }
  };

  const navPrev = () => {
    if ($previousMarkerId) {
      const elementId = `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`;
      document.getElementById(elementId)?.style.opacity = 0.5;
    }

    const elementId = document.getElementById("navigation-next");
    elementId?.style.pointerEvents = "all";
    elementId?.style.opacity = 1;

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          index = i - 1;
          if (index === 0) {
            const elementId = document.getElementById("navigation-previous");
            elementId?.style.pointerEvents = "none";
            elementId?.style.opacity = 0.5;
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      activeOnboardingStage.update(
        (v) => $selectedMarker?.message.onboardingStage
      );
      activeMarker.set($selectedMarker);
      previousMarkerId.set($selectedMarker.marker.id);
      const markerId = getMarkerDomId($selectedMarker.marker.id);
      const elementId = `visahoi-marker-navigation-${markerId}`;
      document.getElementById(elementId)?.style.opacity = 1;
    }
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  {#if $activeOnboardingStage && $showOnboardingNavigation}
    {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
      <NavigationMarker markerInformation={marker} order={index + 1} />
    {/each}
  {/if}

  {#if $activeOnboardingStage && $showOnboardingNavigation}
    <div
      id="navigation-next"
      style="--bottom-height: {nextHeight}"
      class="next"
      on:click={navNext}
    >
      <span><i class="fas fa-chevron-up" /></span>
    </div>
    <div
      id="navigation-previous"
      style="--bottom-height: {prevHeight}"
      class="previous"
      on:click={navPrev}
    >
      <span><i class="fas fa-chevron-down" /></span>
    </div>
  {/if}

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} />
  {/each}
  <OnboardingNavigationMainItem />
</div>

<style>
  .next {
    position: absolute;
    bottom: var(--bottom-height);
  }

  .previous {
    position: absolute;
    bottom: var(--bottom-height);
  }

  .visahoi-navigation-container {
    position: absolute;
    bottom: 15px;
    right: 100px;
    display: flex;
    flex-direction: var(--flexDirection);
    align-items: center;
    pointer-events: all;
  }
</style>
