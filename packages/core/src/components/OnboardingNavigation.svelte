<script script lang="ts">
  import OnboardingNavigationItem from "./OnboardingNavigationItem.svelte";
  import OnboardingNavigationMainItem from "./OnboardingNavigationMainItem.svelte";
  import NavigationMarker from "./NavigationMarker.svelte";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils.js";
  import { tick } from "svelte";
  // @ts-ignore
  import visahoiChevronUpIcon from "../assets/chevron-up-solid.svg";  
  // @ts-ignore
  import visahoiChevronDownIcon from "../assets/chevron-down-solid.svg";  
  import { VisahoiState } from "./state.js";
  
  export let visState: VisahoiState;
  const {visahoiIcons, markerInformation, markerIndexId, previousMarkerId, selectedMarker, activeOnboardingStage, activeMarker, navigationAlignment, onboardingStages, showOnboardingNavigation} = visState

  const chevronUpIcon: string = $visahoiIcons?.chevronUp || visahoiChevronUpIcon;
  const chevronDownIcon: string = $visahoiIcons?.chevronDown || visahoiChevronDownIcon;

  $: nextHeight = $markerInformation.length * 35 + 75 + "px";
  $: prevHeight = $markerInformation.length * 35 + 50 + "px";

  let index: number;

  $: enableDisableNavIcons = async () => {
    switch ($markerIndexId) {
      case 0: {
        await tick();
        const preElementId = document.getElementById("navigation-next");
        if(preElementId) {
          preElementId.style.pointerEvents = "none";
          preElementId.style.opacity = "0.5";
        }

        const nextElementId = document.getElementById("navigation-previous");
        if(nextElementId) {
          nextElementId.style.pointerEvents = "all";
          nextElementId.style.opacity = "1";
        }
        break;
      }
      case $markerInformation.length - 1: {
        await tick();
        const nextElementId = document.getElementById("navigation-previous");
        if(nextElementId) {
          nextElementId.style.pointerEvents = "none";
          nextElementId.style.opacity = "0.5";
        }

        const preElementId = document.getElementById("navigation-next");
        if(preElementId) {
          preElementId.style.pointerEvents = "all";
          preElementId.style.opacity = "1";
        }

        break;
      }
      default: {
        await tick();
        const preElementId = document.getElementById("navigation-previous");
        if(preElementId) {
          preElementId.style.pointerEvents = "all";
          preElementId.style.opacity = "1";
        }

        const nextElementId = document.getElementById("navigation-next");
        if(nextElementId) {
          nextElementId.style.pointerEvents = "all";
          nextElementId.style.opacity = "1";
        }
      }
    }
  };

  $: enableDisableNavIcons();

  const navNext = () => {
    if ($previousMarkerId) {
      const elementId = getNavigationMarkerDomId($previousMarkerId);
      const prevMarkerElement = document.getElementById(elementId);
      if(prevMarkerElement) {
        prevMarkerElement.style.opacity = "0.5";
      }
    }
    const nextElement = document.getElementById("navigation-next");
    if(nextElement) {
      nextElement.style.pointerEvents = "all";
      nextElement.style.opacity = "1";
    }

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          index = i + 1;
          if (index + 1 === $markerInformation.length) {
            const element = document.getElementById("navigation-previous");
            if(element) {
              element.style.pointerEvents = "none";
              element.style.opacity = "0.5";
            }
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      if($selectedMarker) {
        activeOnboardingStage.update(
          // @ts-ignore it cannot be null
          (v) => $selectedMarker.message.onboardingStage
        );
      }
      previousMarkerId.set($selectedMarker?.marker.id);
      activeMarker.set($selectedMarker);
      const markerId = getMarkerDomId($selectedMarker?.marker.id);
      const elementId = `visahoi-marker-navigation-${markerId}`;
      const element = document.getElementById(elementId)
      if(element) {
        element.style.opacity = "1";
      }
    }
  };

  const onPreviousArrowClick = () => {
    if ($previousMarkerId) {
      const previousMarkerElementId = getNavigationMarkerDomId($previousMarkerId);
      const previousMarkerElement = document.getElementById(previousMarkerElementId)
      if(previousMarkerElement) {
        previousMarkerElement.style.opacity = "0.5";
      }
    }
    const previousNavigationArrowElement = document.getElementById("navigation-previous");
    if(previousNavigationArrowElement) {
      previousNavigationArrowElement.style.pointerEvents = "all";
      previousNavigationArrowElement.style.opacity = "1";
    }

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          index = i - 1;

          if (index === 0) {
            const nextNavigationArrowElement = document.getElementById("navigation-next");
            if(nextNavigationArrowElement) {
              nextNavigationArrowElement.style.pointerEvents = "none";
              nextNavigationArrowElement.style.opacity = "0.5";
            }
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      if($selectedMarker) {
        activeOnboardingStage.update(
          // @ts-ignore it cannot be null
          (v) => $selectedMarker.message.onboardingStage
        );
      }
      activeMarker.set($selectedMarker);
      previousMarkerId.set($selectedMarker?.marker.id);
      const markerId = getMarkerDomId($selectedMarker?.marker.id);
      const navigationMarkerId = `visahoi-marker-navigation-${markerId}`
      const navigationMarkerElement = document.getElementById(navigationMarkerId)
      if(navigationMarkerElement) {
        navigationMarkerElement.style.opacity = "1";
      } 
    }
  };
