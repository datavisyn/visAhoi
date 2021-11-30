import {ISpecProp, IOnboardingSpec, IOnboardingMessage, EDefaultOnboardingStages, defaultOnboardingStages, IOnboardingStage, IAhoiConfig} from './interfaces';
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

function generateMessages(spec: IOnboardingBarChartSpec, visElement: Element, ahoiConfig: IAhoiConfig): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(EDefaultOnboardingStages.READING) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(EDefaultOnboardingStages.USING) as IOnboardingStage;
  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `Each ${spec.type?.value} represents a data item.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      text: `The ${spec.barLength?.value} of each ${spec.type?.value} shows e.g., the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      text: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the ${spec.xAxisTitle?.value} (x-axis).`,
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.yMin, visElement),
      requires: ['yAxisTitle', 'yMin'],
      text: `The minimum ${spec.yAxisTitle?.value} is ${spec.yMin?.value}.`,
      onboardingStage: interacting
    },
    {
      anchor: getAnchor(spec.yMax, visElement),
      requires: ['yAxisTitle', 'yMax'],
      text: `The <span class="hT">maximum</span> ${spec.yAxisTitle?.value} is ${spec.yMax?.value}.`,
      onboardingStage: interacting
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const barChart = {
  generateMessages
}
