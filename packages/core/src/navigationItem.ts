export default class NavigationItem {
    static counter: number = 1;
    color: string;
    iconClass: string;
    instance: HTMLElement;
    onClick: (isOpen: boolean) => void;
    isOpen: boolean = false;
    index: number;
  
    constructor(
      color: string,
      iconClass: string,
      itemClass: string,
      onClick: (isOpen: boolean) => void
    ) {
      this.index = NavigationItem.counter;
      NavigationItem.counter += 1;
      this.color = color;
      this.iconClass = iconClass;
      this.onClick = onClick;
      this.instance = this.createCircle(itemClass);
      this.instance.addEventListener("click", () => {
        this.isOpen = !this.isOpen;
        this.onClick(this.isOpen);
      });
    }
  
    private createCircle = (itemClass: string) => {
      const icon = this.getIcon();
      const circle = document.createElement("div");
      circle.setAttribute("role", "button");
      // TODO: add this to css file
      circle.classList.add("visahoi-navigation-item", itemClass);
      circle.style.width = "40px";
      circle.style.height = "40px";
      circle.style.backgroundColor = this.color;
      circle.style.borderRadius = "50%";
      circle.style.display = "flex";
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      circle.style.color = "white";
      circle.style.cursor = "pointer";
      circle.style.position = "absolute";
      circle.style.right = "0";
      circle.style.bottom = "0px";
      circle.style.pointerEvents = "all";
      circle.style.transition = "bottom 250ms ease-in";
      circle.appendChild(icon);
      return circle;
    };
  
    private getIcon = () => {
      const icon = document.createElement("i");
      icon.classList.add("fas", this.iconClass);
      return icon;
    };
  
    extent(isOpen: boolean) {
      this.instance.style.bottom = isOpen ? `${this.index * 50}px` : "0px";
    }
  
    getInstance() {
      return this.instance;
    }
  }
  