import { EVisualizationType, IOnboardingSpec, IOnboardingMessages } from './interfaces';
import { barChart, IOnboardingBarChartSpec } from './bar-chart';
import { changeMatrix, IOnboardingChangeMatrixSpec } from './change-matrix';
import { horizonGraph, IOnboardingHorizonGraphSpec } from './horizon-graph';

export * from './injector';
export * from './onboarding';
export * from './interfaces';
export { IOnboardingBarChartSpec } from './bar-chart';
export { IOnboardingChangeMatrixSpec } from './change-matrix';
export { IOnboardingHorizonGraphSpec } from './horizon-graph';

export function generateMessages(visType: EVisualizationType, spec: IOnboardingSpec, visElement: Element): IOnboardingMessages[] {
  switch(visType) {
    case EVisualizationType.BAR_CHART:
      return barChart.generateMessages(<IOnboardingBarChartSpec>spec, visElement);

    case EVisualizationType.CHANGE_MATRIX:
      return changeMatrix.generateMessages(<IOnboardingChangeMatrixSpec>spec, visElement);

    case EVisualizationType.HORIZON_GRAPH:
      return horizonGraph.generateMessages(<IOnboardingHorizonGraphSpec>spec, visElement);
  }

  return [];
}

export default function logger(message: string) {
  console.log(message);
}
