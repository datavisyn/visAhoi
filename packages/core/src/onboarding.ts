import OnboardingUI from './components/OnboardingUI.svelte';
import { onboardingMessages, navigationAlignment, onboardingStages, showBackdrop, backdropOpacity } from './components/stores.js';
import debounce from "lodash.debounce";
import { IAhoiConfig, NavigationAlignment } from './interfaces';

let onboardingUI: OnboardingUI;
export const injectOnboarding = (ahoiConfig: IAhoiConfig, visElement: Element, alignment: NavigationAlignment) => {
  onboardingMessages.set(ahoiConfig.onboardingMessages);
  onboardingStages.set([...new Set(ahoiConfig.onboardingMessages.map((m) => m.onboardingStage))])
  navigationAlignment.set(alignment);
  if(ahoiConfig?.backdrop?.show !== null && ahoiConfig?.backdrop?.show !== undefined) {
    showBackdrop.set(ahoiConfig?.backdrop?.show);
  }
  if(ahoiConfig?.backdrop?.opacity !== null && ahoiConfig?.backdrop?.opacity !== undefined) {
    backdropOpacity.set(ahoiConfig?.backdrop?.opacity)
  }

  const ref = {update: () => {}}


  const updateOnboarding = (b) => {
    onboardingMessages.set(b.onboardingMessages);
    ref.update();
  }

  onboardingUI = new OnboardingUI({
    target: document.body as Element,
    props: {
      ref,
      visElement
    }
  });
  return {
    updateOnboarding: debounce(updateOnboarding),
    removeOnboarding: () => {
      onboardingUI.$destroy();
    }
  }
}
