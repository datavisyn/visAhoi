<script lang="ts">
  import {
    showOnboardingSteps,
    activeOnboardingStage,
    showHideCloseText,
    showOnboardingNavigation,
    isEditModeActive,
    onboardingStages,
    markerInformation,
    onboardingMessages,
    visahoiIcons,
  } from "./stores.js";
  import { navigationMainItemDefaultColor } from "../constants";

  $: buttonLabel = $isEditModeActive ? "Exit edit mode" : "Enter edit mode";

  import visahoiToggleOnIcon from "../assets/toggle-on-solid.svg";
  import visahoiToggleOffIcon from "../assets/toggle-off-solid.svg";
  import visahoiCloseIcon from "../assets/xmark-solid.svg";
  import visahoiQuestionmarkIcon from "../assets/question-solid.svg";
  import visahoiTrashIcon from "../assets/trash-solid-gray.svg";
  const trashIcon: string = $visahoiIcons?.trash || visahoiTrashIcon;
  const questionmarkIcon: string = $visahoiIcons?.questionmark || visahoiQuestionmarkIcon;
  const closeIcon: string = $visahoiIcons?.close || visahoiCloseIcon;
  const toggleOffIcon: string = $visahoiIcons?.toggleOff || visahoiToggleOffIcon;
  const toggleOnIcon: string = $visahoiIcons?.toggleOn || visahoiToggleOnIcon;

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

  const deleteOnboardingStage = () => {
    const stageId = $activeOnboardingStage?.id;
    const tempOnboardingStages = $onboardingStages;

    // The stage is removed from the array
    tempOnboardingStages.map((onboardingStage, i) => {
      if (onboardingStage.id === stageId) {
        tempOnboardingStages.splice(i, 1);
      }
      // The onboarding messages for the stage is filtered out
      const tempMarkerInformation = $markerInformation.filter(
        (m) => m.message.onboardingStage.id !== stageId
      );

      const tempOnboardingMessage = $onboardingMessages.filter(
        (message) => message.onboardingStage.id !== stageId
      );

      markerInformation.set(tempMarkerInformation);
      onboardingMessages.set(tempOnboardingMessage);
      onboardingStages.set(tempOnboardingStages);

      if ($onboardingStages.length === 0) {
        console.error(
          "No onboarding stages are available. It seems that all onboarding stages have been deleted."
        );
      }
    });
  };
</script>

{#key $onboardingStages || $activeOnboardingStage}
  <div class="visahoi-navigation-main-item" on:click={handleClick}>
    <div
      class="visahoi-navigation-item-circle"
      style="background-color: {$activeOnboardingStage?.backgroundColor ||
        navigationMainItemDefaultColor}"
    >
      {#if $showOnboardingSteps}
        <span style="display: flex">{@html closeIcon}</span>
      {:else}
        <span style="display: flex">{@html questionmarkIcon}</span>
      {/if}

      {#if $activeOnboardingStage && $isEditModeActive}
        <div class="visahoi-delete-stage" on:click={deleteOnboardingStage}>
          <span title="Delete onboarding stage">{@html trashIcon}</span>
        </div>
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

  <div class="toggle-button">
    {#if $showOnboardingNavigation}
      <span style="display: flex" title="Disable navigation steps" on:click={toggleNavigation}>
        {@html toggleOnIcon}
      </span>
    {:else}
      <span style="display: flex" title="Enable navigation steps" on:click={toggleNavigation}>
        {@html toggleOffIcon}
      </span>
    {/if}
  </div>
{/key}

<style>
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

  .visahoi-delete-stage {
    position: absolute;
    margin-left: 80px;
  }
</style>
