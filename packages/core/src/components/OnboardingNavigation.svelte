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
  const {
    visahoiIcons,
    markerInformation,
    markerIndexId,
    previousMarkerId,
    selectedMarker,
    activeOnboardingStage,
    activeMarker,
    navigationAlignment,
    onboardingStages,
    showOnboardingNavigation,
    visHeight
  } = visState;

  const chevronUpIcon: string =
    $visahoiIcons?.chevronUp || visahoiChevronUpIcon;
  const chevronDownIcon: string =
    $visahoiIcons?.chevronDown || visahoiChevronDownIcon;  

  $: console.log('visHeight', $visHeight)

  $: nextHeight = $markerInformation.length * 35 + 85 + "px";
  $: prevHeight = $markerInformation.length * 35 + 60 + "px";
  $: isDisabledNextNavIcon =
    $markerIndexId === 0
      ? true
      : $markerIndexId === $markerInformation.length - 1
      ? false
      : false;
  $: isDisabledPreviousNavIcon =
    $markerIndexId === 0
      ? false
      : $markerIndexId === $markerInformation.length - 1
      ? true
      : false;

  let index: number;

  const onNavigatePrevious = () => {
    if ($previousMarkerId) {
      const elementId = getNavigationMarkerDomId($previousMarkerId);
      const prevMarkerElement = document.getElementById(elementId);
      if (prevMarkerElement) {
        prevMarkerElement.style.opacity = "0.5";
      }
    }
    isDisabledNextNavIcon = false;

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          index = i + 1;
          if (index + 1 === $markerInformation.length) {
            isDisabledPreviousNavIcon = true;
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      if ($selectedMarker) {
        activeOnboardingStage.update(
          // @ts-ignore it cannot be null
          (v) => $selectedMarker.message.onboardingStage
        );
      }
      previousMarkerId.set($selectedMarker?.marker.id);
      activeMarker.set($selectedMarker);
      const markerId = getMarkerDomId($selectedMarker?.marker.id);
      const elementId = `visahoi-marker-navigation-${markerId}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.style.opacity = "1";
      }
    }
  };

  const onNavigateNext = () => {
    if ($previousMarkerId) {
      const previousMarkerElementId =
        getNavigationMarkerDomId($previousMarkerId);
      const previousMarkerElement = document.getElementById(
        previousMarkerElementId
      );
      if (previousMarkerElement) {
        previousMarkerElement.style.opacity = "0.5";
      }
    }
    isDisabledPreviousNavIcon = false;

    if ($selectedMarker) {
      $markerInformation.map((marker, i) => {
        if (marker.marker.id === $selectedMarker?.marker.id) {
          index = i - 1;

          if (index === 0) {
            isDisabledNextNavIcon = true;
          }
        }
      });

      selectedMarker.set($markerInformation[index]);
      if ($selectedMarker) {
        activeOnboardingStage.update(
          // @ts-ignore it cannot be null
          (v) => $selectedMarker.message.onboardingStage
        );
      }
      activeMarker.set($selectedMarker);
      previousMarkerId.set($selectedMarker?.marker.id);
      const markerId = getMarkerDomId($selectedMarker?.marker.id);
      const navigationMarkerId = `visahoi-marker-navigation-${markerId}`;
      const navigationMarkerElement =
        document.getElementById(navigationMarkerId);
      if (navigationMarkerElement) {
        navigationMarkerElement.style.opacity = "1";
      }
    }
  };
</script>

<div style="--height: {$visHeight};"
  class="visahoi-navigation-container {$navigationAlignment === 'horizontal'
    ? 'horizontal'
    : 'vertical'}"
>
  {#key $markerInformation || $onboardingStages}

  {#if $activeOnboardingStage && $showOnboardingNavigation}
        <div
          id="navigation-next"
          style="--bottom-height: {nextHeight}; --opacity: {isDisabledNextNavIcon
            ? 0.5
            : 1}; --events: {isDisabledNextNavIcon ? 'none' : 'all'}"
          class="visahoi-navigation-next {$navigationAlignment === 'horizontal'
            ? 'horizontal'
            : 'vertical'}"
          on:click={onNavigateNext}
        >
          {#if $navigationAlignment === "vertical"}
            <span style="display: flex">{@html chevronUpIcon}</span>
          {:else}
            <span style="display: flex; transform: rotate(270deg)"
              >{@html chevronUpIcon}</span
            >
          {/if}
        </div>
        <div
          id="navigation-previous"
          style="--bottom-height: {prevHeight}; --opacity: {isDisabledPreviousNavIcon
            ? 0.5
            : 1}; --events: {isDisabledPreviousNavIcon ? 'none' : 'all'}"
          class="visahoi-navigation-previous {$navigationAlignment ===
          'horizontal'
            ? 'horizontal'
            : 'vertical'}"
          on:click={onNavigatePrevious}
        >
          {#if $navigationAlignment === "vertical"}
            <span style="display: flex">{@html chevronDownIcon}</span>
          {:else}
            <span style="display: flex; transform: rotate(270deg)"
              >{@html chevronDownIcon}</span
            >
          {/if}
        </div>
      {/if}





  
    <div 
      style="--max-height: { $visHeight - 200 };"
      class="visahoi-navigation-marker-container {$navigationAlignment ===
      'horizontal'
        ? 'horizontal'
        : 'vertical'}"
    >
      {#if $activeOnboardingStage && $showOnboardingNavigation}
        {#each $markerInformation.sort((a, b) => {
          if (a.message.onboardingStage.title === b.message.onboardingStage.title) {
            // @ts-ignore
            return a.message?.order < b.message?.order ? -1 : 1;
          } else {
            return a.message.onboardingStage?.order > b.message.onboardingStage?.order ? -1 : 1;
          }
        }) as marker, index}
          <NavigationMarker 
            markerInformation={marker}
            order={index + 1}
            {visState}
          />
        {/each}
      {/if}

      
    </div>
    
  
  {/key}

  {#each $onboardingStages.sort((a, b) => a.order - b.order) as stage, index}
    <OnboardingNavigationItem {stage} {index} {visState} />
  {/each}
  <OnboardingNavigationMainItem {visState} />
  
</div>

<style lang="scss">
  .visahoi-navigation-marker-container {
    // position: absolute;
    display: flex;
    flex-direction: var(--flexDirection);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    bottom: var(--bottom);
    right: var(--right);
    opacity: 1;
    max-height: 280px;
    // max-height: var(--max-height);
    overflow-y: scroll;
    z-index: 15;
    bottom: 30px;    
    &.horizontal {
      right: 20px;
      flex-direction: row;
    }
    &.vertical {
      flex-direction: column;
      bottom: 80px;
    }
    /* hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .visahoi-navigation-marker-container::-webkit-scrollbar {
    /* hide scrollbar */
    display: none;
  }
  
  .visahoi-navigation-next {
    
    opacity: var(--opacity);
    pointer-events: var(--events);
    // margin-bottom: 15px;
  }

  .visahoi-navigation-previous {
    
    opacity: var(--opacity);
    pointer-events: var(--events);
    // margin-bottom: 45px;
  }

  .visahoi-navigation-container {
    position: absolute;
    bottom: 15px;
    right: 100px;
    display: flex;
    flex-direction: var(--flexDirection);
    align-items: center;
    pointer-events: all;
    height: var(--height);
    // height: 400px;

    &.vertical {
      flex-direction: column;
      bottom: 30px;
      right: 90px;
    }
    &.horizontal {
      flex-direction: row;
      bottom: 30px;
      right: 90px;
    }
  }

  .visahoi-navigation-next.horizontal,
  .visahoi-navigation-previous.horizontal {
    right: var(--bottom-height);
    bottom: 0;
    margin-right: 15px;
  }

  .visahoi-navigation-next.vertical,
  .visahoi-navigation-previous.vertical {
    bottom: var(--bottom-height); 
    margin-bottom: 15px;   
  }

  
</style>
