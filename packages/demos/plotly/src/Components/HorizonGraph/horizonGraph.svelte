
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

  const traces = [
    {
      name: 'Between 0 and 15 °C',
      type: 'scatter',
      x: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'],
      y: [0, 0, 0, 6.453333333333334, 15, 15, 15, 15, 12.483333333333336, 7.351612903225806, 3.3533333333333335, 0, NaN],
      // y: y.map(item => (item < 0 ? (item * -1) : item)), // [1.9, 0.1, ...]
      fill: 'tozeroy',
      fillcolor: 'rgba(161, 215, 106, 0.6)', // #a1d76a + 0.6 opacity
      mode: 'none', // no extra line + points for values
      line: {
        shape: 'spline',
        smoothing: 0.25
      },
      hovertemplate: '%{y:.2f}'
    },
    {
      name: 'More than 15 °C',
      type: 'scatter',
      x: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'],
      y: [0, 0, 0, 0, 1.096774193548388, 2.8633333333333333, 7.158064516129031, 1.2903225806451601, 0, 0, 0, 0, 0],
      fill: 'tozeroy',
      fillcolor: 'rgba(161, 215, 106, 1)', // #a1d76a + 0.6 opacity
      mode: 'none', // no extra line + no points for values,
      line: {
        shape: 'spline',
        smoothing: 0.25
      },
      hovertemplate: '%{y:.2f}'
    },
    {
      name: 'Less than 0 °C',
      type: 'scatter',
      x: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'], 
      y: [1.7225806451612902, 4.117857142857144, 2.3000000000000007, 0, 0, 0, 0, 0, 0, 0, 0, 1.2064516129032254, 0],
      fill: 'tozeroy',
      fillcolor: 'rgba(5, 113, 176, 1)', // #0571b0 + 1 opacity
      mode: 'none', // no extra line + no points for values
      line: {
        shape: 'spline',
        smoothing: 0.25
      },
      // hoverinfo: "x+y"
      hovertemplate: '-%{y:.2f}'
    }
  ]

  let onboardingUI;
  let runtimeObject;

  const data = traces;

  const layout = {
    title: 'Average temperature in Oslo, Norway in 2018',
    xaxis: {
      title: 'Month',
      tickformat: '%m',
      nticks: 12
    },
    yaxis: {
      title: 'Average temperature in °C'
    },
    showlegend: false
  }

  const config = {
    responsive: true
  }

  const showOnboarding = false;

  const getAhoiConfig = () => {
    const defaultOnboardingMessages = generateBasicAnnotations(
      contextKey,
      EVisualizationType.HORIZON_GRAPH,
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
        EVisualizationType.HORIZON_GRAPH,
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