<script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
    selectedMarker,
    visHeight,
    visWidth,
    visXPosition,
    visYPosition,
    activeMarker,
  } from "./stores.js";
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";
  import { getMarkerDomId } from "../utils.js";

  export let height: number;
  const navigationHeight =
    $onboardingStages.length * 100 > height
      ? height
      : $onboardingStages.length * 100;

  const navNext = () => {
    console.log("next item");
    console.log($markerInformation);
  };

  const navPrev = () => {
    if ($selectedMarker) {
      $markerInformation.map((marker, index) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          selectedMarker.set($markerInformation[index - 1]);
        }
      });
      activeOnboardingStage.update(
        (v) => $selectedMarker?.message.onboardingStage
      );
      activeMarker.set($selectedMarker);
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
  {#if $activeOnboardingStage}
    {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
      <NavigationMarker markerInformation={marker} order={index + 1} />
    {/each}
  {/if}

  <!-- {#if $activeOnboardingStage}
    <div id="navigation-next" class="next" on:click={navNext}>
      <span><i class="fas fa-chevron-up" /></span>
    </div>
    <div id="navigation-previous" class="previous" on:click={navPrev}>
      <span><i class="fas fa-chevron-down" /></span>
    </div>
  {/if} -->

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} />
  {/each}
  <OnboardingNavigationMainItem />
</div>

<style>
  .next {
    position: absolute;
    bottom: 400px;
  }

  .previous {
    position: absolute;
    bottom: 350px;
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
