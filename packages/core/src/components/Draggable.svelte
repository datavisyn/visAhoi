<script lang="ts">
  import { VisahoiState } from "./state";

  export let visState: VisahoiState;
  export let test: string;

  const { editTooltip, contextId, dragTooltipId } = visState;

  $: console.log($dragTooltipId, 'dd')
  $: console.log(test, 'tset')
  $: if ($dragTooltipId === test) {
    console.log('ett')
  }
  
  

  let left = 100;
  let top = 100;

  $: cursor = $editTooltip ? "pointer" : "move";
  let moving = false;

  $: console.log('test-12', test)

  const onMouseDown = () => {    
    moving = $editTooltip ? false : true;
  };

  const onMouseMove = (e: MouseEvent) => {    
    if(moving && test === $dragTooltipId){      
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
  class="${test === 'vis'} ? draggable : '' "
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
