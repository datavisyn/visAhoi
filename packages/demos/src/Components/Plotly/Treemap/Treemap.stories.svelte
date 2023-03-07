<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Treemap from "./Treemap.svelte";
</script>

<Meta title="Visahoi/Plotly/Treemap" component={Treemap} />

<Template let:args>
  <Treemap {...args} />
</Template>

<Story name="Demo" args={{ contextKey: "treemap" }} />
