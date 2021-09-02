class CircleItem {
  color: string;
  iconClass: string;
  instance: HTMLElement;

  constructor(parent: HTMLElement, color: string, iconClass: string, itemClass: string) {
    this.color = color;
    this.iconClass = iconClass;
    this.instance = this.createCircle(parent, itemClass);
  }

  private createCircle = (parent: HTMLElement, itemClass: string) => {
    const icon = this.getIcon();
    const circle = document.createElement("div");
    circle.setAttribute("role", "button");
    // TODO: add this to css file
    circle.classList.add("visahoi-circle-item", itemClass);
    circle.style.width = "40px";
    circle.style.height = "40px";
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
    circle.appendChild(icon);
    parent.append(circle);
    return circle;
  };

  protected getIcon = () => {
    const icon = document.createElement("i");
    icon.classList.add("fas", this.iconClass);
    return icon;
  };

  getInstance() {
    return this.instance;
  }
}

export class NavigationItem extends CircleItem {
    // static counter: number = 1;
    // index: number;
    onClick: () => void;
  
    constructor(parent: HTMLElement, color: string, iconClass: string, itemClass: string, onClick: () => void) {
      super(parent, color, iconClass, itemClass)
      // this.index = NavigationItem.counter;
      // NavigationItem.counter += 1;
      this.onClick = onClick;
      this.instance.addEventListener("click", () => {
        console.log("here");
        this.onClick();
      });
      this.instance.classList.add("visahoi-navigation-item");
    }
  }
  
export class QuestionMarkItem extends CircleItem {
  isOpen: boolean;
  
  constructor(parent: HTMLElement) {
    super(parent, "#EF5576", "fa-question", "visahoi-blubb");
    this.isOpen = false;
    this.instance.addEventListener("click", () => {
      this.expandItems(this.isOpen);
      this.switchSymbol(this.isOpen);
      this.isOpen = !this.isOpen;
    });
    this.instance.classList.add("visahoi-question-mark-item");
    this.instance.style.display = "flex";
    this.instance.style.flexDirection = "column";
    this.instance.style.position = "absolute";
    this.instance.style.bottom = "5px";
    this.instance.style.right = "5px";
  }

  private switchSymbol(isOpen: boolean) {
    let delChild: Element[] = [];
    this.instance.childNodes.forEach((child) => {
      delChild = [...delChild, (child as Element)];
      if (child instanceof SVGElement) {
        this.iconClass = !isOpen ? "fa-times" : "fa-question";
        this.instance.appendChild(this.getIcon());
      }
    });
    delChild.forEach(child => child.remove());
  }

  private expandItems(isOpen: boolean) {
    const navItems = document.querySelectorAll(".visahoi-navigation-item");
    navItems.forEach((item, i) => {
      (item as HTMLElement).style.bottom = !isOpen ? `${(i + 1) * 50}px` : '0px';
      (item as HTMLElement).style.display = !isOpen ? `flex` : 'none';
    });
  }
}