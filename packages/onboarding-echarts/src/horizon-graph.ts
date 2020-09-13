import {
  EChartType,
  IOnboardingMessages,
  IOnboardingHorizonGraphSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(chart, coords): IOnboardingHorizonGraphSpec {
  const dataCoords = chart._chartsViews[0]._data._itemLayouts;

  const xAxis = chart._chartsViews[1]._data._itemLayouts[3];
  const positiveColor = chart._chartsViews[1]._data._itemLayouts[5];
  const negativeColor = chart._chartsViews[2]._data._itemLayouts[1];

  const options = chart._model.option;
  return {
    chartTitle: {
      value: options.title[0].text,
      findDomNodeByValue: true,
      anchor: {
        useDOMRect: true,
        offset: {left: -20, top: 10}
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: {x: xAxis[0], y: xAxis[1]}
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      findDomNodeByValue: true,
      anchor: {
        useDOMRect: true
      }
    },
    positiveColor: {
      value: chart._chartsViews[0].__model.option.color,
      anchor: {
        coords: {x: positiveColor[0], y: positiveColor[1]}
      }
    },
    negativeColor: {
      value: chart._chartsViews[2].__model.option.color,
      anchor: {
        coords: {x: negativeColor[0], y: negativeColor[1]}
      }
    },
    type: {
      value: "area",
      anchor: {
        coords: {x: chart._chartsViews[0]._data._itemLayouts[7][0], y: chart._chartsViews[0]._data._itemLayouts[3][1]}
      }
    }
  };
}

export function horizonGraphFactory(chart, coords): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart, coords);
  return generateOnboardingMessages(EChartType.HORIZON_GRAPH, onbordingSpec);
}
