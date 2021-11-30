// import App from './Test.svelte';
import OnboardingUI from './components/OnboardingUI.svelte';
import { onboardingMessages, navigationAlignment, onboardingStages } from './components/stores.js';

import { IOnboardingMessage, NavigationAlignment} from './interfaces';


let onboardingUI: OnboardingUI;
export const injectOnboarding = (messages: IOnboardingMessage[], visElement: Element, alignment: NavigationAlignment) => {
  const x = visElement.getBoundingClientRect().x;
  const y = visElement.getBoundingClientRect().y;
  const width = visElement.clientWidth;
  const height = visElement.clientHeight;

  onboardingMessages.set(messages);
  onboardingStages.set([...new Set(messages.map((m) => m.onboardingStage))])
  navigationAlignment.set(alignment);
  const ref = {update: () => {}}
  onboardingUI = new OnboardingUI({
    target: document.body as Element,
    props: {
      x,
      y,
      width,
      height,
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
