<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";

  import Scatterchart from "./Scatterchart.svelte";

  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Meta title="Visahoi/Plotly/Schatterplot" component={Scatterchart} />

<Template let:args>
  <Scatterchart {...args} />
</Template>

<Story name="Demo" args={{ contextKey: "scatterplot" }} />
