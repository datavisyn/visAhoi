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
