import { Spec } from "vega-typings";
import { EChartType, IOnboardingMessages, generateOnboardingMessages, IOnboardingChangeMatrixSpec } from "@visahoi/core";


function generateOnboardingSpec(vegaSpec: Spec, elems: any[]): IOnboardingChangeMatrixSpec {
  const v = vegaSpec;
  return {
    chartTitle: {
      value: (typeof(v.title) === 'string') ? v.title : v.title?.text,
      anchor: {
        sel: '.role-title-text',
        useDOMRect: true,
        offset: {left: -20}
      },
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        coords: elems[elems.length - 1],
      },
    },
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
        sel: '.role-legend-title',
        useDOMRect: true,
        offset: {top: -20}
      },
    },
    xAxis: {
      value: (<any>v.axes![2]).title.toLowerCase(),
      anchor: {
        coords: elems[0],
      },
    },
    yAxis: {
      value: (<any>v.axes![3]).title.toLowerCase()
    },
  };
}

export function changeMatrixFactory(vegaSpec: Spec, elems: any[]): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(vegaSpec, elems);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(EChartType.CHANGE_MATRIX, onbordingSpec);
}
