<script lang="ts">
  import * as echarts from "echarts";
  import { ahoi, EVisualizationType } from "@visahoi/echarts";
  import { onMount, onDestroy } from "svelte";

  const data: echarts.EChartsOption = require("./data.json");
  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: echarts.ECharts;

  const options: echarts.EChartsCoreOption = {
    series: [
      {
        type: "treemap",
        name: "American Jobs Plan",
        data: [data],
        levels: [
          {
            itemStyle: {
              borderColor: "white",
              borderWidth: 0,
              gapWidth: 1,
              color: "black",
            },
            upperLabel: {
              show: false,
            },
          },
          {
            itemStyle: {
              borderColor: "white",
              borderWidth: 2,
              gapWidth: 1,
            },
            upperLabel: {
              show: true,
              fontWeight: "bold",
              fontSize: 15,
            },
          },
        ],
      },
    ],
    tooltip: {},
  };

  onMount(async () => {
    runtimeObject = echarts.init(plotDiv, null, {
      renderer: "svg",
    });
    runtimeObject.setOption(options);
    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        visType: EVisualizationType.HEATMAP,
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
