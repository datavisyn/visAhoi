<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';  
    import Heatmap from './Heatmap.svelte';  
    
</script>
  
  <Meta title="Visahoi/Echarts/Heatmap" component={Heatmap}/>
  
  <Template let:args>
    <Heatmap {...args}>
  
    </Heatmap>
  </Template>
  
  <Story name="Demo" args={{contextKey: "heatmap"}}/>