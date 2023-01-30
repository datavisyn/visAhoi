<script lang="ts">
  import Draggable from "./Draggable.svelte";
  import { VisahoiState } from "./state";

  import Tooltip from "./Tooltip.svelte";

  export let visElement;
  export let visState: VisahoiState;
  let dragId;
  export let test: string;
  

  const { onboardingStages, contextId } = visState;
  
  // console.log($contextId, 'id-1..')
  console.log(dragId, 'tooltipId-3')

  const setDragId = (id) => { 
    test = id   
    console.log(id, 'id--2')
  }

</script>

{#key $onboardingStages}
  <div class="tooltips">
    <Draggable {visState} {test}>
      <Tooltip {visElement} {visState} setDragId={setDragId}/>
    </Draggable>
  </div>
{/key}

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
