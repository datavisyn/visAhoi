import {EChartType, generateOnboarding, IOnboardingMessages} from '../../core/dist';
import { barChartFactory } from './bar-chart';
import {changeMatrixFactory} from './change-matrix';
import {horizonGraphFactory} from './horizon-graph';

/**
 *
 * @param chartType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function onboarding(chartType: EChartType, chart: any, onboardingElement: string) {
  const coords = {};

  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  coords['chartTitle'] = {x: chartTitlePosition[0], y: chartTitlePosition[1] + 20};

  let onboardingMessages: IOnboardingMessages[];

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

  generateOnboarding(onboardingMessages, onboardingElement);
}
