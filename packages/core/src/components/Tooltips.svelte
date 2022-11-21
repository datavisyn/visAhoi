<script lang="ts">
  import Draggable from "./Draggable.svelte";
  import { onboardingStages } from "./stores";

  import Tooltip from "./Tooltip.svelte";

  export let visElement;
</script>

{#key $onboardingStages}
  <div class="tooltips">
    <Draggable>
      <Tooltip {visElement} />
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
