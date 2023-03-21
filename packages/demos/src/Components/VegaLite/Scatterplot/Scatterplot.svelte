<script lang="ts">
  import embed from "vega-embed";
  import { ahoi, EVisualizationType } from "@visahoi/vega";
  import { onMount, onDestroy } from "svelte";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: object;
  const data: object[] = require("./data.json");

  onMount(async () => {
    runtimeObject = await embed(
      plotDiv,
      {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        params: [
          {
            name: "brush",
            select: "interval",
            value: { x: [55, 160], y: [13, 37] },
          },
        ],
        usermeta: { embedOptions: { renderer: "svg" } },
        title: "Horsepower and miles per gallon for various cars",
        mark: { type: "circle", tooltip: true },
        width: "container",
        height: "container",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
          color: {
            condition: { param: "brush", field: "Cylinders", type: "ordinal" },
            value: "grey",
          },
        },
        data: {
          values: data,
        },
      },
      {
        actions: false,
        renderer: "svg",
      }
    );

    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.SCATTERPLOT,
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
