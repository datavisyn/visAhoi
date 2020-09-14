import {
  EChartType,
  IOnboardingMessages,
  IOnboardingBarChartSpec,
  generateOnboardingMessages,
} from "@visahoi/core";

function generateOnboardingSpec(chart: any): IOnboardingBarChartSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.points");
  const barNodes = traceNodes[0].querySelectorAll("g.point");
  const barNodesData = Array.from(barNodes).map((point: any) => point.__data__);

  const t = barNodesData[0].trace;

  return {
    chartTitle: {
      value: chart.layout.title.text,
      findDomNodeByValue: true,
      anchor: {
        useDOMRect: true,
        offset: {left: -20, top: 10}
      }
    },
    type: {
      value: t.type,
      anchor: {
        sel: '.bars > .points > .point:nth-child(4)',
        useDOMRect: true
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
      value: t._extremes.y.min[0].val, // 0 = first trace
      anchor: {
        sel: '.bars > .points > .point:nth-child(2)',
        useDOMRect: true
      }
    },
    yMax: {
      value: t._extremes.y.max[0].val,
      anchor: {
        sel: '.bars > .points > .point:nth-child(7)',
        useDOMRect: true
      }
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
        sel: '.infolayer .xtitle',
        offset: {left: -15, top: 5}
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        useDOMRect: true,
        offset: {top: -25}
      }
    },
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function barChartFactory(chart): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart);
  return generateOnboardingMessages(EChartType.BAR_CHART, onbordingSpec);
}
