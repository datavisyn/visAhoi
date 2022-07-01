<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import {
    activeMarker,
    previousMarkerId,
    markerIndexId,
    markerInformation as markInfo,
  } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  $: activeBackgroundColor =
    markerInformation.message.onboardingStage.activeBackgroundColor;
  $: backgroundColor =
    markerInformation.message.onboardingStage.backgroundColor;
  $: hoverBackgroundColor =
    markerInformation.message.onboardingStage.hoverBackgroundColor;
  $: marker = markerInformation.marker;

  console.log("check it again");

  const handleClick = () => {
    if ($activeMarker?.marker.id === marker.id) {
      const elementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${$activeMarker?.marker.id}`
      );
      elementId?.style.opacity = 0.5;
      const firstMarker = $markInfo.filter(
        (m) =>
          m.message.onboardingStage.id ===
          $activeMarker?.message.onboardingStage.id
      )[0];

      const firstElementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${firstMarker?.marker.id}`
      );
      firstElementId?.style.opacity = 1;
      $markInfo.map((maker, i) => {
        if (maker.marker.id === firstMarker?.marker.id) {
          markerIndexId.set(i);
          console.log("Check it agaain new");
        }
      });
      previousMarkerId.set(firstMarker?.marker.id);

      // console.log(
      //   $markInfo.filter(
      //     (m) =>
      //       m.message.onboardingStage.id ===
      //       $activeMarker?.message.onboardingStage.id
      //   )
      // );

      activeMarker.set(null);

      // $markInfo.map((marker, i) => {
      //   if (marker.marker.id === $activeMarker?.marker.id) {
      //     markerIndexId.reset();
      //   }
      // });
    } else {
      activeMarker.set(markerInformation);
      const preElementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${$previousMarkerId}`
      );
      preElementId?.style.opacity = 0.5;
      const elementId = document.getElementById(
        `visahoi-marker-navigation-visahoi-marker-${$activeMarker?.marker.id}`
      );
      elementId?.style.opacity = 1;
      previousMarkerId.set($activeMarker?.marker.id);
      console.log($previousMarkerId, "previous marker id");
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
