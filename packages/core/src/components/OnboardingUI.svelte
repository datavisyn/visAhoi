<script lang="ts">
  import { onboardingMessages, navigationAlignment } from "./stores.js";
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import Markers from "./Markers.svelte";
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
</script>

<div class="visahoi-onboarding-ui" style="width:{width + "px"}; height:{height + "px"}; top:{y +  window.scrollY + "px"}; left:{x +  window.scrollX + "px"} position: absolute">
  <!-- <ul>
    {#each $onboardingMessages as onboardingMessage}
      <li>{onboardingMessage.text}</li>
    {/each}
  </ul> -->
  <Markers top={y} left={x} width={width} height={height} />
  <OnboardingNavigation height={height} />
</div>

<style>
  .visahoi-onboarding-ui {
    position: absolute;
  }
</style>
