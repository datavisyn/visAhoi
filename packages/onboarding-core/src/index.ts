import { EChartType, OnboardingSpec, OnboardingMessages } from './interfaces';
import { barChart, OnboardingBarChartSpec } from './bar-chart';
import { changeMatrix, OnboardingChangeMatrixSpec } from './change-matrix';
import { horizonGraph, OnboardingHorizonGraphSpec } from './horizon-graph';

export * from './injector';
export * from './interfaces';
export { OnboardingBarChartSpec } from './bar-chart';
export { OnboardingChangeMatrixSpec } from './change-matrix';
export { OnboardingHorizonGraphSpec } from './horizon-graph';

export function generateOnboardingMessages(chartType: EChartType, spec: OnboardingSpec): OnboardingMessages[] {
  switch(chartType) {
    case EChartType.BAR_CHART:
      return barChart.generateOnboardingMessages(<OnboardingBarChartSpec>spec);

    case EChartType.CHANGE_MATRIX:
      return changeMatrix.generateOnboardingMessages(<OnboardingChangeMatrixSpec>spec);

    case EChartType.HORIZON_GRAPH:
      return horizonGraph.generateOnboardingMessages(<OnboardingHorizonGraphSpec>spec);
  }

  return [];
}

export default function logger(message: string) {
  console.log(message);
}
