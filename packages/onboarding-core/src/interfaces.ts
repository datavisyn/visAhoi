/**
 * Supported chart types
 */
export enum EChartType {
  BAR_CHART = 'bar-chart',
  CHANGE_MATRIX = 'change-matrix',
  HORIZON_GRAPH = 'horizon-graph'
}

export interface OnboardingMessages {
  anchor: any;
  requires: string[];
  legend: string;
}

interface OnboardingCoordsAnchor {
  sel?: string;
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
