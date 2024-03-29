<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils";
  import { tick } from "svelte";
  import { VisahoiState } from "./state";

  export let markerInformation: IMarkerInformation;
  export let order: number;
  export let visState: VisahoiState;

  const {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
    previousMarkerId,
    markerIndexId,
    markerInformation: markInfo,
  } = visState;

  $: activeBackgroundColor =
    markerInformation.message.onboardingStage.activeBackgroundColor;
  $: backgroundColor =
    markerInformation.message.onboardingStage.backgroundColor;
  $: hoverBackgroundColor =
    markerInformation.message.onboardingStage.hoverBackgroundColor;
  $: marker = markerInformation.marker;

  let arrValue: IMarkerInformation[] = [];

  /**First navigation marker which belongs to the activeOnboarding stage is selected */
  // $markInfo.map(async (message) => {
  //   if (
  //     message.message.onboardingStage.title === $activeOnboardingStage?.title
  //   ) {
  //     arrValue.push(message);
  //   }
  // });

  $markInfo.map(async (message) => {
    if (
      message.message.onboardingStage.title === $activeOnboardingStage?.title
    ) {
      arrValue.push(message);
      // selectedMarker.set(arrValue[arrValue.length - 1]);
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
      // The selectedMarker is set to the active marker which is to be closed.
      const oldActiveMarker = $activeMarker;
      activeMarker.set(null);
      const elementId = document.getElementById(
        getNavigationMarkerDomId(marker.id)
      );
      if(elementId) {
        elementId.style.opacity = "0.5";
      }

      // selectedMarker.set(activeOnboardingStageMarkers[0]);
      selectedMarker.set(oldActiveMarker);
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

<div class="visahoi-navigation-wrapper">
  <div
    on:click={handleClick}
    style="--active-background-color:{activeBackgroundColor ||
      hoverBackgroundColor}; --background-color:{activeBackgroundColor ||
      backgroundColor}; --hover-background-color:{hoverBackgroundColor ||
      backgroundColor};"
    id={getNavigationMarkerDomId(marker.id)}
    class="visahoi-marker-navigation-item-circle {$activeOnboardingStage}"
  />
</div>

<style>
  .visahoi-navigation-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
  }
  .visahoi-marker-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    margin: 5px;
    width: 30px;
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
