import * as d3 from 'd3';
import {OnboardingMessages} from './interfaces';
import {displayOnboardingMessages} from './injector';

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
}

export default class Onboarding {
  private state: onboardingState;
  private onboardingMessages: OnboardingMessages[];
  private onboardingElement: string;
  constructor(onboardingMessages: OnboardingMessages[], onboardingElement: string) {
    this.state = {
      activeStep: 0,
      showAllHints: false
    }
    this.onboardingMessages = onboardingMessages;
    this.onboardingElement = onboardingElement;
  }

  private setState = (attr: string, value: any) => {
    this.state[attr] = value;
  }

  private setOnboardingState = (attr: string, value: any) => {
    this.state[attr] = value;
    if(attr === "activeStep") {
      this.displayOnboardingMessages();
    }
  }

  generateOnboardingStepper() {
    generateOnboardingStepper(this.onboardingMessages, this.onboardingElement, this.state.activeStep, this.setState);
  }

  displayOnboardingMessages() {
    displayOnboardingMessages(this.onboardingMessages, this.onboardingElement, this.state.activeStep, this.state.showAllHints, this.setOnboardingState);
  }
}

export const generateOnboarding = (onboardingMessages: OnboardingMessages[], onboardingElement: string) => {
  const onboarding = new Onboarding(onboardingMessages, onboardingElement);
  onboarding.generateOnboardingStepper();
  onboarding.displayOnboardingMessages()
}


const generateOnboardingStepper = (onboardingMessages: OnboardingMessages[], onboardingElement: string, activeStep: number, setState: (attr: string, value: any) => void) => {


  // function onNextBtnClick() {
  //   if(onboardingMessages.length > activeStep) {
  //   }
  // }

  const onPrevBtnClick = () => {
    if(activeStep <= 0) {
    }
  }

  const stepper = d3.select(`#${onboardingElement}`)
    .append("div")
    .attr("id", "stepper");

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "previous")
    .attr("value", "PREVIOUS")
    .attr("class", "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent")
    .on("click", onPrevBtnClick)

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "next")
    .attr("value", "NEXT")
    .attr("class", "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent")
    .on("click", function () {
      if(onboardingMessages.length > activeStep) {
        setState("activeStep", activeStep+1);
      }
    })
  }
