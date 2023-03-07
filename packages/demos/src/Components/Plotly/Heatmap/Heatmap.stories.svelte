<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Heatmap from "./Heatmap.svelte";
</script>

<Meta title="Visahoi/Plotly/Heatmap" component={Heatmap} />

<Template let:args>
  <Heatmap {...args} />
</Template>

<Story name="Demo" args={{ contextKey: "heatmap" }} />
