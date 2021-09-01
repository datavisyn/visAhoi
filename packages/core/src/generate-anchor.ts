import { createPopper } from '@popperjs/core';
import {isOnboardingElementAnchor} from './interfaces';

// Reused constants that should be change here to make it uniform
const r = 10;
const w = 30;
const h = 30;
const textOffset = 5;

export function displayMarkers(anchors, activeStep: number, showAllHints: boolean, visElement: Element) {
  
  // console.log(`%c Anchors we want to create`, `background-color: lemonchiffon; color: #003366;`, anchors);

  // We use for each as we want to control each element individually
  anchors.forEach(el => {
    // Return if the el is empty
    if (!el.anchor) {
      return;
    }

    const a = el.anchor;
    const i = el.index;
    const message = el.message;
    let settings = Object.assign({}, a.offset || {});

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

    // Find the positioning only if we provided no coords
    } else {
      const svgPosition = visElement.getBoundingClientRect();

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
      // console.log('FOR ', a.sel || a.element ,' the DOMRect = ', elRect, ' and the SVGrect = ', elBox);
      Object.assign(settings, {
        cx: elRect.x,
        cy: elRect.y,
        r,
        x: elRect.x,
        y: (elRect.y) + textOffset,
      });
    }
    // Create the respective anchor
    createHint(settings, i, message);
  });
  
}

/**
 * Somewhat generic function to create an annotation based on some properties that can vary.
 * @param {*} settings where all the positions for the annotation are passed
 * @param {*} text of the annotation to show
 * @param {*} message tooltip message for anchor
 */
function createHint(settings, text, message) { //unused params: activeStep: number, showAllHints: boolean
  let { cx, cy, r, x, y, left, right, top, bottom } = settings;

  const overlay = document.getElementById("ahoiOverlaySVG");

  if(left) { cx += left; x += left; }
  if(right) { cx -= right; x -= right; }
  if(top) { cy += top; y += top; }
  if(bottom) { cy -= bottom; y -= bottom; }

  let g = document.getElementById(`anchor-${text}`) as any;
  if (!g) { 
    g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (g) { //because ts won't let me recompile
      g.setAttribute("id", `anchor-${text}`)
      g.style.cursor = "pointer";
      g.style.pointerEvents = "all";
      g.addEventListener("click", () => toggleTooltip(`tooltip-anchor-${text}`));
      g.setAttribute("aria-describedby", "tooltip");
      overlay?.appendChild(g);
    }
  }
  g?.setAttribute("x", x);
  g?.setAttribute("y", y);
  g?.setAttribute("height", h.toString());
  g?.setAttribute("width", w.toString());

  let circle = document.getElementById(`circle-anchor-${text}`) as any;
  if (!circle) {
    circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle?.setAttribute("id", `circle-anchor-${text}`);
    circle?.setAttribute("fill", '#C51B7D');
    g?.appendChild(circle);
  }

  circle?.setAttribute("cx", cx);
  circle?.setAttribute("cy", cy);
  circle?.setAttribute("r", r);

  let txt = document.getElementById(`text-anchor-${text}`) as any;
  if (!txt) {
    txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt?.setAttribute("id", `text-anchor-${text}`)
    g?.appendChild(txt);
    txt.innerHTML = text;
  }
  txt?.setAttribute("x", (x - textOffset).toString());
  txt?.setAttribute("y", (y).toString());
  txt?.setAttribute("fill", "white");

  createTooltip(text, message, g);
}

function createTooltip(text: string, toolText: string, g: SVGGElement) {
  const tooltipContainer = document.getElementById("tooltipContainer");
  if (!tooltipContainer) {
    return;
  }

  let tooltip = document.getElementById(`tooltip-anchor-${text}`);
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip?.setAttribute("id", `tooltip-anchor-${text}`);
    tooltip?.setAttribute("role", "tooltip");
    tooltip?.setAttribute("class", "tooltip");
    tooltip.style.pointerEvents = "all";
    tooltip.innerText = toolText;
    tooltipContainer?.appendChild(tooltip);
  }

  let arrow = document.getElementById(`arrow-anchor-${text}`);
  if (!arrow) {
    arrow = document.createElement("div");
    arrow?.setAttribute("id", `arrow-anchor-${text}`);
    arrow?.setAttribute("data-popper-arrow", "");
    arrow?.setAttribute("class", "arrow");
    tooltip?.appendChild(arrow);
  }

  createPopper(g, tooltip, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ]
  });
}

const toggleTooltip = (id: string) => {
  const tooltip = document.getElementById(id);
  if (!tooltip) {
    return;
  }
  if (tooltip.style.display !== "none") {
    tooltip.style.display = "none";
  } else {
    tooltip.style.display = "inline-block";
  }
};
