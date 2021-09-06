import { EOnboardingStages } from "./onboarding";
import { getColor } from "./utils";

const NAVIGATIONCLASS = "visahoi-navigation-item";
const QUESTIONMARKCLASS = "visahoi-question-mark-item";
const ANCHORCLASS = "visahoi-anchor-item";
const ARROWCLASS = "visahoi-arrow-item";


abstract class AAhoiItem {
  private color: string;
  protected iconClass?: string;
  protected instance: HTMLElement;
  private itemClass: string;
  protected stage: EOnboardingStages | null;
  private circleClass: string;
  private onClick: () => void;

  constructor(parent: HTMLElement, circleClass: string, onClick: () => void, optional?: {iconClass?: string, stage?: EOnboardingStages}) {
    this.stage = optional?.stage ? optional.stage : null;
    this.circleClass = circleClass;
    this.itemClass = this.getItemClass();
    this.color = this.getColor();
    this.iconClass = optional?.iconClass;
    this.instance = this.createItem(parent);
    this.onClick = onClick;
    this.instance.addEventListener("click", () => this.clickHandler())
  }

  private createItem = (parent: HTMLElement) => {
    const circle = document.createElement("div");
    circle.setAttribute("role", "button");
    // TODO: add this to css file
    circle.classList.add(this.circleClass, this.itemClass);
    circle.style.backgroundColor = this.color;
    circle.style.borderRadius = "50%";
    circle.style.justifyContent = "center";
    circle.style.alignItems = "center";
    circle.style.color = "white";
    circle.style.cursor = "pointer";
    circle.style.position = "absolute";
    circle.style.right = "5px";
    circle.style.bottom = "0px";
    circle.style.pointerEvents = "all";
    circle.style.transition = "bottom 250ms ease-in";
    circle.style.display = "none";
    parent.append(circle);
    if (this.iconClass) {
      const icon = this.getIcon();
      if (icon) circle.appendChild(icon);
    }
    return circle;
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

export abstract class ACircleItem extends AAhoiItem {

}

export class ArrowItem extends AAhoiItem {
  constructor(parent: HTMLElement, onClick: () => void, direction: "up" | "down") {
    super(parent, ARROWCLASS, onClick, {iconClass: direction === "up" ? "fa-chevron-up" : "fa-chevron-down"});
    this.instance.style.width = "20px";
    this.instance.style.height = "20px";
    this.instance.style.right = "15px";
    this.instance.style.color = "black";
  }

  protected getColor() {
    return "transparent";
  }

  protected getItemClass() {
    return "visahoi-arrow";
  }
}

export class AnchorItem extends ACircleItem {
    static count = 0;
    index: number;

    constructor(index: number, parent: HTMLElement, stage: EOnboardingStages, onClick: () => void) {
      super(parent, ANCHORCLASS, onClick, {stage});
      this.index = index;
      AnchorItem.count++;
      const circle = this.instance;
      circle.style.width = "20px";
      circle.style.height = "20px";
      circle.style.right = "15px";
      circle.style.opacity = "0.4";
    }

    getIndex() {
      return this.index;
    }

    getStage() {
      return this.stage;
    }

    setSelected() {
      this.instance.style.right = "12.5px";
      this.instance.style.opacity = '1';
      this.instance.style.width = "25px";
      this.instance.style.height = "25px";
      this.instance.style.bottom = `${(AnchorItem.count - this.index) * 30 + 17.5}px`;
    }

    unsetSelected() {
      this.instance.style.width = "20px";
      this.instance.style.height = "20px";
      this.instance.style.right = "15px";
      this.instance.style.opacity = "0.4";
      this.instance.style.bottom = `${(AnchorItem.count - this.index) * 30 + 20}px`;
    }

    clickHandler() {
      super.clickHandler();
    }
}

export class NavigationItem extends ACircleItem {
    constructor(parent: HTMLElement, iconClass: string, stage: EOnboardingStages, onClick: () => void) {
      super(parent, NAVIGATIONCLASS, onClick, {iconClass, stage})
      const circle = this.instance;
      circle.style.width = "40px";
      circle.style.height = "40px";
    }

    protected clickHandler() {
      super.clickHandler();
      const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
      const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
      navItems.forEach((item) => {
        (item as HTMLElement).style.bottom = '0px';
        (item as HTMLElement).style.display = 'none';
      });
      anchorItems.forEach((item, i) => {
        (item as HTMLElement).style.bottom = `${(anchorItems.length - i) * 30 + 20}px`;
        (item as HTMLElement).style.display = 'flex';
      });
    }
  }
  
export class QuestionMarkItem extends ACircleItem {
  private isOpen: boolean;
  private activeStage: EOnboardingStages | null;
  
  constructor(parent: HTMLElement, onClick: () => void) {
    super(parent, QUESTIONMARKCLASS, onClick, {iconClass: "fa-question"});
    this.isOpen = false;
    this.activeStage = null;

    const circle = this.instance;
    circle.style.display = "flex";
    circle.style.flexDirection = "column-reverse";
    circle.style.position = "absolute";
    circle.style.bottom = "5px";
    circle.style.right = "5px";
    circle.style.width = "40px";
    circle.style.height = "40px";
  }

  protected clickHandler() {
    let delChild: Element[] = [];
    const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
    if (!this.isOpen) {
      navItems.forEach((item, i) => {
        (item as HTMLElement).style.bottom = `${(i + 1) * 50}px`;
        (item as HTMLElement).style.display = `flex`;
      });
      this.isOpen = true;
      this.instance.childNodes.forEach((child) => {
        delChild = [...delChild, (child as Element)];
        if (child instanceof SVGElement) {
          this.iconClass = "fa-times";
          this.instance.appendChild(this.getIcon() as HTMLElement);
        }
      });
    } else {
      if (this.activeStage === null) {
        navItems.forEach((item) => {
          (item as HTMLElement).style.bottom = '0px';
          (item as HTMLElement).style.display = 'none';
        });
        this.isOpen = false;
        this.instance.childNodes.forEach((child) => {
          delChild = [...delChild, (child as Element)];
          if (child instanceof SVGElement) {
            this.iconClass = "fa-question";
            this.instance.appendChild(this.getIcon() as HTMLElement);
          }
        });
      } else {
        const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}, .${ARROWCLASS}`);
        console.log(anchorItems)
        anchorItems.forEach((item) => {
          (item as HTMLElement).style.bottom = '0px';
          (item as HTMLElement).style.display = 'none';
        });
        navItems.forEach((item, i) => {
          (item as HTMLElement).style.bottom = `${(i + 1) * 50}px`;
          (item as HTMLElement).style.display = `flex`;
        });
        this.setActiveStage(null);
      }
    }
    delChild.forEach(child => child.remove());
    super.clickHandler();
  }

  setActiveStage(activeStage: EOnboardingStages | null) {
    this.activeStage = activeStage;
    this.instance.style.background = activeStage ? getColor(activeStage) : this.getColor();
  }

  protected getColor() {
    return "#EF5576";
  }

  protected getItemClass() {
    return "visahoi-blubb";
  }
}