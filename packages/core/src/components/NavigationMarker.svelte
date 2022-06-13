<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    activeOnboardingStage,
    markerInformation as markInfo,
    selectedMarker,
  } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;
  // export let bottom:string;

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;
  $: console.log($markInfo, "markInfo");

  const bottom: string = order * 50 + "px";
  console.log("bottom4");

  const handleClick = (event) => {
    console.log(marker.id, "from navigarion marker");
    selectedMarker.set(markerInformation);
    // selectedMarker.update((v) => v.id = marker.id);
    console.log($selectedMarker);

    activeOnboardingStage.update(
      (v) => markerInformation.message.onboardingStage
    );

    if ($activeMarker?.marker.id === marker.id) {
      activeMarker.set(null);
    } else {
      activeMarker.set(markerInformation);
    }
  };

  const xaxis = 80;
  const yaxis = 20 * (16 * order);
</script>

<!-- <g id={getMarkerDomId(marker.id)} text-anchor="middle" on:click={handleClick}>
  <circle
    style="
      --active-background-color:{activeBackgroundColor ||
      hoverBackgroundColor ||
      backgroundColor};
      --hover-background-color:{hoverBackgroundColor || backgroundColor};
      --backgroundColor:{backgroundColor}
    "
    class={`visahoi-marker ${
      $activeMarker?.marker.id === marker.id ? "active" : ""
    }`}
    cx={xaxis}
    cy={yaxis}
    r="15px"
  />
</g> -->

<div
  style="--background-color:{backgroundColor}; --hover-background-color:{hoverBackgroundColor ||
    backgroundColor}; --bottom:{bottom}"
  class="visahoi-marker-navigation-item {$activeOnboardingStage}"
  on:click={handleClick}
>
  <div class="visahoi-marker-navigation-item-circle {$activeOnboardingStage}" />
</div>

<style>
  .visahoi-marker-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* transition: opacity 0.5s ease, bottom 0.5s ease; */
    margin: 5px;
    width: 80px;
    border: 1px;
    border-style: dashed;
    bottom: var(--bottom);
    opacity: 1;
    z-index: 15;
  }

  .visahoi-marker-navigation-item-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 5px;
    opacity: 0.5;
    background-color: var(--background-color);
    /* transition: background-color 0.2s ease; */
  }

  .visahoi-marker-navigation-item-circle:hover {
    opacity: 1;
  }

  /* circle {
    fill: var(--backgroundColor);
    transition: fill 0.2s ease;
    margin: 5px;
  }

  circle.active {
    fill: var(--active-background-color);
  }

  g:hover > circle {
    fill: var(--hover-background-color);
  }

  g {
    cursor: pointer;
    pointer-events: all;
  } */
</style>
