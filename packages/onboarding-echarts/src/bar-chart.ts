import {
  EChartType,
  OnboardingMessages,
  OnboardingBarChartSpec,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(data, options, coords): OnboardingBarChartSpec {
  function getMainAxis(xType, yType) {
    if (xType === "value" && yType === "category") {
      return "y";
    } else if (yType === "value" && xType === "category") {
      return "x";
    }
  }
  const mainAxis = getMainAxis(options.xAxis[0].type, options.yAxis[0].type);

  // model.option.title
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: coords[12]
    },
    yMin: {
      value: data._rawExtent.y[0],
      anchor: {
        coords: coords[1]
      }
    },
    type: {
      value: data.hostModel.option.type,
      anchor: {
        coords: coords[3]
      }
    },
    yMax: {
      value: data._rawExtent.y[1],
      anchor: {
        coords: coords[6]
      }
    },
    orientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    yAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    xAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    barLength: {
      value: mainAxis && (mainAxis === "x" ? "height" : "width")
    },
    xMin: {
      value: data._rawExtent.x[0]
    },
    xMax: {
      value: data._rawExtent.x[1]
    },
    xAxisTitle: {
      value: options.xAxis[0].name
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        coords: coords[13]
      }
    }
  };
}

export function barChartFactory(data, options, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(data, options, coords);
  // console.log('Generated Spec: ', onbordingSpec);
  return generateOnboardingMessages(EChartType.BAR_CHART, onbordingSpec);
}
