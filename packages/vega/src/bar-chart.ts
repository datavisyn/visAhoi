import {
  EVisualizationType,
  IOnboardingMessages,
  IOnboardingBarChartSpec,
  generateMessages,
} from "@visahoi/core";
import { Spec } from "vega-typings";

function getOrientation(scales) {
  const [s1, s2] = scales;
  const { name: s1Name, type: s1Type } = s1;
  const { name: s2Name, type: s2Type } = s2;

  return {
    x: s1Type === "band" ? "horizontal" : "vertical",
    y: s2Type === "band" ? "horizontal" : "vertical",
    b: s1Type === "band" ? "height" : "width",
  };
}

export function getMinMax(data) {
  const values = getPropertyValues(data);
  const keys = Object.keys(values);
  const res: {key: string, min: number, max: number}[] = [];

  keys.forEach((k) => {
    res.push({
      key: k,
      min: Math.min(...values[k]),
      max: Math.max(...values[k]),
    });
  });

  return res;
}

function getPropertyValues(arr) {
  const res = {};
  const keys = Object.keys(arr[0]);

  keys.forEach((k) => {
    res[k] = arr.map((e) => e[k]);
  });

  return res;
}

function extractOnboardingSpec(vegaSpec: Spec, aggregatedValues: any[], elems: any[]): IOnboardingBarChartSpec {
  const v = vegaSpec;
  const a = aggregatedValues;

  const { x, y, b } = getOrientation(v.scales);
  const axesMinMax = getMinMax(a);

  return {
    chartTitle: {
      value: typeof v.title === "string" ? v.title : v.title?.text,
      anchor: {
        sel: ".role-title-text",
        offset: {left: -20}
      },
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        sel: "svg",
        coords: elems[4],
      },
    },
    orientation: {
      value: null,
    },
    xAxisOrientation: {
      value: x,
    },
    yAxisOrientation: {
      value: y,
    },
    barLength: {
      value: b,
    },
    xMin: {
      value: axesMinMax[1].min,
    },
    xMax: {
      value: axesMinMax[1].max,
    },
    yMin: {
      value: axesMinMax[0].min.toFixed(1),
      anchor: {
        sel: "svg",
        coords: elems[2],
      },
    },
    yMax: {
      value: axesMinMax[0].max.toFixed(1),
      anchor: {
        sel: "svg",
        coords: elems[7],
      },
    },
    xAxisTitle: {
      value: (<any>v.axes![1]).title,
      anchor: {
        sel: "g[aria-label~='x-axis' i] .role-axis-title > text",
        offset: {left: -30, top: 10}
      },
    },
    yAxisTitle: {
      value: (<any>v.axes![2]).title,
      anchor: {
        sel: "g[aria-label~='y-axis' i] .role-axis-title > text",
        offset: {top: -30}
      },
    },
  };
}

export function barChartFactory(vegaSpec: Spec, aggregatedValues: any[], elems: any[], visElement: Element): IOnboardingMessages[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, aggregatedValues, elems);
  return generateMessages(EVisualizationType.BAR_CHART, onbordingSpec, visElement);
}
