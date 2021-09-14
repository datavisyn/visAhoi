export interface IBackdrop {
  visElement: Element;
  color?: string;
}

export default class Backdrop {
  private backdrop: null | HTMLElement = null;

  constructor({visElement, color = 'rgba(0, 0, 0, 0.2)'}: IBackdrop) {
    this.render(visElement, color);
  }

  private render(visElement: Element, color: string) {
    if (!this.backdrop) {
      this.backdrop = document.createElement("div");
      this.backdrop.classList.add("visahoi-backdrop", "hidden");
    }
    const mask = visElement.getBoundingClientRect();
    const fullAppWidth = '100vw';
    const fullAppHeight = '100vh';

    // set the new height of the backdrop
    this.backdrop.style.height = fullAppHeight;
    this.backdrop.style.width = fullAppWidth;
    this.backdrop.style.backgroundColor = color;

    // also consider the current scroll offset inside the window
    const scrollOffsetX = self.scrollX;
    const scrollOffsetY = self.scrollY;

    // @see http://bennettfeely.com/clippy/ -> select `Frame` example
    this.backdrop.style.clipPath = `polygon(
      0% 0%,
      0% ${fullAppHeight},
      ${mask.left + scrollOffsetX}px ${fullAppHeight},
      ${mask.left + scrollOffsetX}px ${mask.top + scrollOffsetY}px,
      ${mask.left + mask.width + scrollOffsetX}px ${mask.top + scrollOffsetY}px,
      ${mask.left + mask.width + scrollOffsetX}px ${mask.top + mask.height + scrollOffsetY + 5}px,
      ${mask.left + scrollOffsetX}px ${mask.top + mask.height + scrollOffsetY + 5}px,
      ${mask.left + scrollOffsetX}px ${fullAppHeight},
      ${fullAppWidth} ${fullAppHeight},
      ${fullAppWidth} 0%
    )`;
    document.body.appendChild(this.backdrop);
    return this.backdrop;
  }

  public hide() {
    if(this.backdrop) {
      this.backdrop.style.display = 'none';
    }
  }

  public show() {
    if(this.backdrop) {
      this.backdrop.style.display = 'block';
    }
  }
}
