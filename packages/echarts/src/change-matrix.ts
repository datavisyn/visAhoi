import {
  EVisualizationType,
  IOnboardingMessages,
  IOnboardingChangeMatrixSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(chart, coords): IOnboardingChangeMatrixSpec {
  // const dataCoords = chart._chartsViews[0]._data._itemLayouts;
  const legendPosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_visualMap.continuous"].group.position;
  const legendTitle = {x: legendPosition[0], y: legendPosition[1] + 20};
  const options = chart._model.option;
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 10}
      }
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
        coords: legendTitle
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20}
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
      }
    },
    type: {
      value: "area",
      domNodeValue: options.yAxis[0].data[2],
      anchor: {
        findDomNodeByValue: true,
        offset: {top: -10, left: 60}
      }
    },
  }
}

export function changeMatrixFactory(chart, coords, visElementId: Element): IOnboardingMessages[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords);
  return generateMessages(EVisualizationType.CHANGE_MATRIX, onbordingSpec, visElementId);
}
