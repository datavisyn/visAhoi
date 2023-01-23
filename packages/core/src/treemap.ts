import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage
} from './interfaces'
import { getAnchor } from './utils'
import { v4 as uuidv4 } from "uuid";

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
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.subDesc, visElement),
      requires: ['subDesc'],
      text: 'The area covered by the whole treemap is subdivided recursively into sub-categories according to their quantitative values, level by level.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    {
      anchor: getAnchor(spec.otherDesc, visElement),
      requires: ['otherDesc'],
      text: 'Items on the bottom level that belong to the same sub-category are visually represented by the same color.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 4
    },
    {
      anchor: getAnchor(spec.gapDesc, visElement),
      requires: ['gapDesc'],
      text: 'Items within a sub-category are represented by rectangles that are closely packed together with increasingly larger gaps to the neighboring categories.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 5
    },

    {
      anchor: getAnchor(spec.interactingDesc, visElement),
      requires: ['interactingDesc'],
      text: 'Hover over the rectangles to get the dedicated value of the sub-category.',
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },

    {
      anchor: getAnchor(spec.maxValueDesc, visElement),
      requires: ['maxValueDesc', 'maxValue'],
      text: `The largest rectangle holds the maximum value in the sub-category. The sub-category <i>${spec.maxValueDesc?.value}</i> holds the maximum value, which is <i>${spec.maxValue?.value}</i>.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },

    {
      anchor: getAnchor(spec.minValueDesc, visElement),
      requires: ['minValueDesc', 'minValue'],
      text: ` The smallest rectangle holds the minimum value in the sub-category. The sub-category <i>${spec.minValueDesc?.value}</i> holds the minimum value <i>${spec.minValue?.value}</i>`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    }
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `This treemap shows the <i>${spec.chartTitle?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
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
