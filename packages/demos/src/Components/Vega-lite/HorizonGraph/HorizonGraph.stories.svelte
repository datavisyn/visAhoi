<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import HorizonGraph from './HorizonGraph.svelte';
  
    
  </script>
  
  <Meta title="Visahoi/Vega-lite/HorizonGraph" component={HorizonGraph}/>
  
  <Template let:args>
    <HorizonGraph {...args}>
  
    </HorizonGraph>
  </Template>
  
  <Story name="Demo" args={{contextKey: "horizonGraph"}}/>
  