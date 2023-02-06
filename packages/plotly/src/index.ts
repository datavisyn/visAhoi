import {
  EVisualizationType,
  IAhoiConfig,
  injectOnboarding,
  IOnboardingMessage,
  createBasicOnboardingStage,
  createBasicOnboardingMessage,
  getOnboardingStages,
  getOnboardingMessages,
  deleteOnboardingStage,
  setOnboardingStage,
  setEditMode,
  setOnboardingMessage
} from '@visahoi/core'
import { barChartFactory } from './bar-chart'
import { changeMatrixFactory } from './change-matrix'
import { horizonGraphFactory } from './horizon-graph'
import { scatterplotFactory } from './scatterplot'
import { treemapFactory } from './treemap'
import { heatmapFactory } from './heatmap'
import { IAhoiIcons } from '@visahoi/core/src/interfaces'

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
 *
 * @param visType see EVisualizationType
 * @param chart runtime object of the visualization
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export const generateBasicAnnotations = (
  contextKey: string,
  visType: EVisualizationType,
  chart: any
): IOnboardingMessage[] => {
  const coords: any = {}
  const visElement = chart

  if (chart === null) {
    console.error('Chart cannot be null')
    return []
  }

  // TODO: coords
  const chartTitlePosition = chart?._fullLayout?._dfltTitle
  coords.chartTitle = {
    x: chartTitlePosition?.x,
    y: chartTitlePosition?.y + 20
  }

  let onboardingMessages: IOnboardingMessage[] = []

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
  }
  return onboardingMessages
}

/**
 *
 * @param visType
 * @param chart
 * @param onboardingElement ID of the DOM Element where the onboarding Messages should be displayed
 */
export async function ahoi (
  contextKey: string,
  visType: EVisualizationType,
  chart: any,
  ahoiConfig: IAhoiConfig,
  icons?: IAhoiIcons
) {
  const visElement = chart
  return injectOnboarding(contextKey, ahoiConfig, visElement, ahoiConfig.alignment ? ahoiConfig.alignment : 'vertical', icons)
}

export { EVisualizationType }
