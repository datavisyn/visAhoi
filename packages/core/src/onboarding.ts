import {IOnboardingMessages} from './interfaces';
import {displayGuide} from './injector';

export enum EOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart"
}

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
}

export default class OnboardingUI {
  private state: onboardingState;
  private onboardingMessages: IOnboardingMessages[];
  private visElement: Element;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element) {
    this.state = {
      activeStep: 0,
      showAllHints: false
    }
    this.onboardingMessages = onboardingMessages;
    this.visElement = visElement;
  }

  displayGuide() {
    displayGuide(this.visElement, this.onboardingMessages, this.state.activeStep, this.state.showAllHints);
  }
}

// window.addEventListener('resize', () => {
//   onboarding.displayGuide();
// })

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.displayGuide()
}
