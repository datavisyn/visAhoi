import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage
} from './interfaces'
import { getAnchor } from './utils'

export interface IOnboardingScatterplotSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  title?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  yAxisTitle?: ISpecProp;
  xAxisTitle?: ISpecProp;
  maxValue?: ISpecProp;
}

function generateMessages (
  spec: IOnboardingScatterplotSpec,
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
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart Is based on colored ${spec.type?.value} elements.`,
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 1
    },
    // {
    //   anchor: getAnchor(spec.legendTitle, visElement),
    //   requires: ['legendTitle'],
    //   text: 'It shows different traces',
    //   title: 'Reading the chart',
    //   onboardingStage: reading,
    //   marker: {
    //     id: 'unique-marker-id-3'
    //   },
    //   id: 'unique-message-id-3',
    //   order: 2
    // },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['xAxisTitle', 'yAxisTitle'],
      text: `The columns show the ${spec.xAxisTitle?.value}, while the rows show the ${spec.yAxisTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 2
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['yAxisTitle', 'xAxisTitle'],
      text: `the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
      title: 'Interacting with the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-5'
      },
      id: 'unique-message-id-5',
      order: 3
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      text: `The chart Is based on colored ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-6'
      },
      id: 'unique-message-id-6',
      order: 4
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle', 'title'],
      text: `The chart shows the ${spec.title?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-1'
      },
      id: 'unique-message-id-1',
      order: 1
    })
  }

  if (spec.legendTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: 'It shows different traces',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 5
    })
  }

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  )
}

export const scatterplot = {
  generateMessages
}
