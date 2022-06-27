<script script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
    selectedMarker,
    activeMarker,
    initialIndexId,
    previousMarkerId,
    showOnboardingNavigation,
  } from "./stores.js";
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";
  import { getMarkerDomId } from "../utils.js";
  import { tick } from "svelte";

  $: nextHeight = $markerInformation.length * 45 + 75 + "px";
  $: prevHeight = $markerInformation.length * 45 + 50 + "px";

  let index: number;
  let ix: number | null = null;

  $: indexId = ix;

  const navNext = () => {
    //check the initial index id to disable navigation next icon
    if ($initialIndexId === $markerInformation.length - 1) {
      const elementId = document.getElementById("navigation-next");
      elementId?.style.pointerEvents = "none";
      elementId?.style.opacity = 0.5;
      initialIndexId.set(null);
    } else {
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
    }
  };

  const navPrev = () => {
    //check the initial index id to disable navigation previous icon
    if ($initialIndexId === 0) {
      const elementId = document.getElementById("navigation-previous");
      elementId?.style.pointerEvents = "none";
      elementId?.style.opacity = 0.5;
      initialIndexId.set(null);
    } else {
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
        previousMarkerId.set($selectedMarker?.marker.id);
        const markerId = getMarkerDomId($selectedMarker?.marker.id);
        if (markerId) {
          const elementId = `visahoi-marker-navigation-${markerId}`;
          document.getElementById(elementId)?.style.opacity = 1;
        }
      }
    }
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  <div class="visahoi-navigation-marker-container">
    {#if $activeOnboardingStage && $showOnboardingNavigation}
      {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
        <NavigationMarker
          bind:ix
          markerInformation={marker}
          order={index + 1}
        />
      {/each}
    {/if}

    {#if $activeOnboardingStage && $showOnboardingNavigation}
      <div
        id="navigation-next"
        style="--bottom-height: {nextHeight}"
        class="visahoi-navigation-next"
        on:click={navNext}
      >
        <span><i class="fas fa-chevron-up" /></span>
      </div>
      <div
        id="navigation-previous"
        style="--bottom-height: {prevHeight}"
        class="visahoi-navigation-previous"
        on:click={navPrev}
      >
        <span><i class="fas fa-chevron-down" /></span>
      </div>
    {/if}
  </div>

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} />
  {/each}
  <OnboardingNavigationMainItem />
</div>

<style>
  .visahoi-navigation-marker-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    /* margin-bottom: 10px; */
    width: 80px;
    bottom: 20px;
    opacity: 1;
    z-index: 15;
  }
  .visahoi-navigation-next {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
  }

  .visahoi-navigation-previous {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
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
