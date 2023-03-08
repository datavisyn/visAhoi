<script lang="ts">
  import embed, { VisualizationSpec } from "vega-embed";
  import { ahoi, EVisualizationType } from "@visahoi/vega";
  import { onMount, onDestroy } from "svelte";

  let onboardingUI;
  let plotDiv: HTMLElement;
  let runtimeObject: object;
  const spec: VisualizationSpec = require("./data.json");

  onMount(async () => {
    runtimeObject = await embed(plotDiv, spec, {
      actions: false,
      renderer: "svg",
    });

    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.HORIZON_GRAPH,
        chart: runtimeObject,
      });
    }
  });

  onDestroy(() => {
    if (onboardingUI) {
      onboardingUI.removeOnboarding();
    }
  });
</script>

<div bind:this={plotDiv} style="width: 500px; height: 500px;" />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
