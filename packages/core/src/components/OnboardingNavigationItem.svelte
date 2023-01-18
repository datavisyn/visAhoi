<script lang="ts">
  import { getContext, getAllContexts } from "svelte";
  import { IOnboardingStage } from "../interfaces.js";
  import {
    navigationAlignment,
    activeOnboardingStage,
    showOnboardingSteps,
    onboardingStages,
    visahoiIcons,
    stores
  } from "./stores.js";
  import visahoiCloseIcon from '../assets/xmark-solid.svg';
  
  export let stage: IOnboardingStage;
  export let index: number;
  export let contextKey: string;

  // console.log(1)
  // console.log("stores: ", $stores)
  const store = $stores.get(contextKey)
  // console.log("contextKey: ---> ", contextKey)
  // console.log("store: ---> ", store)
  // 1
  const {count} = store;
  // console.log(contextKey)
  // console.log($count)

  const closeIcon: string = $visahoiIcons?.close || visahoiCloseIcon;


  const handleClick = () => {
    // console.log("count");
    count.update((v) => v+1);
    console.log("count: ", $count);
    // console.log("contextKey: ", contextKey);
    // console.log("all contexts: ", all)
    activeOnboardingStage.update((v) => (v?.id === stage.id ? null : stage));
  };

  const bottom: string = (index + 1) * 75 + "px";
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

<style>
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

  .active {
    bottom: 0;
    z-index: 10;
  }

  /* .horizontal {
    right: calc(var(--order) * 100px);
  }

  .vertical {
    bottom: calc(var(--order) * 100px);
  } */

  .visahoi-stage-title {
    font-weight: bold;
  }
</style>
