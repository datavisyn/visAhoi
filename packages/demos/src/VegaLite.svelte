<script lang="ts">
  import VegaBarchart from "./Components/VegaLite/Barchart/Barchart.svelte";
  // import VegaChangeMatrix from "./Components/VegaLite/ChangeMatrix/ChangeMatrix.svelte";
  // import VegaHorizonGraph from "./Components/VegaLite/HorizonGraph/HorizonGraph.svelte";
  // import VegaScatterplot from "./Components/VegaLite/Scatterplot/Scatterplot.svelte";
</script>

<div>
  <div
    style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 10px"
  >
    <div>
      <h3>Barchart</h3>
      <VegaBarchart />
    </div>
    <!-- <div>
      <h3>Change matrix</h3>
      <VegaChangeMatrix />
    </div>
    <div>
      <h3>Horizon graph</h3>
      <VegaHorizonGraph />
    </div>
    <div>
      <h3>Scatter plot</h3>
      <VegaScatterplot />
    </div> -->
  </div>
</div>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
