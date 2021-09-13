import { EOnboardingStages } from "../interfaces";
import { getColor } from "../utils";

export abstract class AAhoiItem {
    private readonly color: string;
    protected iconClass?: string;
    protected readonly instance: HTMLElement;
    private readonly itemClass: string;
    protected stage: EOnboardingStages | null;
    private readonly onClick: () => void;
    private readonly htmlTitle?: string;
  
    constructor(parent: HTMLElement, itemClass: string, onClick: () => void, optional?: {iconClass?: string, stage?: EOnboardingStages | null, htmlTitle?: string}) {
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
  
    protected getInstance() {
      return this.instance;
    }
  
    protected getColor(): string {
      return this.stage ? getColor(this.stage) : "white";
    }
  }