<script script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
    selectedMarker,
    activeMarker,
    previousMarkerId,
    markerIndexId,
    showOnboardingNavigation,
  } from "./stores.js";
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils.js";
  import { tick } from "svelte";

  $: nextHeight = $markerInformation.length * 35 + 75 + "px";
  $: prevHeight = $markerInformation.length * 35 + 50 + "px";

  let index: number;

  $: enableDisableNavIcons = async () => {
    switch ($markerIndexId) {
      case 0: {
        await tick();
        const preElementId = document.getElementById("navigation-previous");
        preElementId?.style.pointerEvents = "none";
        preElementId?.style.opacity = 0.5;

        const nextElementId = document.getElementById("navigation-next");
        nextElementId?.style.pointerEvents = "all";
        nextElementId?.style.opacity = 1;
        break;
      }
      case $markerInformation.length - 1: {
        await tick();
        const nextElementId = document.getElementById("navigation-next");
        nextElementId?.style.pointerEvents = "none";
        nextElementId?.style.opacity = 0.5;

        const preElementId = document.getElementById("navigation-previous");
        preElementId?.style.pointerEvents = "all";
        preElementId?.style.opacity = 1;
        break;
      }
      default: {
        await tick();
        const preElementId = document.getElementById("navigation-previous");
        preElementId?.style.pointerEvents = "all";
        preElementId?.style.opacity = 1;

        const nextElementId = document.getElementById("navigation-next");
        nextElementId?.style.pointerEvents = "all";
        nextElementId?.style.opacity = 1;
      }
    }
  };

  $: enableDisableNavIcons();

  const navNext = () => {
    if ($previousMarkerId) {
      const elementId = getNavigationMarkerDomId($previousMarkerId);
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
      previousMarkerId.set($selectedMarker?.marker.id);
      activeMarker.set($selectedMarker);
      const markerId = getMarkerDomId($selectedMarker?.marker.id);
      const elementId = `visahoi-marker-navigation-${markerId}`;
      document.getElementById(elementId)?.style.opacity = 1;
    }
  };

  const navPrev = () => {
    if ($previousMarkerId) {
      const elementId = getNavigationMarkerDomId($previousMarkerId);
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
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  <div class="visahoi-navigation-marker-container">
    {#if $activeOnboardingStage && $showOnboardingNavigation}
      {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
        <NavigationMarker markerInformation={marker} order={index + 1} />
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
    width: 80px;
    bottom: 20px;
    opacity: 1;
    z-index: 15;
  }
  .visahoi-navigation-next {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
    /* opacity: var(--opacity);
    pointer-events: var(--pointerEvents); */
  }

  .visahoi-navigation-previous {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
    /* opacity: var(--opacity);
    pointer-events: var(--pointerEvents); */
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
