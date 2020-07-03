/**
 * =======================
 * DEFINE STUFF
 * =======================
 */

import vegaEmbed from 'vega-embed';
import * as d3 from 'd3';
import { css2, css, getAllNodes, getOrientation, getMinMax } from './util';
import { createAnchor, generateChartAnchors } from './generate-anchor';

import json from './data/barChartOslo2018.json';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

/**
 * ========================
 * MAGIC HAPPENS
 * ========================
 */
const render = async () => {
  // const response = await fetch('./data/barChartOslo2018.spec.json');
  // const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);
  let evaluated = await vegaLite.view.evaluate();

  // data_0 contains the input, output and values which are the aggregated data values
  const { data_0 } = evaluated._runtime.data;
  // Use the aggregated data values
  const values = data_0.values.value;
  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaLite.vgSpec;

  console.log(vegaLite);

  console.log('%cNECESSARY DATA', css);
  console.log(
    'Aggregated Values: ',
    values,
    'Spec with Aggregation: ',
    vegaSpec
  );

  // ADDITIONAL (not used)
  // Get the individual bars
  const vis = d3.select('#vis');
  const bars = getAllNodes(vis);

  // Get the data of the individual bars
  const barsData = bars.map((el) => el.__data__);
  console.log('%cAdditional information about each bar', css2, barsData);
  console.log('- - - - - - - - - -');

  // ONBOARDING
  const onbordingSpec = generateOnboardingSpec(vegaSpec, values, barsData);
  console.log('Generated Spec: ', onbordingSpec);
  const onboardingMsg = generateOnboardingMessages(onbordingSpec);

  const onboardingLegend = d3
    .select('#onboarding')
    .selectAll('div.vizHint')
    .data(onboardingMsg.map((d) => d.legend));

  onboardingLegend
    .enter()
    .append('div')
    .classed('vizHint', true)
    .append('div')
    .attr('id', (d, i) => `$hint-${i + 1}`)
    .html((d) => d)
    .each(createAnchor);

  onboardingLegend.exit().remove();

  d3.select('svg').append('g').classed('onboardingAnnotations', true);
  generateChartAnchors(onboardingMsg.map((d, i) => {
    return {
      anchor: d.anchor,
      index: i + 1
    }
  }));
};

render();

/**
 * =======================
 * ONBOARDING FUNCTIONS
 * =======================
 */
const generateOnboardingSpec = (vegaSpec, aggregatedValues = [], elems = []) => {
  const v = vegaSpec;
  const a = aggregatedValues;

  const { x, y, b } = getOrientation(v.scales);
  const axesMinMax = getMinMax(a);

  return {
    chartTitle: {
      value: v.title.text,
      anchor: {
        sel: '.role-title-text',
        useDOMRect: true,
      },
    },
    type: {
      value: v.marks[0].style,
      anchor: {
        sel: 'svg',
        coords: elems[4],
      },
    },
    orientation: {
      value: null,
      anchor: null,
    },
    xAxisOrientation: {
      value: x,
      anchor: null,
    },
    yAxisOrientation: {
      value: y,
      anchor: null,
    },
    barLength: {
      value: b,
      anchor: null,
    },
    xMin: {
      value: axesMinMax[1].min,
      anchor: null,
    },
    xMax: {
      value: axesMinMax[1].max,
      anchor: null,
    },
    yMin: {
      value: axesMinMax[0].min,
      anchor: {
        sel: 'svg',
        coords: elems[2],
      },
    },
    yMax: {
      value: axesMinMax[0].max,
      anchor: {
        sel: 'svg',
        coords: elems[7],
      },
    },
    xAxisTitle: {
      value: v.axes[1].title,
      anchor: {
        sel: '.role-axis-title',
      },
    },
    yAxisTitle: {
      value: v.axes[2].title,
      anchor: {
        sel: d3.selectAll('.role-axis-title').nodes()[1],
        useDOMRect: true,
      },
    },
  };
};

const generateOnboardingMessages = (spec) => {
  const messages = [
    {
      anchor: spec.chartTitle.anchor,
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle.value}.`,
    },
    {
      anchor: spec.type.anchor,
      requires: ['type'],
      legend: `Each ${spec.type.value} represents a data item.`,
    },
    {
      anchor: spec.yAxisTitle.anchor,
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      legend: `The ${spec.barLength.value} of each ${spec.type.value} shows e.g., the <span class="hT">${spec.yAxisTitle.value} (y-axis)</span> for a certain ${spec.xAxisTitle.value}.`,
    },
    {
      anchor: spec.xAxisTitle.anchor,
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      legend: `The ${spec.xAxisOrientation.value} position of each ${spec.type.value} represents the <span class="hT">${spec.xAxisTitle.value} (x-axis)</span>.`,
    },
    {
      anchor: spec.yMin.anchor,
      requires: ['yAxisTitle', 'yMin'],
      legend: `The <span class="hT">minimum</span> ${spec.yAxisTitle.value} is ${spec.yMin.value}.`,
    },
    {
      anchor: spec.yMax.anchor,
      requires: ['yAxisTitle', 'yMax'],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle.value} is ${spec.yMax.value}.`,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
};
