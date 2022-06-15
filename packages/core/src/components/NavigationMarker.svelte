<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
  } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  const { hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;

  const bottom: string = order * 50 + 15 + "px";

  const handleClick = (event) => {
    const elementId = event.target.id;
    selectedMarker.set(markerInformation);
    document.getElementById(elementId)?.style.opacity = 1;

    activeOnboardingStage.update(
      (v) => markerInformation.message.onboardingStage
    );

    if ($activeMarker?.marker.id === marker.id) {
      activeMarker.set(null);
    } else {
      activeMarker.set(markerInformation);
    }
  };
</script>

<div
  style="--background-color:{backgroundColor}; --hover-background-color:{hoverBackgroundColor ||
    backgroundColor}; --bottom:{bottom}"
  class="visahoi-marker-navigation-item {$activeOnboardingStage}"
  on:click={handleClick}
>
  <div
    id="visahoi-marker-navigation-{getMarkerDomId(marker.id)}"
    class="visahoi-marker-navigation-item-circle {$activeOnboardingStage}"
  />
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
</style>
