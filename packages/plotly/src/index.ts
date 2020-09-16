import {EVisualizationType, generateOnboarding} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

/**
 *
 * @param chartType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(chartType: EVisualizationType, chart: any, onboardingElement: string) {
    let onboardingMessages;
    const visElementId = chart.getAttribute("id");
    switch(chartType) {
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
        throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
    }

    generateOnboarding(onboardingMessages, onboardingElement, visElementId);
}

export { EVisualizationType };
