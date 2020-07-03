/**
 * =======================
 * DEFINE STUFF
 * =======================
 */

import vegaEmbed from 'vega-embed';
import * as d3 from 'd3';
import { css, css2, getAllNodes, createCR } from './util';
import { createAnchor, generateChartAnchors } from './generate-anchor';

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
  const response = await fetch('./data/horizonGraphOslo2018.json');
  const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);
  let evaluated = await vegaLite.view.evaluate();

  // data_0 contains the input, output and values which are the aggregated data values
  const {
    data_1,
    data_2,
    data_3,
    layer_1_marks,
    layer_2_marks,
    layer_3_marks,
  } = evaluated._runtime.data;
  // Use the aggregated data values
  const lowerCutoff = data_1.values.value; // Identified by ny0 property
  const middleVals = data_2.values.value; // Identified by ny property
  const upperCutoff = data_3.values.value; // Identified by ny2 property

  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaLite.vgSpec;
  const origSpec = vegaLite.spec;

  console.log('%cNECESSARY DATA', css);
  console.log(
    'Aggregated Values: ',
    lowerCutoff,
    middleVals,
    upperCutoff,
    'Spec with Aggregation: ',
    vegaSpec
  );

  // ADDITIONAL (not used)
  // Get the individual bars
  const vis = d3.select('#vis');
  const areas = getAllNodes(vis);

  // Get the data of the individual bars
  const areasData = areas.map((el) => el.__data__);
  console.log('%cAdditional information about each bar', css2, areasData);
  console.log('- - - - - - - - - -');

  // ONBOARDING
  const onbordingSpec = generateOnboardingSpec({ vegaSpec, origSpec }, [], areasData);
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
  generateChartAnchors(
    onboardingMsg.map((d, i) => {
      return {
        anchor: d.anchor,
        index: i + 1,
      };
    })
  );
};

render();

/**
 * =======================
 * ONBOARDING FUNCTIONS
 * =======================
 */
const generateOnboardingSpec = (vegaSpec, aggregatedValues = [], elems = []) => {
  let v = null;
  let o = null;
  const a = aggregatedValues;

  if (typeof vegaSpec === 'object') {
    v = vegaSpec.vegaSpec;
    o = vegaSpec.origSpec;
  } else {
    v = vegaSpec;
  }

  return {
    chartTitle: {
      value: v.title.text,
      anchor: {
        sel: '.role-title-text',
        useDOMRect: true,
      },
    },
    xAxis: {
      value: v.axes[1].title.toLowerCase(),
      anchor: {
        coords: {
          x: elems[1].mark.items[0].x,
          y: elems[1].mark.items[0].y,
        },
      }
    },
    yAxis: {
      value: v.axes[2].title.toLowerCase(),
      anchor: null,
    },
    type: {
      value: v.marks[0].type,
      anchor: {
        coords: {
          x: elems[2].mark.items[5].x,
          y: elems[2].mark.items[5].y,
        }
      },
    },
    positiveColor: {
      value: o.layer[0].mark.color,
      anchor: {
        coords: {
          x: elems[0].mark.items[elems[0].mark.items.length - 1].x,
          y: elems[0].mark.items[elems[0].mark.items.length - 1].y,
        }
      },
    },
    negativeColor: {
      value: o.layer[2].mark.color,
      anchor: {
        coords: {
          x: elems[1].mark.items[2].x,
          y: elems[1].mark.items[2].y,
        }
      },
    },
  }
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
      requires: ['chartTitle'],
      legend: `The chart is made out of <span class="hT">${spec.type.value}</span> elements.`,
    },
    {
      anchor: spec.xAxis.anchor,
      requires: ['xAxis', 'yAxis'],
      legend: `The areas illustrate the <span class="hT">${spec.yAxis.value} (y-axis)</span> over <span class="hT">${spec.xAxis.value} (x-axis)</span>.`,
    },
    {
      anchor: spec.positiveColor.anchor,
      requires: ['yAxis', 'positiveColor'],
      legend: `Light ${createCR(spec.positiveColor.value)} areas indicate a moderate positive <span class="hT">${spec.yAxis.value}</span> and dark
        ${createCR(spec.positiveColor.value)} areas a high positive <span class="hT">${spec.yAxis.value}</span>.`,
    },
    {
      anchor: spec.negativeColor.anchor,
      requires: ['yAxis', 'negativeColor'],
      legend: `${createCR(spec.negativeColor.value)} areas indicate a very low negative <span class="hT">${spec.yAxis.value}</span>.`,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
};
