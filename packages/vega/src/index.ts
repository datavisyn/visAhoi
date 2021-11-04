import { Result } from 'vega-embed';
import {EVisualizationType, injectOnboarding} from '@visahoi/core';
import { barChartFactory } from './bar-chart';
import { changeMatrixFactory } from './change-matrix';
import { horizonGraphFactory } from './horizon-graph';
import { scatterplotFactory } from './scatterplot';

/**
 *
 * @param visType
 * @param vegaResult
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(visType: EVisualizationType, vegaResult: Result, onboardingElement: string | Element) {
  console.log("result: ", vegaResult);
  const evaluated = await (<any>vegaResult.view).evaluate(); // TODO: `evaluate()` is not an officially supported Vega API

  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaResult.vgSpec;
  const origSpec = vegaResult.spec;
  const visElement: Element = (vegaResult.view as any)._el;

  // ADDITIONAL (not used)
  // Get the individual nodes
  const nodes = document.querySelectorAll(".role-mark > path");

  // Get the data of the individual bars
  const d3Data = Array.from(nodes).map((el: any) => el.__data__);

  let onboardingMessages;

  switch(visType) {
    case EVisualizationType.BAR_CHART:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_0 } = evaluated._runtime.data;
      // Use the aggregated data values
      const values = data_0.values.value;

      onboardingMessages = barChartFactory(vegaSpec, values, d3Data, visElement);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(vegaSpec, d3Data, visElement);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_1 } = evaluated._runtime.data;
      // Use the aggregated data values
      const aggregatedValues = data_1.values.value;
      onboardingMessages = horizonGraphFactory(vegaSpec, origSpec, d3Data, aggregatedValues, visElement);
      break;

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(vegaSpec, d3Data, visElement);
      break;

    default:
      throw new Error(`No onboarding for visualization type ${visType} available.`);
  }
  injectOnboarding(onboardingMessages, visElement, "column");
}

export { EVisualizationType };

