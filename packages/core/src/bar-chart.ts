import {ISpecProp, IOnboardingSpec, IOnboardingMessage, OnboardingStage, EDefaultOnboardingStages} from './interfaces';
import {getAnchor} from './utils';

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

function generateMessages(spec: IOnboardingBarChartSpec, visElement: Element): IOnboardingMessage[] {
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
      legend: `Each ${spec.type?.value} represents a data item.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      legend: `The ${spec.barLength?.value} of each ${spec.type?.value} shows e.g., the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      legend: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the ${spec.xAxisTitle?.value} (x-axis).`,
      onboardingStage: EDefaultOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.yMin, visElement),
      requires: ['yAxisTitle', 'yMin'],
      legend: `The minimum ${spec.yAxisTitle?.value} is ${spec.yMin?.value}.`,
      onboardingStage: EDefaultOnboardingStages.USING
    },
    {
      anchor: getAnchor(spec.yMax, visElement),
      requires: ['yAxisTitle', 'yMax'],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle?.value} is ${spec.yMax?.value}.`,
      onboardingStage: EDefaultOnboardingStages.USING
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const barChart = {
  generateMessages
}