</script>

<div
  class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: '60px' "
>
  {#key $markerInformation || $onboardingStages}
    <div class="visahoi-navigation-marker-container">
      <!-- {#if $activeOnboardingStage && $showOnboardingNavigation}
      {#each $markerInformation.sort( (a, b) => (a.message.onboardingStage.title < b.message.onboardingStage.title ? -1 : a.message.onboardingStage.title > b.message.onboardingStage.title ? 1 : 0) ) as marker, index}
        <NavigationMarker markerInformation={marker} order={index + 1} />
      {/each}
    {/if} -->

      {#if $activeOnboardingStage && $showOnboardingNavigation}
        {#each $markerInformation.sort((a, b) => {
          if (a.message.onboardingStage.title === b.message.onboardingStage.title) {
            // @ts-ignore
            return a.message?.order < b.message?.order ? -1 : 1;
          } else {
            return a.message.onboardingStage?.order > b.message.onboardingStage?.order ? -1 : 1;
          }
        }) as marker, index}
          <NavigationMarker markerInformation={marker} order={index + 1} {visState} />
        {/each}
      {/if}

      {#if $activeOnboardingStage && $showOnboardingNavigation}
        <div
          id="navigation-next"
          style="--bottom-height: {nextHeight}"
          class="visahoi-navigation-next"
          on:click={onPreviousArrowClick}
        >
          <span style="display: flex">{@html chevronUpIcon}</span>
        </div>
        <div
          id="navigation-previous"
          style="--bottom-height: {prevHeight}"
          class="visahoi-navigation-previous"
          on:click={navNext}
        >
          <span style="display: flex">{@html chevronDownIcon}</span>
        </div>
      {/if}
    </div>
  {/key}

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} {visState} />
  {/each}
  <OnboardingNavigationMainItem {visState} />
</div>

<style>
  .visahoi-navigation-marker-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    width: 80px;
    /* bottom: 20px; */
    bottom: 80px;
    opacity: 1;
    z-index: 15;
  }
  .visahoi-navigation-next {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
    /* opacity: var(--opacity);
    pointer-events: var(--pointerEvents); */
  }

  .visahoi-navigation-previous {
    position: absolute;
    bottom: var(--bottom-height);
    margin-bottom: 15px;
    /* opacity: var(--opacity);
    pointer-events: var(--pointerEvents); */
  }

  .visahoi-navigation-container {
    position: absolute;
    bottom: 15px;
    right: 100px;
    display: flex;
    flex-direction: var(--flexDirection);
    align-items: center;
    pointer-events: all;
  }
</style>
