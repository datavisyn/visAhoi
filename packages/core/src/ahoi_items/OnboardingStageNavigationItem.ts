import { ANCHORCLASS } from "../constants";
import { IOnboardingStage } from "../interfaces";
import { AOnboardingStageNavigationItem } from "./AOnboardingStageNavigationItem";
import { NavigationAlignment } from './OnboardingNavigation';

export default class OnboardingStageNavigationItem extends AOnboardingStageNavigationItem {
    static count = 0;
    private readonly index: number;
    private readonly navigationAlignment: NavigationAlignment;

    constructor(parent: HTMLElement, index: number, htmlTitle: string, stage: IOnboardingStage, navigationAlignment: NavigationAlignment, onClick: () => void) {
      super(parent, ANCHORCLASS, onClick, {stage, title: htmlTitle});
      this.index = index;
      OnboardingStageNavigationItem.count++;
      this.navigationAlignment = navigationAlignment;
      this.instance.classList.add("hidden");
    }

    getIndex() {
      return this.index;
    }

    getStage() {
      return this.stage;
    }

    setSelected() {
      this.instance.classList.add("selected");
      this.instance.style[this.navigationAlignment === "row" ? "bottom" : "right"] = `${(OnboardingStageNavigationItem.count - this.index) * 30 + 27.5}px`;
      this.instance.style[this.navigationAlignment === "row" ? "right" : "bottom"] = "12.5px";
    }

    unsetSelected() {
      this.instance.classList.remove("selected");
      this.instance.style[this.navigationAlignment === "row" ? "bottom" : "right"] = `${(OnboardingStageNavigationItem.count - this.index) * 30 + 30}px`;
      this.instance.style[this.navigationAlignment === "row" ? "right" : "bottom"] = "15px";
    }
}
