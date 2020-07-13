import {
  EChartType,
  OnboardingMessages,
  OnboardingBarChartSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart: any): OnboardingBarChartSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.points");
  const barNodes = traceNodes[0].querySelectorAll("g.point");
  const barNodesData = Array.from(barNodes).map((point: any) => point.__data__);

  const t = barNodesData[0].trace;

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        sel: '.infolayer .gtitle',
        useDOMRect: true
      }
    },
    type: {
      value: t.type,
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
    xAxisTitle: {
      value: chart.layout.xaxis.title.text,
    },
    yAxisTitle: {
      value: chart.layout.yaxis.title.text
    },
    // xAxisLabel (e.g. 01, 02, …)
    // yAxisLabel (e.g. -5, 0, 5, ...)
    // Title (Average Temperature in Oslo)
  };
}

export function barChartFactory(chart): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart);
  return generateOnboardingMessages(EChartType.BAR_CHART, onbordingSpec);
}
