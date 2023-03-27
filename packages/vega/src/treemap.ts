import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages,
} from "@visahoi/core";
import { Spec } from "vega-typings";
import { IOnboardingTreemapSpec } from "@visahoi/core/src/treemap";

function extractOnboardingSpec(
  vegaSpec: Spec,
  elems: any[],
  visElement: Element
): IOnboardingTreemapSpec {
  return {
    chartTitle: {
      value: vegaSpec?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -20, top: -30 },
      },
    },
  };
}

export function treemapFactory(
  contextKey: string,
  vegaSpec: Spec,
  elems: any[],
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.TREEMAP,
    onbordingSpec,
    visElement
  );
}
