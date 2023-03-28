import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages,
} from "@visahoi/core";
import { Spec } from "vega-typings";
import { IOnboardingHeatmapSpec } from "@visahoi/core/src/heatmap";

function extractOnboardingSpec(
  vegaSpec: Spec,
  elems: any[],
  visElement: Element
): IOnboardingHeatmapSpec {
  return {
    chartTitle: {
      value: vegaSpec?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -10 },
      },
    },
    axisDescription: {
      value: vegaSpec?.axes[2]?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: 80 },
      },
    },
    yAxis: {
      value: vegaSpec?.axes[3]?.title,
    },
    xAxis: {
      value: vegaSpec?.axes[2]?.title,
    },
    legendDescription: {
      value: vegaSpec?.legends[0]?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -60, top: -20 },
      },
    },
    hoverDescription: {
      value: vegaSpec?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -60 },
      },
    },
  };
}

export function heatmapFactory(
  contextKey: string,
  vegaSpec: Spec,
  elems: any[],
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.HEATMAP,
    onbordingSpec,
    visElement
  );
}
