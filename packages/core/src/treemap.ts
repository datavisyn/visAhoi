import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage
} from './interfaces'
import { getAnchor } from './utils'

export interface IOnboardingTreemapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  desc?: ISpecProp;
  subDesc?: ISpecProp;
  otherDesc?: ISpecProp;
  gapDesc?: ISpecProp;
  interactingDesc?: ISpecProp;
  maxValueDesc?: ISpecProp;
  minValueDesc?: ISpecProp;
  minValue?: ISpecProp;
  maxValue?: ISpecProp;
}

function generateMessages (
  spec: IOnboardingTreemapSpec,
  visElement: Element
): IOnboardingMessage[] {
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.desc, visElement),
      requires: ['desc'],
      text: 'The treemap visualization shows the breakdown of hierarchical data level by level. The size of each rectangle represents a quantitative value associated with each element in the hierarchy.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 2
    },
    {
      anchor: getAnchor(spec.subDesc, visElement),
      requires: ['subDesc'],
      text: 'The area covered by the whole treemap is subdivided recursively into sub-categories according to their quantitative values, level by level.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 3
    },
    {
      anchor: getAnchor(spec.otherDesc, visElement),
      requires: ['otherDesc'],
      text: 'Items on the bottom level that belong to the same sub-category are visually represented by using the same color.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 4
    },
    {
      anchor: getAnchor(spec.gapDesc, visElement),
      requires: ['gapDesc'],
      text: 'Items within a sub-category are represented by rectangles that are closely packed together with increasingly larger gaps to the neighboring categories.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-5'
      },
      id: 'unique-message-id-5',
      order: 5
    },

    {
      anchor: getAnchor(spec.interactingDesc, visElement),
      requires: ['interactingDesc'],
      text: 'Hover over the rectangles to get the dedicated value of the sub-category and further information.',
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: 'unique-marker-id-6'
      },
      id: 'unique-message-id-6',
      order: 1
    },

    {
      anchor: getAnchor(spec.maxValueDesc, visElement),
      requires: ['maxValueDesc', 'maxValue'],
      text: `The largest rectangle holds the maximum value in the sub-category. In this sub-category ${spec.maxValue?.value} is the maximum value.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-7'
      },
      id: 'unique-message-id-7',
      order: 2
    },

    {
      anchor: getAnchor(spec.minValueDesc, visElement),
      requires: ['minValueDesc', 'minValue'],
      text: ` The smallest rectangle holds the minimum value in the sub-category. In this sub-category ${spec.minValue?.value} is the minimum value.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-8'
      },
      id: 'unique-message-id-8',
      order: 1
    }
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The chart shows the ${spec.chartTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-1'
      },
      id: 'unique-message-id-1',
      order: 1
    })
  }

  // Filter for messages where all template variables are available in the spec

  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  )
}

export const treemap = {
  generateMessages
}
