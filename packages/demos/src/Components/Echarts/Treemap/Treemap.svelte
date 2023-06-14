<script lang="ts">
  import * as echarts from "echarts";
  import { ahoi, EVisualizationType } from "@visahoi/echarts";
  import { onMount, onDestroy } from "svelte";
  import data from "./data.json";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: echarts.ECharts;

  const processData = (data) => {
    const dataArr = [];
    const obj = {};
    if (data.children.length > 0) {
      data.children.map((child, i) => {
        obj[i] = child;
        obj[i].itemStyle = {
          color: child.color,
        };
        dataArr.push(obj[i]);
      });
    }
    return dataArr;
  };

  const options: echarts.EChartsCoreOption = {
    series: [
      {
        type: "treemap",
        name: "American Jobs Plan",
        data: processData(data),
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
