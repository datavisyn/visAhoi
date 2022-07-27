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
  import { tick } from "svelte";

  export let visElement;

  let tempTitle = "";
  let tempText = "";
  let editTooltip: boolean = false;

  const sanitizerOptions = {
    allowedTags: ["span", "b", "em", "strong"],
    allowedClasses: {
      span: ["visahoi-tooltip-hover-text"],
    },
  };

  let activeMarkerInformation: IMarkerInformation | null = null;

  const tooltipId = uuidv4();
  const arrowId = tooltipId + "-arrow";

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

  const saveChanges = () => {
    const tempMarkerInformation = $markerInformation;
    tempMarkerInformation.map((m) => {
      if (m.marker.id === $activeMarker?.marker.id) {
        if (tempTitle) {
          m.message.title = tempTitle;
          m.tooltip.title = tempTitle;
        }
        if (tempText) {
          m.message.text = tempText;
          m.tooltip.text = tempText;
        }
      }
    });
    markerInformation.set(tempMarkerInformation);
    editTooltip = false;
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
      // set title of current tooltip
      tempTitle = marker.tooltip.title;
      tempText = marker.tooltip.text;
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
  <div class="visahoi-tooltip-title">
    {#if editTooltip}
      <input class="visahoi-edit-title" type="text" bind:value={tempTitle} />
    {:else}
      <b>{$activeMarker?.tooltip.title}</b>
    {/if}

    <!--The trash icon is shown in the tooltip only isEditModeActive is set to true-->
    {#if $isEditModeActive && !editTooltip}
      <div
        class="visahoi-edit-tooltip"
        on:click={() => {
          editTooltip = true;
          // set title of current tooltip
          tempTitle = $activeMarker?.tooltip.title || "";
        }}
      >
        <i class="fas fa-pen" />
      </div>
      <div class="visahoi-delete-tooltip" on:click={deleteOnboardingMessage}>
        <i class="fas fa-trash" />
      </div>
    {/if}

    {#if editTooltip}
      <div class="visahoi-save-changes" on:click={saveChanges}>
        <i class="fas fa-check" />
      </div>
    {/if}

    <div
      class="visahoi-close-tooltip"
      on:click={editTooltip
        ? () => {
            editTooltip = false;
          }
        : closeTooltip}
    >
      <i class="fas fa-times" />
    </div>
  </div>

  {#if editTooltip}
    <textarea class="visahoi-tooltip-textarea" rows="4" bind:value={tempText} />
  {:else}
    <div class="visahoi-tooltip-content">
      {@html sanitizeHtml(
        activeMarkerInformation?.tooltip.text,
        sanitizerOptions
      )}
    </div>
  {/if}

  <div id={arrowId} class="visahoi-popperjs-arrow" data-popper-arrow />
</div>

<style>
  .visahoi-edit-tooltip {
    margin-right: 1px;
    cursor: pointer;
  }

  .visahoi-edit-title {
    width: 80%;
    color: white;
    font-weight: bold;
    background: transparent;
    border: none;
    outline: 1px solid white;
  }

  .visahoi-tooltip-textarea {
    min-height: 50px;
    width: 190px;
    margin-top: 3px;
    margin-left: 3px;
    background: white;
    border: none;
    outline: 1px solid black;
    text-align: left;
    font-family: Arial;
    resize: none;
    overflow: hidden;
  }

  .visahoi-save-changes {
    cursor: pointer;
  }

  .visahoi-tooltip {
    padding: 0;
    display: inline-block;
    border-radius: 4px;
    max-width: 200px;
    pointer-events: all;
    z-index: 2000;
    border: 2px solid var(--stage-color);
    background: white;
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
    margin: 0px 3px;
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
