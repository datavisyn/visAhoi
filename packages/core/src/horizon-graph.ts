import { ISpecProp, IOnboardingSpec, IOnboardingMessages, EOnboardingStages } from "./interfaces";
import {getAnchor} from './utils';

export interface IOnboardingHorizonGraphSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  positiveColor?: ISpecProp;
  negativeColor?: ISpecProp;
}

function createColorRect(color = 'white') {
  return `<div class="colorRect" style="background: ${color}"></div>`;
}

function generateMessages(spec: IOnboardingHorizonGraphSpec, visElement: Element): IOnboardingMessages[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      legend: `The chart is made out of ${spec.type?.value} elements.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      legend: `The areas illustrate the ${spec.yAxis?.value} (y-axis) over ${spec.xAxis?.value} (x-axis).`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.positiveColor, visElement),
      requires: ['yAxis', 'positiveColor'],
      legend: `Light ${createColorRect(spec.positiveColor?.value)} areas indicate a moderate positive ${spec.yAxis?.value} and dark
        ${createColorRect(spec.positiveColor?.value)} areas a high positive ${spec.yAxis?.value}.`,
        onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.negativeColor, visElement),
      requires: ['yAxis', 'negativeColor'],
      legend: `${createColorRect(spec.negativeColor?.value)} areas indicate a very low negative ${spec.yAxis?.value}.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: spec.yMin?.anchor,
      requires: ['yAxis', 'yMin'],
      legend: `The <span class="hT">minimum</span> ${spec.yAxis?.value} is ${spec.yMin?.value}.`,
      onboardingStage: EOnboardingStages.USING
    },
    {
      anchor: spec.yMax?.anchor,
      requires: ['yAxis', 'yMax'],
      legend: `The <span class="hT">maximum</span> ${spec.yAxis?.value} is ${spec.yMax?.value}.`,
      onboardingStage: EOnboardingStages.USING
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
};

export const horizonGraph = {
  generateMessages
}
