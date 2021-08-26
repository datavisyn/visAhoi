import { EVisualizationType, IOnboardingMessages, IOnboardingSpec, generateMessages, ISpecProp} from '@visahoi/core';
import { Spec } from 'vega-typings';
import { VisualizationSpec } from 'vega-embed';
import {getMinMax} from './bar-chart';

export interface IOnboardingScatterplotSpec extends IOnboardingSpec {
    chartTitle?: ISpecProp;
    type?: ISpecProp;
    legendTitle?: ISpecProp;
    xAxis?: ISpecProp;
    yAxis?: ISpecProp;
    yAxisTitle?: ISpecProp;
    xAxisTitle?: ISpecProp;
  }

function extractOnboardingSpec(vegaSpec: Spec, elems: any[]): IOnboardingScatterplotSpec {

  const v = vegaSpec;

  return {
    chartTitle: {
      value: typeof v.title === "string" ? v.title : v.title?.text,
      anchor: {
        sel: ".role-title-text",
        offset: {left: -20}
      },
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        sel: "svg",
        coords: elems[4],
      },
    },
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
          sel: '.role-legend-title',
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
    xAxisTitle: {
      value: (<any>v.axes![1]).title,
      anchor: {
        sel: "g[aria-label~='x-axis' i] .role-axis-title > text",
        offset: {left: -30, top: 10}
      },
    },
    yAxisTitle: {
      value: (<any>v.axes![2]).title,
      anchor: {
        sel: "g[aria-label~='y-axis' i] .role-axis-title > text",
        offset: {top: -30}
      },
    }
  };
}

export function scatterplotFactory(vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessages[] {
    const onbordingSpec = extractOnboardingSpec(vegaSpec, elems);
  return generateMessages(EVisualizationType.SCATTERPLOT, onbordingSpec, visElement);
}
