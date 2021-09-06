import {IOnboardingMessages} from './interfaces';
import {displayAnchors, displayTooltip, generateMarkers} from './injector';
import { AnchorItem, ArrowItem, NavigationItem,  QuestionMarkItem } from './navigationItem';

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
  private anchorItems: AnchorItem[];
  private questionMark?: QuestionMarkItem;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element) {
    this.state = {
      activeStep: 0,
      showAllHints: false,
      activeStage: null
    }
    this.onboardingMessages = onboardingMessages.sort((a, b) => a.onboardingStage > b.onboardingStage ? 1 : a.onboardingStage < b.onboardingStage ? -1 : 0);
    console.log(this.onboardingMessages)
    this.anchorItems = [];
    this.visElement = visElement;
    this.createOverlay(visElement);
    const parent = document.getElementById(OVERLAYNAVIGATION);
    if (parent) {
      this.questionMark = this.createQuestionMarkItem(parent);
      this.addItems(parent);
    }
  }

  generateMarkers() {
    generateMarkers(
      this.visElement,
      this.onboardingMessages,
      (i: number, stage: EOnboardingStages) => {
        this.setStage(stage);
        this.setActiveStep(i);
      }
    );
  }

  displayAnchors() {
    displayAnchors(this.onboardingMessages, this.state.activeStage);
  }

  displayTooltip() {
    displayTooltip(this.onboardingMessages, this.state.activeStep, this.state.activeStage);
  }

  setStage(stage: EOnboardingStages | null) {
    if (stage && stage === this.state.activeStage) return;
    this.state.activeStage = stage;
    this.questionMark?.setActiveStage(stage);
    this.displayAnchors();
  }

  setActiveStep(step: number) {
    if (step < 0 || step > this.anchorItems.length - 1) return;
    const prev = this.state.activeStep;
    this.state.activeStep = step;
    this.anchorItems[prev].unsetSelected();
    this.anchorItems[step].setSelected();
    this.displayTooltip();
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

  deSelectAllAnchor() {
    this.anchorItems.forEach((anchor) => anchor.unsetSelected());
  }

  setSelectedAnchor() {
    this.anchorItems.forEach((anchor, i) => {
      if (anchor.getStage() === this.state.activeStage && this.anchorItems[i - 1]?.getStage() !== anchor.getStage()) {
        this.setActiveStep(anchor.getIndex());
      }
    })
  }

  nextStep() {
    const curr = this.state.activeStep;
    this.setStage(this.anchorItems[curr + 1].getStage());
    this.setActiveStep(curr + 1);
  }

  prevStep() {
    const curr = this.state.activeStep;
    this.setStage(this.anchorItems[curr - 1].getStage());
    this.setActiveStep(curr - 1);
  }

  createQuestionMarkItem(parent: HTMLElement): QuestionMarkItem {
    return new QuestionMarkItem(
      parent,
      () => {
        if (this.state.activeStage) {
          this.setStage(null);
          this.displayAnchors();
        }
      }
    );
  }

  addItems(parent: HTMLElement) {
    if (!parent || parent.childElementCount > 1) {
      return;
    }
    this.addNavigationItems(parent);
    this.addAnchorItems(parent);
  }

  addNavigationItems(parent: HTMLElement) {
    const stages = new Set(this.onboardingMessages.map(message => message.onboardingStage));
    if (stages.has(EOnboardingStages.ANALYZING)) {
      new NavigationItem(
        parent,
        "fa-lightbulb",
        EOnboardingStages.ANALYZING,
        () => {
          this.setStage(EOnboardingStages.ANALYZING);
          this.displayAnchors();
          this.setSelectedAnchor()
        }
      );
    }
    if (stages.has(EOnboardingStages.USING)) {
      new NavigationItem(
        parent,
        "fa-hand-point-up",
        EOnboardingStages.USING,
        () => {
          this.setStage(EOnboardingStages.USING);
          this.displayAnchors();
          this.setSelectedAnchor()
        }
      );
    }
    if (stages.has(EOnboardingStages.READING)) {
      new NavigationItem(
        parent,
        "fa-glasses",
        EOnboardingStages.READING,
        () => {
          this.setStage(EOnboardingStages.READING);
          this.displayAnchors();
          this.setSelectedAnchor()
        }
      );
    }
  }

  addAnchorItems(parent: HTMLElement) {
    new ArrowItem(
      parent,
      () => this.prevStep(),
      "up"
    );
    new ArrowItem(
      parent,
      () => this.nextStep(),
      "down"
    );
    this.onboardingMessages.forEach((m, i) => {
      this.anchorItems.push(new AnchorItem(
        i,
        parent,
        m.onboardingStage,
        () => {
          this.setStage(m.onboardingStage);
          this.setActiveStep(i);
        }
      ));
    });
  }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.generateMarkers()
}
