import {IOnboardingMessages} from './interfaces';
import {displayGuide} from './injector';
import { NavigationItem,  QuestionMarkItem } from './navigationItem';

export enum EOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart",
  ANALYZING = "analyze-the-chart"
}

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
  // activeStage: null | EOnboardingStages;
}

export default class OnboardingUI {
  private state: onboardingState;
  private onboardingMessages: IOnboardingMessages[];
  private visElement: Element;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element) {
    this.state = {
      activeStep: 0,
      showAllHints: false,
      // activeStage: null
    }
    this.onboardingMessages = onboardingMessages;
    this.visElement = visElement;
    this.createOverlay(visElement);
    this.addNavigationItems();
  }

  displayGuide() {
    displayGuide(this.visElement, this.onboardingMessages, this.state.activeStep, this.state.showAllHints);
  }

  // setStage(stage: EOnboardingStages | null) {
  //   this.state.activeStage = stage;
  // }

  createOverlay(visElement) {
    const plotX = visElement.getBoundingClientRect().x;
    const plotY = visElement.getBoundingClientRect().y;
    const plotWidth = visElement.clientWidth;
    const plotHeight = visElement.clientHeight;

    let overlay = document.getElementById("visahoi-overlay") as any;
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.setAttribute("id", "visahoi-overlay");
      overlay.style.position = "absolute";
      overlay.style.pointerEvents = "none";
      document.body.appendChild(overlay);
    }
    overlay.setAttribute("height", plotHeight.toString());
    overlay.setAttribute("width", plotWidth.toString());
    overlay.style.top = plotY + "px";
    overlay.style.left = plotX + "px";
  
    let svg = document.getElementById("visahoi-overlay-svg") as any;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg?.setAttribute("id", "visahoi-overlay-svg");
      overlay?.appendChild(svg);
    }
    svg?.setAttribute(
      "viewBox",
      plotX + " " + plotY + " " + plotWidth + " " + plotHeight
    );
    svg?.setAttribute("height", plotHeight.toString());
    svg?.setAttribute("width", plotWidth.toString());
  
    let tooltipContainer = document.getElementById("visahoi-tooltips") as any;
    if (!tooltipContainer) {
      tooltipContainer = document.createElement("div");
      tooltipContainer?.setAttribute("id", "visahoi-tooltips");
      overlay?.appendChild(tooltipContainer);
    }

    let navigationContainer = document.getElementById("visahoi-navigation");
    if (!navigationContainer) {
      navigationContainer = document.createElement("div");
      navigationContainer?.setAttribute("id", "visahoi-navigation");
      navigationContainer?.setAttribute("class", "visahoi-navigation");
      overlay?.appendChild(navigationContainer);
    }
  }

  addNavigationItems() {
    const navigationContainer = document.getElementById("visahoi-navigation");
    if (!navigationContainer || navigationContainer.childElementCount > 0) {
      return;
    }
    if (navigationContainer) {
      const questionMark = new QuestionMarkItem(navigationContainer);
      const analyzing = new NavigationItem(
        navigationContainer,
        "#FE8029",
        "fa-lightbulb",
        "visahoi-analyzing",
        () => null
        // this.setStage(EOnboardingStages.ANALYZING)
      );
      const interacting = new NavigationItem(
        navigationContainer,
        "#003D5C",
        "fa-hand-point-up",
        "visahoi-interacting",
        () => null 
        // this.setStage(EOnboardingStages.USING)
      );
      const reading = new NavigationItem(
        navigationContainer,
        "#7B5096",
        "fa-glasses",
        "visahoi-reading",
        () => null 
        // this.setStage(EOnboardingStages.READING)
      );
    }
  }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.displayGuide()
}
