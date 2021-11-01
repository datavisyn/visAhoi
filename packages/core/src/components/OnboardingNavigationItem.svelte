<script lang="ts">
  import { IOnboardingStage } from "../interfaces.js";

  import {
    onboardingMessages,
    navigationAlignment,
    activeOnboardingStage,
  } from "./stores.js";
  export let stage: IOnboardingStage;
  const handleClick = () => {
    activeOnboardingStage.update((v) => (v?.id === stage.id ? null : stage));
  };
  const bottom: string = stage.order * 75 + "px";
</script>

<div
  style="--background-color:{stage.color}; --bottom:{bottom}"
  class="visahoi-navigation-item {$activeOnboardingStage &&
  $activeOnboardingStage.id !== stage.id
    ? 'removed'
    : ''}
    {$activeOnboardingStage && $activeOnboardingStage.id === stage.id
    ? 'active'
    : ''}
         {$navigationAlignment === 'row' ? 'horizontal' : 'vertical'}"
  on:click={handleClick}
>
  {#if !$activeOnboardingStage || stage.id !== $activeOnboardingStage?.id}
    <div
      class="visahoi-navigation-item-circle"
      style="background-color: {stage.color}"
    >
      <i class="fas fa-lightbulb" />
    </div>
    {stage.title}
  {:else}
    <div
      class="visahoi-navigation-item-circle"
      style="background-color: {stage.color}"
    >
      <i class="fas fa-times" />
    </div>
    Close
  {/if}
</div>

<style>
  .visahoi-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    /* The border seems to cause drawing artifacts on transition. Probably a browser bug. */
    /* border: 1px solid black; */
    margin: 5px;
    width: 40px;
    bottom: var(--bottom);
    opacity: 1;
  }

  .visahoi-navigation-item:hover {
    /* background-color: darken(var(--background-color)); */
    filter: brightness(0.8);
  }

  .visahoi-navigation-item-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    margin: 5px;
  }

  .removed {
    /* Setting this to zero breaks the transition */
    bottom: 0;
    opacity: 0;
    z-index: 1;
  }

  .active {
    bottom: 0;
    z-index: 10;
  }

  .horizontal {
    /* right: calc(var(--order) * 100px); */
  }

  .vertical {
    /* bottom: calc(var(--order) * 100px); */
  }
</style>
