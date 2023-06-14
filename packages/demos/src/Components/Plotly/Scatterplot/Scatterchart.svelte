<script lang="ts">
  import "@visahoi/plotly/build/css/main.css";
  import Plotly from "plotly.js-dist-min";
  import { onMount, onDestroy } from "svelte";
  import { ahoi, EVisualizationType } from "@visahoi/plotly";
  import type { PlotData } from "plotly.js";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: Plotly;

  const trace: Partial<PlotData>[] = [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: "markers",
      type: "scatter",
    },
  ];

  const layout: object = {
    title: "Horsepower and miles per gallon for various cars",
    xaxis: {
      title: "Horsepower",
    },
    yaxis: {
      title: "Miles per Gallon",
    },
  };

  onMount(async () => {
    runtimeObject = await new Plotly.newPlot(plotDiv, trace, layout);
    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        chart: runtimeObject,
        visType: EVisualizationType.SCATTERPLOT,
      });
    }
  });

  onDestroy(() => {
    if (onboardingUI) {
      onboardingUI.removeOnboarding();
    }
  });
</script>

<div bind:this={plotDiv} />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
