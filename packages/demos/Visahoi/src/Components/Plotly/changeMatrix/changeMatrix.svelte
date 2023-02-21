
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
  import type { PlotData } from "plotly.js";
  import type { IAhoiConfig } from "@visahoi/core";
  
    export let contextKey: string;
    let onboardingUI;
    let runtimeObject: Plotly;
  
    const data: Partial<PlotData>[] = [
      {
        x: [ 1, 2,3,4,5,6,7,8,9,10,11,12],
        y:  ['Munich', 'Oslo', 'Tallinn'],
        z: [[-0.6, -8.4, -2.2, 1.35, -6.2, 1.1, 1.1, -1.2, 3.8, 0.5, -1.45, 0],
         [-3.5, -8.65, -3.8, -0.5, -2.4, -3.55, 2, 0.4, 0.25, -0.3, 2.3, 0.5],
         [0.2, -6.95, -1.5, -3.1, -2.1, -1, 0.8, 1.1, 0.95, 2, 2.65, 2.4]],
        mode: "markers",
        type: 'heatmap',
        zmin: -9,
        zmax: 9,
        colorscale: [
          [0, '#4682b4'],
          [0.5, '#FDFDFD'],
          [1, '#D2B48C']
        ],
        // showscale: false.
        colorbar: {
          // title: {
          //   text: 'Value Change'
          // }
          title: 'Value Change'
        }
      }
    ];  

    const layout: object = {
      title: 'Average temperature change in °C between 1990 and 1991',
      xaxis: {
        title: 'Month'
      },
      yaxis: {
        title: 'City'
      }
    };


    const config: object = {
      responsive: true
    };   
  
    const getAhoiConfig = (): IAhoiConfig => {
      const defaultOnboardingMessages = generateBasicAnnotations(
        contextKey,
        EVisualizationType.CHANGE_MATRIX,
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
          EVisualizationType.CHANGE_MATRIX,
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