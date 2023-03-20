<script lang="ts">
  import PlotlyBarchart from "./Components/Plotly/Barchart/Barchart.svelte";
</script>

<main>
  <b>TODO: add demos heress</b>
  <PlotlyBarchart />
</main>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
