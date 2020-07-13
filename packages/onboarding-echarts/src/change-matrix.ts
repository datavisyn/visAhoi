import {
  EChartType,
  OnboardingMessages,
  generateOnboardingMessages,
  OnboardingChangeMatrixSpec,
} from "onboarding-core";

function generateOnboardingSpec(chart, coords): OnboardingChangeMatrixSpec {
  // const dataCoords = chart._chartsViews[0]._data._itemLayouts;
  const legendPosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_visualMap.continuous"].group.position;
  const legendTitle = {x: legendPosition[0], y: legendPosition[1] + 20};
  const options = chart._model.option;
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        coords: coords.chartTitle
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
    // xAxis: {
    //   value: options.xAxis[0].name,
    //   anchor: {
    //     coords: dataCoords[1]
    //   }
    // },
    // yAxis: {
    //   value: options.yAxis[0].name,
    //   anchor: {
    //     coords: dataCoords[0]
    //   }
    // }
  }
}

export function changeMatrixFactory(chart, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart, coords);
  return generateOnboardingMessages(EChartType.CHANGE_MATRIX, onbordingSpec);
}
