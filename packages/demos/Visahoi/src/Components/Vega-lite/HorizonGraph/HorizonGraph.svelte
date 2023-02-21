<script lang="ts">
    import embed from 'vega-embed';    
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
    import { onMount, onDestroy } from "svelte";
  import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey:string = 'horizonGraph';
    let onboardingUI;
    let runtimeObject: object;   
    
    const getAhoiConfig = async (): Promise<IAhoiConfig> => {           
        const defaultOnboardingMessages =  await generateBasicAnnotations(
          contextKey,
          EVisualizationType.HORIZON_GRAPH,
          runtimeObject
        );    
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };
    
        return ahoiConfig;
    };   
    
    onMount(async () => {       
      const chartDom = document.getElementById('horizonGraph');        
      runtimeObject = await embed(chartDom, {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "Horizon Graph with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on Horizon Graphs.)",
        "height": "container",
        "width": "container",
        "title": "Average temperature in Oslo, Norway in 2018",
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
        "layer": [
            {
                "transform": [
                    {
                        "calculate": "datum.temp < 0 ? (datum.temp * -1) : datum.temp",
                        "as": "ny0"
                    }
                ],
                "mark": {
                    "type": "area",
                    "clip": true,
                    "orient": "vertical",
                    "color": "#a1d76a"
                },
                "encoding": {
                    "x": {
                        "field": "date",
                        "type": "ordinal",
                        "scale": {
                            "zero": false,
                            "nice": false
                        },
                        "axis": {
                            "title": "Month",
                            "labelAngle": 0
                        }
                    },
                    "y": {
                        "field": "ny0",
                        "type": "quantitative",
                        "scale": {
                            "domain": [
                                -3,
                                15
                            ]
                        },
                        "axis": {
                            "title": "Average temperature in °C",
                            "tickCount": 5
                        }
                    },
                    "opacity": {
                        "value": 0.6
                    },
                    "tooltip": [
                        {
                            "field": "date",
                            "type": "ordinal",
                            "title": "Month"
                        },
                        {
                            "field": "temp",
                            "type": "quantitative",
                            "title": "Average temperature in °C"
                        }
                    ]
                }
            },
            {
                "transform": [
                    {
                        "calculate": "datum.temp > 15 ? datum.temp - 15 : 0",
                        "as": "ny"
                    }
                ],
                "mark": {
                    "type": "area",
                    "clip": true,
                    "orient": "vertical",
                    "color": "#a1d76a"
                },
                "encoding": {
                    "x": {
                        "field": "date",
                        "type": "ordinal",
                        "axis": {
                            "title": "Month"
                        }
                    },
                    "y": {
                        "field": "ny",
                        "type": "quantitative",
                        "scale": {
                            "domain": [
                                -3,
                                15
                            ]
                        },
                        "axis": {
                            "title": "Average temperature in °C",
                            "tickCount": 5
                        }
                    },
                    "opacity": {
                        "value": 1
                    },
                    "tooltip": [
                        {
                            "field": "date",
                            "type": "ordinal",
                            "title": "Month"
                        },
                        {
                            "field": "temp",
                            "type": "quantitative",
                            "title": "Average temperature in °C"
                        }
                    ]
                }
            },
            {
                "transform": [
                    {
                        "calculate": "datum.temp < 0 ? (datum.temp * -1) : 0",
                        "as": "ny2"
                    }
                ],
                "mark": {
                    "type": "area",
                    "clip": true,
                    "orient": "vertical",
                    "color": "#0571b0"
                },
                "encoding": {
                    "x": {
                        "field": "date",
                        "type": "ordinal"
                    },
                    "y": {
                        "field": "ny2",
                        "type": "quantitative",
                        "scale": {
                            "domain": [
                                -3,
                                15
                            ]
                        }
                    },
                    "opacity": {
                        "value": 1
                    },
                    "tooltip": [
                        {
                            "field": "date",
                            "type": "ordinal",
                            "title": "Month"
                        },
                        {
                            "field": "temp",
                            "type": "quantitative",
                            "title": "Average temperature in °C"
                        }
                    ]
                }
            }
        ],
        "config": {
            "area": {
                "interpolate": "monotone"
            }
        }
    },
    {    
        actions: false,
        renderer: 'svg'
    });

    
    if(onboardingUI) {
      onboardingUI.showOnboarding();    
      } else {      
        onboardingUI = await ahoi(
          contextKey,
          EVisualizationType.HORIZON_GRAPH,
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
      <div id="horizonGraph" style="width: 500px; height: 500px;"> </div>
    </div>    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
    