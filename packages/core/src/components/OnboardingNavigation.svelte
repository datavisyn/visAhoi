<script lang="ts">
  import {
    navigationAlignment,
    onboardingStages,
    markerInformation,
    activeOnboardingStage,
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

  $: console.log("navigarion height:", navigationHeight);
  $: console.log($markerInformation);
  // $: console.log($activeOnboardingStage);

  $: viewBox = `${$visXPosition + window.scrollX + 20} ${
    $visYPosition + window.scrollY + 30
  } ${$visWidth} ${$visHeight}`;
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  <!-- <div class:navigation-marker={$activeOnboardingStage}> -->

  <svg {viewBox} class:visahoi-navigation-markers={$activeOnboardingStage}>
    {#each $markerInformation as marker, index}
      <NavigationMarker markerInformation={marker} order={index + 1} />
    {/each}
  </svg>
  <!-- </div> -->

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} />
  {/each}
  <OnboardingNavigationMainItem />
</div>

<style>
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
