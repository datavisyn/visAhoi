// @ts-ignore
import readingIcon from './assets/glasses-solid.svg';
// @ts-ignore
import analyzingIcon from './assets/lightbulb-solid.svg';
// @ts-ignore
import interactingIcon from './assets/hand-point-up-regular.svg';

/**
 * Supported chart types
 */
export enum EVisualizationType {
  BAR_CHART = 'bar-chart',
  CHANGE_MATRIX = 'change-matrix',
  HORIZON_GRAPH = 'horizon-graph',
  SCATTERPLOT = 'scatterplot',
  TREEMAP = 'treemap',
  HEATMAP = 'heatmap',
}

export enum SvgIcons {
  CAMERA = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z" transform="matrix(1 0 0 -1 0 850)"></path></svg> `
  
}

export interface IBackdrop {
  visElement: Element;
  color?: string;
}

export type NavigationAlignment = 'row' | 'column';

interface IPoint {
  x: number;
  y: number;
}

interface IOnboardingAnchorBase {
  offset?: { left?: number; top?: number; right?: number; bottom?: number };
  findDomNodeByValue?: boolean;
}

interface IOnboardingCoordsAnchor extends IOnboardingAnchorBase {
  sel?: string; // TODO: can we remove this? it is part of IOnboardingDOMAnchor
  coords: IPoint | number[];
}

interface IOnboardingDOMAnchor extends IOnboardingAnchorBase {
  sel: string;
}

interface IOnboardingElementAnchor extends IOnboardingAnchorBase {
  element?: HTMLElement;
}

export type OnboardingAnchor =
  | IOnboardingCoordsAnchor
  | IOnboardingDOMAnchor
  | IOnboardingElementAnchor;

export const isOnboardingElementAnchor = (
  element: OnboardingAnchor
): element is IOnboardingElementAnchor => {
  return (element as IOnboardingElementAnchor).element !== undefined
}

export interface ISpecProp {
  value: any;
  anchor?: OnboardingAnchor;
  domNodeValue?: string;
}

export interface IOnboardingSpec {
  [key: string]: ISpecProp | undefined;
}

export interface IBackdropConfig {
  show: boolean;
  opacity?: number;
}

export interface IAhoiIcons {
  trash: string;
  close: string;
  questionmark: string;
  toggleOn: string;
  toggleOff: string;
  edit: string;
  check: string;
  chevronUp: string;
  chevronDown: string;
}

export type OnboardingStage = string;

export interface IOnboardingStage {
  id: string;
  title: string;
  icon: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  order: number;
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface IMarker {
  radius?: number;
  fontSize?: string;
  content?: string;
  id: string;
}

export interface IOnboardingMessage {
  id: string;
  anchor: OnboardingAnchor | undefined;
  requires?: string[]; // TODO: remove optional again
  text: string;
  title: string;
  onboardingStage: IOnboardingStage;
  tooltipPosition?: TooltipPosition;
  marker: IMarker;
  order?: number;
}

export interface IAhoiConfig {
  onboardingMessages: IOnboardingMessage[];
  backdrop?: IBackdropConfig;
  showHelpCloseText?: boolean;
  showOnboardingNavigation?: boolean;
}

export enum EDefaultOnboardingStages {
  READING = 'reading-the-chart',
  USING = 'using-the-chart',
  ANALYZING = 'analyze-the-chart',
}

export enum EDefaultOnboardingStageNavigation {
  PREVIOUS = 'previous',
  NEXT = 'next',
}

export interface IOnboardingStageNavigation {
  id: string;
  backgroundColor: string;
}

// TODO: move to right place
export const defaultOnboardingStages: Map<
  EDefaultOnboardingStages,
  IOnboardingStage
> = new Map([
  [
    EDefaultOnboardingStages.READING,
    {
      id: EDefaultOnboardingStages.READING,
      title: 'Reading',
      icon: readingIcon,
      hoverBackgroundColor: 'rgb(92, 59, 112)',
      backgroundColor: 'rgb(123, 80, 150)',
      activeBackgroundColor: 'rgb(76, 46, 94)',
      order: 3
    }
  ],
  [
    EDefaultOnboardingStages.USING,
    {
      id: EDefaultOnboardingStages.USING,
      title: 'Interacting',
      icon: interactingIcon,
      backgroundColor: 'rgb(0, 61, 92)',
      order: 2
    }
  ],
  [
    EDefaultOnboardingStages.ANALYZING,
    {
      id: EDefaultOnboardingStages.ANALYZING,
      title: 'Analyzing',
      icon: analyzingIcon,
      backgroundColor: 'rgb(254, 128, 41)',
      order: 1
    }
  ]
])

export interface IAnchorPosition {
  x: number;
  y: number;
  cx: number;
  cy: number;
  offset?: { left?: number; top?: number; right?: number; bottom?: number };
}

export interface ITooltip {
  title: string;
  text: string;
  position: TooltipPosition;
}

export interface IMarkerInformation {
  tooltip: ITooltip;
  anchorPosition: IAnchorPosition;
  message: IOnboardingMessage;
  marker: IMarker;
}
