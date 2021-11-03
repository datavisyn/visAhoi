<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

</script>

<div class="visahoi-onboarding-ui" style="width:{width + "px"}; height:{height + "px"}; top:{y +  window.scrollY + "px"}; left:{x +  window.scrollX + "px"} position: absolute">
  <Markers top={y} left={x} width={width} height={height} />
  <Tooltips />
  <OnboardingNavigation height={height} />
</div>

<style>
  .visahoi-onboarding-ui {
    position: absolute;
  }
</style>
