import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingBarChartSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(chart: any, coords): IOnboardingBarChartSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.points");
  const barNodes = traceNodes[0].querySelectorAll("g.point");
  const barNodesData = Array.from(barNodes).map((point: any) => point.__data__);

  const t = barNodesData[0].trace;

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
        sel: '.bars > .points > .point:nth-child(4)',
      }
    },
    orientation: {
      value: t.orientation === "v" ? "vertical" : "horizontal",
    },
    yAxisOrientation: {
      value: t.orientation === "v" ? "vertical" : "horizontal",
    },
    xAxisOrientation: {
      value: t.orientation === "v" ? "horizontal" : "vertical",
    },
    barLength: {
      value: t.orientation === "v" ? "height" : "width",
    },
    yMin: {
      value: t._extremes.y.min[0].val.toFixed(1), // 0 = first trace
      anchor: {
        sel: '.bars > .points > .point:nth-child(2)',      }
    },
    yMax: {
      value: t._extremes.y.max[0].val.toFixed(1),
      anchor: {
        sel: '.bars > .points > .point:nth-child(7)',      }
    },
    xMin: {
      value: t._extremes.x.min[0].val, // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val,
    },
    xAxisTitle: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, bottom: 10}
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        offset: {top: -25, right: 10}
      }
    }
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function barChartFactory(chart: Element, coords, visElementId: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords);
  return generateMessages(EVisualizationType.BAR_CHART, onbordingSpec, visElementId);
}
