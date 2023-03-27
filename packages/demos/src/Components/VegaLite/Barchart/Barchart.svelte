<script lang="ts">
  import embed, { VisualizationSpec } from "vega-embed";
  import { ahoi, EVisualizationType } from "@visahoi/vega";
  import { onMount, onDestroy } from "svelte";
  import data from "./data.json";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject;

  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "A simple bar chart with embedded data.",
    title: "Average temperature in Oslo, Norway in 2018",
    height: "container",
    width: "container",
    data,
    mark: {
      type: "bar",
      tooltip: true,
    },
    encoding: {
      x: {
        field: "date",
        // type: "ordinal",
        // bin: {
        //   binned: true,
        //   step: 1,
        // },
        title: "Month",
        // axis: {
        //   title: "Month",
        // labelAngle: 0,
        // },
      },
      y: {
        field: "temp",
        type: "quantitative",
        title: "Average temperature in °C",
      },
      color: { value: "#D3D3D4" },
    },
    config: {},
  };

  onMount(async () => {
    // const data = await fetch(`./data.json`);
    runtimeObject = await embed(plotDiv, spec, {
      actions: false,
      renderer: "svg",
    });

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

<div bind:this={plotDiv} style="width: 100%; height: 500px;" />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
