<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import Barchart from './Barchart.svelte';
  
    
  </script>
  
  <Meta title="Visahoi/Vega-lite/Barchart" component={Barchart}/>
  
  <Template let:args>
    <Barchart {...args}>
  
    </Barchart>
  </Template>
  
  <Story name="Demo" args={{contextKey: "barchart"}}/>
  