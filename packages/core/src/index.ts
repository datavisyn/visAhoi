import {
  EVisualizationType,
  IOnboardingSpec,
  IOnboardingMessage,
} from "./interfaces";
import { barChart, IOnboardingBarChartSpec } from "./bar-chart";
import { changeMatrix, IOnboardingChangeMatrixSpec } from "./change-matrix";
import { horizonGraph, IOnboardingHorizonGraphSpec } from "./horizon-graph";
import { IOnboardingScatterplotSpec, scatterplot } from "./scatterplot";
import "@fortawesome/fontawesome-free/js/fontawesome.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import { onboardingStages } from "./components/stores";

export * from "./onboarding";
export * from "./interfaces";
export { IOnboardingBarChartSpec } from "./bar-chart";
export { IOnboardingChangeMatrixSpec } from "./change-matrix";
export { IOnboardingHorizonGraphSpec } from "./horizon-graph";
export { IOnboardingScatterplotSpec } from "./scatterplot";

export function generateMessages(
  visType: EVisualizationType,
  spec: IOnboardingSpec,
  visElement: Element
): IOnboardingMessage[] {
  let messages: IOnboardingMessage[] = [];
  switch (visType) {
    case EVisualizationType.BAR_CHART:
      messages = barChart.generateMessages(
        <IOnboardingBarChartSpec>spec,
        visElement
      );

    case EVisualizationType.CHANGE_MATRIX:
      messages = changeMatrix.generateMessages(
        <IOnboardingChangeMatrixSpec>spec,
        visElement
      );

    case EVisualizationType.HORIZON_GRAPH:
      messages = horizonGraph.generateMessages(
        <IOnboardingHorizonGraphSpec>spec,
        visElement
      );

    case EVisualizationType.SCATTERPLOT:
      messages = scatterplot.generateMessages(
        <IOnboardingScatterplotSpec>spec,
        visElement
      );
  }
  onboardingStages.set([...new Set(messages.map((m) => m.onboardingStage))]);
  return messages;
}

export default function logger(message: string) {
  console.log(message);
}
