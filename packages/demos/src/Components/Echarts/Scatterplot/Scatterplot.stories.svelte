<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
    import Scatterplot from './Scatterplot.svelte';  
    
</script>
  
  <Meta title="Visahoi/Echarts/Scatterplot" component={Scatterplot}/>
  
  <Template let:args>
    <Scatterplot {...args}>
  
    </Scatterplot>
  </Template>
  
  <Story name="Demo" args={{contextKey: "scatterplot"}}/>