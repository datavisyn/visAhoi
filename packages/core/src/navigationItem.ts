import { ANCHORCLASS, ARROWCLASS, NAVIGATIONCLASS, QUESTIONMARKCLASS } from "./constants";
import { EOnboardingStages } from "./interfaces";
import { getColor } from "./utils";

abstract class AAhoiItem {
  private color: string;
  protected iconClass?: string;
  protected instance: HTMLElement;
  private itemClass: string;
  protected stage: EOnboardingStages | null;
  private onClick: () => void;
  private htmlTitle?: string;

  constructor(parent: HTMLElement, itemClass: string, onClick: () => void, optional?: {iconClass?: string, stage?: EOnboardingStages, htmlTitle?: string}) {
    this.stage = optional?.stage ? optional.stage : null;
    this.htmlTitle = optional?.htmlTitle;
    this.iconClass = optional?.iconClass;
    this.itemClass = itemClass;
    this.onClick = onClick;
    this.color = this.getColor();

    this.instance = this.createItem(parent);
    this.instance.addEventListener("click", () => this.clickHandler())
  }

  private createItem = (parent: HTMLElement) => {
    const item = document.createElement("div");
    item.setAttribute("role", "button");
    item.classList.add("visahoi-item", this.itemClass);
    item.style.backgroundColor = this.color;
    if (this.htmlTitle) item.setAttribute("title", this.htmlTitle);
    parent.append(item);
    if (this.iconClass) {
      const icon = this.getIcon();
      if (icon) item.appendChild(icon);
    }
    return item;
  };

  protected clickHandler() {
    this.onClick();
  }

  protected getIcon = () => {
    if (!this.iconClass) return;
    const icon = document.createElement("i");
    icon.classList.add("fas", this.iconClass);
    return icon;
  };

  getInstance() {
    return this.instance;
  }

  protected getColor(): string {
    return this.stage ? getColor(this.stage) : "white";
  }
}

export class ArrowItem extends AAhoiItem {
  constructor(parent: HTMLElement, onClick: () => void, direction: "up" | "down") {
    super(parent, ARROWCLASS, onClick, {iconClass: direction === "up" ? "fa-chevron-up" : "fa-chevron-down", htmlTitle: direction === "up" ? "Previous Step" : "Next Step"});
    this.instance.classList.add("hidden");
  }

  protected getColor() {
    return "transparent";
  }
}

export class AnchorItem extends AAhoiItem {
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

export class NavigationItem extends AAhoiItem {
    constructor(parent: HTMLElement, iconClass: string, stage: EOnboardingStages, htmlTitle: string, onClick: () => void) {
      super(parent, NAVIGATIONCLASS, onClick, {iconClass, stage, htmlTitle})
      this.instance.classList.add(this.getItemClass(), "hidden");
    }

    protected clickHandler() {
      super.clickHandler();
      document.querySelectorAll(`.${NAVIGATIONCLASS}`).forEach((item) => item.classList.add("hidden"));
      document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`).forEach((item) => item.classList.remove("hidden"));
    }

    protected getItemClass(): string {
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
  
export class QuestionMarkItem extends AAhoiItem {
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