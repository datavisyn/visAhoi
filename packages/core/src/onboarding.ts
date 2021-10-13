import {OnboardingStage, IAhoiConfig, IOnboardingMessage} from './interfaces';
import {displayAnchors, displayTooltip, generateMarkers} from './injector';
import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS, OVERLAYDIV, OVERLAYNAVIGATION, OVERLAYSVG, OVERLAYTOOLTIPS } from './constants';
// import QuestionMarkItem from './ahoi_items/QuestionMarkItem';
import NavigationItem from './ahoi_items/NavigationItem';
// import ArrowItem from './ahoi_items/ArrowItem';
import { NavigationAlignment } from './ahoi_items/OnboardingNavigation';
import OnboardingNavigation from './ahoi_items/OnboardingNavigation';
import Backdrop from './ahoi_items/Backdrop';

interface onboardingState {
  activeStep: number;
  activeStage: null | OnboardingStage;
}

export default class OnboardingUI {
  private state: onboardingState;
  private readonly onboardingMessages: IOnboardingMessage[];
  private readonly visElement: Element;
  private readonly navigationAlignment: NavigationAlignment;

  private readonly backdrop: Backdrop;
  private readonly navigation: OnboardingNavigation;
  private readonly overlay: HTMLElement;
  constructor(onboardingMessages: IOnboardingMessage[], visElement: Element, navigationAlignment: NavigationAlignment, config: IAhoiConfig) {
    this.state = {
      activeStep: 0,
      activeStage: null
    }
    this.navigationAlignment = navigationAlignment;
    // this.onboardingMessages = onboardingMessages.sort((a, b) => Object.values(EOnboardingStages).indexOf(a.onboardingStage) - Object.values(EOnboardingStages).indexOf(b.onboardingStage));
    this.onboardingMessages = onboardingMessages;
    this.visElement = visElement;
    // const {overlay, svg, navigationContainer} = this.createOverlay(visElement);

    // this.questionMark = this.createQuestionMarkItem(navigationContainer);
    // this.addOnboardingItems(navigationContainer);
    this.backdrop = new Backdrop({visElement});
    this.overlay = this.createOverlayWithSvg(visElement);
    this.navigation = new OnboardingNavigation(onboardingMessages, navigationAlignment, config.onboardingStages);
    this.overlay.appendChild(this.navigation.render());
    this.overlay.classList.add('overlay');
    document.body.appendChild(this.overlay);
  }

  private createOverlayWithSvg(visElement: Element) {
    const plotX = visElement.getBoundingClientRect().x;
    const plotY = visElement.getBoundingClientRect().y;
    const plotWidth = visElement.clientWidth;
    const plotHeight = visElement.clientHeight;

    const overlay = document.createElement("div");
    overlay.setAttribute("id", OVERLAYDIV);
    overlay.classList.add(OVERLAYDIV);
    document.body.appendChild(overlay);
    overlay.setAttribute("height", plotHeight.toString());
    overlay.setAttribute("width", plotWidth.toString());
    overlay.style.top = plotY + "px";
    overlay.style.left = plotX + "px";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg?.setAttribute("id", OVERLAYSVG);
    overlay?.appendChild(svg);
    svg?.setAttribute(
      "viewBox",
      plotX + " " + plotY + " " + plotWidth + " " + plotHeight
    );
    svg?.setAttribute("height", plotHeight.toString());
    svg?.setAttribute("width", plotWidth.toString());

    const tooltipContainer = document.createElement("div");
    tooltipContainer.setAttribute("id", OVERLAYTOOLTIPS);

    overlay.appendChild(tooltipContainer);
    overlay.appendChild(svg);
    return overlay;

  }

  // createOverlay(visElement) {

  //   let tooltipContainer = document.getElementById(OVERLAYTOOLTIPS) as any;
  //   if (!tooltipContainer) {
  //     tooltipContainer = document.createElement("div");
  //     tooltipContainer?.setAttribute("id", OVERLAYTOOLTIPS);
  //     overlay?.appendChild(tooltipContainer);
  //   }

  //   let navigationContainer = document.getElementById(OVERLAYNAVIGATION);
  //   if (!navigationContainer) {
  //     navigationContainer = document.createElement("div");
  //     navigationContainer?.setAttribute("id", OVERLAYNAVIGATION);
  //     navigationContainer?.setAttribute("class", OVERLAYNAVIGATION);
  //     overlay?.appendChild(navigationContainer);
  //   }
  //   return {overlay, svg, navigationContainer};
  // }

