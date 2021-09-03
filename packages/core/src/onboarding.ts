import {IOnboardingMessages} from './interfaces';
import {generateMarkers, displayMarkers} from './injector';
import { AnchorItem, NavigationItem,  QuestionMarkItem } from './navigationItem';

export const OVERLAYSVG = "visahoi-overlay-svg";
export const OVERLAYDIV = "visahoi-overlay";
export const OVERLAYTOOLTIPS = "visahoi-tooltips";
export const OVERLAYNAVIGATION = "visahoi-navigation";

export enum EOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart",
  ANALYZING = "analyze-the-chart"
}

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
  activeStage: null | EOnboardingStages;
}

export default class OnboardingUI {
  private state: onboardingState;
  private onboardingMessages: IOnboardingMessages[];
  private visElement: Element;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element) {
    this.state = {
      activeStep: 0,
      showAllHints: false,
      activeStage: null
    }
    this.onboardingMessages = onboardingMessages;
    this.visElement = visElement;
    this.createOverlay(visElement);
    this.addNavigationItems();
  }

  generateMarkers() {
    generateMarkers(this.visElement, this.onboardingMessages, this.state.activeStep, this.state.showAllHints, this.state.activeStage);
  }

  displayMarkers() {
    displayMarkers(this.onboardingMessages, this.state.activeStage);
  }

  setStage(stage: EOnboardingStages | null) {
    this.state.activeStage = stage;
  }

  createOverlay(visElement) {
    const plotX = visElement.getBoundingClientRect().x;
    const plotY = visElement.getBoundingClientRect().y;
    const plotWidth = visElement.clientWidth;
    const plotHeight = visElement.clientHeight;

    let overlay = document.getElementById(OVERLAYDIV) as any;
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.setAttribute("id", OVERLAYDIV);
      overlay.style.position = "absolute";
      overlay.style.pointerEvents = "none";
      document.body.appendChild(overlay);
    }
    overlay.setAttribute("height", plotHeight.toString());
    overlay.setAttribute("width", plotWidth.toString());
    overlay.style.top = plotY + "px";
    overlay.style.left = plotX + "px";
  
    let svg = document.getElementById(OVERLAYSVG) as any;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg?.setAttribute("id", OVERLAYSVG);
      overlay?.appendChild(svg);
    }
    svg?.setAttribute(
      "viewBox",
      plotX + " " + plotY + " " + plotWidth + " " + plotHeight
    );
    svg?.setAttribute("height", plotHeight.toString());
    svg?.setAttribute("width", plotWidth.toString());
  
    let tooltipContainer = document.getElementById(OVERLAYTOOLTIPS) as any;
    if (!tooltipContainer) {
      tooltipContainer = document.createElement("div");
      tooltipContainer?.setAttribute("id", OVERLAYTOOLTIPS);
      overlay?.appendChild(tooltipContainer);
    }

    let navigationContainer = document.getElementById(OVERLAYNAVIGATION);
    if (!navigationContainer) {
      navigationContainer = document.createElement("div");
      navigationContainer?.setAttribute("id", OVERLAYNAVIGATION);
      navigationContainer?.setAttribute("class", OVERLAYNAVIGATION);
      overlay?.appendChild(navigationContainer);
    }
  }

  addNavigationItems() {
    const navigationContainer = document.getElementById(OVERLAYNAVIGATION);
    if (!navigationContainer || navigationContainer.childElementCount > 0) {
      return;
    }
    if (navigationContainer) {
      const questionMark = new QuestionMarkItem(navigationContainer);
      const analyzing = new NavigationItem(
        navigationContainer,
        "fa-lightbulb",
        EOnboardingStages.ANALYZING,
        () => {
          this.setStage(EOnboardingStages.ANALYZING);
          this.displayMarkers();
        }
      );
      const interacting = new NavigationItem(
        navigationContainer,
        "fa-hand-point-up",
        EOnboardingStages.USING,
        () => {
          this.setStage(EOnboardingStages.USING);
          this.displayMarkers();
        }
      );
      const reading = new NavigationItem(
        navigationContainer,
        "fa-glasses",
        EOnboardingStages.READING,
        () => {
          this.setStage(EOnboardingStages.READING);
          this.displayMarkers();
        }
      );

      console.log(this.onboardingMessages);

      this.onboardingMessages.forEach((m, i) => {
        new AnchorItem(navigationContainer, m.onboardingStage, () => console.log(m));
      })
    }
  }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.generateMarkers()
}
