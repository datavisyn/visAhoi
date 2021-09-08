import { ARROWCLASS } from "../constants";
import { AAhoiItem } from "./AAhoiItem";

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

export default class ArrowItem extends AAhoiItem {
    constructor(parent: HTMLElement, onClick: () => void, direction: "up" | "down" | "left" | "right") {
      super(parent, ARROWCLASS, onClick, {iconClass: getArrowIconClass(direction), htmlTitle: direction === "up" || direction === "left" ? "Previous Step" : "Next Step"});
      this.instance.classList.add("hidden");
    }
  
    protected getColor() {
      return "transparent";
    }
  }