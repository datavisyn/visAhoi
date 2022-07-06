import {
  defaultOnboardingStages,
  EVisualizationType,
  IAhoiConfig,
  injectOnboarding,
  IOnboardingMessage,
  createBasicOnboardingStage,
  createBasicOnboardingMessage,
  getOnboardingStages,
} from "@visahoi/core";
import { barChartFactory } from "./bar-chart";
import { changeMatrixFactory } from "./change-matrix";
import { horizonGraphFactory } from "./horizon-graph";
import { scatterplotFactory } from "./scatterplot";
import { treemapFactory } from "./treemap";
import { heatmapFactory } from "./heatmap";
// just pass them through
export {
  createBasicOnboardingMessage,
  createBasicOnboardingStage,
  getOnboardingStages,
};

/**
 *
 * @param visType see EVisualizationType
 * @param chart runtime object of the visualization
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export const generateBasicAnnotations = (
  visType: EVisualizationType,
  chart: any
): IOnboardingMessage[] => {
  const coords = {};
  const visElement = chart;

  if (chart === null) {
    console.error("Chart cannot be null");
    return null;
  }

  // TODO: coords
  const chartTitlePosition = chart?._fullLayout?._dfltTitle;
  coords["chartTitle"] = {
    x: chartTitlePosition?.x,
    y: chartTitlePosition?.y + 20,
  };

  let onboardingMessages: IOnboardingMessage[];

  switch (visType) {
    case EVisualizationType.BAR_CHART:
      onboardingMessages = barChartFactory(chart, coords, visElement);
      break;

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(chart, coords, visElement);
      break;

    case EVisualizationType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(chart, coords, visElement);
      break;

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(chart, coords, visElement);
      break;

    case EVisualizationType.TREEMAP:
      onboardingMessages = treemapFactory(chart, coords, visElement);
      break;

    case EVisualizationType.HEATMAP:
      onboardingMessages = heatmapFactory(chart, coords, visElement);
      break;

      throw new Error(
        `No onboarding for visualization type ${visType} available.`
      );
  }
  console.log(onboardingMessages, "from the plotly index");
  return onboardingMessages;
};

/**
 *
 * @param visType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi(
  visType: EVisualizationType,
  chart: any,
  ahoiConfig: IAhoiConfig
) {
  const visElement = chart;
  return injectOnboarding(ahoiConfig, visElement, "column");
}

export { EVisualizationType };
