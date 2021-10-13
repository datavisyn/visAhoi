import { IAhoiConfig, IOnboardingMessage, IOnboardingStage } from "../interfaces";
import NavigationItem from "./NavigationItem";
import { displayAnchors } from '../injector';

export type NavigationAlignment = "horizontal" | "vertical";

interface IOnboardingNavigationState {
  activeStage: string | null;
}

export default class OnboardingNavigation {
  private state: IOnboardingNavigationState;
  private navigationContainer: HTMLElement;
  private navigationItems: NavigationItem[] = [];
  private onboardingMessages: IOnboardingMessage[];
  private onboardingStages: IOnboardingStage[];
  constructor(onboardingMessages: IOnboardingMessage[], alignment: NavigationAlignment, onboardingStages: IOnboardingStage[]) {
    this.navigationContainer = document.createElement('div');
    this.onboardingMessages = onboardingMessages;
    this.onboardingStages = onboardingStages;
    this.state = {
      activeStage: null,
    }
  }

  stageClicked = (id: string) => {
    if(this.state.activeStage === id) {
      // expand all stages
      this.navigationItems.forEach((stage) => {
        stage.expand();
        // show markers of selected stage
      });
      this.state.activeStage = '';
    } else {
      // collapse all stages
      this.state.activeStage = id;
      this.navigationItems.forEach((stage) => {
        stage.collapse();
        // hide markers of all stages
      });
      // expand selected stage (and show all anchors)
      this.navigationItems.find((stage) => stage.id === id)?.expand();
    }
  }

  render(): HTMLElement {
    const containerElement = document.createElement("div");
    containerElement.classList.add('navigation-container-element');
    const stageElements = this.createStageElementsFromOnboardingStages(this.onboardingStages);
    stageElements.forEach((stageElement) => {
      containerElement.appendChild(stageElement);
    })
    return containerElement;
  }

  private isStageActive = (title: string) => {
    return this.state.activeStage === title;
  }

  private createStageElementsFromOnboardingStages(onboardingStages: IOnboardingStage[]) {
    const s: NavigationItem[] = [];
    const stageElements = onboardingStages.map((stage) => {
      const navigationItem = new NavigationItem(stage, this.onboardingMessages, this.stageClicked, this.isStageActive);
      s.push(navigationItem);
      return navigationItem.render() as HTMLElement;
    });
    this.navigationItems = s;
    return stageElements;
  }

}
