import {OnboardingHorizonGraphSpec} from '../../onboarding-core/dist/horizon-graph';
import {
  EChartType,
  OnboardingMessages,
  generateOnboardingMessages,
} from "onboarding-core";

function generateOnboardingSpec(data, options, coords): OnboardingHorizonGraphSpec {
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
    }
  };
}

export function horizonGraphFactory(data, options, coords): OnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(data, options, coords);
  return generateOnboardingMessages(EChartType.BAR_CHART, onbordingSpec);
}
