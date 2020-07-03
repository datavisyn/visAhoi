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

interface SpecProp {
  value: any;
  anchor?: OnboardingCoordsAnchor | OnboardingDOMAnchor;
}

interface OnboardingSpec {
  [key: string]: SpecProp
}

export interface OnboardingBarChartSpec extends OnboardingSpec {
  chartTitle: SpecProp;
  type: SpecProp;
  orientation: SpecProp;
  xAxisOrientation: SpecProp;
  yAxisOrientation: SpecProp;
  barLength: SpecProp;
  xMin: SpecProp;
  xMax: SpecProp;
  yMin: SpecProp;
  yMax: SpecProp;
  xAxisTitle: SpecProp;
  yAxisTitle: SpecProp;
}

