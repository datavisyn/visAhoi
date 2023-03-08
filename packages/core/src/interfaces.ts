// @ts-ignore
import readingIcon from "./assets/glasses-solid.svg";
// @ts-ignore
import analyzingIcon from "./assets/lightbulb-solid.svg";
// @ts-ignore
import interactingIcon from "./assets/hand-point-up-regular.svg";

/**
 * Supported chart types
 */
export enum EVisualizationType {
  BAR_CHART = "bar-chart",
  CHANGE_MATRIX = "change-matrix",
  HORIZON_GRAPH = "horizon-graph",
  SCATTERPLOT = "scatterplot",
  TREEMAP = "treemap",
  HEATMAP = "heatmap",
  GENERIC = "generic",
}

export enum SvgIcons {
  CAMERA = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z" transform="matrix(1 0 0 -1 0 850)"></path></svg> `,
  ZOOM = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m1000-25l-250 251c40 63 63 138 63 218 0 224-182 406-407 406-224 0-406-182-406-406s183-406 407-406c80 0 155 22 218 62l250-250 125 125z m-812 250l0 438 437 0 0-438-437 0z m62 375l313 0 0-312-313 0 0 312z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  PAN = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m1000 350l-187 188 0-125-250 0 0 250 125 0-188 187-187-187 125 0 0-250-250 0 0 125-188-188 186-187 0 125 252 0 0-250-125 0 187-188 188 188-125 0 0 250 250 0 0-126 187 188z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  BOX_SELECTION = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m0 850l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m285 0l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m-857-286l0-143 143 0 0 143-143 0z m857 0l0-143 143 0 0 143-143 0z m-857-285l0-143 143 0 0 143-143 0z m857 0l0-143 143 0 0 143-143 0z m-857-286l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m285 0l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  LASSO_SELECTION = `<svg viewBox="0 0 1031 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m1018 538c-36 207-290 336-568 286-277-48-473-256-436-463 10-57 36-108 76-151-13-66 11-137 68-183 34-28 75-41 114-42l-55-70 0 0c-2-1-3-2-4-3-10-14-8-34 5-45 14-11 34-8 45 4 1 1 2 3 2 5l0 0 113 140c16 11 31 24 45 40 4 3 6 7 8 11 48-3 100 0 151 9 278 48 473 255 436 462z m-624-379c-80 14-149 48-197 96 42 42 109 47 156 9 33-26 47-66 41-105z m-187-74c-19 16-33 37-39 60 50-32 109-55 174-68-42-25-95-24-135 8z m360 75c-34-7-69-9-102-8 8 62-16 128-68 170-73 59-175 54-244-5-9 20-16 40-20 61-28 159 121 317 333 354s407-60 434-217c28-159-121-318-333-355z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  ZOOM_IN = `<svg viewBox="0 0 875 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m1 787l0-875 875 0 0 875-875 0z m687-500l-187 0 0-187-125 0 0 187-188 0 0 125 188 0 0 187 125 0 0-187 187 0 0-125z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  ZOOM_OUT = `<svg viewBox="0 0 875 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m1 787l0-875 875 0 0 875-875 0z m687-500l-187 0 0-187-125 0 0 187-188 0 0 125 188 0 0 187 125 0 0-187 187 0 0-125z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  AUTO_SCALE = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m250 850l-187 0-63 0 0-62 0-188 63 0 0 188 187 0 0 62z m688 0l-188 0 0-62 188 0 0-188 62 0 0 188 0 62-62 0z m-875-938l0 188-63 0 0-188 0-62 63 0 187 0 0 62-187 0z m875 188l0-188-188 0 0-62 188 0 62 0 0 62 0 188-62 0z m-125 188l-1 0-93-94-156 156 156 156 92-93 2 0 0 250-250 0 0-2 93-92-156-156-156 156 94 92 0 2-250 0 0-250 0 0 93 93 157-156-157-156-93 94 0 0 0-250 250 0 0 0-94 93 156 157 156-157-93-93 0 0 250 0 0 250z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
  RESET = `<svg viewBox="0 0 928.6 1000" class="icon" height="1em" width="1em" fill="gray" style="margin-right: 5px"><path d="m786 296v-267q0-15-11-26t-25-10h-214v214h-143v-214h-214q-15 0-25 10t-11 26v267q0 1 0 2t0 2l321 264 321-264q1-1 1-4z m124 39l-34-41q-5-5-12-6h-2q-7 0-12 3l-386 322-386-322q-7-4-13-4-7 2-12 7l-35 41q-4 5-3 13t6 12l401 334q18 15 42 15t43-15l136-114v109q0 8 5 13t13 5h107q8 0 13-5t5-13v-227l122-102q5-5 6-12t-4-13z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`,
}

export interface IBackdrop {
  visElement: Element;
  color?: string;
}

export type NavigationAlignment = "horizontal" | "vertical";

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
  return (element as IOnboardingElementAnchor).element !== undefined;
};

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

export type TooltipPosition = "top" | "bottom" | "left" | "right";

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
  // onboardingMessages: IOnboardingMessage[];
  contextKey?: string;
  alignment?: NavigationAlignment;
  backdrop?: IBackdropConfig;
  icons?: IAhoiIcons;
  showOnboardingNavigation?: boolean;
  showHelpCloseText?: boolean;
}

export enum EDefaultOnboardingStages {
  READING = "reading-the-chart",
  USING = "using-the-chart",
  ANALYZING = "analyze-the-chart",
}

export enum EDefaultOnboardingStageNavigation {
  PREVIOUS = "previous",
  NEXT = "next",
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
      title: "Reading",
      icon: readingIcon,
      hoverBackgroundColor: "rgb(92, 59, 112)",
      backgroundColor: "rgb(123, 80, 150)",
      activeBackgroundColor: "rgb(76, 46, 94)",
      order: 3,
    },
  ],
  [
    EDefaultOnboardingStages.USING,
    {
      id: EDefaultOnboardingStages.USING,
      title: "Interacting",
      icon: interactingIcon,
      backgroundColor: "rgb(0, 61, 92)",
      order: 2,
    },
  ],
  [
    EDefaultOnboardingStages.ANALYZING,
    {
      id: EDefaultOnboardingStages.ANALYZING,
      title: "Analyzing",
      icon: analyzingIcon,
      backgroundColor: "rgb(254, 128, 41)",
      order: 1,
    },
  ],
]);

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
