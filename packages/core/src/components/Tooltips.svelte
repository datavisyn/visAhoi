<script lang="ts">
  import Tooltip from "./Tooltip.svelte";

  export let visElement;

</script>

<div class="tooltips">
      <Tooltip visElement={visElement} />
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
