<script lang="ts">
    import embed, { EmbedOptions, VisualizationSpec } from 'vega-embed';    
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
    import { onMount, onDestroy } from "svelte";
    import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey:string = 'horizonGraph';
    let onboardingUI;
    let runtimeObject: object;
    const spec: VisualizationSpec = require("./data.json");

    
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
      runtimeObject = await embed(chartDom, spec, {  actions: false, renderer: 'svg' });
    
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
    