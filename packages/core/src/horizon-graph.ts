import { ISpecProp, IOnboardingSpec, IOnboardingMessages } from "./interfaces";
import {getAnchor} from './utils';
import {EOnboardingStages} from './onboarding';

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

function generateMessages(spec: IOnboardingHorizonGraphSpec, visElementId: string): IOnboardingMessages[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElementId),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.type, visElementId),
      requires: ['type'],
      legend: `The chart is made out of <span class="hT">${spec.type?.value}</span> elements.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxis, visElementId),
      requires: ['xAxis', 'yAxis'],
      legend: `The areas illustrate the <span class="hT">${spec.yAxis?.value} (y-axis)</span> over <span class="hT">${spec.xAxis?.value} (x-axis)</span>.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.positiveColor, visElementId),
      requires: ['yAxis', 'positiveColor'],
      legend: `Light ${createColorRect(spec.positiveColor?.value)} areas indicate a moderate positive <span class="hT">${spec.yAxis?.value}</span> and dark
        ${createColorRect(spec.positiveColor?.value)} areas a high positive <span class="hT">${spec.yAxis?.value}</span>.`,
        onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.negativeColor, visElementId),
      requires: ['yAxis', 'negativeColor'],
      legend: `${createColorRect(spec.negativeColor?.value)} areas indicate a very low negative <span class="hT">${spec.yAxis?.value}</span>.`,
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
