<script lang="ts">
  import EchartsBarchart from "./Components/Echarts/Barchart/Barchart.svelte";
  import EchartsChangeMatrix from "./Components/Echarts/ChangeMatrix/ChangeMatrix.svelte";
  import EchartsHeatmap from "./Components/Echarts/Heatmap/Heatmap.svelte";
  import EchartsHorizonGraph from "./Components/Echarts/HorizonGraph/HorizonGraph.svelte";
  import EchartsScatterplot from "./Components/Echarts/Scatterplot/Scatterplot.svelte";
  import EchartsTreemap from "./Components/Echarts/Treemap/Treemap.svelte";
</script>

<div>
  <div style="display: grid; grid-template-columns: 1fr; grid-gap: 10px">
    <div>
      <h3>Barchart</h3>
      <EchartsBarchart />
      <hr />
    </div>
    <div>
      <h3>Change matrix</h3>
      <EchartsChangeMatrix />
      <hr />
    </div>
    <div>
      <h3>Heatmap</h3>
      <EchartsHeatmap />
      <hr />
    </div>
    <div>
      <h3>Horizon graph</h3>
      <EchartsHorizonGraph />
      <hr />
    </div>
    <div>
      <h3>Scatter plot</h3>
      <EchartsScatterplot />
      <hr />
    </div>
    <div>
      <h3>Treemap</h3>
      <EchartsTreemap />
    </div>
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
