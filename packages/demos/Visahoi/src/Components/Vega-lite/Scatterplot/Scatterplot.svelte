<script lang="ts">
  import embed from 'vega-embed';    
  import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
  import { onMount, onDestroy } from "svelte";
  import type { IAhoiConfig } from '@visahoi/core';  
    
    export let contextKey: string = 'scatterplot';
    let onboardingUI;
    let runtimeObject: object;   
    const data: object[] = require("./data.json");  
    
    const getAhoiConfig = async (): Promise<IAhoiConfig> => {           
        const defaultOnboardingMessages =  await generateBasicAnnotations(
          contextKey,
          EVisualizationType.SCATTERPLOT,
          runtimeObject
        );    
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };
    
        return ahoiConfig;
    };   
    
    onMount(async () => {       
      const chartDom = document.getElementById('scatterplot');        
      runtimeObject = await embed(chartDom, {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "params": [
            {
              "name": "brush",
              "select": "interval",
              "value": { "x": [55, 160], "y": [13, 37] }
            }
          ],
          "usermeta": { "embedOptions": { "renderer": "svg" } },
          "title": "Horsepower and miles per gallon for various cars",
          "mark": {"type": "circle", "tooltip": true},
          "width": "container",
          "height": "container",
          "encoding": {
            "x": { "field": "Horsepower", "type": "quantitative" },
            "y": { "field": "Miles_per_Gallon", "type": "quantitative" },
            "color": {
              "condition": { "param": "brush", "field": "Cylinders", "type": "ordinal" },
              "value": "grey"
            }
          },
        "data": {
            "values": data            
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
          EVisualizationType.SCATTERPLOT,
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
      <div id="scatterplot" style="width: 500px; height: 500px;"> </div>
    </div>    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
    