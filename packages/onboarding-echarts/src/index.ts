import * as d3 from 'd3';
import { EChartType, displayOnboardingMessages } from 'onboarding-core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

export async function onboarding(chartType: EChartType, chart: any) {
  const coords = {};

  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  coords['chartTitle'] = {x: chartTitlePosition[0], y: chartTitlePosition[1] + 20};

  let onboardingMessages;

  switch(chartType) {
    case EChartType.BAR_CHART:
      onboardingMessages = barChartFactory(chart, coords);
      break;

    case EChartType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(chart, coords);
      break;

    case EChartType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(chart, coords);
      break;

    default:
      throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
  }

  displayOnboardingMessages(onboardingMessages);
}
