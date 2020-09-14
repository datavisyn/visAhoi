import {ISpecProp, IOnboardingSpec, IOnboardingMessages} from './interfaces';
import {getAnchor} from './utils';
import {EOnboardingStages } from './onboarding';

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

function generateOnboardingMessages(spec: IOnboardingBarChartSpec): IOnboardingMessages[] {
  const messages = [
    {
      anchor: getAnchor(spec.chartTitle),
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage:EOnboardingStages.READING
    },
    {
      anchor: spec.type?.anchor,
      requires: ['type'],
      legend: `Each ${spec.type?.value} represents a data item.`,
      onboardingStage:EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.yAxisTitle),
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      legend: `The ${spec.barLength?.value} of each ${spec.type?.value} shows e.g., the <span class="hT">${spec.yAxisTitle?.value} (y-axis)</span> for a certain ${spec.xAxisTitle?.value}.`,
      onboardingStage:EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxisTitle),
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      legend: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the <span class="hT">${spec.xAxisTitle?.value} (x-axis)</span>.`,
      onboardingStage:EOnboardingStages.READING
    },
    {
      anchor: spec.yMin?.anchor,
      requires: ['yAxisTitle', 'yMin'],
      legend: `The <span class="hT">minimum</span> ${spec.yAxisTitle?.value} is ${spec.yMin?.value}.`,
      onboardingStage:EOnboardingStages.USING
    },
    {
      anchor: spec.yMax?.anchor,
      requires: ['yAxisTitle', 'yMax'],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle?.value} is ${spec.yMax?.value}.`,
      onboardingStage:EOnboardingStages.USING
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const barChart = {
  generateOnboardingMessages
}