  // private createQuestionMarkItem(parent: HTMLElement): QuestionMarkItem {
  //   return new QuestionMarkItem(
  //     parent,
  //     () => {
  //       if (this.state.activeStage) {
  //         this.setStage(null);
  //         this.backdrop.hide();
  //       }
  //     }
  //   );
  // }

  generateMarkers() {
    generateMarkers(
      this.visElement,
      this.onboardingMessages,
      // (i: number) => this.setActiveStep(i)
      (i: number) => {}
    );
  }

  // private addNavigationItems(parent: HTMLElement) {
  // }

  // private addAnchorItems(parent: HTMLElement) {
  //   // new ArrowItem(
  //   //   parent,
  //   //   () => this.prevStep(),
  //   //   this.navigationAlignment === "vertical" ? "up" : "left"
  //   // );
  //   // new ArrowItem(
  //   //   parent,
  //   //   () => this.nextStep(),
  //   //   this.navigationAlignment === "vertical" ? "down" : "right"
  //   // );
  //   // this.onboardingMessages.forEach((m, i) => {
  //   //   let title = "";
  //   //   m.requires.forEach((t, i) => title += (i === 0 ? "" : " ") + t);
  //   //   this.onboardingStageNavigationItems.push(new OnboardingStageNavigationItem(
  //   //     parent,
  //   //     i,
  //   //     title,
  //   //     m.onboardingStage,
  //   //     this.navigationAlignment,
  //   //     () => {
  //   //       this.setStage(m.onboardingStage);
  //   //       this.setActiveStep(i);
  //   //     }
  //   //   ));
  //   // });
  // }

  // private alignItems() {
  //   const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
  //   const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
  //   navItems.forEach((item, i) => {
  //     (item as HTMLElement).style[this.navigationAlignment === "vertical" ? "bottom" : "right"] = `${(i + 1) * 50 + 10}px`;
  //     (item as HTMLElement).style[this.navigationAlignment === "vertical" ? "right" : "bottom"] = "5px";
  //  });
  //   anchorItems.forEach((item, i) => {
  //     (item as HTMLElement).style[this.navigationAlignment === "vertical" ? "bottom" : "right"] = `${(anchorItems.length - i) * 30 + 30}px`;
  //     (item as HTMLElement).style[this.navigationAlignment === "vertical" ? "right" : "bottom"] = "15px";
  //   });
  // }

  // private addOnboardingItems(parent: HTMLElement) {
  //   if (!parent || parent.childElementCount > 1) {
  //     return;
  //   }
  //   this.addNavigationItems(parent);
  //   this.addAnchorItems(parent);
  //   this.alignItems();
  // }

  // private displayAnchors() {
  //   displayAnchors(this.onboardingMessages, this.state.activeStage);
  // }

  // private displayTooltip() {
  //   displayTooltip(this.onboardingMessages, this.state.activeStep, this.state.activeStage);
  // }

  // private setStage(stage: EOnboardingStages | null) {
  //   if (stage && stage === this.state.activeStage) return;
  //   this.state.activeStage = stage;
  //   this.questionMark?.setActiveStage(stage);
  //   this.displayAnchors();
  // }

  // private setActiveStep(step: number) {
  //   if (step < 0 || step > this.onboardingStageNavigationItems.length - 1) return;
  //   const prev = this.state.activeStep;
  //   this.state.activeStep = step;
  //   this.onboardingStageNavigationItems[prev].unsetSelected();
  //   this.onboardingStageNavigationItems[step].setSelected();
  //   this.displayTooltip();
  // }

  // private setSelectedAnchor() {
  //   this.onboardingStageNavigationItems.forEach((anchor, i) => {
  //     if (anchor.getStage() === this.state.activeStage && this.onboardingStageNavigationItems[i - 1]?.getStage() !== anchor.getStage()) {
  //       this.setActiveStep(anchor.getIndex());
  //       return;
  //     }
  //   })
  // }

  // private nextStep() {
  //   const curr = this.state.activeStep;
  //   this.setStage(this.onboardingStageNavigationItems[curr + 1].getStage());
  //   this.setActiveStep(curr + 1);
  // }

  // private prevStep() {
  //   const curr = this.state.activeStep;
  //   this.setStage(this.onboardingStageNavigationItems[curr - 1].getStage());
  //   this.setActiveStep(curr - 1);
  // }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessage[], visElement: Element, navigationAlignment: NavigationAlignment, config: IAhoiConfig) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement, navigationAlignment, config);
  onboarding.generateMarkers();
}
