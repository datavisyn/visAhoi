import { ANCHORCLASS } from "../constants";
import { EOnboardingStages } from "../interfaces";
import { AAhoiItem } from "./AAhoiItem";

export default class AnchorItem extends AAhoiItem {
    static count = 0;
    index: number;

    constructor(parent: HTMLElement, index: number, stage: EOnboardingStages, onClick: () => void) {
      super(parent, ANCHORCLASS, onClick, {stage});
      this.index = index;
      AnchorItem.count++;
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
      this.instance.style.bottom = `${(AnchorItem.count - this.index) * 30 + 17.5}px`;
    }

    unsetSelected() {
      this.instance.classList.remove("selected");
      this.instance.style.bottom = `${(AnchorItem.count - this.index) * 30 + 20}px`;
    }

    clickHandler() {
      super.clickHandler();
    }
}