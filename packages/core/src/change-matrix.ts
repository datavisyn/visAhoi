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
}

function generateMessages (
  spec: IOnboardingChangeMatrixSpec,
  visElement: Element
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
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
      text: `The legend shows the ${spec.legendTitle?.value} for the chart. The colors range from blue to white and brown.`,
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
      text: `The columns show the ${spec.xAxis?.value}, while the rows show the ${spec.yAxis?.value}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: 'unique-marker-id-4'
      },
      id: 'unique-message-id-4',
      order: 4
    }
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The <span class="visahoi-tooltip-hover-text">chart</span> shows the ${spec.chartTitle?.value}.`,
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
