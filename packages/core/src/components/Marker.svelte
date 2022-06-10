<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;
  const handleClick = () => {
    if ($activeMarker?.marker.id === marker.id) {
      console.log("if part");
      activeMarker.set(null);
    } else {
      activeMarker.set(markerInformation);
      console.log("else part");
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
