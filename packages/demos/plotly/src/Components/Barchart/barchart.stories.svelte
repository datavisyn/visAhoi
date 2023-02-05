<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
    import Barchart from './barchart.svelte';  
    
  </script>
  
  <Meta title="Plotly/Barchart" component={Barchart}/>
  
  <Template let:args>
    <Barchart {...args}>
  
    </Barchart>
  </Template>
  
  <Story name="Basic" args={{contextKey: "test"}}/>
  
  <!-- <Story name="Square" source args={{rounded: false}}/> -->
  
  <!-- Dynamic snippet should be disabled for this story -->
  <!-- <Story name="Button No Args">
    <Button>Label</Button>
  </Story> -->