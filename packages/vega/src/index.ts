import {
  createBasicOnboardingMessage,
  createBasicOnboardingStage,
  deleteOnboardingStage,
  EVisualizationType,
  getOnboardingMessages,
  getOnboardingStages,
  IAhoiConfig,
  IAhoiIcons,
  injectOnboarding,
  IOnboardingMessage,
  setEditMode,
  setOnboardingMessage,
  setOnboardingStage
} from '@visahoi/core'
import { barChartFactory } from './bar-chart'
import { changeMatrixFactory } from './change-matrix'
import { horizonGraphFactory } from './horizon-graph'
import { scatterplotFactory } from './scatterplot'
import { heatmapFactory } from './heatmap'
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
export const generateBasicAnnotations = async (
  contextKey: string,
  visType: EVisualizationType,
  chart: any
): Promise<IOnboardingMessage[]> => {
  const evaluated = await chart.view.runAsync()
  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = chart.vgSpec
  const origSpec = chart.spec
  const visElement: Element = (chart.view as any)._el

  // ADDITIONAL (not used)
  // Get the individual nodes
  const nodes = document.querySelectorAll('.role-mark > path')

  // Get the data of the individual bars
  const d3Data = Array.from(nodes).map((el: any) => el.__data__)

  let onboardingMessages

  switch (visType) {
    case EVisualizationType.BAR_CHART:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_0 } = evaluated._runtime.data
      // Use the aggregated data values
      const values = data_0.values.value

      onboardingMessages = barChartFactory(
        contextKey,
        vegaSpec,
        values,
        d3Data,
        visElement
      )
      break

    case EVisualizationType.CHANGE_MATRIX:
      onboardingMessages = changeMatrixFactory(contextKey, vegaSpec, d3Data, visElement)
      break

    case EVisualizationType.HORIZON_GRAPH:
      // data_0 contains the input, output and values which are the aggregated data values
      const { data_1 } = evaluated._runtime.data
      // Use the aggregated data values
      const aggregatedValues = data_1.values.value
      onboardingMessages = horizonGraphFactory(
        contextKey,
        vegaSpec,
        origSpec,
        d3Data,
        aggregatedValues,
        visElement
      )
      break

    case EVisualizationType.SCATTERPLOT:
      onboardingMessages = scatterplotFactory(contextKey, vegaSpec, d3Data, visElement)
      break

    case EVisualizationType.HEATMAP:
      onboardingMessages = heatmapFactory(vegaSpec, d3Data, visElement)
      break

    default:
      throw new Error(
        `No onboarding for visualization type ${visType} available.`
      )
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
  ahoiConfig.onboardingMessages = await generateBasicAnnotations(
    contextKey,
    visType,
    chart
  )
  const visElement = chart.view._el
  return injectOnboarding(contextKey || chart.id, ahoiConfig, visElement, 'column', icons)
}

export { EVisualizationType }
