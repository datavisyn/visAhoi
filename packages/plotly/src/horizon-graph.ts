
import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingHorizonGraphSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(chart: any, coords): IOnboardingHorizonGraphSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.fills");
  const areaNodes = traceNodes[0].querySelectorAll("path.js-fill");
  const areaNodesData = Array.from(areaNodes).map((point: any) => point.__data__);

  const t = areaNodesData[0][0].trace;
  // const t = undefined;
  if (t === undefined) {    
    return {
      chartTitle: {
        value: chart.layout.title.text,
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: 10}
        }
      },
  }
}

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 10}
      }
    },
    type: {
      value: "area",
      anchor: {
        coords: {
          x: (t._polygons[0].xmax / 2),
          y: t._polygons[0].ymax,
        }
      },
    },
    // yMin: {
    //   value: t._extremes.y.min[0].val,
    // },
    // yMax: {
    //   value: t._extremes.y.max[0].val,
    // },
    xMin: {
      value: t._extremes.x.min[0].val, // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val,
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        coords: {
          x: (t._polygons[0].xmax / 3*2),
          y: (t._polygons[0].ymax / 3*2),
        }
      }
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
      }
    },
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function horizonGraphFactory(chart, coords, visElementId: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords);  
  return generateMessages(EVisualizationType.HORIZON_GRAPH, onbordingSpec, visElementId);
}
