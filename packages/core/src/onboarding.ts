import OnboardingUI from './components/OnboardingUI.svelte';
import { onboardingMessages, navigationAlignment, onboardingStages, showBackdrop } from './components/stores.js';

import { IAhoiConfig, IOnboardingMessage, NavigationAlignment} from './interfaces';


let onboardingUI: OnboardingUI;
export const injectOnboarding = (ahoiConfig: IAhoiConfig, visElement: Element, alignment: NavigationAlignment) => {
  onboardingMessages.set(ahoiConfig.onboardingMessages);
  onboardingStages.set([...new Set(ahoiConfig.onboardingMessages.map((m) => m.onboardingStage))])
  navigationAlignment.set(alignment);
  if(ahoiConfig.showBackdrop !== null && ahoiConfig.showBackdrop !== undefined) {
    showBackdrop.set(ahoiConfig.showBackdrop);
  }
  const ref = {update: () => {}}
  onboardingUI = new OnboardingUI({
    target: document.body as Element,
    props: {
      ref,
      visElement
    }
  });
  return {
    updateOnboarding: () => ref.update(),
    removeOnboarding: () => {
      onboardingUI.$destroy();
    }
  }
}
