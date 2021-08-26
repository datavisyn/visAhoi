import {EVisualizationType, injectOnboarding, getElement} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';
import { scatterplotFactory } from './scatterplot';

/**
 *
 * @param visType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(visType: EVisualizationType, chart: Element, onboardingElement: string | Element) {
  let onboardingMessages;

  switch(visType) {
    case EVisualizationType.BAR_CHART:
      onboardingMessages = barChartFactory(chart);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(chart);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(chart);
      break;

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(chart);
      break;

    default:
      throw new Error(`No onboarding for visualization type ${visType} available.`);
  }

    injectOnboarding(getElement(onboardingElement), onboardingMessages, chart);
}

export { EVisualizationType };

