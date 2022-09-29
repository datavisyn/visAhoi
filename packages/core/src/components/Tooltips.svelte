<script lang="ts">
  import Draggable from "./Draggable.svelte";

  import Tooltip from "./Tooltip.svelte";

  export let visElement;
</script>

<div class="tooltips">
  <Draggable>
    <Tooltip {visElement} />
  </Draggable>
</div>

<style>
  .tooltips {
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
