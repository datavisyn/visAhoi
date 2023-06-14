<script lang="ts">
  import VegaTreemap from "./Components/VegaLite/Treemap/Treemap.svelte";
  import VegaHeatmap from "./Components/VegaLite/Heatmap/Heatmap.svelte";
  import VegaBarchart from "./Components/VegaLite/Barchart/Barchart.svelte";
  import VegaChangeMatrix from "./Components/VegaLite/ChangeMatrix/ChangeMatrix.svelte";
  import VegaHorizonGraph from "./Components/VegaLite/HorizonGraph/HorizonGraph.svelte";
  import VegaScatterplot from "./Components/VegaLite/Scatterplot/Scatterplot.svelte";
</script>

<div>
  <div>
    <h3>Barchart</h3>
    <VegaBarchart />
    <hr />
  </div>
  <div>
    <h3>Change matrix</h3>
    <VegaChangeMatrix />
    <hr />
  </div>
  <div>
    <h3>Horizon graph</h3>
    <VegaHorizonGraph />
    <hr />
  </div>
  <div>
    <h3>Scatter plot</h3>
    <VegaScatterplot />
    <hr />
  </div>
  <div>
    <h3>Heatmap</h3>
    <VegaHeatmap />
    <hr />
  </div>
  <div>
    <h3>Treemap</h3>
    <VegaTreemap />
  </div>
</div>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  hr {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
