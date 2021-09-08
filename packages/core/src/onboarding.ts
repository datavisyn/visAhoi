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
  private readonly onboardingMessages: IOnboardingMessages[];
  private readonly visElement: Element;
  private readonly anchorItems: AnchorItem[];
  private readonly questionMark: QuestionMarkItem;
  private readonly itemAlign: "horizontal" | "vertical";
  private readonly backdrop: HTMLElement;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element, itemAlign: "horizontal" | "vertical") {
    this.state = {
      activeStep: 0,
      showAllHints: false,
      activeStage: null
    }
    this.itemAlign = itemAlign;
    this.onboardingMessages = onboardingMessages.sort((a, b) => Object.values(EOnboardingStages).indexOf(a.onboardingStage) - Object.values(EOnboardingStages).indexOf(b.onboardingStage));
    this.anchorItems = [];
    this.visElement = visElement;
    const {overlay, svg, navigationContainer} = this.createOverlay(visElement);
    
    this.questionMark = this.createQuestionMarkItem(navigationContainer);
    this.addOnboardingItems(navigationContainer);
    this.backdrop = this.createBackdrop(visElement);
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
    return {overlay, svg, navigationContainer};
  }

  private createBackdrop(visElement: Element) {
    let backdrop = document.getElementById("visahoi-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.setAttribute("id", "visahoi-backdrop");
      backdrop.classList.add("visahoi-backdrop", "hidden");
    }
    const mask = visElement.getBoundingClientRect();
    const fullAppWidth = '100vw';
    const fullAppHeight = '100vh';

    // set the new height of the backdrop
    backdrop.style.height = fullAppHeight;
    backdrop.style.width = fullAppWidth;

    // also consider the current scroll offset inside the window
    const scrollOffsetX = self.scrollX;
    const scrollOffsetY = self.scrollY;

    // @see http://bennettfeely.com/clippy/ -> select `Frame` example
    backdrop.style.clipPath = `polygon(
      0% 0%,
      0% ${fullAppHeight},
      ${mask.left + scrollOffsetX}px ${fullAppHeight},
      ${mask.left + scrollOffsetX}px ${mask.top + scrollOffsetY}px,
      ${mask.left + mask.width + scrollOffsetX}px ${mask.top + scrollOffsetY}px,
      ${mask.left + mask.width + scrollOffsetX}px ${mask.top + mask.height + scrollOffsetY + 5}px,
      ${mask.left + scrollOffsetX}px ${mask.top + mask.height + scrollOffsetY + 5}px,
      ${mask.left + scrollOffsetX}px ${fullAppHeight},
      ${fullAppWidth} ${fullAppHeight},
      ${fullAppWidth} 0%
    )`;
    document.body.appendChild(backdrop);
    return backdrop;
  }

  private createQuestionMarkItem(parent: HTMLElement): QuestionMarkItem {
    return new QuestionMarkItem(
      parent,
      () => {
        if (this.state.activeStage) {
          this.setStage(null);
          this.backdrop.classList.add("hidden");
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

  private addNavigationItems(parent: HTMLElement) {
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
          this.backdrop.classList.remove("hidden");
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
          this.backdrop.classList.remove("hidden");
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
          this.backdrop.classList.remove("hidden");
        }
      );
    }
  }

  private addAnchorItems(parent: HTMLElement) {
    new ArrowItem(
      parent,
      () => this.prevStep(),
      this.itemAlign === "vertical" ? "up" : "left"
    );
    new ArrowItem(
      parent,
      () => this.nextStep(),
      this.itemAlign === "vertical" ? "down" : "right"
    );
    this.onboardingMessages.forEach((m, i) => {
      let title = "";
      m.requires.forEach((t, i) => title += (i === 0 ? "" : " ") + t);
      this.anchorItems.push(new AnchorItem(
        parent,
        i,
        title,
        m.onboardingStage,
        this.itemAlign,
        () => {
          this.setStage(m.onboardingStage);
          this.setActiveStep(i);
        }
      ));
    });
  }

  private alignItems() {
    const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
    const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
    navItems.forEach((item, i) => {
      (item as HTMLElement).style[this.itemAlign === "vertical" ? "bottom" : "right"] = `${(i + 1) * 50 + 10}px`;
      (item as HTMLElement).style[this.itemAlign === "vertical" ? "right" : "bottom"] = "5px";
   });
    anchorItems.forEach((item, i) => {
      (item as HTMLElement).style[this.itemAlign === "vertical" ? "bottom" : "right"] = `${(anchorItems.length - i) * 30 + 30}px`;
      (item as HTMLElement).style[this.itemAlign === "vertical" ? "right" : "bottom"] = "15px";
    });
  }

  private addOnboardingItems(parent: HTMLElement) {
    if (!parent || parent.childElementCount > 1) {
      return;
    }
    this.addNavigationItems(parent);
    this.addAnchorItems(parent);
    this.alignItems();
  }

  private displayAnchors() {
    displayAnchors(this.onboardingMessages, this.state.activeStage);
  }

  private displayTooltip() {
    displayTooltip(this.onboardingMessages, this.state.activeStep, this.state.activeStage);
  }

  private setStage(stage: EOnboardingStages | null) {
    if (stage && stage === this.state.activeStage) return;
    this.state.activeStage = stage;
    this.questionMark?.setActiveStage(stage);
    this.displayAnchors();
  }

  private setActiveStep(step: number) {
    if (step < 0 || step > this.anchorItems.length - 1) return;
    const prev = this.state.activeStep;
    this.state.activeStep = step;
    this.anchorItems[prev].unsetSelected();
    this.anchorItems[step].setSelected();
    this.displayTooltip();
  }

  private deSelectAllAnchor() {
    this.anchorItems.forEach((anchor) => anchor.unsetSelected());
  }

  private setSelectedAnchor() {
    this.anchorItems.forEach((anchor, i) => {
      if (anchor.getStage() === this.state.activeStage && this.anchorItems[i - 1]?.getStage() !== anchor.getStage()) {
        this.setActiveStep(anchor.getIndex());
        return;
      }
    })
  }

  private nextStep() {
    const curr = this.state.activeStep;
    this.setStage(this.anchorItems[curr + 1].getStage());
    this.setActiveStep(curr + 1);
  }

  private prevStep() {
    const curr = this.state.activeStep;
    this.setStage(this.anchorItems[curr - 1].getStage());
    this.setActiveStep(curr - 1);
  }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element, itemAlign: "horizontal" | "vertical") => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement, itemAlign);
  onboarding.generateMarkers()
}
