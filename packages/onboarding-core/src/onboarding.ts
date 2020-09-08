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
  constructor(onboardingMessages: OnboardingMessages[]) {
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
    generateOnboardingStepper(this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.setOnboardingState);
  }

  displayOnboardingMessages() {
    displayOnboardingMessages(this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.setOnboardingState);
  }
}

export const generateOnboarding = (onboardingMessages: OnboardingMessages[], onboardingElement: string) => {
  const onboardingWrapper: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> = d3
    .select(`#${onboardingElement}`)

  onboardingWrapper.append('div').attr('id', 'onboardingStepper')
  const readingTheChart = onboardingWrapper.append("div").attr("id", "readingTheChart")
  readingTheChart.append("h2")
    .attr("id", "onboardingHeadline")
    .html("Reading the Chart")
    readingTheChart.append('div').attr('id', 'onboardingLegend')

  const onboarding = new Onboarding(onboardingMessages);
  onboarding.generateOnboardingStepper();
  onboarding.displayOnboardingMessages()
}


const generateOnboardingStepper = (onboardingMessages: OnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void) => {
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

  const toggle = stepper.append("label").attr("class", "onboarding-toggle");
    toggle.append("input").attr("class", "toggle-checkbox").attr("type", "checkbox").on("click", function() {
      setOnboardingState("showAllHints", !showAllHints);
    })
    toggle.append("div").attr("class", "toggle-switch")
    toggle.append("span").attr("class", "toggle-label").html("Show / Hide All Hints")

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "previous")
    .attr("value", "PREVIOUS")
    .on("click", onPrevBtnClick)
    // .property("disabled", showAllHints)

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "next")
    .attr("value", "NEXT")
    .on("click", onNextBtnClick)
    // .property("disabled", showAllHints)

}
