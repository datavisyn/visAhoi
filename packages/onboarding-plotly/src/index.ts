import { EChartType, displayOnboardingMessages } from 'onboarding-core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

export function onboarding(chartType: EChartType, chart: any) {
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

    displayOnboardingMessages(onboardingMessages);
}
