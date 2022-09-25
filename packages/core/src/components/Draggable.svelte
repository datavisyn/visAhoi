<script lang="ts">
  import { isEditModeActive } from "./stores";

  let left = 100;
  let top = 100;

  $: cursor = $isEditModeActive ? "pointer" : "move";
  let moving = false;

  const onMouseDown = () => {
    moving = $isEditModeActive ? false : true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  };

  const onMouseUp = () => {
    moving = false;
  };
</script>

<div
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px; cursor: {cursor}"
  class="draggable"
>
  <!--The <slot> tag indicates the place where its children should be placed-->
  <slot />
</div>

<svelte:window
  on:mouseup={onMouseUp}
  on:mousemove={onMouseMove}
  on:mousedown={onMouseDown}
/>

<style>
  .draggable {
    width: 200px;
    position: absolute;
  }
</style>
