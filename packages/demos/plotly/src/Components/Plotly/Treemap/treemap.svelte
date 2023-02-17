
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

    const traces = [
    {
      type: 'treemap',
      branchvalues: 'total',
      labels: ['Community Infrastructure', 'Clean drinking water', 'Broadband', 'Electric', 'Housing', 'Schools and VA hospitals', 'Other', 'Transportation', 'Electrifying vehicles', 'Bridge and road repair', 'Modernizing public transit', 'Rail service', 'Ports', 'Redress historic inequities', 'Infrastructure', 'Others', 'Workforce Development', 'Research & development', 'Manufacturing', 'Workforce development', 'Elder care', 'Home/community-based care'],
      parents: ['', 'Community Infrastructure', 'Community Infrastructure', 'Community Infrastructure', 'Community Infrastructure', 'Community Infrastructure', 'Community Infrastructure', '', 'Transportation', 'Transportation', 'Transportation', 'Transportation', 'Transportation', 'Transportation', 'Transportation', 'Transportation', '', 'Workforce Development', 'Workforce Development', 'Workforce Development', '', 'Elder care'],
      values: ['707', '111', '100', '100', '213', '155', '28', '621', '174', '115', '85', '80', '42', '45', '50', '30', '580', '180', '300', '100', '400', '400'],      marker: {
        colors: ['#80B1D3', '#80B1D3', '#80B1D3', '#80B1D3', '#80B1D3', '#80B1D3', '#80B1D3', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#FDB462', '#B3DE69', '#B3DE69', '#B3DE69', '#B3DE69', '#FCCDE5', '#FCCDE5']
        // colorscale: 'Greys',
      }
    }
  ]
  const config = {
    responsive: true
  }
  const layout = {
    title: 'Jobs Plan'
  }
  
    const data = traces;
  
    
  
    const showOnboarding = false;
  
    const getAhoiConfig = () => {
      const defaultOnboardingMessages = generateBasicAnnotations(
        contextKey,
        EVisualizationType.TREEMAP,
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
          EVisualizationType.TREEMAP,
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