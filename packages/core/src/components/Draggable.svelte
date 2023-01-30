<script lang="ts">
  import { VisahoiState } from "./state";

  export let visState: VisahoiState;
  export let dragId: string;

  const { editTooltip, dragTooltipId } = visState;  

  let left = 100;
  let top = 100;

  $: cursor = $editTooltip ? "pointer" : "move";
  let moving = false; 

  const onMouseDown = () => {    
    moving = $editTooltip ? false : true;
  };

  const onMouseMove = (e: MouseEvent) => {    
    if(moving && dragId === $dragTooltipId){      
      left += e.movementX;
      top += e.movementY;}
  };

  const onMouseUp = () => {
    moving = false;
  };
</script>

<div 
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px; cursor: {cursor}"
  class="${dragId === 'vis'} ? draggable : '' "
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
