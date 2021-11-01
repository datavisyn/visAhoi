import { IOnboardingStage } from "../interfaces";
import { getColor } from "../utils";

interface IAOnboardingStage {
  iconClass?: string;
  stage?: IOnboardingStage | null;
  title?: string;
}

export abstract class AOnboardingStageNavigationItem {
    private readonly color: string;
    private readonly itemClass: string;
    private readonly onClick: () => void;
    private readonly title?: string;

    protected iconClass?: string;
    protected readonly instance: HTMLElement;
    protected stage: IOnboardingStage | null;

    constructor(parent: HTMLElement, itemClass: string, onClick: () => void, options?: IAOnboardingStage) {
      this.stage = options?.stage ? options.stage : null;
      this.title = options?.title;
      this.iconClass = options?.iconClass;
      this.itemClass = itemClass;
      this.onClick = onClick;
      this.color = this.getColor();

      this.instance = this.createItem(parent);
      this.instance.addEventListener("click", () => this.clickHandler())
    }

    private createItem(parent: HTMLElement) {
      const item = document.createElement("div");
      item.setAttribute("role", "button");
      item.classList.add("visahoi-item", this.itemClass);
      item.style.backgroundColor = this.color;
      if (this.title) {
        item.setAttribute("title", this.title);
      }
      parent.append(item);
      if (this.iconClass) {
        const icon = this.getIconElement();
        if (icon) {
          item.appendChild(icon);
        }
      }
      return item;
    };

    protected clickHandler() {
      this.onClick();
    }

    protected getIconElement() {
      if (!this.iconClass) { return; }
      const icon = document.createElement("i");
      icon.classList.add("fas", this.iconClass);
      return icon;
    };

    protected getInstance() {
      return this.instance;
    };

    protected getColor(): string {
      return this.stage?.color || "white";
    };
  }
