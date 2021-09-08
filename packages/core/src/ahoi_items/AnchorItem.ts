import { ANCHORCLASS } from "../constants";
import { EOnboardingStages } from "../interfaces";
import { AAhoiItem } from "./AAhoiItem";

export default class AnchorItem extends AAhoiItem {
    static count = 0;
    private readonly index: number;
    private readonly itemAlign: "horizontal" | "vertical";

    constructor(parent: HTMLElement, index: number, htmlTitle: string, stage: EOnboardingStages, itemAlign: "horizontal" | "vertical", onClick: () => void) {
      super(parent, ANCHORCLASS, onClick, {stage, htmlTitle});
      this.index = index;
      AnchorItem.count++;
      this.itemAlign = itemAlign;
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
      this.instance.style[this.itemAlign === "vertical" ? "bottom" : "right"] = `${(AnchorItem.count - this.index) * 30 + 27.5}px`;
      this.instance.style[this.itemAlign === "vertical" ? "right" : "bottom"] = "12.5px";
    }

    unsetSelected() {
      this.instance.classList.remove("selected");
      this.instance.style[this.itemAlign === "vertical" ? "bottom" : "right"] = `${(AnchorItem.count - this.index) * 30 + 30}px`;
      this.instance.style[this.itemAlign === "vertical" ? "right" : "bottom"] = "15px";
    }

    protected clickHandler() {
      super.clickHandler();
    }
}