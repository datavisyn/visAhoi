<script lang="ts">
    import embed from 'vega-embed';    
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
    import { onMount, onDestroy } from "svelte";
    
    export let contextKey = 'barchart';
    let onboardingUI;
    let runtimeObject;   
    
    const getAhoiConfig = async () => {           
        const defaultOnboardingMessages =  await generateBasicAnnotations(
          contextKey,
          EVisualizationType.BAR_CHART,
          runtimeObject
        );    
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };
    
        return ahoiConfig;
    };   
    
    onMount(async () => {       
      const chartDom = document.getElementById('barchart');        
      runtimeObject = await embed(chartDom, {
        "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
        "description": "A simple bar chart with embedded data.",
        "title": "Average temperature in Oslo, Norway in 2018",
        "height": "container",
        "width": "container",
        "data": {
            "values": [
                {
                    "temp": -1.722580645,
                    "date": 1
                },
                {
                    "temp": -4.117857143,
                    "date": 2
                },
                {
                    "temp": -2.3,
                    "date": 3
                },
                {
                    "temp": 6.453333333,
                    "date": 4
                },
                {
                    "temp": 16.09677419,
                    "date": 5
                },
                {
                    "temp": 17.86333333,
                    "date": 6
                },
                {
                    "temp": 22.15806452,
                    "date": 7
                },
                {
                    "temp": 16.29032258,
                    "date": 8
                },
                {
                    "temp": 12.76428571,
                    "date": 9
                },
                {
                    "temp": 7.351612903,
                    "date": 10
                },
                {
                    "temp": 3.353333333,
                    "date": 11
                },
                {
                    "temp": -1.206451613,
                    "date": 12
                }
            ]
        },
        "mark": {
            "type": "bar",
            "tooltip": true
        },
        "encoding": {
            "x": {
                "field": "date",
                "type": "ordinal",
                "title": "Month",
                "axis": {
                    "title": "Month",
                    "labelAngle": 0
                }
            },
            "y": {
                "field": "temp",
                "type": "quantitative",
                "title": "Average temperature in °C"
            },
            "color": {"value": "#D3D3D3"}
        },
        "config": {}
    }, {    
        actions: false,
        renderer: 'svg'
    });

    
    if(onboardingUI) {
      onboardingUI.showOnboarding();    
      } else {      
        onboardingUI = await ahoi(
          contextKey,
          EVisualizationType.BAR_CHART,
          runtimeObject,
          await getAhoiConfig()
        );
      }
    });
      
    onDestroy(() => {
      if(onboardingUI) {
        onboardingUI.removeOnboarding();
      }
    });
    
    
    </script>
    <div id="vega-lite" style="width: 100%; height: 100%;">             
      <div id="barchart" style="width: 500px; height: 500px;"> </div>
    </div>    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
    