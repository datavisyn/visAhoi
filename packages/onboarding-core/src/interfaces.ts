/**
 * Supported chart types
 */
export enum EChartType {
  barChart = 'bar-chart',
  changeMatrix = 'change-matrix',
  horizonGraph = 'horizon-graph'
}

export interface OnboardingMessages {
  anchor: any;
  requires: string[];
  legend: string;
}

interface OnboardingCoordsAnchor {
  sel: string;
  coords: number[];
}

interface OnboardingDOMAnchor {
  sel: string;
  useDOMRect?: boolean;
}

export interface SpecProp {
  value: any;
  anchor?: OnboardingCoordsAnchor | OnboardingDOMAnchor;
}

export interface OnboardingSpec {
  [key: string]: SpecProp
}
