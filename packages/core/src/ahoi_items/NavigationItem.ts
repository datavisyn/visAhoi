import { IOnboardingMessage as IOnboardingMessage, IOnboardingStage } from "../interfaces";
import { displayAnchors, hideAllAnchors } from '../injector';

export default class NavigationItem {
  public id: string;
  public title: string;
  private iconClass: string;
  private color: string;
  private onClick: (title: string) => void;
  private instance: HTMLElement;
  private onboardingMessages: IOnboardingMessage[];
  private isActiveStage: (id: string) => boolean;
    constructor(onboardingStage: IOnboardingStage, onboardingMessages: IOnboardingMessage[], onClick: (id: string) => void, isActiveStage: (id: string) => boolean) {
      this.id = onboardingStage.id;
      this.color = onboardingStage.color;
      this.title = onboardingStage.title;
      this.iconClass = onboardingStage.iconClass;
      this.onboardingMessages = onboardingMessages;
      this.instance = this.create();
      this.onClick = onClick;
      this.isActiveStage = isActiveStage;

      // this.render(onboardingStage);
    }

    private createDivElement(color: string) {
      const stageElement = document.createElement("div");
      stageElement.setAttribute("role", "button");
      stageElement.classList.add("visahoi-item");
      stageElement.style.backgroundColor = color;
      return stageElement;
    }

    private createTitle(title: string) {
      const titleElement = document.createElement('span');
      titleElement.style.fontSize = '0.9em';
      titleElement.textContent = title;
      return titleElement;
    }


    private createIcon(iconClass: string) {
      const iconElement = document.createElement('i');
      iconElement.classList.add("fas", ...iconClass.split(' '));
      return iconElement;
    }

    private create () {
      const stageElement = this.createDivElement(this.color);
      const iconElement = this.createIcon(this.iconClass);
      const titleElement = this.createTitle(this.title);
      const containerElement = document.createElement("div");
      containerElement.classList.add("navigation-item");
      containerElement.addEventListener('click', () => {
        console.log("clicked navigation item");
        this.onClick(this.id);
      });
      stageElement.classList.add('visahoi-item');

      stageElement.appendChild(iconElement);
      containerElement.appendChild(stageElement);
      containerElement.appendChild(titleElement);
      return containerElement as HTMLElement;
    }

    private displayAnchors() {
      displayAnchors(this.onboardingMessages, this.id);
    }

    private hideAllAnchors() {
      hideAllAnchors(this.onboardingMessages);
    }


    render() {
      return this.instance as HTMLElement;
    }

    collapse() {
      console.log("collapsing");
      this.instance.style.display = "none";
      this.hideAllAnchors();
    }

    expand() {
      if(this.isActiveStage(this.id)) {
        this.instance.getElementsByClassName('visahoi-item')[0].classList.add('active');
        this.displayAnchors();
      }
      this.instance.style.display = "flex";
    }
  }

