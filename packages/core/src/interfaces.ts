import {EOnboardingStages} from "./onboarding";

/**
 * Supported chart types
 */
export enum EChartType {
  BAR_CHART = 'bar-chart',
  CHANGE_MATRIX = 'change-matrix',
  HORIZON_GRAPH = 'horizon-graph'
}

export interface IOnboardingMessages {
  anchor: any;
  requires: string[];
  legend: string;
  onboardingStage: EOnboardingStages;
}

interface IPoint {
  x: number;
  y: number;
}

interface IOnboardingAnchorBase {
  offset?: {left?: number, top?: number, right?: number, bottom?: number}
  findDomNodeByValue?: boolean;
}

interface IOnboardingCoordsAnchor extends IOnboardingAnchorBase {
  sel?: string;
  coords: IPoint | number[];
}

interface IOnboardingDOMAnchor extends IOnboardingAnchorBase {
  sel: string;
}

interface IOnboardingElementAnchor extends IOnboardingAnchorBase {
  element?: HTMLElement;
}

export type OnboardingAnchor = IOnboardingCoordsAnchor | IOnboardingDOMAnchor | IOnboardingElementAnchor;

export const isOnboardingElementAnchor = (element: OnboardingAnchor): element is IOnboardingElementAnchor => {
  return (element as IOnboardingElementAnchor).element !== undefined;
}

export interface ISpecProp {
  value: any;
  anchor?: OnboardingAnchor;
  domNodeValue?: string;
}

export interface IOnboardingSpec {
  [key: string]: ISpecProp | undefined
}
