<script lang="ts">  
  import { IOnboardingStage } from "../interfaces.js";
  // @ts-ignore
  import visahoiCloseIcon from '../assets/xmark-solid.svg';
  import { VisahoiState } from "./state.js";
  
  export let stage: IOnboardingStage;
  export let index: number;
  export let visState: VisahoiState;

  const {visahoiIcons, activeOnboardingStage, showOnboardingSteps, navigationAlignment, onboardingStages} = visState;
  const right: string = (index + 1) * 40 + index * 45 + "px";

  const closeIcon: string = $visahoiIcons?.close || visahoiCloseIcon;


  const handleClick = () => {
    activeOnboardingStage.update((v) => (v?.id === stage.id ? null : stage));
  };

  const bottom: string = (index + 1) * 75 + "px";
</script>

{#if $navigationAlignment === "vertical"}
  <div
    style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
      stage.backgroundColor}; --bottom:{bottom}"
    class="visahoi-navigation-item {!$showOnboardingSteps ||
    $activeOnboardingStage
      ? 'removed'
      : ''}"
    on:click={handleClick}
  >
    {#key $onboardingStages || $onboardingStages === null}
      <div class="visahoi-navigation-item-circle">        
        {#if !$activeOnboardingStage || stage.id !== $activeOnboardingStage?.id}
        {@html stage.icon}
      {:else}
        {@html closeIcon}
      {/if}
      </div>
    {/key}
    <span class="visahoi-stage-title">{stage.title}</span>
  </div>
{:else}
  <div
    style="--background-color:{stage.backgroundColor}; --hover-background-color:{stage.hoverBackgroundColor ||
      stage.backgroundColor}; --right:{right}"
    class="visahoi-horizontal-navigation-item {!$showOnboardingSteps ||
    $activeOnboardingStage
      ? 'removed-horizontal'
      : ''}"
    on:click={handleClick}
  >
    {#key $onboardingStages || $activeOnboardingStage || $onboardingStages === null}
      <div class="visahoi-navigation-item-circle">        
        {#if !$activeOnboardingStage || stage.id !== $activeOnboardingStage?.id}
        {@html stage.icon}
      {:else}
        {@html closeIcon}
      {/if}
      </div>
    {/key}
    <span class="visahoi-stage-title">{stage.title}</span>
  </div>
{/if}

<style>
  .visahoi-horizontal-navigation-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    right: var(--right);
    transition: opacity 0.5s ease, right 0.5s ease;
    margin: 5px;
    width: 80px;
    bottom: 0;
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

  .removed-horizontal {
    right: 0;
    opacity: 0;
    z-index: 1;
  } 

  .visahoi-stage-title {
    font-weight: bold;
  }
</style>
