import {
    EVisualizationType,
    IOnboardingMessages,
    generateMessages,
    IOnboardingSpec,
    ISpecProp,
  } from "@visahoi/core";

export interface IOnboardingScatterplotSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  yAxisTitle?: ISpecProp;
  xAxisTitle?: ISpecProp;
}

function extractOnboardingSpec(chart: any): IOnboardingScatterplotSpec {
  const traceNodes = chart.querySelectorAll("g.points");
  const areaNodes = traceNodes[0].querySelectorAll("path.point");
  const areaNodesData = Array.from(areaNodes).map((point: any) => point.__data__);
  const t = areaNodesData[0].trace;

  console.log(t)
  
  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 10}
      }
    },
    type: {
      value: t.type,
      anchor: {
        sel: '.points > .point:nth-child(4)',      }
    },
    xAxisTitle: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        sel: '.infolayer .xtitle',
        offset: {left: -20}
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        offset: {top: -25}
      }
    },
  };
}

export function scatterplotFactory(chart: Element): IOnboardingMessages[] {
  const onbordingSpec = extractOnboardingSpec(chart);
  return generateMessages(EVisualizationType.SCATTERPLOT, onbordingSpec, chart);
}
