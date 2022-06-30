<script script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
    previousOnboardingStage,
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

  $: navNextOpacity = 1;
  $: navPreviousOpacity = 1;
  $: navNextPointerEvent = "all";
  $: navPreviousPointerEvent = "all";

  let index: number;
  let ix: number | null = null;
  $: indexId = ix;
  // debugger;

  // console.log("check it again -2");
  // $: console.log("indexId from onboarding navigation", indexId);
  $: test = indexId === 4 ? "test is true" : "test is false";
  // $: console.log(test, "A sample test");
  console.log("IxNumber", indexId);

  $: test1 = async () => {
    console.log(indexId, "IxNumber");
    switch (indexId) {
      case 0: {
        await tick();
        const elementId = document.getElementById("navigation-previous");
        elementId?.style.pointerEvents = "none";
        elementId?.style.opacity = 0.5;
        break;
      }
      case $markerInformation.length - 1: {
        const elementId = document.getElementById("navigation-next");
        elementId?.style.pointerEvents = "none";
        elementId?.style.opacity = 0.5;
        break;
      }

      // case null: {
      //   console.log("It is null");
      // }
      default: {
        console.log("index id fron not hghjg", indexId);
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

  $: test1();

  // $: indexId = ix;
  // navNextOpacity = $initialIndexId === $markerInformation.length - 1 ? 0.5 : 1;
  // console.log(navNextOpacity, "navigation next opacity");

  const navNext = () => {
    //check the initial index id to disable navigation next icon
    // if ($initialIndexId === $markerInformation.length - 1) {
    //   navNextPointerEvent = "none";
    //   navNextOpacity = 0.5;
    //   initialIndexId.set(null);
    // } else {
    if ($previousMarkerId) {
      console.log($markerInformation);
      console.log("Previous Marker id", $previousMarkerId);
      $markerInformation.map((m) => {
        if (m.marker.id === $previousMarkerId) {
          $previousOnboardingStage = m.message.onboardingStage;
          console.log($previousOnboardingStage, "previous testb marker");
        }
      });

      const elementId = `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`;
      document.getElementById(elementId)?.style.opacity = 0.5;
    }
    const elementId = document.getElementById("navigation-previous");
    elementId?.style.pointerEvents = "all";
    elementId?.style.opacity = 1;

    // navPreviousOpacity = 1;
    // navPreviousPointerEvent = "all";

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          index = i + 1;
          if (index + 1 === $markerInformation.length) {
            const elementId = document.getElementById("navigation-next");
            elementId?.style.pointerEvents = "none";
            elementId?.style.opacity = 0.5;

            // navNextOpacity = 0.5;
            // navNextPointerEvent = "none";
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
    // }
  };

  const navPrev = () => {
    // debugger;
    // check the initial index id to disable navigation previous icon
    // if ($initialIndexId === 0) {
    //   navPreviousPointerEvent = "none";
    //   navPreviousOpacity = 0.5;
    //   initialIndexId.set(null);
    // } else {
    if ($previousMarkerId) {
      const elementId = `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`;
      document.getElementById(elementId)?.style.opacity = 0.5;
    }
    const elementId = document.getElementById("navigation-next");
    elementId?.style.pointerEvents = "all";
    elementId?.style.opacity = 1;

    // navNextOpacity = 1;
    // navNextPointerEvent = "all";

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          index = i - 1;
          if (index === 0) {
            // console.log("Its is from inside");
            const elementId = document.getElementById("navigation-previous");
            elementId?.style.pointerEvents = "none";
            elementId?.style.opacity = 0.5;

            // navPreviousOpacity = 0.5;
            // navPreviousPointerEvent = "none";
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
    // }
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  <div class="visahoi-navigation-marker-container">
    {#if $activeOnboardingStage && $showOnboardingNavigation}
      {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
        <!-- <NavigationMarker markerInformation={marker} order={index + 1} /> -->
        <NavigationMarker
          bind:ix
          markerInformation={marker}
          order={index + 1}
        />
      {/each}
    {/if}

    {#if $activeOnboardingStage && $showOnboardingNavigation}
      <!-- <div
        id="navigation-next"
        style="--bottom-height: {nextHeight}; --opacity: {navNextOpacity}; --pointerEvents: {navNextPointerEvent}"
        class="visahoi-navigation-next"
        on:click={navNext}
      > -->
      <div
        id="navigation-next"
        style="--bottom-height: {nextHeight}"
        class="visahoi-navigation-next"
        on:click={navNext}
      >
        <span><i class="fas fa-chevron-up" /></span>
      </div>
      <!-- <div
        id="navigation-previous"
        style="--bottom-height: {prevHeight}; --opacity: {navPreviousOpacity}; --pointerEvents: {navPreviousPointerEvent}"
        class="visahoi-navigation-previous"
        on:click={navPrev}
      > -->
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
