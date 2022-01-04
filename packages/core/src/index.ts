import { EVisualizationType, IOnboardingSpec, IOnboardingMessage } from './interfaces';
import { barChart, IOnboardingBarChartSpec } from './bar-chart';
import { changeMatrix, IOnboardingChangeMatrixSpec } from './change-matrix';
import { horizonGraph, IOnboardingHorizonGraphSpec } from './horizon-graph';
import { IOnboardingScatterplotSpec, scatterplot } from './scatterplot';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

export * from './onboarding';
export * from './interfaces';
export { IOnboardingBarChartSpec } from './bar-chart';
export { IOnboardingChangeMatrixSpec } from './change-matrix';
export { IOnboardingHorizonGraphSpec } from './horizon-graph';
export { IOnboardingScatterplotSpec } from './scatterplot';

export function generateMessages(visType: EVisualizationType, spec: IOnboardingSpec, visElement: Element): IOnboardingMessage[] {
  switch(visType) {
    case EVisualizationType.BAR_CHART:
      return barChart.generateMessages(<IOnboardingBarChartSpec>spec, visElement);

    case EVisualizationType.CHANGE_MATRIX:
      return changeMatrix.generateMessages(<IOnboardingChangeMatrixSpec>spec, visElement);

    case EVisualizationType.HORIZON_GRAPH:
      return horizonGraph.generateMessages(<IOnboardingHorizonGraphSpec>spec, visElement);

    case EVisualizationType.SCATTERPLOT:
      return scatterplot.generateMessages(<IOnboardingScatterplotSpec>spec, visElement);
  }

  return [];
}

export default function logger(message: string) {
  console.log(message);
}
