import {
  EVisualizationType,
  IAhoiConfig,
  injectOnboarding,
  IOnboardingMessage,
  createBasicOnboardingMessage,
  createBasicOnboardingStage,
  deleteOnboardingStage,
  getOnboardingMessages,
  getOnboardingStages,
  setEditMode,
  setOnboardingMessage,
  setOnboardingStage,
  IAhoiIcons
} from '@visahoi/core'
import { barChartFactory } from './bar-chart'
import { changeMatrixFactory } from './change-matrix'
import { heatmapFactory } from './heatmap'
import { horizonGraphFactory } from './horizon-graph'
import { scatterplotFactory } from './scatterplot'
import { treemapFactory } from './treemap'

// just pass them through
export {
  createBasicOnboardingMessage,
  createBasicOnboardingStage,
  getOnboardingStages,
  getOnboardingMessages,
  deleteOnboardingStage,
  setOnboardingStage,
  setOnboardingMessage,
  setEditMode
}

/**
 * To generate basic messages for specified visualization.
 * @param {string} contextKey - Context key of the visualization.
 * @param {EVisualizationType} visType - Visualization type.
 * @param {any} chart - Runtime object of the visualization
 * @returns {IOnboardingMessage[]} - Returns all the generated onboarding messages. 
 */
export const generateBasicAnnotations = (
  contextKey: string,
  visType: EVisualizationType,
  chart: any
): IOnboardingMessage[] => {
  const coords = {}
  const visElement = chart._dom

  // TODO: coords
  // const chartTitlePosition =
  //   chart._componentsMap['_ec_\u0000series\u00000\u00000_title']?.group
  //     .position
  // coords.chartTitle = chartTitlePosition
  //   ? { x: chartTitlePosition[0], y: chartTitlePosition[1] + 20 }
  //   : null

  let onboardingMessages: IOnboardingMessage[]

  switch (visType) {
    case EVisualizationType.BAR_CHART:
      onboardingMessages = barChartFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.HORIZON_GRAPH:
      onboardingMessages = horizonGraphFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.TREEMAP:
      onboardingMessages = treemapFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.HEATMAP:
      onboardingMessages = heatmapFactory(contextKey, chart, coords, visElement)
      break

    case EVisualizationType.GENERIC:
      onboardingMessages = []
      break 

      default:
        throw new Error(
          `No onboarding for visualization type ${visType} available. Please use visualization type 'GENERIC' to create your own onboardings.`
        )
  }
  return onboardingMessages
}

/**
 * Inject onboarding to visualization
 * @param {EVisualizationType} visType - Visualization type.
 * @param {any} chart - Runtime object of visualization.
 * @param {IAhoiConfig} ahoiConfig - Basic onboarding configurations. 
 * @param {IAhoiIcons} icons - Icons for onboardings can be changed. Pass the icons if required to change them.
 * @returns It returns the onboarding.
 */
export async function ahoi (
  contextKey: string,
  visType: EVisualizationType,
  chart: any,
  ahoiConfig: IAhoiConfig,
  icons?: IAhoiIcons
) {
  const visElement = chart._dom
  return injectOnboarding(contextKey || chart.id, ahoiConfig, visElement, ahoiConfig.alignment ? ahoiConfig.alignment : 'vertical', icons)
}

export { EVisualizationType }
