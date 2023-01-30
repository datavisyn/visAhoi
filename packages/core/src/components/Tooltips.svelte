<script lang="ts">
  import Draggable from "./Draggable.svelte";
  import { VisahoiState } from "./state";

  import Tooltip from "./Tooltip.svelte";

  export let visElement;
  export let visState: VisahoiState;
  export let dragId: string;  

  const { onboardingStages } = visState;  

  const setDragId = (id) => { 
    dragId = id     
  }

</script>

{#key $onboardingStages}
  <div class="tooltips">
    <Draggable {visState} {dragId}>
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
