import {EVisualizationType, injectOnboarding, getElement} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

/**
 *
 * @param visType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(visType: EVisualizationType, chart: any, onboardingElement: string | Element) {
  let onboardingMessages;
  const visElementId = chart.getAttribute("id");
  switch(visType) {
    case EVisualizationType.BAR_CHART:
      onboardingMessages = barChartFactory(chart, visElementId);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(chart, visElementId);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(chart, visElementId);
      break;

    default:
      throw new Error(`No onboarding for visualization type ${visType} available.`);
  }

    injectOnboarding(getElement(onboardingElement), onboardingMessages, visElementId);
}

export { EVisualizationType };
