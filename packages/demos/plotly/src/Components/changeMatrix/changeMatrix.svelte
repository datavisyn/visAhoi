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
    
    let chart = null 
    const showOnboarding = true;
    let traces, config, layout;

    const onResize = (e) => {
      if(onboardingUI) {
        // update onboarding
        onboardingUI.updateOnboarding(getAhoiConfig(), runtimeObject)
      }
      if(runtimeObject) {
        Plotly.Plots.resize(runtimeObject)
      }
    }
  


async function render () {
  const response = await fetch('../../../../data/matrix.json')
  console.log(response)
  const data = await response.json()
  const { x, y, z } = processData(data)
  chart = await makePlotly(x, y, z) 
}

function processData (allRows) {
  const nestedDataByCity = new Map()

  allRows.forEach((row) => {
    if (nestedDataByCity.has(row.a)) {
      nestedDataByCity.set(row.a, [...nestedDataByCity.get(row.a), row])
    } else {
      nestedDataByCity.set(row.a, [row])
    }
  })

  const x = new Set(allRows.map((row) => row.b))
  const y = [...nestedDataByCity.keys()]
  const z = [...nestedDataByCity.values()].map((value) => [
    ...value.map((v) => v.c)
  ])

  return { x, y, z }
}

function makePlotly (x, y, z) {
  document.getElementById('plot')
   traces = [
    {
      type: 'heatmap',
      x, // date
      y, // city
      z, // values,
      zmin: -9,
      zmax: 9,
      colorscale: [
        [0, '#4682b4'],
        [0.5, '#FDFDFD'],
        [1, '#D2B48C']
      ],
      // showscale: false.
      colorbar: {
        title: {
          text: 'Value Change'
        }
      }
    }
  ]

   layout = {
    title: 'Average temperature change in °C between 1990 and 1991',
    xaxis: {
      title: 'Month'
    },
    yaxis: {
      title: 'City'
    }
  }

   config = {
    responsive: true
  }

  return Plotly.newPlot('vis', traces, layout, config)
}
  
    const getAhoiConfig = () => {
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
  
   
    onMount(async () => {
      render();    
      const plotDiv = document.getElementById(contextKey);
      runtimeObject = await new Plotly.newPlot(plotDiv, traces, config, layout);
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