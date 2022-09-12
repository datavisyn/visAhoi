import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  EDefaultOnboardingStages,
  defaultOnboardingStages,
  IOnboardingStage,
  IAhoiConfig,
} from "./interfaces";
import { getAnchor } from "./utils";

export interface IOnboardingBarChartSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  orientation?: ISpecProp;
  xAxisOrientation?: ISpecProp;
  yAxisOrientation?: ISpecProp;
  barLength?: ISpecProp;
  xMin?: ISpecProp;
  xMax?: ISpecProp;
  yMin?: ISpecProp;
  yMax?: ISpecProp;
  xAxisTitle?: ISpecProp;
  yAxisTitle?: ISpecProp;
}

function generateMessages(
  spec: IOnboardingBarChartSpec,
  visElement: Element,
  ahoiConfig?: IAhoiConfig
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage;

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ["type"],
      text: `Each ${spec.type?.value} represents a data item.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-2",
      },
      id: "unique-message-id-2",
      order: 2,
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ["type", "barLength", "yAxisTitle", "xAxisTitle"],
      text: `The ${spec.barLength?.value} of each ${spec.type?.value} shows e.g., the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-3",
      },
      id: "unique-message-id-3",
      order: 3,
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ["type", "xAxisOrientation", "xAxisTitle"],
      text: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the ${spec.xAxisTitle?.value} (x-axis).`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-4",
      },
      id: "unique-message-id-4",
      order: 4,
    },
    {
      anchor: getAnchor(spec.yMin, visElement),
      requires: ["yAxisTitle", "yMin"],
      text: `The minimum ${spec.yAxisTitle?.value} is ${spec.yMin?.value}.`,
      title: "Interacting with the chart",
      onboardingStage: interacting,
      marker: {
        id: "unique-marker-id-5",
      },
      id: "unique-message-id-5",
      order: 1,
    },
    {
      anchor: getAnchor(spec.yMax, visElement),
      requires: ["yAxisTitle", "yMax"],
      text: `The <span class="hT">maximum</span> ${spec.yAxisTitle?.value} is ${spec.yMax?.value}.`,
      title: "Interacting with the chart",
      onboardingStage: interacting,
      marker: {
        id: "unique-marker-id-6",
      },
      id: "unique-message-id-6",
      order: 2,
    },
  ];

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ["chartTitle"],
      text: `The <span class="hT">chart shows the ${spec.chartTitle?.value}.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-1",
      },
      id: "unique-message-id-1",
      order: 1,
    });
  }

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
}

export const barChart = {
  generateMessages,
};
