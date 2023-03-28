<script lang="ts">
  import PlotlyBarchart from "./Components/Plotly/Barchart/Barchart.svelte";
  import PlotlyChangeMatrix from "./Components/Plotly/ChangeMatrix/ChangeMatrix.svelte";
  import PlotlyHeatmap from "./Components/Plotly/Heatmap/Heatmap.svelte";
  import PlotlyHorizonGraph from "./Components/Plotly/HorizonGraph/HorizonGraph.svelte";
  import PlotlyScatterplot from "./Components/Plotly/Scatterplot/Scatterchart.svelte";
  import PlotlyTreemap from "./Components/Plotly/Treemap/Treemap.svelte";
</script>

<div>
  <div style="display: grid; grid-template-columns: 1fr; grid-gap: 10px">
    <div>
      <h3>Barchart</h3>
      <PlotlyBarchart />
      <hr />
    </div>
    <div>
      <h3>Change matrix</h3>
      <PlotlyChangeMatrix />
      <hr />
    </div>
    <div>
      <h3>Heatmap</h3>
      <PlotlyHeatmap />
      <hr />
    </div>
    <div>
      <h3>Horizon graph</h3>
      <PlotlyHorizonGraph />
      <hr />
    </div>
    <div>
      <h3>Scatter plot</h3>
      <PlotlyScatterplot />
      <hr />
    </div>
    <div>
      <h3>Treemap</h3>
      <PlotlyTreemap />
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
