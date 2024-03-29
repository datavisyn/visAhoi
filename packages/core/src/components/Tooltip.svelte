<script lang="ts">
  import { v4 } from "uuid";
  import { IMarkerInformation, TooltipPosition } from "../interfaces";
  import { createPopper } from "@popperjs/core/dist/esm/";
  import { getMarkerDomId, getNavigationMarkerDomId } from "../utils";
  import { tick } from "svelte";
  import sanitizeHtml from "sanitize-html";
  // @ts-ignore
  import visahoiCheckIcon from "../assets/check-solid.svg";
  // @ts-ignore
  import visahoiEditIcon from "../assets/pen-solid.svg";
  // @ts-ignore
  import visahoiCloseIcon from "../assets/xmark-solid.svg";
  // @ts-ignore
  import visahoiTrashIcon from "../assets/trash-solid-white.svg";
  // @ts-ignore
  import { VisahoiState } from "./state";
  import { stores } from "./stores";
  import { get } from "svelte/store";

  export let visElement;
  export let visState: VisahoiState;
  export let setDragId;

  const {
    activeMarker,
    activeOnboardingStage,
    selectedMarker,
    markerInformation,
    markerIndexId,
    isEditModeActive,
    onboardingStages,
    onboardingMessages,
    editTooltip,
    visahoiIcons,
    dragTooltipId,
    contextId,
  } = visState;

  const trashIcon: string = $visahoiIcons?.trash || visahoiTrashIcon;
  const closeIcon: string = $visahoiIcons?.close || visahoiCloseIcon;
  const editIcon: string = $visahoiIcons?.edit || visahoiEditIcon;
  const checkIcon: string = $visahoiIcons?.check || visahoiCheckIcon;

  let tempTitle = "";
  let tempText = "";

  const sanitizerOptions = {
    allowedTags: false, // allow all tags
    allowedClasses: {
      "*": ["*"], // allow all classes for all tags
    },
    allowedAttributes: {
      "*": ["style"], // allow style attribute for all tags
      svg: ["*"],
      path: ["*"],
    },
  };

  let activeMarkerInformation: IMarkerInformation | null = null;

  const tooltipId = `visahoi-tooltip-${$contextId}-${v4()}`;
  const arrowId = tooltipId + "-arrow";
  $: dragId = tooltipId;

  // To set the dragTooltipId in the store
  // Pass the dragId to the parent component tooltips.svelte

  const onMouseDown = () => {
    dragTooltipId.set(dragId);
    setDragId(dragId);
  };

  // Set the dragId back to initial

  const onMouseUp = () => {
    setDragId("");
  };

  const closeTooltip = () => {
    // The active marker is closed and navigation marker is not highlighted.
    // The selectedMarker is set to the active marker which is to be closed.
    const oldActiveMarker = $activeMarker;
    const navigationMarkerId = document.getElementById(
      getNavigationMarkerDomId($activeMarker?.marker.id)
    );
    if (navigationMarkerId) {
      navigationMarkerId.style.opacity = "0.5";
    }

    selectedMarker.set(oldActiveMarker);
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
    $editTooltip = false;
  };

  const deleteOnboardingMessage = () => {
    const activeMarkerId = $activeMarker?.marker.id;
    // Delete onboarding message for the active marker.
    $markerInformation.map((m, i) => {
      if (m.marker.id === activeMarkerId) {
        const tempMarkerInformation = $markerInformation;

        tempMarkerInformation.splice(i, 1);
        closeTooltip();
        markerInformation.set(tempMarkerInformation);

        // check whether the onboarding message deleted is the last message of the activeOboarding stage.

        const result = $markerInformation.find(
          (m) => m.message.onboardingStage.id === $activeOnboardingStage?.id
        );

        if (result === undefined) {
          const tempOnboardinStages = $onboardingStages;
          tempOnboardinStages.map((o, i) => {
            if (o.id === $activeOnboardingStage?.id) {
              tempOnboardinStages.splice(i, 1);
              onboardingStages.set(tempOnboardinStages);

              activeOnboardingStage.set(null);
            }
          });
        }
      }
    });

    $onboardingMessages.map((m, i) => {
      if (m.marker.id === activeMarkerId) {
        const tempOnboardingMessage = $onboardingMessages;
        tempOnboardingMessage.splice(i, 1);
        onboardingMessages.set(tempOnboardingMessage);
      }
    });

    // Console message is shown when all the onboarding messages are delete
    if ($onboardingStages.length === 0) {
      console.error(
        "No onboarding messages are available. It seems that all onboarding messages have been deleted."
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
  on:mousedown={onMouseDown}
  on:mouseup={onMouseUp}
>
  <div class="visahoi-tooltip-header">
    <div class="visahoi-tooltip-title">
      {#if $editTooltip}
        <input class="visahoi-edit-title" type="text" bind:value={tempTitle} />
      {:else}
        <b>{$activeMarker?.tooltip.title}</b>
      {/if}
    </div>

    <!--The trash icon is shown in the tooltip only isEditModeActive is set to true-->

    <div class="visahoi-header-icons">
      {#if $isEditModeActive && !$editTooltip}
        <div
          class="visahoi-edit-tooltip"
          on:click={() => {
            $editTooltip = true;
            // set title of current tooltip
            tempTitle = $activeMarker?.tooltip.title || "";
          }}
        >
          <span style="display: flex; font-size: 13px" title="Edit">
            {@html editIcon}
          </span>
        </div>
        <div class="visahoi-delete-tooltip" on:click={deleteOnboardingMessage}>
          <span style="display: flex; font-size: 13px" title="Delete"
            >{@html trashIcon}</span
          >
        </div>
      {/if}

      {#if $editTooltip}
        <div class="visahoi-save-changes" on:click={saveChanges}>
          <span style="display: flex; font-size: 13px" title="Save"
            >{@html checkIcon}</span
          >
        </div>
      {/if}

      <div
        class="visahoi-close-tooltip"
        on:click={$editTooltip
          ? () => {
              $editTooltip = false;
            }
          : closeTooltip}
      >
        {#if $editTooltip}
          <span style="font-size: 13px" title="Cancel">{@html closeIcon}</span>
        {:else}
          <span style="font-size: 13px" title="Close">{@html closeIcon}</span>
        {/if}
      </div>
    </div>
  </div>

  {#if $editTooltip}
    <textarea class="visahoi-tooltip-textarea" rows="4" bind:value={tempText} />
  {:else}
    <div id="tooltip-text" class="visahoi-tooltip-content">
      {@html sanitizeHtml(
        activeMarkerInformation?.tooltip.text,
        sanitizerOptions
      )}
    </div>
  {/if}

  <div id={arrowId} class="visahoi-popperjs-arrow" data-popper-arrow />
</div>

<style>
  .visahoi-tooltip-header {
    display: flex;
    justify-content: space-between;
    background-color: var(--stage-color);
  }

  .visahoi-header-icons {
    background-color: var(--stage-color);
    display: flex;
    align-items: center;
    color: white;
  }
  .visahoi-edit-tooltip {
    margin-right: 5px;
    cursor: pointer;
  }

  .visahoi-edit-title {
    width: 90%;
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
    margin-right: 6px;
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
    justify-content: flex-start;
    padding: 3px;
    font-size: 13px;
  }

  .visahoi-tooltip-title {
    display: flex;
  }

  .visahoi-tooltip-title > b {
    margin-right: 13px;
  }

  .visahoi-close-tooltip {
    cursor: pointer;
    margin-right: 2px;
  }

  .visahoi-delete-tooltip {
    margin-right: 5px;
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

  :global(
      .visahoi-tooltip[data-popper-placement^="top"]
        > .visahoi-popperjs-arrow::before
    ) {
    left: -8px !important;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="top"]) {
    bottom: 8px !important;
  }

  :global(
      .visahoi-tooltip[data-popper-placement^="bottom"]
        > .visahoi-popperjs-arrow
    ) {
    top: -8px;
  }
  :global(
      .visahoi-tooltip[data-popper-placement^="bottom"]
        > .visahoi-popperjs-arrow::before
    ) {
    left: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="bottom"]) {
    top: 8px !important;
  }

  :global(
      .visahoi-tooltip[data-popper-placement^="left"] > .visahoi-popperjs-arrow
    ) {
    right: 0;
  }

  :global(
      .visahoi-tooltip[data-popper-placement^="left"]
        > .visahoi-popperjs-arrow::before
    ) {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="left"]) {
    right: 8px !important;
  }
  :global(
      .visahoi-tooltip[data-popper-placement^="right"] > .visahoi-popperjs-arrow
    ) {
    left: -8px;
    top: -8px !important;
  }

  :global(
      .visahoi-tooltip[data-popper-placement^="right"]
        > .visahoi-popperjs-arrow::before
    ) {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--stage-color);
  }

  :global(.visahoi-tooltip[data-popper-placement^="right"]) {
    left: 8px !important;
  }
</style>
