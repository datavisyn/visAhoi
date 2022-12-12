import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  TooltipPosition
} from './interfaces'
import { getAnchor } from './utils'

export interface IOnboardingChangeMatrixSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  min?: ISpecProp;
  max?: ISpecProp;
  interactionDesc?: ISpecProp;
}

function generateMessages (
  spec: IOnboardingChangeMatrixSpec,
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

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart Is based on colored ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      tooltipPosition: 'left' as TooltipPosition,
      marker: {
        id: 'unique-marker-id-2'
      },
      id: 'unique-message-id-2',
      order: 2
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The legend shows the <i>${spec.legendTitle?.value}</i> for the chart. The colors range from blue to white and brown.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-3'
      },
      id: 'unique-message-id-3',
      order: 3
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The columns show the <i>${spec.xAxis?.value}</i>, while the rows show the <i>${spec.yAxis?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 4
    },
    {
      anchor: getAnchor(spec.min, visElement),
      requires: ['min', 'chartTitle'],
      text: `The minimum <i>${spec.chartTitle?.value}</i> is ${spec.min?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-5'
      },
      id: 'unique-message-id-5',
      order: 1
    },
    {
      anchor: getAnchor(spec.max, visElement),
      requires: ['max', 'chartTitle'],
      text: `The maximum <i>${spec.chartTitle?.value}</i> is ${spec.max?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: 'unique-marker-id-6'
      },
      id: 'unique-message-id-6',
      order: 2
    },
    {
      anchor: getAnchor(spec.interactionDesc, visElement),
      requires: ['chartTitle', 'xAxis', 'yAxis'],
      text: `Hover over the chart to get the <i> ${spec.chartTitle?.value} </i> for each <i>${spec.xAxis?.value}</i> in different <i> ${spec.yAxis?.value}</i>.`,
      title: 'Interaction with the chart',
      onboardingStage: interacting,
      marker: {
        id: 'unique-marker-id-7'
      },
      id: 'unique-message-id-7',
      order: 1
    }
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The <span class="visahoi-tooltip-hover-text">chart</span> shows the <i>${spec.chartTitle?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      tooltipPosition: 'top' as TooltipPosition, // this causes the "jumping" of the tooltip when resizing
      marker: {
        radius: 8,
        content: '',
        fontSize: '20px',
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

export const changeMatrix = {
  generateMessages
}
