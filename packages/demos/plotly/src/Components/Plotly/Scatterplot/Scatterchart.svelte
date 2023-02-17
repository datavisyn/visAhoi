<script lang="ts">
  import "@visahoi/plotly/build/css/main.css";
  import ResizeObserver from "svelte-resize-observer";
  import Plotly from "plotly.js-dist";
  import { onMount, onDestroy } from "svelte";
  import {
    generateBasicAnnotations,
    ahoi,
    EVisualizationType
  } from "@visahoi/plotly";

  export let contextKey;

  const trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: "markers",
    type: "scatter",
  };

  let onboardingUI;
  let runtimeObject;

  const data = [trace1];
  const layout = {
    title: "Horsepower and miles per gallon for various cars",
    xaxis: {
      title: "Horsepower",
    },
    yaxis: {
      title: "Miles per Gallon",
    },
  };
  const showOnboarding = false;

  const getAhoiConfig = () => {
    const defaultOnboardingMessages = generateBasicAnnotations(
      contextKey,
      EVisualizationType.SCATTERPLOT,
      runtimeObject
    );
    const ahoiConfig = {
      onboardingMessages: defaultOnboardingMessages,
    };

    return ahoiConfig;
  };

  const onResize = (e) => {
    if(onboardingUI) {
      // update onboarding
      onboardingUI.updateOnboarding(getAhoiConfig(), runtimeObject)
    }
    if(runtimeObject) {
      Plotly.Plots.resize(runtimeObject)
    }
  }

  onMount(async () => {
    const plotDiv = document.getElementById(contextKey);
    runtimeObject = await new Plotly.newPlot(plotDiv, data, layout);
    if(onboardingUI) {
      onboardingUI.showOnboarding()
    } else {
      onboardingUI = await ahoi(
        contextKey,
        EVisualizationType.SCATTERPLOT,
        runtimeObject,
        getAhoiConfig()
      );
    }
  });

  onDestroy(() => {
    if(onboardingUI) {
      onboardingUI.removeOnboarding()
    }
  })
</script>

<div id="plotly">
  <ResizeObserver on:resize={onResize} />
  <div id={contextKey}><!-- Plotly chart will be drawn inside this DIV --></div>
</div>

<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>