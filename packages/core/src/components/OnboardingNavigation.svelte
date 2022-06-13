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
  } from "./stores.js";
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";

  export let height: number;
  const navigationHeight =
    $onboardingStages.length * 100 > height
      ? height
      : $onboardingStages.length * 100;

  $: viewBox = `${$visXPosition + window.scrollX - 1770} ${
    $visYPosition + window.scrollY + 30
  } ${$visWidth} ${$visHeight}`;

  $: console.log($markerInformation.sort());
  const navNext = () => {
    console.log("next item");
    console.log($markerInformation);
  };

  const navPrev = () => {
    console.log("prev item4");
    if (!$selectedMarker) {
      console.log("no selected marker");
    }
    if ($selectedMarker) {
      console.log($selectedMarker.marker.id);
      $markerInformation.map((marker, index) => {
        if (marker.marker.id === $selectedMarker.marker.id) {
          selectedMarker.set($markerInformation[index - 1]);
        }
      });
      activeOnboardingStage.update(
        (v) => $selectedMarker?.message.onboardingStage
      );
    }

    console.log($activeOnboardingStage);
    console.log($selectedMarker);
    console.log($markerInformation, "from onboarding1");
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  <!-- <div class="test">
    <svg {viewBox} class:visahoi-navigation-markers={$activeOnboardingStage}> -->
  <!-- <div style="margin-bottom: '5px'"> -->
  {#if $activeOnboardingStage}
    {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
      <!-- {#each $markerInformation as marker, index} -->
      <NavigationMarker markerInformation={marker} order={index + 1} />
    {/each}
  {/if}
  <!-- </div> -->

  {#if $activeOnboardingStage}
    <div class="next" on:click={navNext}>
      <span><i class="fas fa-chevron-up" /></span>
    </div>
    <div class="previous" on:click={navPrev}>
      <span><i class="fas fa-chevron-down" /></span>
    </div>
  {/if}

  <!-- <div class="next {$activeOnboardingStage}" on:click={navNext}>
    <span><i class="fas fa-chevron-up" /></span>
  </div>
  <div class="previous {$activeOnboardingStage}" on:click={navPrev}>
    <span><i class="fas fa-chevron-down" /></span>
  </div> -->

  <!-- </svg> -->
  <!-- </div> -->

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} />
  {/each}
  <OnboardingNavigationMainItem />
</div>

<style>
  /* .test {
    transition: opacity 0.5s ease, bottom 0.5s ease;
  } */
  .next {
    position: absolute;
    bottom: 400px;
    /* width: 20px;
    height: 30px;
    color: red; */
  }
  .previous {
    position: absolute;
    bottom: 350px;
    /* width: 20px;
    height: 30px;
    color: red; */
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

  .navigation-marker {
    position: absolute;
    bottom: 150px;
    right: 30px;
    width: 2px;
    height: 2px;
    border-style: solid;
    display: flex;
    flex-direction: column;
  }

  .visahoi-navigation-markers {
    /* pointer-events: none; */
    bottom: 150px;
    right: 30px;
    width: 100px;
    height: 100px;
    position: absolute;
    display: flex;
    flex-direction: column;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    /* background-color: blue; */
    overflow: visible;
  }

  /* .visahoi-markers {
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  } */
</style>
