<script lang="ts">
    import embed, { VisualizationSpec } from 'vega-embed';    
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
    import { onMount, onDestroy } from "svelte";
  import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey: string = 'barchart';
    const spec: VisualizationSpec = require("./data.json"); 
    let onboardingUI;
    let runtimeObject;   
    
    const getAhoiConfig = async (): Promise<IAhoiConfig> => {           
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
      runtimeObject = await embed(chartDom, spec, { actions: false, renderer: 'svg' });
    
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
    