<script lang="ts">
  import {
    activeMarker, activeOnboardingStage,
  } from "./stores";
  import { v4 as uuidv4 } from "uuid";
  import { IMarkerInformation } from "../interfaces";
  import { createPopper } from '@popperjs/core/dist/esm/';

  let activeMarkerInformation: {
    markerId: string;
    markerInformation: IMarkerInformation;
  } | null = null;
  const tooltipId = uuidv4();

  activeOnboardingStage.subscribe((onboardingStage) => {
    if(!onboardingStage) {
      activeMarker.set(null);
    }
  });

  activeMarker.subscribe((marker) => {
    const tooltipElement = document.getElementById(tooltipId);
    if (marker) {
      activeMarkerInformation = marker;
      const markerElement = document.getElementById(marker.markerId);
      if (markerElement && tooltipElement) {
        createPopper(markerElement, tooltipElement, {
          placement: "top",
          modifiers: [
            {
              name: "offset",
              options: { offset: [0, 8] },
            },
          ],
        });
      }
    }
  });

</script>

<div
  id={tooltipId}
  class="tooltip {$activeMarker && $activeOnboardingStage ? '' : 'hidden'}"
  style="left:{activeMarkerInformation?.markerInformation.anchorPosition.x}px; top:{activeMarkerInformation?.markerInformation
    .anchorPosition.y}px; --stage-color: {activeMarkerInformation?.markerInformation.message.onboardingStage.color}"
>
  {activeMarkerInformation?.markerInformation.tooltip.text}
</div>

<style>
  .tooltip {
    background-color: var(--stage-color);
    position: absolute;
    display: inline-block;
    color: white;
    font-weight: bold;
    padding: 5px;
    font-size: 13px;
    border-radius: 4px;
    max-width: 200px;
    pointer-events: all;
    z-index: 2000;
  }

  .tooltip.hidden {
    display: none;
  }
</style>
