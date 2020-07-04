import { EChartType, OnboardingMessages, OnboardingHorizonGraphSpec, generateOnboardingMessages} from 'onboarding-core';
import { Spec } from 'vega-typings';
import { VisualizationSpec } from 'vega-embed';

function generateOnboardingSpec(vegaSpec: Spec, visualizationSpec: VisualizationSpec, elems: any[]): OnboardingHorizonGraphSpec {
  const v = vegaSpec;
  const o = visualizationSpec;

  return {
    chartTitle: {
      value: (typeof(v.title) === 'string') ? v.title : v.title?.text,
      anchor: {
        sel: '.role-title-text',
        useDOMRect: true,
      },
    },
    xAxis: {
      value: (<any>v.axes![1]).title.toLowerCase(),
      anchor: {
        coords: {
          x: elems[1].mark.items[0].x,
          y: elems[1].mark.items[0].y,
        },
      }
    },
    yAxis: {
      value: (<any>v.axes![2]).title.toLowerCase()
    },
    type: {
      value: (<any>v.marks![0]).type,
      anchor: {
        coords: {
          x: elems[2].mark.items[5].x,
          y: elems[2].mark.items[5].y,
        }
      },
    },
    positiveColor: {
      value: (<any>o).layer[0].mark.color,
      anchor: {
        coords: {
          x: elems[0].mark.items[elems[0].mark.items.length - 1].x,
          y: elems[0].mark.items[elems[0].mark.items.length - 1].y,
        }
      },
    },
    negativeColor: {
      value: (<any>o).layer[2].mark.color,
      anchor: {
        coords: {
          x: elems[1].mark.items[2].x,
          y: elems[1].mark.items[2].y,
        }
      },
    },
  };
}

export function horizonGraphFactory(vegaSpec: Spec, visualizationSpec: VisualizationSpec, elems: any[]): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(vegaSpec, visualizationSpec, elems);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(EChartType.HORIZON_GRAPH, onbordingSpec);
}
