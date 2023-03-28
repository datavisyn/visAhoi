import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages,
} from "@visahoi/core";
import { IOnboardingScatterplotSpec } from "@visahoi/core/src/scatterplot";

function extractOnboardingSpec(
  chart,
  coords,
  visElement: Element
): IOnboardingScatterplotSpec {
  const dataCoords = chart._chartsViews[0]._symbolDraw._data._itemLayouts;
  const options = chart._model.option;
  const data = options.series[0].data;
  const points = data.filter((point) => point[0] && point[1]);
  const xVals = [...points.map((point) => point[0])];
  const yVals = [...points.map((point) => point[1])];

  const maxX = Math.max(...xVals);
  const minX = Math.min(...xVals);

  const maxXIndex = xVals.indexOf(maxX);
  const minXIndex = xVals.indexOf(minX);

  const maxY = yVals[maxXIndex];
  const minY = yVals[minXIndex];

  // TODO: Get the value to child nodes only for the rect.
  const maxPositionX =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[maxXIndex + 40]?.getBoundingClientRect().x -
    visElement.getBoundingClientRect().left;
  const maxPositionY =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[maxXIndex + 40]?.getBoundingClientRect().y -
    visElement.getBoundingClientRect().top;

  const minPositionX =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[minXIndex + 40]?.getBoundingClientRect().x +
    visElement.getBoundingClientRect().left;
  const minPositionY =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[minXIndex + 40]?.getBoundingClientRect().y -
    visElement.getBoundingClientRect().top;
  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    type: {
      value: "scatter",
      anchor: {
        coords: { x: dataCoords[16][0], y: dataCoords[16][1] },
      },
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: -20, left: 10 },
      },
    },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    maxValue: {
      value: maxX,
      anchor: {
        coords: { x: maxPositionX, y: maxPositionY },
        offset: { left: 5 },
      },
    },
    minValue: {
      value: minX,
      anchor: {
        coords: { x: minPositionX, y: minPositionY },
        offset: { left: 5 },
      },
    },
    maxX: {
      value: maxX,
    },
    maxY: {
      value: maxY,
    },
    minX: {
      value: minX,
    },
    minY: {
      value: minY,
    },

    interactDesc: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 20, left: -180 },
      },
    },
  };
}

export function scatterplotFactory(
  contextKey,
  chart,
  coords,
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.SCATTERPLOT,
    onbordingSpec,
    visElement
  );
}
