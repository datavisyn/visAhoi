import { EOnboardingStages } from "./onboarding";
import { getColor } from "./utils";

const NAVIGATIONCLASS = "visahoi-navigation-item";
const QUESTIONMARKCLASS = "visahoi-question-mark-item";
const ANCHORCLASS = "visahoi-anchor-item";


abstract class ACircleItem {
  color: string;
  iconClass?: string;
  instance: HTMLElement;
  itemClass: string;
  stage?: EOnboardingStages;
  circleClass: string;

  constructor(parent: HTMLElement, circleClass: string, optional?: {iconClass?: string, stage?: EOnboardingStages}, onClick?: () => void) {
    this.stage = optional?.stage;
    this.circleClass = circleClass;
    this.itemClass = this.getItemClass();
    this.color = this.getColor();
    this.iconClass = optional?.iconClass;
    this.instance = this.createCircle(parent, this.itemClass);
    if (onClick) {
      this.instance.addEventListener("click", () => {
         onClick();
      });
    }
  }

  private createCircle = (parent: HTMLElement, itemClass: string) => {
    const circle = document.createElement("div");
    circle.setAttribute("role", "button");
    // TODO: add this to css file
    circle.classList.add(this.circleClass, itemClass);
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
    return this.stage ? getColor(this.stage) : "whites";
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

export class AnchorItem extends ACircleItem {
    static counter: number = 1;
    index: number;

    constructor(parent: HTMLElement, stage: EOnboardingStages, onClick: () => void) {
      super(parent, ANCHORCLASS, {stage}, onClick);
      this.index = AnchorItem.counter;
      AnchorItem.counter++;
      const circle = this.instance;
      circle.style.width = "20px";
      circle.style.height = "20px";
    }
}

export class NavigationItem extends ACircleItem {
    constructor(parent: HTMLElement, iconClass: string, stage: EOnboardingStages, onClick?: () => void) {
      super(parent, NAVIGATIONCLASS, {iconClass, stage}, onClick)
      const circle = this.instance;
      circle.style.width = "40px";
      circle.style.height = "40px";
    }
  }
  
export class QuestionMarkItem extends ACircleItem {
  isOpen: boolean;
  
  constructor(parent: HTMLElement) {
    super(parent, QUESTIONMARKCLASS, {iconClass: "fa-question"});
    this.isOpen = false;

    const circle = this.instance;
    circle.addEventListener("click", () => {
      this.onClick();
    });
    circle.style.display = "flex";
    circle.style.flexDirection = "column";
    circle.style.position = "absolute";
    circle.style.bottom = "5px";
    circle.style.right = "5px";
    circle.style.width = "40px";
    circle.style.height = "40px";
  }

  private switchSymbol(isOpen: boolean) {
    let delChild: Element[] = [];
    this.instance.childNodes.forEach((child) => {
      delChild = [...delChild, (child as Element)];
      if (child instanceof SVGElement) {
        this.iconClass = !isOpen ? "fa-times" : "fa-question";
        this.instance.appendChild(this.getIcon() as HTMLElement);
      }
    });
    delChild.forEach(child => child.remove());
  }

  private expandItems(isOpen: boolean) {
    const navItems = document.querySelectorAll(`.${NAVIGATIONCLASS}`);
    let counter = 1
    //(i + 1)
    navItems.forEach((item, i) => {
      (item as HTMLElement).style.bottom = !isOpen ? `${counter * 50}px` : '0px';
      (item as HTMLElement).style.display = !isOpen ? `flex` : 'none';
      counter++;
    });
    const anchorItems = document.querySelectorAll(`.${ANCHORCLASS}`);
    anchorItems.forEach((item, i) => {
      (item as HTMLElement).style.bottom = !isOpen ? `${counter * 50}px` : '0px';
      (item as HTMLElement).style.display = !isOpen ? `flex` : 'none';
      counter++;
    })
  }

  private onClick() {
    this.expandItems(this.isOpen);
    this.switchSymbol(this.isOpen);
    this.isOpen = !this.isOpen;
  }

  protected getColor() {
    return "#EF5576";
  }

  protected getItemClass() {
    return "visahoi-blubb";
  }
}