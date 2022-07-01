<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
    previousMarkerId,
    initialIndexId,
    markerInformation as markInfo,
    showOnboarding,
  } from "./stores";
  import { getMarkerDomId } from "../utils";
  import { tick } from "svelte";

  export let markerInformation: IMarkerInformation;
  export let order: number;
  export let ix: number | null;

  let ixNumber: number | null;

  $: ix = ixNumber;
  $: bottom = order * 45 + 15 + "px";

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;

  let arrValue: IMarkerInformation[] = [];

  /**First navigation marker which belongs to the activeOnboarding stage is selected */
  $markInfo.map(async (message) => {
    if (
      message.message.onboardingStage.title === $activeOnboardingStage?.title
    ) {
      arrValue.push(message);
      selectedMarker.set(arrValue[0]);

      activeOnboardingStage.update(
        (v) => $selectedMarker?.message.onboardingStage
      );
      activeMarker.set($selectedMarker);
      previousMarkerId.set($selectedMarker?.marker.id);

      await tick();
      const elementId = `visahoi-marker-navigation-visahoi-marker-${$selectedMarker?.marker.id}`;
      document.getElementById(elementId)?.style.opacity = 1;
    }
  });

  $markInfo.map((maker, i) => {
    if (maker.marker.id === $previousMarkerId) {
      if (i === 0 || i === $markInfo.length - 1) {
        initialIndexId.set(i);
        // console.log($initialIndexId, "initial index id");
        ixNumber = i;
        // console.log(ixNumber);
      }
    }
  });

  const handleClick = (event) => {
    if ($previousMarkerId) {
      const elementId = `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`;
      document.getElementById(elementId)?.style.opacity = 0.5;
    }

    const elementId = event.target.id;
    selectedMarker.set(markerInformation);
    document.getElementById(elementId)?.style.opacity = 1;
    previousMarkerId.set(markerInformation.marker.id);

    activeOnboardingStage.update(
      (v) => markerInformation.message.onboardingStage
    );

    if ($selectedMarker) {
      $markInfo.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          ixNumber = i;
        }
      });
    }

    if ($activeMarker?.marker.id === marker.id) {
      activeMarker.set(null);
    } else {
      activeMarker.set(markerInformation);
    }
  };
</script>

<div
  style="--bottom:{bottom}"
  class="visahoi-marker-navigation-item {$activeOnboardingStage}"
  on:click={handleClick}
>
  <div
    style="--active-background-color:{activeBackgroundColor ||
      hoverBackgroundColor}; --background-color:{backgroundColor}; --hover-background-color:{hoverBackgroundColor ||
      backgroundColor};"
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
    transition: opacity 0.5s ease, bottom 0.5s ease;
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
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 5px;
    opacity: 0.5;
    background-color: var(--background-color);
    transition: background-color 0.2s ease;
  }

  .visahoi-marker-navigation-item-circle:hover {
    opacity: 1;
  }
</style>
