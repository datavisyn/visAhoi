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
const createAnchor = (d, i, nodes) => {
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

const generateChartAnchors = (anchors) => {
  console.log(`%c Anchors we want to create`, css2, anchors);

  // We use for each as we want to control each element individually
  anchors.forEach(el => {
    // Return if the el is empty
    if (el === null) return;
    
    let settings = {};

    // Find the positioning only if we profied no coords
    if (el.coords === null || typeof(el.coords) == 'undefined') {      
      const elToAppendTo = d3.select(el.sel);
      const elRect = elToAppendTo.node().getBoundingClientRect();
      const elBox = elToAppendTo.node().getBBox();
      console.log('elRect: ', elRect, ' elBox: ', elBox);
  
       settings = {
        cx: elRect.x,
        cy: elRect.y,
        r,
        x: elRect.x,
        y: elRect.y + textOffset,
      };
    } else { // If we have coords we can use them
      settings = {
        cx: (el.coords.bounds.x1 + el.coords.bounds.x2) / 2, 
        cy: (el.coords.bounds.y1 + el.coords.bounds.y2) / 2, 
        r,
        x: (el.coords.bounds.x1 + el.coords.bounds.x2) / 2, 
        y: (el.coords.bounds.y1 + el.coords.bounds.y2) / 2 + textOffset,
      }
    }

    // Create the respective anchor
    createHint(el.sel, settings, el.nr);
  });
}

/**
 * Somewhat generic function to create a annotation based on some properties that can vary. 
 * @param {*} parentEl where the annotation should be attached to if not specified its svg
 * @param {*} settings where all the positions for the annotation are passed
 * @param {*} text of the annotation to show
 */
const createHint = (parentEl = 'svg', settings, text) => {
  const { cx, cy, r, x, y } = settings;
  
  const hG = d3.select(parentEl)
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