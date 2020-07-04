import { EChartType, OnboardingSpec, OnboardingMessages } from './interfaces';
import { barChart, OnboardingBarChartSpec } from './bar-chart';
import { changeMatrix, OnboardingChangeMatrixSpec } from './change-matrix';

export * from './injector';
export * from './interfaces';
export { OnboardingBarChartSpec } from './bar-chart';
export { OnboardingChangeMatrixSpec } from './change-matrix';

export function generateOnboardingMessages(chartType: EChartType, spec: OnboardingSpec): OnboardingMessages[] {
  switch(chartType) {
    case EChartType.BAR_CHART:
      return barChart.generateOnboardingMessages(<OnboardingBarChartSpec>spec);
    case EChartType.CHANGE_MATRIX:
      return changeMatrix.generateOnboardingMessages(<OnboardingChangeMatrixSpec>spec);
  }

  return [];
}

export default function logger(message: string) {
  console.log(message);
}
