import {isOnboardingElementAnchor} from './interfaces';
import { OVERLAYSVG, OVERLAYTOOLTIPS } from './constants';
import { getColor, createPopperTooltip } from './utils';

// Reused constants that should be change here to make it uniform
const r = 10;
const w = 30;
const h = 30;
const textOffset = 5;

export function createMarkers(anchors, visAhoiSVGElement: Element) {
  let anchorText = 1;
  anchors.forEach((anchor, anchorIndex) => {
    if (!anchor.anchor) { // Return if the anchor is empty
      return;
    }
    const a = anchor.anchor;
    const i = anchor.index;
    const tooltipMessage = anchor.message;
    const stage = anchor.stage;
    const clickEvent = anchor.clickEvent;
    let settings = Object.assign({}, a.offset || {});
    let tooltipTitle = "";
    anchor.title.forEach((t, i) => tooltipTitle += (i === 0 ? "" : " ") + t);

    // If we have coords we can use them
    if (a.coords) {
      if (a.coords.hasOwnProperty('bounds')) { // This means we use th coords of a bar chart or anything with x1 and x2
        Object.assign(settings, {
          cx: (a.coords.bounds.x1 + a.coords.bounds.x2) / 2,
          cy: (a.coords.bounds.y1 + a.coords.bounds.y2) / 2,
          r,
          x: (a.coords.bounds.x1 + a.coords.bounds.x2) / 2,
          y: (a.coords.bounds.y1 + a.coords.bounds.y2) / 2 + textOffset
        });
      } else  { // Otherwise we need to use the passed coords if there are some which require x and y
        Object.assign(settings, {
          cx: a.coords.x,
          cy: a.coords.y,
          r,
          x: a.coords.x,
          y: a.coords.y + textOffset
        });
      }
    } else { // Find the positioning only if we provided no coords
      const svgPosition = visAhoiSVGElement.getBoundingClientRect();

      let node;
      if(isOnboardingElementAnchor(a)) {
        node = a.element;
      } else {
        const elToAppendTo = document.querySelector(a.sel);
        if(!elToAppendTo) {
          console.error('No element found for selector', a.sel);
          return;
        }
        node = elToAppendTo;
      }
      const elRect = node.getBoundingClientRect();
      const elBox = node.getBBox();
      Object.assign(settings, {
        cx: elRect.x,
        cy: elRect.y,
        r,
        x: elRect.x,
        y: (elRect.y) + textOffset,
      });
    }
    Object.assign(settings, {
      color: getColor(stage),
      clickEvent: clickEvent
    })
    // Create the respective anchor
    createHint({settings, anchorIndex, anchorText, tooltipTitle, tooltipMessage});
    anchorText++;
    if (stage !== anchors[anchorIndex + 1]?.stage){
      anchorText = 1;
    }
  });
}

interface ICreateHint {
  settings: any;
  anchorIndex: number;
  anchorText: number;
  tooltipTitle: string;
  tooltipMessage: string;
}

/**
 * Somewhat generic function to create the hints based on some properties that can vary.
 * @param {*} settings where all the positions, colors and clickevents for the anchor are passed
 * @param {*} anchorText of the anchor to show
 * @param {*} tooltipMessage tooltip message for anchor
 * @param {*} tooltipTitle title of tooltip
 * @param {*} anchorIndex index of anchor
 */
function createHint({settings, anchorIndex, anchorText, tooltipTitle, tooltipMessage}: ICreateHint) {
  let { cx, cy, r, x, y, left, right, top, bottom, color, clickEvent} = settings;

  const overlay = document.getElementById(OVERLAYSVG);

  if(left) { cx += left; x += left; }
  if(right) { cx -= right; x -= right; }
  if(top) { cy += top; y += top; }
  if(bottom) { cy -= bottom; y -= bottom; }

  // let g = document.getElementById(`anchor-${anchorIndex}`) as any;
  // if (!g) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    console.log("g: ", g);
    // if (g) { //because ts won't let me recompile
      g.setAttribute("id", `anchor-${anchorIndex}`);
      g.classList.add("visahoi-anchor", "hidden");
      g.addEventListener("click", () => {console.log("clicked g"); clickEvent()});
      g.setAttribute("aria-describedby", "tooltip");
      overlay?.appendChild(g);
    // }
  // }
  g?.setAttribute("x", x);
  g?.setAttribute("y", y);
  g?.setAttribute("height", h.toString());
  g?.setAttribute("width", w.toString());

  let circle = document.getElementById(`circle-anchor-${anchorIndex}`) as any;
  if (!circle) {
    circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle?.setAttribute("id", `circle-anchor-${anchorIndex}`);
    circle?.setAttribute("fill", color);
    g?.appendChild(circle);
  }
  circle?.setAttribute("cx", cx);
  circle?.setAttribute("cy", cy);
  circle?.setAttribute("r", r);

  let txt = document.getElementById(`text-anchor-${anchorIndex}`) as any;
  if (!txt) {
    txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt?.setAttribute("id", `text-anchor-${anchorIndex}`)
    g?.appendChild(txt);
    txt.innerHTML = anchorText;
  }
  txt?.setAttribute("x", (x - textOffset).toString());
  txt?.setAttribute("y", (y).toString());
  txt?.setAttribute("fill", "white");

  createTooltip({anchorIndex, tooltipMessage, tooltipTitle, g, color});
}

interface ICreateTooltip {
  anchorIndex: number;
  tooltipMessage: string;
  tooltipTitle: string;
  g: SVGGElement;
  color: string;
}

/**
 * Somewhat generic function to create tooltips based on some properties that can vary.
 * @param {*} index index of tooltips/anchor
 * @param {*} message text shown on tooltip
 * @param {*} title title of tooltip
 * @param {*} g SVG-G-element to which the tooltip belongs
 * @param {*} color color of the tooltip
 */
function createTooltip({anchorIndex, tooltipMessage, tooltipTitle, g, color}: ICreateTooltip) {
  const tooltipContainer = document.getElementById(OVERLAYTOOLTIPS);
  if (!tooltipContainer) {
    return;
  }
  let tooltip = document.getElementById(`tooltip-anchor-${anchorIndex}`);
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip?.setAttribute("id", `tooltip-anchor-${anchorIndex}`);
    tooltip?.setAttribute("role", "tooltip");
    tooltip.classList.add("tooltip", "hidden");
    tooltip.innerHTML = tooltipTitle;
    tooltip.style.background = color;
    tooltipContainer?.appendChild(tooltip);
    const tooltipText = document.createElement("div");
    tooltipText.classList.add("tooltip-text");
    tooltipText.innerHTML = tooltipMessage;
    tooltip.appendChild(tooltipText);
  }
  let arrow = document.getElementById(`arrow-anchor-${anchorIndex}`);
  if (!arrow) {
    arrow = document.createElement("div");
    arrow?.setAttribute("id", `arrow-anchor-${anchorIndex}`);
    arrow?.setAttribute("data-popper-arrow", "true");
    arrow?.setAttribute("class", "arrow");
    arrow.style.background = color;
    tooltip?.appendChild(arrow);
  }
  console.log("creating tooltip");
  createPopperTooltip(g, tooltip);
}
