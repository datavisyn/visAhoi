import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { displayMarkers } from './generate-anchor';
import { EOnboardingStages } from "./onboarding";


export function displayGuide(visElement: Element, messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean) {
  /*let reading: [number, IOnboardingMessages][] = [];
  let using: [number, IOnboardingMessages][] = [];
  messages.forEach((message, index) => {
    if(message.onboardingStage === EOnboardingStages.READING) {
      reading.push([index, message])
    } else if(message.onboardingStage === EOnboardingStages.USING) {
      using.push([index, message])
    }
  })
  */
  // if (!activeStage) return;
  displayMarkers(messages
    // .filter(message => message.onboardingStage === activeStage)
    .map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
    message: d.legend,
  })), activeStep, showAllHints, visElement);

}

