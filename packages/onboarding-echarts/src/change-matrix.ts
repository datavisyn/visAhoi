import {
  EChartType,
  OnboardingMessages,
  generateOnboardingMessages,
  OnboardingChangeMatrixSpec,
} from "onboarding-core";

function generateOnboardingSpec(data, options, coords): OnboardingChangeMatrixSpec {
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        coords: coords[36]
      }
    },
    type: {
      value: data.option.type,
      anchor: {
        coords: coords[3]
      }
    },
    legendMin: {
      value: options.visualMap[0].text[1],
      anchor: {
        coords: coords[37]
      }
    },
    legendMax: {
      value: options.visualMap[0].text[0],
      anchor: {
        coords: coords[6]
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: coords[0]
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        coords: coords[0]
      }
    }
  }
}

export function changeMatrixFactory(data, options, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(data, options, coords);
  return generateOnboardingMessages(EChartType.CHANGE_MATRIX, onbordingSpec);
}
