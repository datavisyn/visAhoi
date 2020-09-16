import { ISpecProp, IOnboardingSpec, IOnboardingMessages } from "./interfaces";
import {getAnchor} from './utils';
import {EOnboardingStages} from './onboarding';

export interface IOnboardingChangeMatrixSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
}


function generateOnboardingMessages(spec: IOnboardingChangeMatrixSpec, visElementId: string): IOnboardingMessages[] {
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
      legend: `The chart Is based on colored <span class="hT">${spec.type?.value}</span> elements.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.legendTitle, visElementId),
      requires: ['legendTitle'],
      legend: `The legend shows the <span class="hT">${spec.legendTitle?.value}</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxis, visElementId),
      requires: ['xAxis', 'yAxis'],
      legend: `The columns show the <span class="hT">${spec.xAxis?.value}</span>, while the rows show the <span class="hT">${spec.yAxis?.value}</span>.`,
      onboardingStage: EOnboardingStages.READING
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const changeMatrix = {
  generateOnboardingMessages
};
