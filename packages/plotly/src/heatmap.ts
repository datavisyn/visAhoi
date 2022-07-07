import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages,
} from "@visahoi/core";
import { IOnboardingScatterplotSpec } from "@visahoi/core/src/scatterplot";

function extractOnboardingSpec(chart: any, coords): IOnboardingScatterplotSpec {
  debugger;
  console.log("chart psrts:", chart.querySelectorAll(".plot"));
  console.log("Chart", chart.data);

  const heatmapData = (<any>(
    Array.from(<NodeList>chart.querySelectorAll(".hm"))[0]
  )).__data__;
  const t = heatmapData[0].trace;
  console.log(t, "trace node");
  console.log(chart.layout);

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    heatmapDescription: {
      value: t.type,
      anchor: {
        sel: ".heatmaplayer > .hm > image",
      },
    },
    legendDescription: {
      value: t.colorbar.title.text,
      anchor: {
        sel: ".infolayer > .colorbar",
        offset: { top: -10 },
      },
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20 },
      },
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: ".infolayer .ytitle",
      },
    },
  };
}

export function heatmapFactory(
  chart: Element,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords);
  return generateMessages(
    EVisualizationType.HEATMAP,
    onbordingSpec,
    visElementId
  );
}
