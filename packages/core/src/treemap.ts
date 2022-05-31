import { ISpecProp, IOnboardingSpec, IOnboardingMessage, defaultOnboardingStages, EDefaultOnboardingStages, IOnboardingStage } from "./interfaces";
import {getAnchor} from './utils';

export interface IOnboardingTreemapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  desc?: ISpecProp;
  subDesc?: ISpecProp;
  otherDesc?: ISpecProp;
  interactingDesc?: ISpecProp;
  maxValueDesc?: ISpecProp;
  minValueDesc?: ISpecProp;
  minValue?: ISpecProp;  
  maxValue?: ISpecProp;
}

function generateMessages(spec: IOnboardingTreemapSpec, visElement: Element): IOnboardingMessage[] {
  const analyzing = defaultOnboardingStages.get(EDefaultOnboardingStages.ANALYZING) as IOnboardingStage;
  const reading = defaultOnboardingStages.get(EDefaultOnboardingStages.READING) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(EDefaultOnboardingStages.USING) as IOnboardingStage;

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: analyzing,
      marker: {
        id: "unique-marker-id-1"
      }
    },
    {
      anchor: getAnchor(spec.desc, visElement),
      requires: ['desc'],
      text: `The treemap visualization shows the breakdown of hierarchical data level by level.The size of each rectangle represents a quantitative value associated with each element in the hierarchy.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-2"
      }
    },
    {
      anchor: getAnchor(spec.subDesc, visElement),
      requires: ['subDesc'],
      text: `The size of each rectangle represents a quantitative value associated with each element in the hierarchy.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-3"
      }
    },
    {
      anchor: getAnchor(spec.otherDesc, visElement),
      requires: ['otherDesc'],
      text: `Items on the bottom level that belong to the same sub-category are visually represented by using the same color.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: "unique-marker-id-4"
      }
    },

    {
      anchor: getAnchor(spec.interactingDesc, visElement),
      requires: ['interactingDesc'],
      text: `Hover over the rectangles to get the dedicated value of the sub-category and further information.`,
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: "unique-marker-id-5"
      }
    },

    {
      anchor: getAnchor(spec.maxValueDesc, visElement),
      requires: ['maxValueDesc', 'maxValue'],
      text: `Seek out the largest rectangular values. It's value is ${spec.maxValue?.value}`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: "unique-marker-id-6"
      }
    },

    {
      anchor: getAnchor(spec.minValueDesc, visElement),
      requires: ['minValueDesc', 'minValue'],
      text: `Seek out the smallest rectangular. It's value is ${spec.minValue?.value}`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: "unique-marker-id-7"
      }
    }
    
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const treemap = {
  generateMessages
};
