
import {
  EChartType,
  IOnboardingMessages,
  IOnboardingHorizonGraphSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart: any): IOnboardingHorizonGraphSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.fills");
  const areaNodes = traceNodes[0].querySelectorAll("path.js-fill");
  const areaNodesData = Array.from(areaNodes).map((point: any) => point.__data__);

  const t = areaNodesData[0][0].trace;

  // console.log(t);

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        sel: '.infolayer .gtitle',
        offset: {left: -15, top: 5}
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
    yMin: {
      value: t._extremes.y.min[0].val, // 0 = first trace
    },
    yMax: {
      value: t._extremes.y.max[0].val,
    },
    xMin: {
      value: t._extremes.x.min[0].val, // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val,
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        sel: '.infolayer .xtitle',
        offset: {left: -15, top: 5}
      }
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        useDOMRect: true,
      }
    },
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function horizonGraphFactory(chart): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart);
  return generateOnboardingMessages(EChartType.HORIZON_GRAPH, onbordingSpec);
}
