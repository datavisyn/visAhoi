import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingBarChartSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(chart, coords): IOnboardingBarChartSpec {
  const dataCoords = chart._chartsViews[0]._data._itemLayouts;
  const data = chart._chartsViews[0]._data;
  const options = chart._model.option;

  function getMainAxis(xType, yType) {
    if (xType === "value" && yType === "category") {
      return "y";
    } else if (yType === "value" && xType === "category") {
      return "x";
    }
  }
  const mainAxis = getMainAxis(options.xAxis[0].type, options.yAxis[0].type);
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 10}
      }
    },
    yMin: {
      value: data._store._rawExtent[1][0],
      anchor: {
        coords: {x: dataCoords[1].x + dataCoords[1].width/2, y: dataCoords[1].y + dataCoords[1].height}
      }
    },
    type: {
      value: data.hostModel.option.type,
      anchor: {
        coords: dataCoords[8]
      }
    },
    yMax: {
      value: data._store._rawExtent[1][1],
      anchor: {
        coords: {x: dataCoords[6].x + dataCoords[6].width/2, y: dataCoords[6].y + dataCoords[6].height}
      }
    },
    // orientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    // yAxisOrientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    xAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    barLength: {
      value: mainAxis && (mainAxis === "x" ? "height" : "width")
    },
    // xMin: {
    //   value: data._rawExtent.x[0]
    // },
    // xMax: {
    //   value: data._rawExtent.x[1]
    // },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 5}
      }
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: {top: -20}
      }
    }
  };
}

export function barChartFactory(chart, coords, visElementId: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords);
  return generateMessages(EVisualizationType.BAR_CHART, onbordingSpec, visElementId);
}
