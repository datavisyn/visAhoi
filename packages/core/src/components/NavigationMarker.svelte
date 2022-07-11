<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
    previousMarkerId,
    markerIndexId,
    markerInformation as markInfo,
    navigationAlignment,
  } from "./stores";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils";
  import { tick } from "svelte";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  $: bottom = order * 35 + 15 + "px";
  $: right = order * 35 + 15 + "px";

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
      const elementId = getNavigationMarkerDomId($selectedMarker?.marker.id);
      document.getElementById(elementId)?.style.opacity = 1;
    }
  });

  $: getNavSelectedMarkerIndex = () => {
    $markInfo.map((maker, i) => {
      if (maker.marker.id === $previousMarkerId) {
        markerIndexId.set(i);
      }
    });
  };

  $: getNavSelectedMarkerIndex();

  const handleClick = (event) => {
    if ($previousMarkerId) {
      const elementId = getNavigationMarkerDomId($previousMarkerId);
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
          markerIndexId.set(i);
        }
      });
    }

    if ($activeMarker?.marker.id === marker.id) {
      // The active marker is closed and navigation marker is not highlighted.
      // The selectedMarker is set to the initial marker in the activeOnboarding stage.
      activeMarker.set(null);
      const elementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${marker.id}`
      );
      elementId?.style.opacity = 0.5;

      const activeOnboardingStageMarkers = $markInfo.filter(
        (m) => m.message.onboardingStage === $activeOnboardingStage
      );
      selectedMarker.set(activeOnboardingStageMarkers[0]);
      $markInfo.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          markerIndexId.set(i);
        }
      });
    } else {
      activeMarker.set(markerInformation);
    }
  };
</script>

<!-- <div
  style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
    stage.backgroundColor}; --bottom:{bottom}; --right: {right}"
  class="visahoi-navigation-item {!$showOnboardingSteps ||
  $activeOnboardingStage
    ? 'removed'
    : ''}
    {$navigationAlignment === 'row' ? 'horizontal' : 'vertical'}"
  on:click={handleClick}
> -->

<div
  style="--bottom:{bottom}; --right: {right}"
  class="visahoi-marker-navigation-item {$activeOnboardingStage} {$navigationAlignment ===
  'row'
    ? 'horizontal'
    : 'vertical'}"
>
  <div
    on:click={handleClick}
    style="--active-background-color:{activeBackgroundColor ||
      hoverBackgroundColor}; --background-color:{activeBackgroundColor ||
      backgroundColor}; --hover-background-color:{hoverBackgroundColor ||
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
    /* transition: opacity 0.5s ease, bottom 0.5s ease; */
    margin: 5px;
    width: 30px;
    /* bottom: var(--bottom); */
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

  .horizontal {
    right: var(--right);
    transition: opacity 0.5s ease, right 0.5s ease;
    bottom: 0;
  }

  .vertical {
    bottom: var(--bottom);
    transition: opacity 0.5s ease, bottom 0.5s ease;
  }
</style>