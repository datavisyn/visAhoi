<script lang="ts">
  import {
    showOnboardingSteps,
    activeOnboardingStage,
    showHideCloseText,
    showOnboardingNavigation,
    isEditModeActive,
  } from "./stores.js";
  import { navigationMainItemDefaultColor } from "../constants";

  $: buttonLabel = $isEditModeActive ? "Exit edit mode" : "Enter edit mode";

  const handleClick = () => {
    if ($activeOnboardingStage) {
      activeOnboardingStage.update((v) => null);
    } else {
      showOnboardingSteps.update((v) => !v);
    }
  };

  const toggleNavigation = () => {
    showOnboardingNavigation.set(!$showOnboardingNavigation);
  };

  const toggleEditMode = () => {
    isEditModeActive.set(!$isEditModeActive);
  };
</script>

<div class="visahoi-navigation-main-item" on:click={handleClick}>
  <div
    class="visahoi-navigation-item-circle"
    style="background-color: {$activeOnboardingStage?.backgroundColor ||
      navigationMainItemDefaultColor}"
  >
    {#if $showOnboardingSteps}
      <span><i class="fas fa-times" /></span>
    {:else}
      <span><i class="fas fa-question" /></span>
    {/if}
  </div>

  <span class="visahoi-stage-title"
    >{$activeOnboardingStage
      ? $activeOnboardingStage?.title
      : $showOnboardingSteps && $showHideCloseText
      ? "Close"
      : $showHideCloseText
      ? "Help"
      : ""}
  </span>
</div>

<div class="visahoi-edit-mode-button">
  <button
    style="background-color: {$activeOnboardingStage?.backgroundColor ||
      navigationMainItemDefaultColor}"
    on:click={toggleEditMode}>{buttonLabel}</button
  >
</div>

<div class="toggle-button">
  {#if $showOnboardingNavigation}
    <span on:click={toggleNavigation}>
      <i class="fas fa-solid fa-toggle-on" />
    </span>
  {:else}
    <span class="test-span" on:click={toggleNavigation}>
      <i
        class="fas fa-solid fa-toggle-off"
        style="width: 20px, height:20px"
        on:click={toggleNavigation}
      />
    </span>
  {/if}
</div>

<style>
  .visahoi-edit-mode-button {
    position: absolute;
    bottom: 0;
    right: 3em;
  }

  .visahoi-edit-mode-button > button {
    width: 125px;
    border-radius: 15px;
    padding: 5px;
    border: none;
    color: white;
    font-size: 13px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
  }

  .toggle-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 80px;
    /* height: 80px; */
    opacity: 1;
    z-index: 15;
  }

  .visahoi-navigation-main-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    margin: 5px;
    width: 80px;
    bottom: 0;
    opacity: 1;
    z-index: 15;
  }

  .visahoi-navigation-main-item:hover {
    filter: brightness(0.85);
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

  .visahoi-stage-title {
    font-weight: bold;
  }
</style>
