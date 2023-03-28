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
  const firstNode = vegaSpec?.data[0]?.values?.filter((v) => v.parent === 2);

  const max = firstNode.reduce((prev, current) =>
    prev.size > current.size ? prev : current
  );
  const min = firstNode.reduce((prev, current) =>
    prev.size < current.size ? prev : current
  );

  return {
    chartTitle: {
      value: vegaSpec?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -20, top: -30 },
      },
    },
    desc: {
      value: vegaSpec?.data[0]?.values[1]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -30, top: 30 },
      },
    },
    interactingDesc: {
      value: vegaSpec?.data[0]?.values[2]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: 10, top: -30 },
      },
    },
    maxValueDesc: {
      value: max?.name,
      anchor: {
        coords: { x: max.x0, y: max.y0 },
        offset: { left: -40, top: -40 },
      },
    },
    minValueDesc: {
      value: min?.name,
      anchor: {
        coords: { x: min.x0, y: min.y0 },
        offset: { left: -40, top: -40 },
      },
    },
    maxValue: {
      value: max?.size,
    },
    minValue: {
      value: min?.size,
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
