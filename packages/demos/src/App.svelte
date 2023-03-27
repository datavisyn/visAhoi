<script lang="ts">
  import PlotlyDemos from "./Plotly.svelte";
  import VegaLiteDemos from "./VegaLite.svelte";
  import EchartsDemos from "./Echarts.svelte";

  let selected: "plotly.js" | "vega-lite" | "apache-echarts" = "plotly.js";
</script>

<main>
  <header style="display: flex; justify-content: center;">
    <img src="./dist/assets/logo.png" height="100%" alt="VisAhoi logo" />
  </header>
  <div
    class="visahoi-demo-container"
    style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 10px"
  >
    <button
      class={selected === "plotly.js" ? "selected" : ""}
      on:click={() => (selected = "plotly.js")}>Plotly.js demos</button
    >
    <button
      class={selected === "vega-lite" ? "selected" : ""}
      on:click={() => (selected = "vega-lite")}>Vega lite demos</button
    >
    <button
      class={selected === "apache-echarts" ? "selected" : ""}
      on:click={() => (selected = "apache-echarts")}
      >Apache echarts demos</button
    >
  </div>
  {#if selected === "plotly.js"}
    <PlotlyDemos />
  {:else if selected === "vega-lite"}
    <VegaLiteDemos />
  {:else if selected === "apache-echarts"}
    <EchartsDemos />
  {/if}
</main>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  button {
    border-radius: 4px;
    background-color: white;
    border: #9e1664 solid 1px;
    color: #9e1664;
    height: 25px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    height: 40px;
  }

  button.selected {
    background-color: #9e1664;
    color: white;
  }

  @media (min-width: 1000px) {
    /* .visahoi-demo-container {
      grid-template-columns: 1fr 1fr 1fr;
    } */
  }

  header {
    height: 130px;
    margin-bottom: 50px;
  }
</style>
