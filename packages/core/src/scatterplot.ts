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
  minValue?: ISpecProp;
  interactDesc?: ISpecProp;
  maxX?: ISpecProp;
  maxY?: ISpecProp;
  minX?: ISpecProp;
  minY?: ISpecProp;
  minColor?: ISpecProp;
  maxColor?: ISpecProp;
}

function createColorRect (color = 'white') {
  return `<div class="colorRect" style="background-color: ${color}"></div>`
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
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['xAxisTitle', 'yAxisTitle'],
      text: `The columns show the ${spec.xAxisTitle?.value}, while the rows show the ${spec.yAxisTitle?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 3
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
    }
    // {
    //   anchor: getAnchor(spec.yAxisTitle, visElement),
    //   requires: ['yAxisTitle', 'xAxisTitle'],
    //   text: `the ${spec.yAxisTitle?.value} (y-axis) for a certain ${spec.xAxisTitle?.value}.`,
    //   title: 'Interacting with the chart',
    //   onboardingStage: reading,
    //   marker: {
    //     id: 'unique-marker-id-5'
    //   },
    //   id: 'unique-message-id-5',
    //   order: 4
    // }
  ]

  if (spec.type?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart is based on colored ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 2
    })
  }

  if (spec.legendTitle?.value !== '') {
    messages.unshift({
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The color of the scatterplot elements represents the amount of <i>${spec.legendTitle?.value}  </i>, where ${createColorRect(spec.minColor?.value)} represents the lowest and ${createColorRect(spec.maxColor?.value)} represents the highest. `,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 4
    })
  }

  if (spec.maxValue?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue', 'maxX', 'maxY'],
      text: `The maximum <i>${spec.xAxisTitle?.value} of ${spec.maxX?.value} relates to ${spec.maxY?.value} ${spec.yAxisTitle?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-7'
      },
      id: 'unique-message-id-7',
      order: 1
    })
  }
  if (spec.maxValue?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.minValue, visElement),
      requires: ['minValue', 'minX', 'minY'],
      text: `The minimum <i>${spec.xAxisTitle?.value} of ${spec.minX?.value} relates to ${spec.minY?.value} ${spec.yAxisTitle?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-8'
      },
      id: 'unique-message-id-8',
      order: 2
    })
  }

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle', 'title'],
      text: `The scatterplot shows the <i>${spec.title?.value}</i>.`,
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
