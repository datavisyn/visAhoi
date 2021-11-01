<script lang="ts">
  import { onboardingMessages, navigationAlignment, onboardingStages, activeOnboardingStage } from "./stores.js";
  import OnboardingNavigationItem from './OnboardingNavigationItem.svelte';

  // activeOnboardingStage.subscribe((value) => {
  //   console.log("active onboarding stage: ", value);
  // })
  export let height: number;
  const navigationHeight = $onboardingStages.length * 100 > height ? height : $onboardingStages.length * 100;
</script>

<style>
  .visahoi-navigation-container {
    position: absolute;
    bottom: 15px;
    right: 100px;
    display: flex;
    flex-direction: var(--flexDirection);
    align-items: center;
  }
</style>

<div class="visahoi-navigation-container"
  style="--flexDirection:{$navigationAlignment}; height: {navigationHeight + 'px'}"
>
{#each $onboardingStages as stage}
<!-- todo: continue here! -->
  <OnboardingNavigationItem stage={stage} />
{/each}

</div>
