import {EOnboardingStages, IOnboardingMessages} from './interfaces';
import {displayAnchors, displayTooltip, generateMarkers} from './injector';
import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS, OVERLAYDIV, OVERLAYNAVIGATION, OVERLAYSVG, OVERLAYTOOLTIPS } from './constants';
import AnchorItem from './ahoi_items/AnchorItem';
import QuestionMarkItem from './ahoi_items/QuestionMarkItem';
import NavigationItem from './ahoi_items/NavigationItem';
import ArrowItem from './ahoi_items/ArrowItem';

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
    this.onboardingMessages = onboardingMessages.sort((a, b) => Object.values(EOnboardingStages).indexOf(a.onboardingStage) - Object.values(EOnboardingStages).indexOf(b.onboardingStage));
    this.anchorItems = [];
    this.visElement = visElement;
    this.createOverlay(visElement);
    
    const parent = document.getElementById(OVERLAYNAVIGATION);
    if (parent) {
      this.questionMark = this.createQuestionMarkItem(parent);
      this.addOnboardingItems(parent);
    }
  }

  //https://github.com/datavisyn/tdp_core/blob/03b78384c9b1c1e9301123a4f9d85bd3bf09f138/src/tour/TourManager.ts#L178

  createOverlay(visElement) {
    const plotX = visElement.getBoundingClientRect().x;
    const plotY = visElement.getBoundingClientRect().y;
    const plotWidth = visElement.clientWidth;
    const plotHeight = visElement.clientHeight;

    let overlay = document.getElementById(OVERLAYDIV) as any;
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.setAttribute("id", OVERLAYDIV);
      overlay.classList.add(OVERLAYDIV);
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

  createQuestionMarkItem(parent: HTMLElement): QuestionMarkItem {
    return new QuestionMarkItem(
      parent,
      () => {
        if (this.state.activeStage) {
          this.setStage(null);
        }
      }
    );
  }

  generateMarkers() {
    generateMarkers(
      this.visElement,
      this.onboardingMessages,
      (i: number) => this.setActiveStep(i)
    );
  }

  addNavigationItems(parent: HTMLElement) {
    const stages = new Set(this.onboardingMessages.map(message => message.onboardingStage));
    if (stages.has(EOnboardingStages.ANALYZING)) {
      new NavigationItem(
        parent,
        "fa-lightbulb",
        EOnboardingStages.ANALYZING,
        "Analyzing",
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
        "Using",
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
        "Reading",
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
        parent,
        i,
        m.onboardingStage,
        () => {
          this.setStage(m.onboardingStage);
          this.setActiveStep(i);
        }
      ));
    });
  }

  alignItems() {
    const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
    const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
    navItems.forEach((item, i) => (item as HTMLElement).style.bottom = `${(i + 1) * 50}px`);
    anchorItems.forEach((item, i) => (item as HTMLElement).style.bottom = `${(anchorItems.length - i) * 30 + 20}px`);
  }

  addOnboardingItems(parent: HTMLElement) {
    if (!parent || parent.childElementCount > 1) {
      return;
    }
    this.addNavigationItems(parent);
    this.addAnchorItems(parent);
    this.alignItems();
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

  deSelectAllAnchor() {
    this.anchorItems.forEach((anchor) => anchor.unsetSelected());
  }

  setSelectedAnchor() {
    this.anchorItems.forEach((anchor, i) => {
      if (anchor.getStage() === this.state.activeStage && this.anchorItems[i - 1]?.getStage() !== anchor.getStage()) {
        this.setActiveStep(anchor.getIndex());
        return;
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
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.generateMarkers()
}
