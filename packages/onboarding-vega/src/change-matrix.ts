import { Spec } from "vega";
import { EChartType, OnboardingMessages, generateOnboardingMessages, OnboardingChangeMatrixSpec } from "onboarding-core";


function generateOnboardingSpec(vegaSpec: Spec, elems: any[]): OnboardingChangeMatrixSpec {
  const v = vegaSpec;
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
        coords: elems[elems.length - 1],
      },
    },
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
        sel: '.role-legend-title',
        useDOMRect: true
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

export function changeMatrixFactory(vegaSpec: Spec, elems: any[]): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(vegaSpec, elems);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(EChartType.CHANGE_MATRIX, onbordingSpec);
}
