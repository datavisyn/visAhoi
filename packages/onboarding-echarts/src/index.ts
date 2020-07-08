import * as d3 from 'd3';
import { EChartType, displayOnboardingMessages } from 'onboarding-core';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizen-graph';

export async function onboarding(chartType: EChartType, chart: any) {
  const data = chart._chartsViews[0]._data;
  const options = chart._model.option;
  const coords = chart._chartsViews[0]._data._itemLayouts;

  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  coords.push({coords: {x: chartTitlePosition[0], y: chartTitlePosition[1], width: 0, height: 50}});
  coords.push({x: 108.7, y: 60, width: (869/2), height: 300});

  let onboardingMessages;

  switch(chartType) {
    case EChartType.BAR_CHART:
      onboardingMessages = barChartFactory(data, options, coords);
      break;

    case EChartType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(data, options, coords);
      break;

    case EChartType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(data, options, coords);
      break;

    default:
      throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
  }

  displayOnboardingMessages(onboardingMessages);
}
