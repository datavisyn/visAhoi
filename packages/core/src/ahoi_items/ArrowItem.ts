import { ARROWCLASS } from "../constants";
import { AOnboardingStageNavigationItem } from "./AOnboardingStageNavigationItem";

function getArrowIconClass(direction) {
  switch(direction) {
    case "up":
      return "fa-chevron-up";
    case "down":
      return "fa-chevron-down";
    case "left":
      return "fa-chevron-left";
    case "right":
      return "fa-chevron-right";
    default:
      return "";
  }
}

type Direction = "up" | "down" | "left" | "right";
export default class ArrowItem extends AOnboardingStageNavigationItem {
    constructor(parent: HTMLElement, onClick: () => void, direction: Direction) {
      super(parent, ARROWCLASS, onClick, {iconClass: getArrowIconClass(direction), title: direction === "up" || direction === "left" ? "Previous Step" : "Next Step"});
      this.instance.classList.add("hidden");
    }

    protected getColor() {
      return "transparent";
    }
  }
