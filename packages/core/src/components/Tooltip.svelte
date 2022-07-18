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
  import { onMount, tick } from "svelte";

  export let visElement;

  const sanitizerOptions = {
    allowedTags: ["span", "b", "em", "strong"],
    allowedClasses: {
      span: ["visahoi-tooltip-hover-text"],
    },
  };

  let activeMarkerInformation: IMarkerInformation | null = null;
  const tooltipId = uuidv4();
  const arrowId = tooltipId + "-arrow";
  let eleRef;
  let eleRef1;
  $: elementText = eleRef1?.textContent;
  $: editable = $isEditModeActive ? true : false;

  // $: console.log("Element:", eleRef);

  // $: console.log(elementText, "Element text");

  // $: if (elementText !== undefined) {
  //   console.log(elementText);
  // }

  // $: if (eleRef1) {
  //   console.log("Element ref b tag", eleRef1);
  // }

  // $: if (eleRef) {
  //   console.log("The element reference is found");
  //   const observer = new MutationObserver(mutate1);
  //   const config = {
  //     characterData: true,
  //     characterDataOldValue: true,
  //   };
  //   observer.observe(eleRef, config);
  // }

  // const mutate1 = (mutations: MutationRecord[]) => {
  //   console.log("Inside the mutate1 function");
  //   mutations.map((m) => console.log(m));
  // };

  // onMount(() => {
  //   debugger;
  //   console.log("Test");
  //   const observer = new MutationObserver((records) => {
  //     console.log(records, "records");
  //     // const els = records[0].removedNodes
  //     // console.log(els);
  //   });

  //   observer.observe(eleRef1, { characterData: true });
  // });

  onMount(() => {
    console.log("In the mount");
    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      const newValue: string | null = mutations[0].target.nodeValue;
      console.log(newValue, "new value ");
      console.log($markerInformation, "Marker information");
      const tempMarkerInformation = $markerInformation;
      tempMarkerInformation.map((m) => {
        if (m.marker.id === $activeMarker?.marker.id) {
          console.log("the active marker is: ", m.marker.id);
          if (newValue) {
            m.message.title = newValue;
            m.tooltip.title = newValue;
          }
        }
      });
      console.log(tempMarkerInformation, "temporary marker infotzzr");
      markerInformation.set(tempMarkerInformation);
    });
    // observer.observe(eleRef, { childList: true });

    // setTimeout(() => {
    //   eleRef.children[0].remove();
    // }, 1000);

    observer.observe(eleRef.children[0].childNodes[0], {
      characterData: true,
      // characterDataOldValue: true,
      // attributes: false,
      // childList: true,
      // subtree: false,
    });
    // setTimeout(() => {
    //   eleRef.children[0].textContent = "sample";
    // }, 8000);
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

  // const mutate = (mutations) => {
  //   console.log("Inside the mutate");
  //   debugger;
  //   console.log(mutations);
  //   mutations.map((m) => console.log(m));
  // };

  const keyUp = () => {
    const el = document.querySelector("#testId");
    console.log(el);
    console.log(el?.children[0], "First child");
    console.log(el?.children[0].textContent, "Inner textContent");

    // const observer = new MutationObserver(mutate);
    // const config = {
    //   characterData: true,
    //   characterDataOldValue: true,
    // };
    // if (el) observer.observe(el, config);
  };

  const testing = () => {
    console.log("changed");
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
    // const el = document.querySelector("#testId");
    // console.log(el);
    // console.log(el?.children[0], "First child");
    // console.log(el?.children[0].textContent, "Inner textContent");

    // const observer = new MutationObserver(mutate);
    // const config = {
    //   characterData: true,
    //   characterDataOldValue: true,
    // };
    // if (el) observer.observe(el, config);

    // debugger;

    // el?.innerHTML = "Testing";
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
  <div
    bind:this={eleRef}
    contenteditable={editable}
    class="visahoi-tooltip-title"
    on:change={testing}
  >
    <b bind:this={eleRef1}>{$activeMarker?.tooltip.title}</b>

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
  <div class="visahoi-tooltip-content">
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
    /* margin-right: 1px; */
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
