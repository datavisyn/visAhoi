import { EChartType, IOnboardingSpec, IOnboardingMessages } from './interfaces';
import { barChart, IOnboardingBarChartSpec } from './bar-chart';
import { changeMatrix, IOnboardingChangeMatrixSpec } from './change-matrix';
import { horizonGraph, IOnboardingHorizonGraphSpec } from './horizon-graph';

export * from './injector';
export * from './interfaces';
export { IOnboardingBarChartSpec as OnboardingBarChartSpec } from './bar-chart';
export { IOnboardingChangeMatrixSpec as OnboardingChangeMatrixSpec } from './change-matrix';
export { IOnboardingHorizonGraphSpec as OnboardingHorizonGraphSpec } from './horizon-graph';

export function generateOnboardingMessages(chartType: EChartType, spec: IOnboardingSpec): IOnboardingMessages[] {
  switch(chartType) {
    case EChartType.BAR_CHART:
      return barChart.generateOnboardingMessages(<IOnboardingBarChartSpec>spec);

    case EChartType.CHANGE_MATRIX:
      return changeMatrix.generateOnboardingMessages(<IOnboardingChangeMatrixSpec>spec);

    case EChartType.HORIZON_GRAPH:
      return horizonGraph.generateOnboardingMessages(<IOnboardingHorizonGraphSpec>spec);
  }

  return [];
}

export default function logger(message: string) {
  console.log(message);
}
