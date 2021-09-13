import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS } from "../constants";
import { EOnboardingStages } from "../interfaces";
import { AAhoiItem } from "./AAhoiItem";

export default class NavigationItem extends AAhoiItem {
    constructor(parent: HTMLElement, iconClass: string, stage: EOnboardingStages, htmlTitle: string, onClick: () => void) {
      super(parent, NAVIGATIONCLASS, onClick, {iconClass, stage, htmlTitle})
      this.instance.classList.add(this.getItemClass(), "hidden");
    }

    protected clickHandler() {
      super.clickHandler();
      document.querySelectorAll(`.${NAVIGATIONCLASS}`).forEach((item) => item.classList.add("hidden"));
      document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`).forEach((item) => item.classList.remove("hidden"));
    }

    private getItemClass(): string {
      switch(this.stage) {
        case EOnboardingStages.ANALYZING: 
          return "visahoi-analyzing";
        case EOnboardingStages.READING:
          return "visahoi-reading";
        case EOnboardingStages.USING:
          return "visahoi-interacting";
        default:
          return "";
      }
    }
  }
  
