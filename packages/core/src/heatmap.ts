import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
} from "./interfaces";
import { getAnchor } from "./utils";

export interface IOnboardingHeatmapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  heatmapDescription?: ISpecProp;
  legendDescription?: ISpecProp;
  axisDescription?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  hoverDescription?: ISpecProp;
  missingDataDescription?: ISpecProp;
}

function generateMessages(
  spec: IOnboardingHeatmapSpec,
  visElement: Element
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage;

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ["chartTitle"],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-1",
      },
    },
    {
      anchor: getAnchor(spec.heatmapDescription, visElement),
      requires: ["heatmapDescription"],
      text: "It is based on colored cells.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-2",
      },
    },
    {
      anchor: getAnchor(spec.legendDescription, visElement),
      requires: ["legendDescription"],
      text: "A deep red color indicates a high temperature whereas a deep blue color indicates a low temperature. Medium values are visualized by a neutral light gray.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-3",
      },
    },
    {
      anchor: getAnchor(spec.axisDescription, visElement),
      requires: ["xAxis", "yAxis"],
      text: `${spec.yAxis?.value} is plotted in rows and the ${spec.xAxis?.value} in columns.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-4",
      },
    },
    {
      anchor: getAnchor(spec.hoverDescription, visElement),
      requires: ["hoverDescription"],
      text: "Hover over the chart to get the dedicated value for each cell.",
      title: "Interacting with the chart",
      onboardingStage: interacting,
      marker: {
        id: "unique-marker-id-5",
      },
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
}

export const heatmap = {
  generateMessages,
};
