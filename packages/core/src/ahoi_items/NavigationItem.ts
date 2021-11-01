import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS } from "../constants";
import { IOnboardingStage, EDefaultOnboardingStages } from "../interfaces";
import { AOnboardingStageNavigationItem } from "./AOnboardingStageNavigationItem";

export default class NavigationItem extends AOnboardingStageNavigationItem {
    constructor(parent: HTMLElement, iconClass: string, stage: IOnboardingStage, htmlTitle: string, onClick: () => void) {
      super(parent, NAVIGATIONCLASS, onClick, {iconClass, stage, title: htmlTitle})
      this.instance.classList.add(this.getItemClass(), "hidden");
    }

    protected clickHandler() {
      super.clickHandler();
      document.querySelectorAll(`.${NAVIGATIONCLASS}`).forEach((item) => item.classList.add("hidden"));
      document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`).forEach((item) => item.classList.remove("hidden"));
    }

    private getItemClass(): string {
      switch(this.stage?.id) {
        case EDefaultOnboardingStages.ANALYZING:
          return "visahoi-analyzing";
        case EDefaultOnboardingStages.READING:
          return "visahoi-reading";
        case EDefaultOnboardingStages.USING:
          return "visahoi-interacting";
        default:
          return "";
      }
    }
  }

