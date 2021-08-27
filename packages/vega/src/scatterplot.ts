import { EVisualizationType, IOnboardingMessages, generateMessages } from '@visahoi/core';
import { Spec } from 'vega-typings';
import { IOnboardingScatterplotSpec } from "@visahoi/core/src/scatterplot";

function extractOnboardingSpec(vegaSpec: Spec, elems: any[]): IOnboardingScatterplotSpec {

  const v = vegaSpec;

  const grid = document
  .getElementsByClassName("background")[0]
  .getBoundingClientRect();

  const points = Array.from(
    document
      .getElementsByClassName("mark-symbol role-mark marks")[0]
      .getElementsByTagName("path")
  ).filter(
    (point) =>
      point.getBoundingClientRect().x &&
      point.getBoundingClientRect().x <= grid.width + grid.x - 10 &&
      point.getBoundingClientRect().y &&
      point.getBoundingClientRect().y <= grid.height + grid.y - 10
  );

  const xVals = points.map((point) => point.getBoundingClientRect().x);
  const yVals = points.map((point) => point.getBoundingClientRect().y);

  const maxX = Math.max(...xVals);
  const maxXIndex = xVals.indexOf(maxX);
  const maxY = yVals[maxXIndex];

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
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
          sel: '.role-legend-title',
          offset: {top: -20}
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
    maxValue: {
      value: maxX,
      anchor: {
        coords: {x: maxX, y: maxY} //rendered too low (bc onset in anchor creation)
      }
    }
  };
}

export function scatterplotFactory(vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessages[] {
    const onbordingSpec = extractOnboardingSpec(vegaSpec, elems);
  return generateMessages(EVisualizationType.SCATTERPLOT, onbordingSpec, visElement);
}
