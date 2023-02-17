<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';  

  import Scatterchart from './Scatterchart.svelte';

  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Meta title="Visahoi/Plotly/Schatterplot" component={Scatterchart}/>

<Template let:args>
  <Scatterchart {...args}>

  </Scatterchart>
</Template>

<Story name="Demo" args={{contextKey: "scatterplot"}} />

<!-- <Story name="Square" source args={{rounded: false}}/> -->

<!-- Dynamic snippet should be disabled for this story -->
<!-- <Story name="Button No Args">
  <Button>Label</Button>
</Story> -->