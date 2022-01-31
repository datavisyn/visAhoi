import { ISpecProp, IOnboardingSpec, IOnboardingMessage, defaultOnboardingStages, EDefaultOnboardingStages, IOnboardingStage } from "./interfaces";
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

function generateMessages(spec: IOnboardingScatterplotSpec, visElement: Element): IOnboardingMessage[] {
  const analyzing = defaultOnboardingStages.get(EDefaultOnboardingStages.ANALYZING) as IOnboardingStage;
  const reading = defaultOnboardingStages.get(EDefaultOnboardingStages.READING) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(EDefaultOnboardingStages.USING) as IOnboardingStage;

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: analyzing
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart Is based on colored ${spec.type?.value} elements.`,
      title: 'Interacting with the chart',
      onboardingStage: interacting
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The legend shows the ${spec.legendTitle?.value} for the chart. The colors range from blue to white and brown.`,
      title: 'Reading the chart',
      onboardingStage: reading
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['xAxisTitle', 'yAxisTitle'],
      text: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      title: 'Reading the chart',
      onboardingStage: analyzing
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['yAxisTitle', 'xAxisTitle'],
      text: `the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      title: 'Interacting with the chart',
      onboardingStage: interacting
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      text: `The chart Is based on colored ${spec.maxValue} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading
    }
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const scatterplot = {
  generateMessages
};
