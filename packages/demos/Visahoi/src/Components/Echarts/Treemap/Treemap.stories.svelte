<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
    import Treemap from './Treemap.svelte';  
    
</script>
  
  <Meta title="Visahoi/Echarts/Treemap" component={Treemap}/>
  
  <Template let:args>
    <Treemap {...args}>
  
    </Treemap>
  </Template>
  
  <Story name="Demo" args={{contextKey: "treemap"}}/>