import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS, QUESTIONMARKCLASS } from "../constants";
import { EOnboardingStages } from "../interfaces";
import { getColor } from "../utils";
import { AAhoiItem } from "./AAhoiItem";

export default class QuestionMarkItem extends AAhoiItem {
    private isOpen: boolean;
    private activeStage: EOnboardingStages | null;
    
    constructor(parent: HTMLElement, onClick: () => void) {
      super(parent, QUESTIONMARKCLASS, onClick, {iconClass: "fa-question", htmlTitle: "Open Onboarding"});
      this.isOpen = false;
      this.activeStage = null;
    }
  
    protected clickHandler() {
      let delChild: Element[] = [];
      const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
      if (!this.isOpen) {
        navItems.forEach((item) => item.classList.remove("hidden"));
        this.isOpen = true;
        this.instance.setAttribute("title", "Close Onboarding")
        this.instance.childNodes.forEach((child) => {
          delChild.push(child as Element);
          if (child instanceof SVGElement) {
            this.iconClass = "fa-times";
            this.instance.appendChild(this.getIcon() as HTMLElement);
          }
        });
      } else {
        if (this.activeStage === null) {
          navItems.forEach((item) => item.classList.add("hidden"));
          this.isOpen = false;
          this.instance.setAttribute("title", "Open Onboarding");
          this.instance.childNodes.forEach((child) => {
            delChild.push(child as Element);
            if (child instanceof SVGElement) {
              this.iconClass = "fa-question";
              this.instance.appendChild(this.getIcon() as HTMLElement);
            }
          });
        } else {
          const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
          anchorItems.forEach((item) => item.classList.add("hidden"));
          navItems.forEach((item) => item.classList.remove("hidden"));
        }
      }
      delChild.forEach(child => child.remove());
      super.clickHandler();
    }
  
    setActiveStage(activeStage: EOnboardingStages | null) {
      this.activeStage = activeStage;
      this.instance.style.background = activeStage ? getColor(activeStage) : this.getColor();
      this.instance.setAttribute("title", this.activeStage ? "Close Anchors" : "Close Onboarding");
    }
  
    protected getColor() {
      return "#EF5576";
    }
  }