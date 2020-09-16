import * as d3 from 'd3';
import {IOnboardingMessages} from './interfaces';
import {displayOnboardingMessages} from './injector';

export enum EOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart"
}

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
}

export default class Onboarding {
  private state: onboardingState;
  private onboardingMessages: IOnboardingMessages[];
  private onboardingWrapper: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
  private visElementId: string;
  constructor(onboardingMessages: IOnboardingMessages[], onboardingElement: string, visElementId: string) {
    this.state = {
      activeStep: 0,
      showAllHints: false
    }
    this.onboardingMessages = onboardingMessages;
    this.onboardingWrapper = d3.select(`#${onboardingElement}`)
    this.onboardingWrapper.append('div').attr('id', 'onboardingStepper')
    this.visElementId = visElementId;
  }

  private setOnboardingState = (attr: string, value: any) => {
    this.state[attr] = value;
    if(attr === "activeStep" || attr === "showAllHints") {
      this.generateOnboardingStepper();
      this.displayOnboardingMessages();
    }
  }

  generateOnboardingStepper() {
    generateOnboardingStepper(this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.setOnboardingState);
  }

  displayOnboardingMessages() {
    displayOnboardingMessages(this.visElementId, this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.setOnboardingState, this.onboardingWrapper);
  }
}

export const generateOnboarding = (onboardingMessages: IOnboardingMessages[], onboardingElement: string, visElementId: string) => {
  const onboarding = new Onboarding(onboardingMessages, onboardingElement, visElementId);
  onboarding.generateOnboardingStepper();
  onboarding.displayOnboardingMessages()
}


const generateOnboardingStepper = (onboardingMessages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void) => {
  const onNextBtnClick = () => {
    if(onboardingMessages.length -1 > activeStep && !showAllHints) {
      setOnboardingState("activeStep", activeStep+1);
    }
  }
  const onPrevBtnClick = () => {
    if(activeStep > 0 && !showAllHints) {
      setOnboardingState("activeStep", activeStep - 1)
    }
  }

  const stepper = d3.select(`#onboardingStepper`)
    .html(null);

  const toggle = stepper.append("label").attr("class", "onboarding-toggle");
    toggle.append("input").attr("class", "toggle-checkbox").attr("type", "checkbox").on("click", function() {
      setOnboardingState("showAllHints", !showAllHints);
    })
    .property("checked", showAllHints)
    toggle.append("div").attr("class", "toggle-switch")
    toggle.append("span").attr("class", "toggle-label").html("Show / Hide All Hints")

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "previous")
    .attr("value", "PREVIOUS")
    .on("click", onPrevBtnClick)
    .property("disabled", showAllHints)

  stepper.append("input")
    .attr("type", "button")
    .attr("name", "next")
    .attr("value", "NEXT")
    .on("click", onNextBtnClick)
    .property("disabled", showAllHints)

}
