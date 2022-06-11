<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker, activeOnboardingStage } from "./stores";
  import { getMarkerDomId } from "../utils";

  export let markerInformation: IMarkerInformation;
  export let order: number;

  const { activeBackgroundColor, hoverBackgroundColor, backgroundColor } =
    markerInformation.message.onboardingStage;
  const { marker } = markerInformation;
  // $: console.log($activeMarker?.marker.id, "marker_id");
  // $: console.log(marker, "Navigation marker marker info");
  const handleClick = () => {
    console.log(markerInformation.message.onboardingStage, "handle click");
    activeOnboardingStage.update(
      (v) => markerInformation.message.onboardingStage
    );
    console.log($activeOnboardingStage, "active onboarding");
    // console.log(order);
    // console.log($activeOnboardingStage);
    // activeOnboardingStage.update((v) =>
    //   v?.id
    //     ? (v = markerInformation.message.onboardingStage)
    //     : markerInformation.message.onboardingStage[0].id
    // );

    if ($activeOnboardingStage === markerInformation.message.onboardingStage) {
      activeMarker.set(markerInformation);
    } else {
      activeMarker.set(null);
    }

    // activeOnboardingStage.update((v) => (v?.id  ? v.id = markerInformation.message.onboardingStage.id : stage));
    // if ($activeMarker?.marker.id === marker.id) {
    //   activeMarker.set(null);
    // } else {
    //   activeMarker.set(markerInformation);
    // }

    console.log("Navigation marker clicked");
  };

  const xaxis = -100;
  const yaxis = 20 * (5 * order);
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
    r="15"
  />
  <!-- <text
    style="user-select:none"
    fill="white"
    x={markerInformation.anchorPosition.x}
    y={markerInformation.anchorPosition.y}
    >{typeof marker?.content == "string" ? marker.content : order}</text
  > -->
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
