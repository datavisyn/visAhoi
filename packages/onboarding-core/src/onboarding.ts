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
  constructor(onboardingMessages: OnboardingMessages[], onboardingElement: string, onboardingWrapper: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>) {
    this.state = {
      activeStep: 0,
      showAllHints: false
    }
    this.onboardingMessages = onboardingMessages;
  }

  private setOnboardingState = (attr: string, value: any) => {
    this.state[attr] = value;
    if(attr === "activeStep") {
      this.generateOnboardingStepper();
      this.displayOnboardingMessages();
    }
  }

  generateOnboardingStepper() {
    generateOnboardingStepper(this.onboardingMessages, this.state.activeStep, this.setOnboardingState);
  }

  displayOnboardingMessages() {
    displayOnboardingMessages(this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.setOnboardingState);
  }
}

export const generateOnboarding = (onboardingMessages: OnboardingMessages[], onboardingElement: string) => {
  const onboardingWrapper: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> = d3
    .select(`#${onboardingElement}`)

  onboardingWrapper.append('div').attr('id', 'onboardingStepper')
  onboardingWrapper.append('div').attr('id', 'onboardingLegend')

  const onboarding = new Onboarding(onboardingMessages, onboardingElement, onboardingWrapper);
  onboarding.generateOnboardingStepper();
  onboarding.displayOnboardingMessages()
}


const generateOnboardingStepper = (onboardingMessages: OnboardingMessages[], activeStep: number, setOnboardingState: (attr: string, value: any) => void) => {


  const onNextBtnClick = () => {
    if(onboardingMessages.length -1 > activeStep) {
      setOnboardingState("activeStep", activeStep+1);
    }
  }

  const onPrevBtnClick = () => {
    if(activeStep > 0) {
      setOnboardingState("activeStep", activeStep - 1)
    }
  }

  const stepper = d3.select(`#onboardingStepper`)
    .html(null);

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
    .on("click", onNextBtnClick)
  }
