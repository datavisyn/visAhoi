<script lang="ts">
  import * as echarts from "echarts";
  import { ahoi, EVisualizationType } from "@visahoi/echarts";
  import { onMount, onDestroy } from "svelte";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: echarts.ECharts;

  const locations: string[] = ["Tallin", "Oslo", "Munich"];

  const data: number[][] = [
    [0, 2, -0.6],
    [1, 2, -8.4],
    [2, 2, -2.2],
    [3, 2, 1.35],
    [4, 2, -6.2],
    [5, 2, 1.1],
    [6, 2, 1.1],
    [7, 2, -1.2],
    [8, 2, 3.8],
    [9, 2, 0.5],
    [10, 2, -1.45],
    [11, 2, 0],
    [0, 1, -3.5],
    [1, 1, -8.65],
    [2, 1, -3.8],
    [3, 1, -0.5],
    [4, 1, -2.4],
    [5, 1, -3.55],
    [6, 1, 2],
    [7, 1, 0.4],
    [8, 1, 0.25],
    [9, 1, -0.3],
    [10, 1, 2.3],
    [11, 1, 0.5],
    [0, 0, 0.2],
    [1, 0, -6.95],
    [2, 0, -1.5],
    [3, 0, -3.1],
    [4, 0, -2.1],
    [5, 0, -1],
    [6, 0, 0.8],
    [7, 0, 1.1],
    [8, 0, 0.95],
    [9, 0, 2],
    [10, 0, 2.65],
    [11, 0, 2.4],
  ];

  const options: echarts.EChartsCoreOption = {
    title: {
      text: "Average temperature change in °C between 1990 and 1991",
      left: "center",
    },
    tooltip: {},
    grid: {
      height: "50%",
      top: "10%",
    },
    yAxis: {
      type: "category",
      data: locations,
      name: "City",
      nameLocation: "middle",
      nameGap: 35,
    },
    xAxis: {
      type: "category",
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
        formatter: function (value, index) {
          const date = new Date(value);
          return date.getMonth();
        },
      },
      name: "Month",
      nameLocation: "middle",
      nameGap: 30,
    },
    series: [
      {
        type: "heatmap",
        data: data,
        label: {
          show: false,
        },
      },
    ],
    visualMap: {
      min: -9,
      max: 9,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
      color: ["#D2B48C", "#FDFDFD", "#4682b4"],
      text: ["High", "Low"],
    },
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
        visType: EVisualizationType.CHANGE_MATRIX,
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
