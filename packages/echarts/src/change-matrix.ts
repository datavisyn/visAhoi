import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingChangeMatrixSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(
  chart,
  coords,
  visElement
): IOnboardingChangeMatrixSpec {
  // const dataCoords = chart._chartsViews[0]._data._itemLayouts;
  const legendPosition =
    chart._componentsMap["_ec_\u0000series\u00000\u00000_visualMap.continuous"]
      .group;
  const legendTitle = { x: legendPosition.x, y: legendPosition.y };
  const options = chart._model.option;

  const dataArr = options.series[0].data.map((d) => d[2]);
  const min = Math.min(...dataArr);
  const max = Math.max(...dataArr);

  const maxXIndex = dataArr.indexOf(max);
  const minXIndex = dataArr.indexOf(min);

  // TODO: Get the value to child nodes from the index directly.
  const maxPositionX =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[maxXIndex + 38]?.getBoundingClientRect().x -
    visElement.getBoundingClientRect().left +
    20;
  const maxPositionY =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[maxXIndex + 38]?.getBoundingClientRect().y -
    visElement.getBoundingClientRect().top;

  const minPositionX =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[minXIndex + 38]?.getBoundingClientRect().x -
    visElement.getBoundingClientRect().left +
    20;
  const minPositionY =
    visElement
      .getElementsByTagName("g")[0]
      .childNodes[minXIndex + 38]?.getBoundingClientRect().y -
    visElement.getBoundingClientRect().top;

  const maxColor = visElement
    .getElementsByTagName("g")[0]
    .childNodes[maxXIndex + 38]?.getAttribute("fill");
  const minColor = visElement
    .getElementsByTagName("g")[0]
    .childNodes[minXIndex + 38]?.getAttribute("fill");

  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    // type: {
    //   value: "cell",
    //   anchor: {
    //     coords: {x: 20, y: 20}
    //   }
    // },
    legendTitle: {
      value: options.visualMap[0].text[1],
      anchor: {
        coords: legendTitle,
      },
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20 },
      },
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
      },
    },
    type: {
      value: "area",
      domNodeValue: options.yAxis[0].data[2],
      anchor: {
        findDomNodeByValue: true,
        offset: { top: -10, left: -60 },
      },
    },
    interactionDesc: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 80, left: -30 },
      },
    },
    min: {
      value: min,
      anchor: {
        coords: { x: minPositionX, y: minPositionY },
        offset: { left: -10, top: -30 },
      },
    },
    max: {
      value: max,
      anchor: {
        coords: { x: maxPositionX, y: maxPositionY },
        offset: { left: -10, top: -30 },
      },
    },
    minColor: {
      value: minColor,
    },
    maxColor: {
      value: maxColor,
    },
  };
}

export function changeMatrixFactory(
  contextKey,
  chart,
  coords,
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.CHANGE_MATRIX,
    onbordingSpec,
    visElement
  );
}
