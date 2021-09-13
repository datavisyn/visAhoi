import { ISpecProp, IOnboardingSpec, IOnboardingMessages, EOnboardingStages } from "./interfaces";
import {getAnchor} from './utils';

export interface IOnboardingScatterplotSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  yAxisTitle?: ISpecProp;
  xAxisTitle?: ISpecProp;
  maxValue?: ISpecProp;
}

function generateMessages(spec: IOnboardingScatterplotSpec, visElement: Element): IOnboardingMessages[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: EOnboardingStages.ANALYZING
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      legend: `The chart Is based on colored ${spec.type?.value} elements.`,
      onboardingStage: EOnboardingStages.USING
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      legend: `The legend shows the ${spec.legendTitle?.value} for the chart. The colors range from blue to white and brown.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['xAxisTitle', 'yAxisTitle'],
      legend: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      onboardingStage: EOnboardingStages.ANALYZING
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['yAxisTitle', 'xAxisTitle'],
      legend: `the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      onboardingStage: EOnboardingStages.USING
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      legend: `The chart Is based on colored ${spec.maxValue} elements.`,
      onboardingStage: EOnboardingStages.READING
    }
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const scatterplot = {
  generateMessages
};
