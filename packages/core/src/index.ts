import {
  EVisualizationType,
  IOnboardingSpec,
  IOnboardingMessage
} from './interfaces'
import { barChart, IOnboardingBarChartSpec } from './bar-chart'
import { changeMatrix, IOnboardingChangeMatrixSpec } from './change-matrix'
import { horizonGraph, IOnboardingHorizonGraphSpec } from './horizon-graph'
import { IOnboardingScatterplotSpec, scatterplot } from './scatterplot'
import { IOnboardingTreemapSpec, treemap } from './treemap'
import { IOnboardingHeatmapSpec, heatmap } from './heatmap'
import { get } from 'svelte/store'
import { stores } from './components/stores'
import { VisahoiState } from './components/state'

export * from './onboarding'
export * from './interfaces'
export { IOnboardingBarChartSpec } from './bar-chart'
export { IOnboardingChangeMatrixSpec } from './change-matrix'
export { IOnboardingHorizonGraphSpec } from './horizon-graph'
export { IOnboardingScatterplotSpec } from './scatterplot'
export { IOnboardingTreemapSpec } from './treemap'

export function generateMessages (
  contextKey: string,
  visType: EVisualizationType,
  spec: IOnboardingSpec,
  visElement: Element
): IOnboardingMessage[] {
  const s = get(stores)
  if (!s.has(contextKey)) {
    console.info('Creating new context for contextKey: ', contextKey)
    // INITIALIZING THE STORE FOR A NEW VIS
    // holding the visElement
    const newState = new VisahoiState()
    newState.visElement.set(visElement)
    s.set(contextKey, newState)
  }
  const visState = s.get(contextKey)
  // @ts-ignore this cannot be null, see code above
  const {onboardingStages} = visState

  let messages: IOnboardingMessage[] = []

  switch (visType) {
    case EVisualizationType.BAR_CHART:
      messages = barChart.generateMessages(
        <IOnboardingBarChartSpec>spec,
        visElement
      )
      break

    case EVisualizationType.CHANGE_MATRIX:
      messages = changeMatrix.generateMessages(
        <IOnboardingChangeMatrixSpec>spec,
        visElement
      )
      break

    case EVisualizationType.HORIZON_GRAPH:
      messages = horizonGraph.generateMessages(
        <IOnboardingHorizonGraphSpec>spec,
        visElement
      )
      break

    case EVisualizationType.SCATTERPLOT:
      messages = scatterplot.generateMessages(
        <IOnboardingScatterplotSpec>spec,
        visElement
      )
      break

    case EVisualizationType.TREEMAP:
      messages = treemap.generateMessages(
        <IOnboardingTreemapSpec>spec,
        visElement
      )
      break

    case EVisualizationType.HEATMAP:
      messages = heatmap.generateMessages(
        <IOnboardingHeatmapSpec>spec,
        visElement
      )
      break
    }
    onboardingStages.set([...new Set(messages.map((m) => m.onboardingStage))])
    return messages
}

export default function logger (message: string) {
  console.log(message)
}
