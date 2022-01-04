/**
 * Supported chart types
 */
export enum EVisualizationType {
  BAR_CHART = 'bar-chart',
  CHANGE_MATRIX = 'change-matrix',
  HORIZON_GRAPH = 'horizon-graph',
  SCATTERPLOT = 'scatterplot'
}

export interface IBackdrop {
  visElement: Element;
  color?: string;
}


export type NavigationAlignment = "row" | "column";

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

export interface IAhoiConfig {
  onboardingMessages: IOnboardingMessage[];
}
export interface IOnboardingMessage {
  anchor: any;
  requires: string[];
  text: string;
  onboardingStage: IOnboardingStage;
}

export enum EDefaultOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart",
  ANALYZING = "analyze-the-chart"
}


export type OnboardingStage = string;

export interface IOnboardingStage {
  id: string;
  title: string;
  iconClass: string;
  color: string;
  order: number;
}

// TODO: move to right place
export const defaultOnboardingStages: Map<EDefaultOnboardingStages, IOnboardingStage> = new Map([
  [EDefaultOnboardingStages.READING, {
    id: EDefaultOnboardingStages.READING,
    title: 'Reading',
    iconClass: 'fas fa-glasses',
    color: 'rgb(123, 80, 150)',
    order: 1
  }],
  [EDefaultOnboardingStages.USING, {
    id: EDefaultOnboardingStages.USING,
    title: 'Interacting',
    iconClass: 'fas fa-hand-point-up',
    color: 'rgb(0, 61, 92)',
    order: 2
  }],
  [EDefaultOnboardingStages.ANALYZING, {
    id: EDefaultOnboardingStages.ANALYZING,
    title: 'Analyzing',
    iconClass: 'fas fa-lightbulb',
    color: 'rgb(254, 128, 41)',
    order: 3
  }]
]);

export interface IAnchorPosition {
  x: number;
  y: number;
  cx: number;
  cy: number;
  offset?: {left?: number, top?: number, right?: number, bottom?: number}
}

export interface ITooltip {
  title: string;
  text: string;
}

export interface IMarkerInformation {
  tooltip: ITooltip,
  anchorPosition: IAnchorPosition,
  message: IOnboardingMessage,
}
