import { ISpecProp, IOnboardingSpec, IOnboardingMessage, OnboardingStage, EDefaultOnboardingStages } from "./interfaces";
import {getAnchor} from './utils';

export interface IOnboardingChangeMatrixSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
}


function generateMessages(spec: IOnboardingChangeMatrixSpec, visElement: Element): IOnboardingMessage[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      legend: `The chart Is based on colored ${spec.type?.value} elements.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      legend: `The legend shows the ${spec.legendTitle?.value} for the chart. The colors range from blue to white and brown.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      legend: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const changeMatrix = {
  generateMessages
};
