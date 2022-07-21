<script lang="ts">
  import {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
    markerInformation,
    markerIndexId,
    isEditModeActive,
    onboardingStages,
  } from "./stores";
  import { v4 as uuidv4 } from "uuid";
  import { IMarkerInformation, TooltipPosition } from "../interfaces";
  import { createPopper } from "@popperjs/core/dist/esm/";
  import sanitizeHtml from "sanitize-html";
  import { getMarkerDomId } from "../utils";
  import { onDestroy, onMount, tick } from "svelte";

  export let visElement;

  const sanitizerOptions = {
    allowedTags: ["span", "b", "em", "strong"],
    allowedClasses: {
      span: ["visahoi-tooltip-hover-text"],
    },
  };

  let activeMarkerInformation: IMarkerInformation | null = null;
  let titleElement: HTMLElement;
  let contentElement: HTMLElement;
  let titleObserver: MutationObserver;
  let contentObserver: MutationObserver;

  const tooltipId = uuidv4();
  const arrowId = tooltipId + "-arrow";

  onMount(() => {
    titleObserver = new MutationObserver((mutations) => {
      const newValue: string | null = mutations[0].target.nodeValue;
      const tempMarkerInformation = $markerInformation;
      tempMarkerInformation.map((m) => {
        if (m.marker.id === $activeMarker?.marker.id) {
          if (newValue) {
            m.message.title = newValue;
            m.tooltip.title = newValue;
          }
        }
      });
      markerInformation.set(tempMarkerInformation);
    });

    contentObserver = new MutationObserver((mutations) => {
      const newContent: string | null = mutations[0].target.nodeValue;
      const tempMarkerInformation = $markerInformation;
      tempMarkerInformation.map((m) => {
        if (m.marker.id === $activeMarker?.marker.id) {
          if (newContent) {
            m.message.text = newContent;
            m.tooltip.text = newContent;
          }
        }
      });
    });

    titleObserver.observe(titleElement.children[0].childNodes[0], {
      characterData: true,
      attributes: true,
    });
    contentObserver.observe(contentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });

  onDestroy(() => {
    titleObserver.disconnect();
    contentObserver.disconnect();
  });

  const closeTooltip = () => {
    // The active marker is closed and navigation marker is not highlighted.
    // The selectedMarker is set to the initial marker in the activeOnboarding stage.
    const elementId = document.getElementById(
      `visahoi-marker-navigation-visahoi-marker-${$activeMarker?.marker.id}`
    );
    elementId?.style.opacity = 0.5;

    const activeOnboardingStageMarkers = $markerInformation.filter(
      (m) => m.message.onboardingStage === $activeOnboardingStage
    );
    selectedMarker.set(activeOnboardingStageMarkers[0]);
    $markerInformation.map((marker, i) => {
      if (marker.marker.id === $selectedMarker?.marker.id) {
        markerIndexId.set(i);
      }
    });
    activeMarker.set(null);
  };

  const deleteOnboardingMessage = () => {
    // Delete onboarding message for the active marker.
    $markerInformation.map((m, i) => {
      if (m.marker.id === $activeMarker?.marker.id) {
        const tempMarkerInformation = $markerInformation;
        tempMarkerInformation.splice(i, 1);
        closeTooltip();
        markerInformation.set(tempMarkerInformation);

        // check whether the onboarding message deleted is the last message of the activeOboarding stage.
        // If it is then show all the onboarding stages.
        $onboardingStages.map((o, i) => {
          const res = $markerInformation.find(
            (m) => m.message.onboardingStage.id === o.id
          );
          if (res === undefined) {
            const tempOnboardinStages = $onboardingStages;
            tempOnboardinStages.splice(i, 1);
            onboardingStages.set(tempOnboardinStages);
            activeOnboardingStage.set(null);
          }
        });
      }
    });

    // Console message is shown when all the onboarding messages are delete
    if ($onboardingStages.length === 0) {
      console.error(
        "No onboarding messages are available!!!. It seems that you have deleted all the onboarding messages"
      );
    }
  };

  activeOnboardingStage.subscribe((onboardingStage) => {
    if (!onboardingStage) {
      activeMarker.set(null);
    }
  });

  activeMarker.subscribe(async (marker) => {
    await tick();
    const tooltipElement = document.getElementById(tooltipId);
    const arrowElement = document.getElementById(arrowId);

    if (marker) {
      activeMarkerInformation = marker;
      const markerElement = document.getElementById(
        getMarkerDomId(marker.marker.id)
      );

      if (markerElement && tooltipElement) {
        createPopper(markerElement, tooltipElement, {
          placement: marker.tooltip.position as TooltipPosition,
          modifiers: [
            {
              name: "arrow",
              options: {
                element: arrowElement,
              },
            },
            {
              name: "preventOverflow",
              options: {
                boundary: visElement,
              },
            },
            //   {
            //     name: "flip",
            //   },
          ],
        });
      }
    }
  });
</script>

<div
  id={tooltipId}
  class="visahoi-tooltip {$activeMarker && $activeOnboardingStage
    ? ''
    : 'hidden'}"
  style="--stage-color: {activeMarkerInformation?.message.onboardingStage
    .backgroundColor}"
