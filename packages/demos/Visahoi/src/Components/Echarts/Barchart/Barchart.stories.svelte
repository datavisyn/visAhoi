<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";

  import Barchart from "./Barchart.svelte";
</script>

<Meta title="Visahoi/Echarts/Barchart" component={Barchart} />

<Template let:args>
  <Barchart {...args} />
</Template>

<Story name="Demo" args={{ contextKey: "barchart" }} />
