import {EChartType, generateOnboarding} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

/**
 *
 * @param chartType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(chartType: EChartType, chart: any, onboardingElement: string) {
    let onboardingMessages;

    switch(chartType) {
      case EChartType.BAR_CHART:
        onboardingMessages = barChartFactory(chart);
        break;

      case EChartType.CHANGE_MATRIX:
        onboardingMessages = changeMatrixFactory(chart);
        break;

      case EChartType.HORIZON_GRAPH:
        onboardingMessages = horizonGraphFactory(chart);
        break;

      default:
        throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
    }

    generateOnboarding(onboardingMessages, onboardingElement);
}
