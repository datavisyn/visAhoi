<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    previousMarkerId,
    markerIndexId,
    markerInformation as markInfo,
    selectedMarker,
    activeOnboardingStage,
  } from "./stores";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  $: activeBackgroundColor =
    markerInformation.message.onboardingStage.activeBackgroundColor;
  $: backgroundColor =
    markerInformation.message.onboardingStage.backgroundColor;
  $: hoverBackgroundColor =
    markerInformation.message.onboardingStage.hoverBackgroundColor;
  $: marker = markerInformation.marker;

  const handleClick = () => {
    if ($activeMarker?.marker.id === marker.id) {
      // The active marker is closed and navigation marker is not highlighted.
      // The selectedMarker is set to the active marker which is to be closed.
      const oldActiveMarker = $activeMarker;
      activeMarker.set(null);
      const elementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${marker.id}`
      );
      elementId?.style.opacity = 0.5;

      selectedMarker.set(oldActiveMarker);
      $markInfo.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          markerIndexId.set(i);
        }
      });
    } else {
      activeMarker.set(markerInformation);

      const preElementId = document.getElementById(
        getNavigationMarkerDomId($previousMarkerId)
      );
      preElementId?.style.opacity = 0.5;
      const elementId = document.getElementById(
        getNavigationMarkerDomId($activeMarker?.marker.id)
      );
      elementId?.style.opacity = 1;
      selectedMarker.set($activeMarker);
      previousMarkerId.set($activeMarker?.marker.id);

      $markInfo.map((marker, i) => {
        if (marker.marker.id === $activeMarker?.marker.id) {
          markerIndexId.set(i);
        }
      });
    }
  };

  let { x, y, cx, cy, offset } = markerInformation.anchorPosition;
  if (offset?.left) {
    cx += offset?.left;
    x += offset?.left;
  }
  if (offset?.right) {
    cx -= offset?.right;
    x -= offset?.right;
  }
  if (offset?.top) {
    cy += offset?.top;
    y += offset?.top;
  }
  if (offset?.bottom) {
    cy -= offset?.bottom;
    y -= offset?.bottom;
  }
</script>

<g id={getMarkerDomId(marker.id)} text-anchor="middle" on:click={handleClick}>
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
    cx={markerInformation.anchorPosition.cx}
    cy={markerInformation.anchorPosition.cy}
    r={marker?.radius || 15}
  />
  <text
    style="user-select:none"
    fill="white"
    x={markerInformation.anchorPosition.x}
    y={markerInformation.anchorPosition.y}
    font-size={markerInformation.marker.fontSize}
    >{typeof marker?.content == "string" ? marker.content : order}</text
  >
</g>

<style>
  circle {
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--backgroundColor);
    transition: fill 0.2s ease;
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
  }
</style>
