<script lang="ts">
  let left = 100;
  let top = 100;

  let moving = false;

  function onMouseDown() {
    moving = true;
    console.log("test");
  }

  function onMouseMove(e) {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    moving = false;
  }
</script>

<section
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px;"
  class="draggable"
>
  <slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    width: 200px;
    cursor: move;
    position: absolute;
  }
</style>
