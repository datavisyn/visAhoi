
import {
  EChartType,
  IOnboardingMessages,
  IOnboardingChangeMatrixSpec,
  generateOnboardingMessages,
} from "@visahoi/core";

function generateOnboardingSpec(chart: any): IOnboardingChangeMatrixSpec {
  const heatmapData = (<any>Array.from(<NodeList>chart.querySelectorAll(".hm"))[0]).__data__;
  const t = heatmapData[0].trace;

  //console.log(t);

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        sel: '.infolayer .gtitle',
        offset: {left: -15, top: 5}
      }
    },
    type: {
      value: t.type,
      anchor: {
        sel: '.heatmaplayer > .hm > image',
        useDOMRect: true
      }
    },
    legendTitle: {
      value: t.colorbar.title.text,
      anchor: {
        sel: '.infolayer > .colorbar',
        useDOMRect: true,
        offset: {top: -10}
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

export function changeMatrixFactory(chart): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart);
  return generateOnboardingMessages(EChartType.CHANGE_MATRIX, onbordingSpec);
}
