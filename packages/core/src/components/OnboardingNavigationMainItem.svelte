<script lang="ts">
  import { showOnboardingSteps, activeOnboardingStage } from "./stores.js";
  import { navigationMainItemDefaultColor } from "../constants";
  import { get } from "svelte/store";

  const handleClick = () => {
    if ($activeOnboardingStage) {
      activeOnboardingStage.update((v) => null);
    } else {
      showOnboardingSteps.update((v) => !v);
      console.log("from sthe elsse", get(showOnboardingSteps));
    }
  };

  // $: iconClass = $activeOnboardingStage ? "fas fa-times" : "fas fa-question";
  $: console.log("from outside the  elsse", $showOnboardingSteps);
  $: iconClass = $showOnboardingSteps ? "fas fa-times" : "fas fa-question";

  // $: iconClass = $activeOnboardingStage
  //   ? $activeOnboardingStage.iconClass
  //   : "fas fa-question";
</script>

<div class="visahoi-navigation-main-item" on:click={handleClick}>
  <div
    class="visahoi-navigation-item-circle"
    style="background-color: {$activeOnboardingStage?.color ||
      navigationMainItemDefaultColor}"
  >
    <!-- <i class={$showOnboardingSteps ? "fas fa-times" : "fas fa-question"} /> -->
    <i class="fp-prev" />
    <!-- <i class="fas fa-times" /> -->
    <!-- <p class:test={$showOnboardingSteps}>tws</p> -->
  </div>
  <!-- <span class="visahoi-stage-title"
    >{$activeOnboardingStage?.title || "Help"}</span
  > -->

  <span class="visahoi-stage-title"
    >{$activeOnboardingStage
      ? $activeOnboardingStage?.title
      : $showOnboardingSteps
      ? "Close"
      : "Help"}
  </span>
</div>

<style>
  @import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

  .fp-prev::before {
    color: #000;
    content: "\f35a"; /* You should use \ and not /*/
    font-family: "Font Awesome 5 Free"; /* This is the correct font-family*/
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
  }

  .twitter::before {
    font-family: "Font Awesome 5 Brands";
    content: "\f099";
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
    width: 40px;
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
