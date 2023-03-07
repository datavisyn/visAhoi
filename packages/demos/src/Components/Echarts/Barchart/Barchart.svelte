<script lang="ts">
  import * as echarts from "echarts";
  import { ahoi, EVisualizationType } from "@visahoi/echarts";
  import { onMount, onDestroy } from "svelte";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: echarts.ECharts;

  const options: echarts.EChartsCoreOption = {
    title: {
      text: "Average temperature in Oslo, Norway in 2018",
      left: "center",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      name: "Month",
      nameLocation: "middle",
      nameGap: 30,
      data: [
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
      axisLabel: {
        formatter: function (value) {
          const date = new Date(value);
          return date.getMonth() + 1;
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Average Temperature in °C",
      nameLocation: "middle",
      nameGap: 35,
    },
    series: [
      {
        data: [-2, -4, -2, 6, 16, 18, 22, 16, 12, 7, 3, -1, NaN],
        type: "bar",
        color: "lightgrey",
      },
    ],
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

<div bind:this={plotDiv} style="width: 500px; height: 500px;" />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
