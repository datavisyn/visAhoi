<script lang="ts">
  import "@visahoi/plotly/build/css/main.css";
  import Plotly from "plotly.js-dist";
  import { onMount, onDestroy } from "svelte";
  import { ahoi, EVisualizationType } from "@visahoi/plotly";

  let plotDiv: HTMLElement;
  export let contextKey: string;
  let onboardingUI;
  let runtimeObject: Plotly;

  const data: object[] = [
    {
      z: [
        [14, null, 19, 24, 16],
        [17, 15, 28, 33, 20],
        [19, 23, 29, 18, 18],
      ],
      x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      y: ["Morning", "Afternoon", "Evening"],
      type: "heatmap",
      hoverongaps: false,
      colorscale: [
        [0, "#337ab7"],
        [0.5, "#f5f5f5"],
        [1, "#ec6836"],
      ],
    },
  ];

  const layout: object = {
    title: "Average temperature in a week",
    xaxis: {
      title: "Weekday",
    },
    yaxis: {
      title: "Average temperature per day time",
    },
  };

  const config: object = {
    responsive: true,
  };

  onMount(async () => {
    const plotDiv = document.getElementById(contextKey);
    runtimeObject = await new Plotly.newPlot(plotDiv, data, layout, config);
    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.HEATMAP,
        chart: runtimeObject,
        ahoiConfig: {
          contextKey,
        },
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
