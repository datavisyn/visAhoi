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
    import { importCsv } from '../../../../../plotly-demo/src/util'
    // import {dataset} from '../../../../../plotly-demo/public/data/oslo-2018.csv'
  
    export let contextKey;  

   
    let onboardingUI;
    let runtimeObject;
    let chart = null;
    let traces, config, layout;

    async function render () {
        const data = await importCsv('../../../../../plotly-demo/public/data/oslo-2018.csv')
        console.log(data, 'data')
        const { x, y } = processData(data)
        chart = await makePlotly(x, y)
  
    }


    function processData (allRows) {
      const x = []
      const y = []
      const allX = []
      const allY = []
    
      for (let i = 0; i < allRows.length; i++) {
        const row = allRows[i]
        const month = `${row.year}-${row.month}`
    
        allX.push(`${row.year}-${row.month}-${row.day}`)
        allY.push(row.temp)
    
        if (x.includes(month)) {
          const idx = x.indexOf(month)
          y[idx].push(parseFloat(row.temp))
        } else {
          x.push(`${row.year}-${row.month}`)
          y.push([parseFloat(row.temp)])
        }
      }
    
      const averagedYValues = y.map((tempArray) => {
        const sum = tempArray.reduce((a, b) => {
          return a + b
        }, 0)
        return sum / tempArray.length
      })
      return { x, y: averagedYValues }
    }

function makePlotly (x, y) {
  document.getElementById('plot')
   traces = [
    {
      name: 'Between 0 and 15 °C',
      type: 'scatter',
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item < 0 ? 0 : item > 15 ? 15 : item)), // [1.9, 0.1, ...]
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
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item > 15 ? item - 15 : 0)), // [1.9, 0.1, ...]
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
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item < 0 ? item * -1 : 0)), // [1.9, 0.1, ...]
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

   layout = {
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

   config = {
    responsive: true
  }

  return Plotly.newPlot('vis', traces, layout, config)
}

  
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
        render()
        const data = await importCsv('./data/oslo-2018.csv')

    const { x, y } = processData(data)
      const plotDiv = await makePlotly(x,y);
      runtimeObject = await new Plotly.newPlot(plotDiv, traces, layout, config);
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