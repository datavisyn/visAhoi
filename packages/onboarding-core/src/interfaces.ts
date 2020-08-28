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

interface Point {
  x: number;
  y: number;
}

interface OnboardingCoordsAnchor {
  sel?: string;
  coords: Point | number[];
}

interface OnboardingDOMAnchor {
  sel: string;
  useDOMRect?: boolean;
}

interface OnboardingElementAnchor {
  element?: HTMLElement;
  useDOMRect?: boolean;
}

export type OnboardingAnchor = OnboardingCoordsAnchor | OnboardingDOMAnchor | OnboardingElementAnchor;

export const isOnboardingElementAnchor = (element: OnboardingAnchor): element is OnboardingElementAnchor => {
  return (element as OnboardingElementAnchor).element !== undefined;
}

export interface SpecProp {
  value: any;
  anchor?: OnboardingAnchor;
  findDomNodeByValue?: boolean;
}

export interface OnboardingSpec {
  [key: string]: SpecProp | undefined
}
