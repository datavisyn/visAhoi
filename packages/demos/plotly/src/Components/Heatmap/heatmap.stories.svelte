<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import Heatmap from './heatmap.svelte';
  
    
  </script>
  
  <Meta title="Plotly/Heatmap" component={Heatmap}/>
  
  <Template let:args>
    <Heatmap {...args}>
  
    </Heatmap>
  </Template>
  
  <Story name="Demo" args={{contextKey: "heatmap"}}/>
  