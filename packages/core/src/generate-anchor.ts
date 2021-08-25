import * as d3 from 'd3';
import {isOnboardingElementAnchor} from './interfaces';

// Reused constants that should be change here to make it uniform
const r = 10;
const w = 30;
const h = 30;
const textOffset = 5;

/**
 * This method annotates all the text elements for the onboarding. They are aligned using
 * a grid layout and the index of the step
 * @param {*} d current datum of the selection
 * @param {*} i index of the current selection
 * @param {*} nodes all nodes
 */
export function createAnchor(d, i: number, nodes, stepNumber) {
  /*
  const currentEl = nodes[i];
  const parentEl = d3.select(currentEl).node().parentNode;

  const hintGroup = d3
    .select(parentEl)
    .insert('svg', ':first-child')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .classed('textAnnotation', true);

  hintGroup
    .append('circle')
    .attr('r', r)
    .attr('cx', w / 2)
    .attr('cy', h / 2)
    .style('stroke', '#C51B7D')
    .style('fill', '#C51B7D');
  hintGroup
    .append('text')
    .attr('x', w / 2)
    .attr('y', h / 2 + textOffset)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .text(`${stepNumber + 1}`);
    */
};

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
        const elToAppendTo = d3.select(a.sel);
        if(!elToAppendTo.node()) {
          console.error('No element found for selector', a.sel);
          return;
        }
        node = elToAppendTo.node()
      }
      const elRect = node.getBoundingClientRect();
      const elBox = node.getBBox();
      // console.log('FOR ', a.sel || a.element ,' the DOMRect = ', elRect, ' and the SVGrect = ', elBox);
      Object.assign(settings, {
        cx: elRect.x - svgPosition.left,
        cy: elRect.y - svgPosition.top,
        r,
        x: elRect.x - svgPosition.left,
        y: (elRect.y - svgPosition.top) + textOffset,
      });
    }
    // Create the respective anchor
    createHint(settings, i, activeStep, showAllHints);
  });
  
}

/**
 * Somewhat generic function to create an annotation based on some properties that can vary.
 * @param {*} settings where all the positions for the annotation are passed
 * @param {*} text of the annotation to show
 */
function createHint(settings, text, activeStep: number, showAllHints: boolean) {
  let { cx, cy, r, x, y, left, right, top, bottom } = settings;

  console.log(text)
  console.log(settings);

  const overlay = document.getElementById("ahoiOverlaySVG");

  const test = overlay?.getBoundingClientRect();

  if(left) { cx += left; x += left; }
  if(right) { cx -= right; x -= right; }
  if(top) { cy += top; y += top; }
  if(bottom) { cy -= bottom; y -= bottom; }

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("x", x + test?.x);
  g.setAttribute("y", y + test?.y);
  g.setAttribute("height", h.toString());
  g.setAttribute("width", w.toString());
  //g.setAttribute("aria-describedby", "tooltip");
  g.setAttribute("id", `anchor-${text}`)
  g.style.cursor = "pointer";
  g.style.pointerEvents = "all";
  g.addEventListener("click", () => alert("Hi"));
  overlay?.appendChild(g);

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", cx + test?.x);
  circle.setAttribute("cy", cy + test?.y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", '#C51B7D');
  g.appendChild(circle);

  const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
  txt.setAttribute("x", (x - textOffset + test.x).toString());
  txt.setAttribute("y", (y + textOffset + test?.y).toString());
  txt.style.color = "white";
  txt.innerHTML = text;
  g.appendChild(txt);
}

export function createOverlay(plotX: number, plotY: number, plotWidth: number, plotHeight: number) {
  let overlay = document.getElementById("ahoiOverlay");
  if (!overlay) { overlay = document.createElement("div"); }
  overlay.setAttribute("height", plotHeight.toString());
  overlay.setAttribute("width", plotWidth.toString());
  overlay.setAttribute("id", "ahoiOverlay");
  overlay.style.position = "absolute";
  overlay.style.top = plotY + "px";
  overlay.style.left = plotX + "px";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute(
    "viewBox",
    plotX + " " + plotY + " " + plotWidth + " " + plotHeight
  );
  svg.setAttribute("height", plotHeight.toString());
  svg.setAttribute("width", plotWidth.toString());
  svg.setAttribute("id", "ahoiOverlaySVG");
  overlay.appendChild(svg);
  
  return overlay;
}
