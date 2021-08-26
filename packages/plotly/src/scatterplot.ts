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
  

/*

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

*/
export function scatterplotFactory(chart: Element): IOnboardingMessages[] {
  const onbordingSpec = extractOnboardingSpec(chart);
  return generateMessages(EVisualizationType.SCATTERPLOT, onbordingSpec, chart);
}
