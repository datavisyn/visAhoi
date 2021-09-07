import { ARROWCLASS } from "../constants";
import { AAhoiItem } from "./AAhoiItem";

export default class ArrowItem extends AAhoiItem {
    constructor(parent: HTMLElement, onClick: () => void, direction: "up" | "down") {
      super(parent, ARROWCLASS, onClick, {iconClass: direction === "up" ? "fa-chevron-up" : "fa-chevron-down", htmlTitle: direction === "up" ? "Previous Step" : "Next Step"});
      this.instance.classList.add("hidden");
    }
  
    protected getColor() {
      return "transparent";
    }
  }