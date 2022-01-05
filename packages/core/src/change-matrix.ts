import { ISpecProp, IOnboardingSpec, IOnboardingMessage, defaultOnboardingStages, EDefaultOnboardingStages, IOnboardingStage } from "./interfaces";
import {getAnchor} from './utils';

export interface IOnboardingChangeMatrixSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
}


function generateMessages(spec: IOnboardingChangeMatrixSpec, visElement: Element): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(EDefaultOnboardingStages.READING) as IOnboardingStage;
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart Is based on colored ${spec.type?.value} elements.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The legend shows the ${spec.legendTitle?.value} for the chart. The colors range from blue to white and brown.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      onboardingStage: reading
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const changeMatrix = {
  generateMessages
};
