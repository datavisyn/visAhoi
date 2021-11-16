import { defaultOnboardingStages, EVisualizationType, IAhoiConfig, injectOnboarding, IOnboardingMessage, removeOnboarding } from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import { changeMatrixFactory } from './change-matrix';
import { horizonGraphFactory } from './horizon-graph';
import { scatterplotFactory } from './scatterplot';

/**
 *
 * @param visType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(visType: EVisualizationType, chart: any, ahoiConfig: IAhoiConfig = { onboardingStages: defaultOnboardingStages }) {
  const coords = {};
  const visElement = chart._dom;

  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  coords['chartTitle'] = { x: chartTitlePosition[0], y: chartTitlePosition[1] + 20 };

  let onboardingMessages: IOnboardingMessage[];

  switch (visType) {
    case EVisualizationType.BAR_CHART:
      onboardingMessages = barChartFactory(chart, coords, visElement);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(chart, coords, visElement);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(chart, coords, visElement);
      break;

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(chart, coords, visElement);
      break;

    default:
      throw new Error(`No onboarding for visualization type ${visType} available.`);
  }

  injectOnboarding(onboardingMessages, visElement, "column");
}


export { EVisualizationType, removeOnboarding };
