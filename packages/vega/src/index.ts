import * as d3 from 'd3';
import { Result } from 'vega-embed';
import {EVisualizationType, generateOnboarding} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import { changeMatrixFactory } from './change-matrix';
import { horizonGraphFactory } from './horizon-graph';

/**
 *
 * @param chartType
 * @param vegaResult
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(chartType: EVisualizationType, vegaResult: Result, onboardingElement: string) {
  const evaluated = await (<any>vegaResult.view).evaluate(); // TODO: `evaluate()` is not an officially supported Vega API

  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaResult.vgSpec;
  const origSpec = vegaResult.spec;
  const visElementId: string = (vegaResult.view as any)._el.id;

  // ADDITIONAL (not used)
  // Get the individual nodes
  const nodes = d3.select(`#${visElementId}`).selectAll('.role-mark').selectAll('path').nodes();

  // Get the data of the individual bars
  const d3Data = nodes.map((el: any) => el.__data__);

  let onboardingMessages;

  switch(chartType) {
    case EVisualizationType.BAR_CHART:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_0 } = evaluated._runtime.data;
      // Use the aggregated data values
      const values = data_0.values.value;

      onboardingMessages = barChartFactory(vegaSpec, values, d3Data, visElementId);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(vegaSpec, d3Data, visElementId);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_1 } = evaluated._runtime.data;
      // Use the aggregated data values
      const aggregatedValues = data_1.values.value;
      onboardingMessages = horizonGraphFactory(vegaSpec, origSpec, d3Data, aggregatedValues, visElementId);
      break;

    default:
      throw new Error(`Visualization onboarding for given chart type ${chartType} is not available.`);
  }

  generateOnboarding(onboardingMessages, onboardingElement, visElementId);
}

export { EVisualizationType };

