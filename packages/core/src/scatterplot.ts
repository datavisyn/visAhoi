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
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  yAxisTitle?: ISpecProp;
  xAxisTitle?: ISpecProp;
  maxValue?: ISpecProp;
  minValue?: ISpecProp;
  interactDesc?: ISpecProp;
  maxX?: ISpecProp;
  maxY?: ISpecProp;
  minX?: ISpecProp;
  minY?: ISpecProp;
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
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 2
    },

    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The legend shows the <i>${spec.legendTitle?.value} </i> for the chart. The colors range from blue to white and brown.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 4
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['yAxisTitle', 'xAxisTitle'],
      text: `The <i>${spec.yAxisTitle?.value} (y-axis)</i> for a certain <i>${spec.xAxisTitle?.value} </i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-5'
      },
      id: 'unique-message-id-5',
      order: 3
    },
    {
      anchor: getAnchor(spec.interactDesc, visElement),
      requires: ['interactDesc'],
      text: 'Hover over the chart to get the dedicated value for each data point.',
      title: 'Interaction with the chart',
      onboardingStage: interacting,
      marker: {
        id: 'unique-marker-id-6'
      },
      id: 'unique-message-id-6',
      order: 1
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue', 'maxX', 'maxY'],
      text: `The data point (${spec.maxX?.value}, ${spec.maxY?.value}) is the farest point from the origin.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-7'
      },
      id: 'unique-message-id-7',
      order: 1
    },
    {
      anchor: getAnchor(spec.minValue, visElement),
      requires: ['minValue', 'minX', 'minY'],
      text: `The data point (${spec.minX?.value}, ${spec.minY?.value}) is the closest point to the origin.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-8'
      },
      id: 'unique-message-id-8',
      order: 2
    }

  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The scatterplot shows the <i>${spec.chartTitle?.value}</i>.`,
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

export const scatterplot = {
  generateMessages
}
