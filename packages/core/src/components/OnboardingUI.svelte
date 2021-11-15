<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import { showOnboarding } from "./stores.js";
  import { fade } from 'svelte/transition';

  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

</script>

{#if showOnboarding}
<div transition:fade class="visahoi-onboarding-ui" style="width:{width + "px"}; height:{height + "px"}; top:{y +  window.scrollY + "px"}; left:{x +  window.scrollX + "px"} position: absolute">
  <Markers top={y} left={x} width={width} height={height} />
  <Tooltips />
  <OnboardingNavigation height={height} />
</div>
{/if}
<style>
  .visahoi-onboarding-ui {
    position: absolute;
  }
</style>
