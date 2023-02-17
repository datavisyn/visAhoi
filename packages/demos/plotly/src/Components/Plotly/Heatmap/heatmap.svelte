
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
    let onboardingUI;
    let runtimeObject;
  
    const data  = [
    {
      z: [
        [14, null, 19, 24, 16],
        [17, 15, 28, 33, 20],
        [19, 23, 29, 18, 18]
      ],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap',
      hoverongaps: false,
      colorscale: [
        [0, '#337ab7'],
        [0.5, '#f5f5f5'],
        [1, '#ec6836']
      ]
    }
  ];

  const layout = {
    title: 'Average temperature in a week',
    xaxis: {
      title: 'Weekday'
    },
    yaxis: {
      title: 'Average temperature per day time'
    }
  }
  const config = {
    responsive: true
  }   
  
    const getAhoiConfig = () => {
      const defaultOnboardingMessages = generateBasicAnnotations(
        contextKey,
        EVisualizationType.HEATMAP,
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
      runtimeObject = await new Plotly.newPlot(plotDiv, data, layout, config);
      if(onboardingUI) {
        onboardingUI.showOnboarding()
      } else {
        onboardingUI = await ahoi(
          contextKey,
          EVisualizationType.HEATMAP,
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