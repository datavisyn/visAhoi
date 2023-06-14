<script lang="ts">
  import embed from "vega-embed";
  import { ahoi, EVisualizationType } from "@visahoi/vega";
  import { onMount, onDestroy } from "svelte";
  import { options } from "./options";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: object;

  onMount(async () => {
    runtimeObject = await embed(plotDiv, options, {
      actions: false,
      renderer: "svg",
    });
    console.log("runtime obj: ", runtimeObject);

    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.TREEMAP,
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

<div bind:this={plotDiv} style="width: 100%; height: 500px;" />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
