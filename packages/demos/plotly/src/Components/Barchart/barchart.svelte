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
    

    var trace1 = {
  x: ['January', 'February', 'March'],
  y: [20, 14, 23],
  name: 'SF Zoo',
  type: 'bar'
};
  
    let onboardingUI;
    let runtimeObject;
  
    const data = [trace1];
    const layout = {
      title: "Average temperature in a month",
      xaxis: {
        title: "Month",
      },
      yaxis: {
        title: "Average temperature",
      },
    };
    const showOnboarding = true;
  
    const getAhoiConfig = () => {
      const defaultOnboardingMessages = generateBasicAnnotations(
        contextKey,
        EVisualizationType.BAR_CHART,
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
          EVisualizationType.BAR_CHART,
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