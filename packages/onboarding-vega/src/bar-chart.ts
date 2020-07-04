import {OnboardingMessages, OnboardingBarChartSpec, generateOnboardingMessages} from 'onboarding-core';
import { Spec } from 'vega-typings';
import { getOrientation, getMinMax } from './util';

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
        sel: '.role-axis-title:nth-child(2)', // TODO: :nth-child(2) does not return the 2nd child from querySelectorAll
        useDOMRect: true,
      },
    },
  };
}
export function messageFactory(vegaSpec: Spec, aggregatedValues = [], elems = []): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(vegaSpec, aggregatedValues, elems);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(onbordingSpec);
}
