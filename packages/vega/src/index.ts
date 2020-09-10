import * as d3 from 'd3';
import { Result } from 'vega-embed';
import {EChartType, generateOnboarding} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import { changeMatrixFactory } from './change-matrix';
import { horizonGraphFactory } from './horizon-graph';

/**
 *
 * @param chartType
 * @param vegaResult
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function onboarding(chartType: EChartType, vegaResult: Result, onboardingElement: string) {
  const evaluated = await (<any>vegaResult.view).evaluate(); // TODO: `evaluate()` is not an officially supported Vega API

  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaResult.vgSpec;
  const origSpec = vegaResult.spec;

  // ADDITIONAL (not used)
  // Get the individual nodes
  const nodes = d3.select('#vis').selectAll('.role-mark').selectAll('path').nodes();

  // Get the data of the individual bars
  const d3Data = nodes.map((el: any) => el.__data__);

  let onboardingMessages;

  switch(chartType) {
    case EChartType.BAR_CHART:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_0 } = evaluated._runtime.data;
      // Use the aggregated data values
      const values = data_0.values.value;

      onboardingMessages = barChartFactory(vegaSpec, values, d3Data);
      break;

    case EChartType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(vegaSpec, d3Data);
      break;

    case EChartType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(vegaSpec, origSpec, d3Data);
      break;

    default:
      throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
  }

  generateOnboarding(onboardingMessages, onboardingElement);
}

export default onboarding;
