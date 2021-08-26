import * as d3 from 'd3';
import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { createAnchor, createOverlay, displayMarkers } from './generate-anchor';
import {EOnboardingStages} from './onboarding';

export function displayGuide(visElement: Element, messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void, onboardingWrapper: any) {
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
  createOverlay(visElement.getBoundingClientRect().x, visElement.getBoundingClientRect().y, visElement.clientWidth, visElement.clientHeight);

  displayMarkers(messages.map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
  })), activeStep, showAllHints, visElement);

}

