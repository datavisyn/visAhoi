<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
    import ChangeMatrix from './ChangeMatrix.svelte';  
    
</script>
  
  <Meta title="Echarts/ChangeMatrix" component={ChangeMatrix}/>
  
  <Template let:args>
    <ChangeMatrix {...args}>
  
    </ChangeMatrix>
  </Template>
  
  <Story name="Demo" args={{contextKey: "changeMatrix"}}/>