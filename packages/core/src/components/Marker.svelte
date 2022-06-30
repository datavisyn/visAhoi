<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker } from "./stores";
  import { getMarkerDomId } from "../utils";
  import { tick } from "svelte";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  console.log(markerInformation, "Marker info from the marker");

  $: testMarker = { marker };
  $: testOnboarding = {
    activeBackgroundColor,
    hoverBackgroundColor,
    backgroundColor,
  };
  // console.log(testMarkerInfo, "testMarker info");

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;

  // $: console.log(testMarker, "TestMarker info");
  // $: console.log(testOnboarding, "TEST onboarding");

  $: testfn = async () => {
    await tick();
    console.log(testMarker, "inside await");
    console.log(testOnboarding, "TEST onboarding");
  };

  $: testfn();

  // const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
  //   testMarkerInfo.message.onboardingStage;
  // const { marker } = testMarkerInfo;

  console.log(marker, "Marker from testMarkerInfo");
  // console.log(
  //   testMarkerInfo.message.onboardingStage,
  //   "onboarding stage from testMarker info"
  // );

  const handleClick = () => {
    console.log(testMarker, "Testmarker inside handle click");
    if ($activeMarker?.marker.id === marker.id) {
      activeMarker.set(null);
    } else {
      activeMarker.set(markerInformation);
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
