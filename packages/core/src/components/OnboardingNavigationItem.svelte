<script lang="ts">
  import { IOnboardingStage } from "../interfaces.js";
  import {
    navigationAlignment,
    activeOnboardingStage,
    showOnboardingSteps,
    onboardingStages,
  } from "./stores.js";
  export let stage: IOnboardingStage;
  export let index: number;

  const bottom: string = (index + 1) * 75 + "px";

  const handleClick = () => {
    activeOnboardingStage.update((v) => (v?.id === stage.id ? null : stage));
  };

//   const bottom: string = (index + 1) * 75 + "px";
//   const right: string = (index + 1) * 40 + index * 45 + "px";
// </script>

// {#if $navigationAlignment === "row"}
//   <div
//     style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
//       stage.backgroundColor}; --bottom:{bottom}"
//     class="visahoi-navigation-item {!$showOnboardingSteps ||
//     $activeOnboardingStage
//       ? 'removed'
//       : ''}"
//     on:click={handleClick}
//   >
</script>

<div
  style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
    stage.backgroundColor}; --bottom:{bottom}"
  class="visahoi-navigation-item {!$showOnboardingSteps ||
  $activeOnboardingStage
    ? 'removed'
    : ''}
    {$navigationAlignment === 'row' ? 'horizontal' : 'vertical'}"
  on:click={handleClick}
>
  {#key $onboardingStages || $onboardingStages === null}
    <div class="visahoi-navigation-item-circle">
      <i
        class={!$activeOnboardingStage ||
        stage.id !== $activeOnboardingStage?.id
          ? stage.iconClass
          : "fas fa-times"}
      />
    </div>

    <!-- <span class="visahoi-stage-title">{stage.title}</span>
  </div>
{:else}
  <div
    style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
      stage.backgroundColor}; --right: {right}"
    class="visahoi-horizontal-navigation-item {!$showOnboardingSteps ||
    $activeOnboardingStage
      ? 'removed'
      : ''}"
    on:click={handleClick}
  >
    <div class="visahoi-navigation-item-circle">
      <i
        class={!$activeOnboardingStage ||
        stage.id !== $activeOnboardingStage?.id
          ? stage.iconClass
          : "fas fa-times"}
      />
    </div>
    <span class="visahoi-stage-title">{stage.title}</span>
  </div>
{/if} -->
  {/key}
  <span class="visahoi-stage-title">{stage.title}</span>
</div>

<style>
  .visahoi-horizontal-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, right 0.5s ease;
    margin: 5px;
    width: 80px;
    /* bottom: var(--bottom); */
    bottom: 0;
    right: var(--right);
    /* right: -2; */

    opacity: 1;
    z-index: 15;
  }
  .visahoi-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    margin: 5px;
    width: 80px;
    bottom: var(--bottom);
    /* right: var(--right); */
    /* right: -2; */

    opacity: 1;
    z-index: 15;
  }

  .visahoi-navigation-item:hover .visahoi-navigation-item-circle {
    background-color: var(--hover-background-color);
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
    background-color: var(--background-color);
    transition: background-color 0.2s ease;
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
    transition: opacity 0.5s ease, right 0.5s ease;
    /* right: var(--right); */
  }

  .vertical {
    /* bottom: var(--bottom); */
    transition: opacity 0.5s ease, bottom 0.5s ease;
  }

  .visahoi-stage-title {
    font-weight: bold;
  }
</style>
