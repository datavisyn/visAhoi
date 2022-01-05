<script lang="ts">
  import OnboardingNavigation from "./OnboardingNavigation.svelte";
  import { showOnboarding, showBackdrop, activeOnboardingStage, resetStore, visHeight, visWidth, visXPosition, visYPosition } from "./stores.js";
  import { fade } from "svelte/transition";
  import Markers from "./Markers.svelte";
  import Tooltips from "./Tooltips.svelte";
  import { onDestroy, onMount } from "svelte";
  import Backdrop from "./Backdrop.svelte";

  export let ref;
  export let visElement: Element;

  const setVisElementPosition = () => {
    visXPosition.set(visElement.getBoundingClientRect().x);
    visYPosition.set(visElement.getBoundingClientRect().y);
    visWidth.set(visElement.clientWidth);
    visHeight.set(visElement.clientHeight);
  }


  ref.update = () => {
		setVisElementPosition();
	};

  let show = true;
  showOnboarding.subscribe((value) => {
    show = value;
  });

  onMount(() => {
    setVisElementPosition();
  })
  onDestroy(() => {
    resetStore();
  });
</script>

  <div
    transition:fade
    class="visahoi-onboarding-ui"
    style="width:{$visWidth + 'px'}; height:{$visHeight + 'px'}; top:{$visYPosition +
      window.scrollY +
      'px'}; left:{$visXPosition + window.scrollX + 'px'} position: absolute"
  >
    <Markers />
    <Tooltips />
    <OnboardingNavigation height={$visHeight} />
    {#if $activeOnboardingStage && $showBackdrop}
      <Backdrop />
    {/if}
  </div>

<style>
  .visahoi-onboarding-ui {
    position: absolute;
  }
</style>
