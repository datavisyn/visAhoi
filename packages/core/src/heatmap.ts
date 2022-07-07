import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  TooltipPosition,
} from "./interfaces";
import { getAnchor } from "./utils";

export interface IOnboardingHeatmapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  heatmapDescription?: ISpecProp;
  legendDescription?: ISpecProp;
  axisDescription?: ISpecProp;
}

function generateMessages(
  spec: IOnboardingHeatmapSpec,
  visElement: Element
): IOnboardingMessage[] {
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage;
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage;

  console.log(spec, "Spec");
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
      text: "Heatmaps visualise data through variations in colouring. It is useful for cross-examining multivariate data.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-2",
      },
    },
    {
      anchor: getAnchor(spec.legendDescription, visElement),
      requires: ["legendDescription"],
      text: "Legend helps to successfully read a heatmap. Categorical data is colour-coded, while numerical data requires a colour scale that blends from one colour to another, in order to represent the difference in high and low values.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-3",
      },
    },
    {
      anchor: getAnchor(spec.axisDescription, visElement),
      requires: ["xAxis", "yAxis"],
      text: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-3",
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
