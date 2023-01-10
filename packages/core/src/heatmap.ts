import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage
} from './interfaces'
import { getAnchor } from './utils'

export interface IOnboardingHeatmapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  heatmapDescription?: ISpecProp;
  legendDescription?: ISpecProp;
  axisDescription?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  hoverDescription?: ISpecProp;
  missingDataDescription?: ISpecProp;
  maxValue?: ISpecProp;
  minValue?: ISpecProp;
  emptyValue?: ISpecProp;
}

function generateMessages (
  spec: IOnboardingHeatmapSpec,
  visElement: Element
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The heatmap shows the <i>${spec.chartTitle?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-1'
      },
      id: 'unique-message-id-2',
      order: 1
    },
    {
      anchor: getAnchor(spec.heatmapDescription, visElement),
      requires: ['heatmapDescription'],
      text: 'It is based on colored cells.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 2
    },
    {
      anchor: getAnchor(spec.legendDescription, visElement),
      requires: ['legendDescription'],
      text: 'A deep red color indicates a high temperature whereas a deep blue color indicates a low temperature. Medium values are visualized by a neutral light gray.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 3
    },
    {
      anchor: getAnchor(spec.axisDescription, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `<i>${spec.yAxis?.value}</i> is plotted in rows and the <i>${spec.xAxis?.value}</i> in columns.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 4
    },
    {
      anchor: getAnchor(spec.hoverDescription, visElement),
      requires: ['hoverDescription'],
      text: 'Hover over the chart to get the dedicated value for each cell.',
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: 'unique-marker-id-5'
      },
      id: 'unique-message-id-5',
      order: 1
    },
    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      text: `The deep red colored rectangle holds the maximum value in the heatmap. In this heatmap the maximum value is ${spec.maxValue?.value} .`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-6'
      },
      id: 'unique-message-id-6',
      order: 1
    },
    {
      anchor: getAnchor(spec.minValue, visElement),
      requires: ['minValue'],
      text: `The deep blue colored rectangle holds the minimum value in the heatmap. In this heatmap the minimum value is ${spec.minValue?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-7'
      },
      id: 'unique-message-id-7',
      order: 2
    },
    {
      anchor: getAnchor(spec.emptyValue, visElement),
      requires: ['emptyValue'],
      text: 'Transparent rectangles represent missing (null) values.',
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-8'
      },
      id: 'unique-message-id-8',
      order: 3
    }
  ]

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  )
}

export const heatmap = {
  generateMessages
}
