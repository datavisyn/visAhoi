<script lang="ts">
  import { activeMarker, activeOnboardingStage } from "./stores";
  import { v4 as uuidv4 } from "uuid";
  import { IMarkerInformation, TooltipPosition } from "../interfaces";
  import { createPopper } from "@popperjs/core/dist/esm/";
  import sanitizeHtml from "sanitize-html";

  export let visElement;

  const sanitizerOptions = {
    allowedTags: ["span", "b", "em", "strong"],
    allowedClasses: {
      span: ["visahoi-tooltip-hover-text"],
    },
  };

  let activeMarkerInformation: {
    markerId: string;
    markerInformation: IMarkerInformation;
  } | null = null;
  const tooltipId = uuidv4();
  const arrowId = tooltipId + "-arrow";

  const closeTooltip = () => {
    activeMarker.set(null);
  };

  activeOnboardingStage.subscribe((onboardingStage) => {
    if (!onboardingStage) {
      activeMarker.set(null);
    }
  });

  activeMarker.subscribe((marker) => {
    const tooltipElement = document.getElementById(tooltipId);
    const arrowElement = document.getElementById(arrowId);
    if (marker) {
      activeMarkerInformation = marker;
      const markerElement = document.getElementById(marker.markerId);
      if (markerElement && tooltipElement) {
        createPopper(markerElement, tooltipElement, {
          // TODO: make it configurable and test all four possibilities
          placement: marker.markerInformation.tooltip.position as TooltipPosition,
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
            {
              name: "flip",
            },
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
  style="--stage-color: {activeMarkerInformation?.markerInformation.message
    .onboardingStage.color}"
>
  <div class="visahoi-tooltip-title">
    <b>{$activeMarker?.markerInformation.tooltip.title}</b>
    <div class="visahoi-close-tooltip" on:click={closeTooltip}>
      <i class="fas fa-times" />
    </div>
  </div>
  <div class="visahoi-tooltip-content">
    {@html sanitizeHtml(
      activeMarkerInformation?.markerInformation.tooltip.text,
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

  .visahoi-tooltip-title > .visahoi-close-tooltip {
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
