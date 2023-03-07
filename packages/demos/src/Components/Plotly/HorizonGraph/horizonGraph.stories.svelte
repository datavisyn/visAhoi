<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import HorizonGraph from "./horizonGraph.svelte";
</script>

<Meta title="Visahoi/Plotly/HorizonGraph" component={HorizonGraph} />

<Template let:args>
  <HorizonGraph {...args} />
</Template>

<Story name="Demo" args={{ contextKey: "horizonGraph" }} />
