import {OnboardingMessages, OnboardingBarChartSpec} from 'onboarding-core';
import * as d3 from 'd3';
import { Spec } from 'vega-typings';
import {
  css2, css, getAllNodes, getOrientation, getMinMax,
} from './util';

function generateOnboardingSpec(vegaSpec: Spec, aggregatedValues = [], elems = []): OnboardingBarChartSpec {
  const v = vegaSpec;
  const a = aggregatedValues;

  const { x, y, b } = getOrientation(v.scales);
  const axesMinMax = getMinMax(a);

  return {
    chartTitle: {
      value: (typeof(v.title) === 'string') ? v.title : v.title?.text,
      anchor: {
        sel: '.role-title-text',
        useDOMRect: true,
      },
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        sel: 'svg',
        coords: elems[4],
      },
    },
    orientation: {
      value: null,
    },
    xAxisOrientation: {
      value: x,
    },
    yAxisOrientation: {
      value: y,
    },
    barLength: {
      value: b,
    },
    xMin: {
      value: axesMinMax[1].min,
    },
    xMax: {
      value: axesMinMax[1].max,
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
      value: (<any>v.axes![1]).title,
      anchor: {
        sel: '.role-axis-title',
      },
    },
    yAxisTitle: {
      value: (<any>v.axes![2]).title,
      anchor: {
        sel: '.role-axis-title:nth-child(2)',
        useDOMRect: true,
      },
    },
  };
}

function generateOnboardingMessages(spec: OnboardingBarChartSpec): OnboardingMessages[] {
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
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export function messageFactory(vegaSpec: Spec, aggregatedValues = [], elems = []): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(vegaSpec, aggregatedValues, elems);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(onbordingSpec);
}
