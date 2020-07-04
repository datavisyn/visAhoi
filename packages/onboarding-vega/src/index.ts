import * as d3 from 'd3';
import { Result } from 'vega-embed';
import { EChartType, displayOnboardingMessages } from 'onboarding-core';
import {
  css2, css, getAllNodes,
} from './util';
import { messageFactory } from './bar-chart';

export async function onboarding(chartType: EChartType, vegaResult: Result) {

  const evaluated = await (<any>vegaResult.view).evaluate(); // TODO: `evaluate()` is not an officially supported Vega API

  // data_0 contains the input, output and values which are the aggregated data values
  const { data_0 } = evaluated._runtime.data;
  // Use the aggregated data values
  const values = data_0.values.value;
  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaResult.vgSpec;

  console.log(vegaResult);

  console.log('%cNECESSARY DATA', css);
  console.log(
    'Aggregated Values: ',
    values,
    'Spec with Aggregation: ',
    vegaSpec,
  );

  // ADDITIONAL (not used)
  // Get the individual bars
  const vis = d3.select('#vis');
  const bars = getAllNodes(vis);

  // Get the data of the individual bars
  const barsData = bars.map((el: any) => el.__data__);
  console.log('%cAdditional information about each bar', css2, barsData);
  console.log('- - - - - - - - - -');

  let onboardingMessages;

  switch(chartType) {
    case EChartType.barChart:
      onboardingMessages = messageFactory(vegaSpec, values, barsData);
  }

  if(!onboardingMessages) {
    throw new Error('Undefined visualization onboarding for given chart type.');
  }

  displayOnboardingMessages(onboardingMessages);
}

export default onboarding;
