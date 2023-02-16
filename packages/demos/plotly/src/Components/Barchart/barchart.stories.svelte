<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
    import Barchart from './barchart.svelte';  
    
  </script>
  
  <Meta title="Plotly/Barchart" component={Barchart}/>
  
  <Template let:args>
    <Barchart {...args}>
  
    </Barchart>
  </Template>
  
  <Story name="Demo" args={{contextKey: "barchart"}}/>
  
  