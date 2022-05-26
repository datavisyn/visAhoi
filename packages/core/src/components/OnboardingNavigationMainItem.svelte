<script lang="ts">
  import { showOnboardingSteps, activeOnboardingStage } from "./stores.js";
  import { navigationMainItemDefaultColor } from "../constants";

  const handleClick = () => {
    if ($activeOnboardingStage) {
      activeOnboardingStage.update((v) => null);
    } else {
      showOnboardingSteps.update((v) => !v);
    }
  };

  $: iconClass = $activeOnboardingStage ? "fas fa-times" : "fas fa-question";
</script>

<div class="visahoi-navigation-main-item" on:click={handleClick}>
  <div
    class="visahoi-navigation-item-circle"
    style="background-color: {$activeOnboardingStage?.color ||
      navigationMainItemDefaultColor}"
  >
    <i class={iconClass} />
  </div>
  <span class="visahoi-stage-title"
    >{$activeOnboardingStage?.title || "Help"}</span
  >
</div>

<style>
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
