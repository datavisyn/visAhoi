<script lang="ts">
  import "@visahoi/plotly/build/css/main.css";
  import Plotly from "plotly.js-dist";
  import { onMount, onDestroy } from "svelte";
  import { ahoi, EVisualizationType } from "@visahoi/plotly";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: Plotly;

  const data: object[] = [
    {
      x: [
        "2018-01",
        "2018-02",
        "2018-03",
        "2018-04",
        "2018-05",
        "2018-06",
        "2018-07",
        "2018-08",
        "2018-09",
        "2018-10",
        "2018-11",
        "2018-12",
        "undefined-undefined",
      ],
      y: [-2, -4, -2, 6, 16, 18, 22, 16, 12, 7, 3, -1, NaN],
      type: "bar",
    },
  ];

  const layout: object = {
    title: "Average temperature in a month",
    xaxis: {
      title: "Month",
    },
    yaxis: {
      title: "Average temperature",
    },
  };

  const config: object = {
    responsive: true,
  };

  onMount(async () => {
    runtimeObject = await new Plotly.newPlot(plotDiv, data, layout, config);
    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.BAR_CHART,
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

<div id="plotly">
  <div bind:this={plotDiv} />
</div>

<style>
  :global(*) {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
