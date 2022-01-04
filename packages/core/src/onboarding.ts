// import App from './Test.svelte';
import OnboardingUI from './components/OnboardingUI.svelte';
import { onboardingMessages, navigationAlignment, onboardingStages } from './components/stores.js';

import { IOnboardingMessage, NavigationAlignment} from './interfaces';


let onboardingUI: OnboardingUI;
export const injectOnboarding = (messages: IOnboardingMessage[], visElement: Element, alignment: NavigationAlignment) => {
  onboardingMessages.set(messages);
  onboardingStages.set([...new Set(messages.map((m) => m.onboardingStage))])
  navigationAlignment.set(alignment);
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