>
  <!-- {#key $activeMarker?.marker.id} -->
  <div
    bind:this={titleElement}
    contenteditable={$isEditModeActive}
    class="visahoi-tooltip-title"
  >
    <b>{$activeMarker?.tooltip.title}</b>

    <!--The trash icon is shown in the tooltip only isEditModeActive is set to true-->
    {#if $isEditModeActive}
      <div class="visahoi-delete-tooltip" on:click={deleteOnboardingMessage}>
        <i class="fas fa-trash" />
      </div>
    {/if}

    <div class="visahoi-close-tooltip" on:click={closeTooltip}>
      <i class="fas fa-times" />
    </div>
  </div>
  <!-- {/key} -->

  <div
    bind:this={contentElement}
    contenteditable={$isEditModeActive}
    class="visahoi-tooltip-content"
  >
    {@html sanitizeHtml(
      activeMarkerInformation?.tooltip.text,
      sanitizerOptions
    )}
  </div>
  <div id={arrowId} class="visahoi-popperjs-arrow" data-popper-arrow />
</div>

<style>
  .visahoi-tooltip {
    padding: 0;
    display: inline-block;
    border-radius: 4px;
    max-width: 200px;
    pointer-events: all;
    z-index: 2000;
    border: 2px solid var(--stage-color);
    border-radius: 4px;
  }

  .visahoi-tooltip.hidden {
    display: none;
    visibility: hidden;
  }

  .visahoi-tooltip-title {
    background-color: var(--stage-color);
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px;
    font-size: 13px;
  }

  .visahoi-tooltip-title > b {
    margin-right: 13px;
  }

  .visahoi-tooltip-title > .visahoi-close-tooltip {
    cursor: pointer;
  }

  .visahoi-delete-tooltip {
    margin-left: 3px;
    cursor: pointer;
  }

  .visahoi-tooltip-content {
    background-color: white;
    color: black;
    font-size: 13px;
    padding: 3px;
  }

  .visahoi-popperjs-arrow,
  .visahoi-popperjs-arrow::before {
    position: absolute;
  }

  .visahoi-popperjs-arrow {
    visibility: hidden;
  }

  .visahoi-popperjs-arrow::before {
    visibility: visible;
    content: "";
  }

  :global(.visahoi-tooltip-hover-text) {
    background-color: var(--stage-color);
    color: white;
    padding: 0 2px;
    border-radius: 2px;
  }

  /* The following styles are needed to position the arrow correctly;
     the positioning depends on the placement attribute in createPopper().
     The :global() is needed as the styles would be removed otherwise by rollup because they are not directly used in this component
  */

  :global(.visahoi-tooltip[data-popper-placement^="top"]
      > .visahoi-popperjs-arrow::before) {
    left: -8px !important;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="top"]) {
    bottom: 8px !important;
  }

  :global(.visahoi-tooltip[data-popper-placement^="bottom"]
      > .visahoi-popperjs-arrow) {
    top: -8px;
  }
  :global(.visahoi-tooltip[data-popper-placement^="bottom"]
      > .visahoi-popperjs-arrow::before) {
    left: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="bottom"]) {
    top: 8px !important;
  }

  :global(.visahoi-tooltip[data-popper-placement^="left"]
      > .visahoi-popperjs-arrow) {
    right: 0;
  }

  :global(.visahoi-tooltip[data-popper-placement^="left"]
      > .visahoi-popperjs-arrow::before) {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="left"]) {
    right: 8px !important;
  }
  :global(.visahoi-tooltip[data-popper-placement^="right"]
      > .visahoi-popperjs-arrow) {
    left: -8px;
    top: -8px !important;
  }

  :global(.visahoi-tooltip[data-popper-placement^="right"]
      > .visahoi-popperjs-arrow::before) {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="right"]) {
    left: 8px !important;
  }
</style>
