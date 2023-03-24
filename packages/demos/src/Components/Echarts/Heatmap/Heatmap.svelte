<script lang="ts">
  import * as echarts from "echarts";
  import { ahoi, EVisualizationType } from "@visahoi/echarts";
  import { onMount, onDestroy } from "svelte";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: echarts.ECharts;

  const day: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const dayTime: string[] = ["Morning", "Afternoon", "Evening"];

  const data: (string | number)[][] = [
    [0, 0, 14],
    [0, 1, 0],
    [0, 2, 19],
    [0, 3, 24],
    [0, 4, 16],
    [1, 0, 17],
    [1, 1, 15],
    [1, 2, 28],
    [1, 3, 44],
    [1, 4, 20],
    [2, 0, 19],
    [2, 1, 23],
    [2, 2, 48],
    [2, 3, 18],
    [2, 4, 18],
  ].map(function (item) {
    return [item[1], item[0], item[2] || "-"];
  });

  const options: echarts.EChartsCoreOption = {
    title: {
      text: "Average temperature in a week",
      left: "center",
    },
    tooltip: {
      position: "right",
    },
    grid: {
      height: "70%",
      top: "10%",
    },
    xAxis: {
      name: "Weekday",
      type: "category",
      data: day,
      splitArea: {
        show: true,
      },
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bold",
        fontSize: "13",
      },
      nameGap: 35,
    },
    yAxis: {
      name: "Average temperature per day",
      type: "category",
      data: dayTime,
      splitArea: {
        show: true,
      },
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bold",
        fontSize: "13",
      },
      nameGap: 75,
    },

    visualMap: {
      min: 10,
      max: 50,
      inRange: {
        color: ["#337ab7", "#f5f5f5", "#ec6836"], // From smaller to bigger value ->
      },

      calculable: true,
      orient: "vertical",
      right: "3%",
      bottom: "50%",
      height: "80%",
    },
    itemStyle: {},
    series: [
      {
        type: "heatmap",
        data: data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            fontWeight: "bold",
          },
        },
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

<div bind:this={plotDiv} style="width: 100%; height: 500px;" />

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
