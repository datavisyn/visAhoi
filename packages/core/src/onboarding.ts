import {IOnboardingMessages} from './interfaces';
import {displayGuide} from './injector';
import NavigationItem from './navigationItem';

export enum EOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart"
}

interface onboardingState {
  activeStep: number;
  showAllHints: boolean;
}

export default class OnboardingUI {
  private state: onboardingState;
  private onboardingMessages: IOnboardingMessages[];
  private visElement: Element;
  constructor(onboardingMessages: IOnboardingMessages[], visElement: Element) {
    this.state = {
      activeStep: 0,
      showAllHints: false
    }
    this.onboardingMessages = onboardingMessages;
    this.visElement = visElement;
    this.createOverlay(visElement);
    this.addNavigationItems();
  }

  displayGuide() {
    displayGuide(this.visElement, this.onboardingMessages, this.state.activeStep, this.state.showAllHints);
  }

  createOverlay(visElement) {
    const plotX = visElement.getBoundingClientRect().x;
    const plotY = visElement.getBoundingClientRect().y;
    const plotWidth = visElement.clientWidth;
    const plotHeight = visElement.clientHeight;

    let overlay = document.getElementById("ahoiOverlay") as any;
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.setAttribute("id", "ahoiOverlay");
      overlay.style.position = "absolute";
      overlay.style.pointerEvents = "none";
      document.body.appendChild(overlay);
    }
    overlay.setAttribute("height", plotHeight.toString());
    overlay.setAttribute("width", plotWidth.toString());
    overlay.style.top = plotY + "px";
    overlay.style.left = plotX + "px";
  
    let svg = document.getElementById("ahoiOverlaySVG") as any;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg?.setAttribute("id", "ahoiOverlaySVG");
      overlay?.appendChild(svg);
    }
    svg?.setAttribute(
      "viewBox",
      plotX + " " + plotY + " " + plotWidth + " " + plotHeight
    );
    svg?.setAttribute("height", plotHeight.toString());
    svg?.setAttribute("width", plotWidth.toString());
  
    let tooltipContainer = document.getElementById("tooltipContainer") as any;
    if (!tooltipContainer) {
      tooltipContainer = document.createElement("div");
      tooltipContainer?.setAttribute("id", "tooltipContainer");
      overlay?.appendChild(tooltipContainer);
    }
  }

  addNavigationItems() {
    if (document.getElementsByClassName("visahoi-navigation")[0]) return;
    
    const app = document.getElementById("ahoiOverlay");

    const analyzing = new NavigationItem(
      "#FE8029",
      "fa-lightbulb",
      "visahoi-analyzing",
      () => {}
    );
    const interacting = new NavigationItem(
      "#003D5C",
      "fa-hand-point-up",
      "visahoi-interacting",
      () => {}
    );
    const reading = new NavigationItem(
      "#7B5096",
      "fa-glasses",
      "visahoi-reading",
      () => {}
    );
    const questionMark = new NavigationItem(
      "#EF5576",
      "fa-question",
      "visahoi-blubb",
      (isOpen: boolean) => {
        analyzing.extent(isOpen);
        interacting.extent(isOpen);
        reading.extent(isOpen);
      }
    );
    
    const createNavigation = () => {
      const navigation = document.createElement("div");
      navigation.classList.add("visahoi-navigation");
      navigation.style.display = "flex";
      navigation.style.flexDirection = "column";
      navigation.style.position = "absolute";
      navigation.style.bottom = "5px";
      navigation.style.right = "5px";
      navigation.appendChild(analyzing.getInstance());
      navigation.appendChild(interacting.getInstance());
      navigation.appendChild(reading.getInstance());
      navigation.appendChild(questionMark.getInstance());

      return navigation;
    };
    
    app?.appendChild(createNavigation());
  }
}

export const injectOnboarding = (onboardingMessages: IOnboardingMessages[], visElement: Element) => {
  const onboarding = new OnboardingUI(onboardingMessages, visElement);
  onboarding.displayGuide()
}
