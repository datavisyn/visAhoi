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
export function createAnchor(d, i, nodes) {
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
    .text(`${i + 1}`);
};

export function generateChartAnchors(anchors) {
  console.log(`%c Anchors we want to create`, css2, anchors);

  // We use for each as we want to control each element individually
  anchors.forEach(el => {
    // Return if the el is empty
    if (el.anchor === null) return;

    let settings = {};
    const a = el.anchor;
    const i = el.index;

    // Find the positioning only if we provided no coords
    if (a.coords === null || typeof(a.coords) == 'undefined') {
      const elToAppendTo = d3.select(a.sel);
      const elRect = elToAppendTo.node().getBoundingClientRect();
      const elBox = elToAppendTo.node().getBBox();
      console.log('FOR ', a.sel ,' the DOMRect = ', elRect, ' and the SVGrect = ', elBox);

       settings = {
        cx: a.useDOMRect ? elRect.x : elBox.x,
        cy: a.useDOMRect ? elRect.y : elBox.y,
        r,
        x: a.useDOMRect ? elRect.x : elBox.x,
        y: (a.useDOMRect ? elRect.y : elBox.y) + textOffset,
      };
    } else { // If we have coords we can use them
      if (a.coords.hasOwnProperty('bounds')) { // This means we use th coords of a bar chart or anything with x1 and x2
        settings = {
          cx: (a.coords.bounds.x1 + a.coords.bounds.x2) / 2,
          cy: (a.coords.bounds.y1 + a.coords.bounds.y2) / 2,
          r,
          x: (a.coords.bounds.x1 + a.coords.bounds.x2) / 2,
          y: (a.coords.bounds.y1 + a.coords.bounds.y2) / 2 + textOffset,
        };
      } else  { // Otherwise we need to use the passed coords if there are some which require x and y
        settings = {
          cx: a.coords.x,
          cy: a.coords.y,
          r,
          x: a.coords.x,
          y: a.coords.y + textOffset
        };
      }
    }

    // Create the respective anchor
    createHint(settings, i);
  });
}

/**
 * Somewhat generic function to create a annotation based on some properties that can vary.
 * @param {*} settings where all the positions for the annotation are passed
 * @param {*} text of the annotation to show
 */
function createHint(settings, text) {
  const { cx, cy, r, x, y } = settings;

  const hG = d3.select('.onboardingAnnotations')
    .append('g')
    .classed('chartAnnotation', true);

  hG.append('circle')
    .attr('r', r)
    .attr('cx', cx)
    .attr('cy', cy)
    .style('stroke', '#C51B7D')
    .style('fill', '#C51B7D');
  hG.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .text(text);
}
