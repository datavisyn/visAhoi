import { ISpecProp, IOnboardingSpec, IOnboardingMessage, IOnboardingStage, EDefaultOnboardingStages, defaultOnboardingStages } from "./interfaces";
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

function generateMessages(spec: IOnboardingHorizonGraphSpec, visElement: Element): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(EDefaultOnboardingStages.READING) as IOnboardingStage;
  const using = defaultOnboardingStages.get(EDefaultOnboardingStages.USING) as IOnboardingStage;
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart is made out of ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The areas illustrate the ${spec.yAxis?.value} (y-axis) over ${spec.xAxis?.value} (x-axis).`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.positiveColor, visElement),
      requires: ['yAxis', 'positiveColor'],
      text: `Light ${createColorRect(spec.positiveColor?.value)} areas indicate a moderate positive ${spec.yAxis?.value} and dark
        ${createColorRect(spec.positiveColor?.value)} areas a high positive ${spec.yAxis?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.negativeColor, visElement),
      requires: ['yAxis', 'negativeColor'],
      text: `${createColorRect(spec.negativeColor?.value)} areas indicate a very low negative ${spec.yAxis?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: spec.yMin?.anchor,
      requires: ['yAxis', 'yMin'],
      text: `The <span class="hT">minimum</span> ${spec.yAxis?.value} is ${spec.yMin?.value}.`,
      title: 'Reading the chart',
      onboardingStage: using
    },
    {
      anchor: spec.yMax?.anchor,
      requires: ['yAxis', 'yMax'],
      text: `The <span class="hT">maximum</span> ${spec.yAxis?.value} is ${spec.yMax?.value}.`,
      title: 'Reading the chart',
      onboardingStage: using
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
