import { ISpecProp, IOnboardingSpec, IOnboardingMessages } from "./interfaces";
import {getAnchor} from './utils';
import {EOnboardingStages} from './onboarding';

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
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      legend: `The chart Is based on colored <span class="hT">${spec.type?.value}</span> elements.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      legend: `The legend shows the <span class="hT">${spec.legendTitle?.value}</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['xAxisTitle', 'yAxisTitle'],
      legend: `The columns show the <span class="hT">${spec.xAxis?.value}</span>, while the rows show the <span class="hT">${spec.yAxis?.value}</span>.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['yAxisTitle', 'xAxisTitle'],
      legend: `the <span class="hT">${spec.yAxisTitle?.value} (y-axis)</span> for a certain ${spec.xAxisTitle?.value}.`,
      onboardingStage: EOnboardingStages.READING
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      legend: `The chart Is based on colored <span class="hT">${spec.maxValue}</span> elements.`,
      onboardingStage: EOnboardingStages.READING
    }
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const scatterplot = {
  generateMessages
};
