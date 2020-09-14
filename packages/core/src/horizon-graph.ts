import { ISpecProp, IOnboardingSpec, IOnboardingMessages } from "./interfaces";
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

function generateOnboardingMessages(spec: IOnboardingHorizonGraphSpec): IOnboardingMessages[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
    },
    {
      anchor: spec.type?.anchor,
      requires: ['type'],
      legend: `The chart is made out of <span class="hT">${spec.type?.value}</span> elements.`,
    },
    {
      anchor: spec.xAxis?.anchor,
      requires: ['xAxis', 'yAxis'],
      legend: `The areas illustrate the <span class="hT">${spec.yAxis?.value} (y-axis)</span> over <span class="hT">${spec.xAxis?.value} (x-axis)</span>.`,
    },
    {
      anchor: spec.positiveColor?.anchor,
      requires: ['yAxis', 'positiveColor'],
      legend: `Light ${createColorRect(spec.positiveColor?.value)} areas indicate a moderate positive <span class="hT">${spec.yAxis?.value}</span> and dark
        ${createColorRect(spec.positiveColor?.value)} areas a high positive <span class="hT">${spec.yAxis?.value}</span>.`,
    },
    {
      anchor: spec.negativeColor?.anchor,
      requires: ['yAxis', 'negativeColor'],
      legend: `${createColorRect(spec.negativeColor?.value)} areas indicate a very low negative <span class="hT">${spec.yAxis?.value}</span>.`,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
};

export const horizonGraph = {
  generateOnboardingMessages
}
