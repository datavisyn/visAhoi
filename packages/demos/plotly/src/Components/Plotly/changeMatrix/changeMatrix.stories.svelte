<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ChangeMatrix from './changeMatrix.svelte';
  
    
  </script>
  
  <Meta title="Visahoi/Plotly/ChangeMatrix" component={ChangeMatrix}/>
  
  <Template let:args>
    <ChangeMatrix {...args}>
  
    </ChangeMatrix>
  </Template>
  
  <Story name="Demo" args={{contextKey: "changeMatrix"}}/>
  