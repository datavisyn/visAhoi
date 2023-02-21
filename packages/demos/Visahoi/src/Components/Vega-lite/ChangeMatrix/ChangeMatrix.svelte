<script lang="ts">
    import embed, { VisualizationSpec } from 'vega-embed';    
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
    import { onMount, onDestroy } from "svelte";
    import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey: string = 'changeMatrix';
    const spec: VisualizationSpec = require("./data.json");  
    let onboardingUI;
    let runtimeObject: object;  
    
    const getAhoiConfig = async (): Promise<IAhoiConfig> => {           
        const defaultOnboardingMessages =  await generateBasicAnnotations(
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
      const chartDom = document.getElementById('changeMatrix');        
      runtimeObject = await embed(chartDom, spec, { actions: false, renderer: 'svg' });

    
    if(onboardingUI) {
      onboardingUI.showOnboarding();    
      } else {      
        onboardingUI = await ahoi(
          contextKey,
          EVisualizationType.CHANGE_MATRIX,
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
      <div id="changeMatrix" style="width: 500px; height: 500px;"> </div>
    </div>    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
    