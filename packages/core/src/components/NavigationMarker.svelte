<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker, activeOnboardingStage } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;

  const handleClick = () => {
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
    cx={xaxis}
    cy={yaxis}
    r="100"
  />
</g>

<style>
  circle {
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
  }
</style>
