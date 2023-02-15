<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import HorizonGraph from './horizonGraph.svelte';
  
    
  </script>
  
  <Meta title="Plotly/horizonGraph" component={HorizonGraph}/>
  
  <Template let:args>
    <HorizonGraph {...args}>
  
    </HorizonGraph>
  </Template>
  
  <Story name="Basic" args={{contextKey: "horizonGraph"}}/>
  