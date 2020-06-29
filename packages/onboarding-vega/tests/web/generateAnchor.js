const r = 10;
const w = 30;
const h = 30;
const textOffset = 5;

/**
 * This method annotates all the text elements for the onboarding. They are aligned using
 * a grid layout and 
 * @param {*} d current datum of the selection
 * @param {*} i index of the current selection
 * @param {*} nodes all nodes
 */
const createAnchor = (d, i, nodes) => {
  const currentEl = nodes[i];
  const parentEl = d3.select(currentEl).node().parentNode;

  const hint1Group = d3
    .select(parentEl)
    .insert('svg', ':first-child')
    .attr('width', w)
    .attr('height', h)
        .append('g')
        .classed('customD3Hints', true);

  hint1Group
    .append('circle')
    .attr('r', r)
    .attr('cx', w / 2)
    .attr('cy', h / 2)
    .style('stroke', '#C51B7D')
    .style('fill', '#C51B7D');
  hint1Group
    .append('text')
    .attr('x', w / 2)
    .attr('y', h / 2 + textOffset)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(`${i + 1}`);
};

const generateChartAnchor = () => {

}