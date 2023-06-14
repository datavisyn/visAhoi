<script lang="ts">
  import "@visahoi/plotly/build/css/main.css";
  import Plotly from "plotly.js-dist-min";
  import { onMount, onDestroy } from "svelte";
  import { ahoi, EVisualizationType } from "@visahoi/plotly";
  import type { PlotData } from "plotly.js";

  let plotDiv: HTMLElement;
  let onboardingUI;
  let runtimeObject: Plotly;

  const data: Partial<PlotData>[] = [
    {
      type: "treemap",
      branchvalues: "total",
      labels: [
        "Community Infrastructure",
        "Clean drinking water",
        "Broadband",
        "Electric",
        "Housing",
        "Schools and VA hospitals",
        "Other",
        "Transportation",
        "Electrifying vehicles",
        "Bridge and road repair",
        "Modernizing public transit",
        "Rail service",
        "Ports",
        "Redress historic inequities",
        "Infrastructure",
        "Others",
        "Workforce Development",
        "Research & development",
        "Manufacturing",
        "Workforce development",
        "Elder care",
        "Home/community-based care",
      ],
      parents: [
        "",
        "Community Infrastructure",
        "Community Infrastructure",
        "Community Infrastructure",
        "Community Infrastructure",
        "Community Infrastructure",
        "Community Infrastructure",
        "",
        "Transportation",
        "Transportation",
        "Transportation",
        "Transportation",
        "Transportation",
        "Transportation",
        "Transportation",
        "Transportation",
        "",
        "Workforce Development",
        "Workforce Development",
        "Workforce Development",
        "",
        "Elder care",
      ],
      values: [
        "707",
        "111",
        "100",
        "100",
        "213",
        "155",
        "28",
        "621",
        "174",
        "115",
        "85",
        "80",
        "42",
        "45",
        "50",
        "30",
        "580",
        "180",
        "300",
        "100",
        "400",
        "400",
      ],
      marker: {
        colors: [
          "#80B1D3",
          "#80B1D3",
          "#80B1D3",
          "#80B1D3",
          "#80B1D3",
          "#80B1D3",
          "#80B1D3",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#FDB462",
          "#B3DE69",
          "#B3DE69",
          "#B3DE69",
          "#B3DE69",
          "#FCCDE5",
          "#FCCDE5",
        ],
        // colorscale: 'Greys',
      },
    },
  ];

  const config: object = {
    responsive: true,
  };

  const layout: object = {
    title: "Jobs Plan",
  };

  onMount(async () => {
    runtimeObject = await new Plotly.newPlot(plotDiv, data, layout, config);
    if (onboardingUI) {
      onboardingUI.showOnboarding();
    } else {
      onboardingUI = await ahoi({
        chart: runtimeObject,
        visType: EVisualizationType.TREEMAP,
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
    font-family: sans-serif;
  }
</style>
