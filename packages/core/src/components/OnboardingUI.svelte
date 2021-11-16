<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import { showOnboarding, resetStore } from "./stores.js";
  import { fade } from "svelte/transition";

  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  import { onDestroy } from "svelte";

  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  let show = false;
  showOnboarding.subscribe((value) => {
    show = value;
  });

  onDestroy(() => {
    resetStore();
  });
</script>

  <div
    transition:fade
    class="visahoi-onboarding-ui"
    style="width:{width + 'px'}; height:{height + 'px'}; top:{y +
      window.scrollY +
      'px'}; left:{x + window.scrollX + 'px'} position: absolute"
  >
    <Markers top={y} left={x} {width} {height} />
    <Tooltips />
    <OnboardingNavigation {height} />
  </div>

<style>
  .visahoi-onboarding-ui {
    position: absolute;
  }
</style>
