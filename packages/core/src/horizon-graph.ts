import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  IOnboardingStage,
  EDefaultOnboardingStages,
  defaultOnboardingStages
} from './interfaces'
import { getAnchor } from './utils'
import { v4 as uuidv4 } from "uuid";

export interface IOnboardingHorizonGraphSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  positiveColor?: ISpecProp;
  negativeColor?: ISpecProp;
  interactDesc?: ISpecProp;
}

function createColorRect (color = 'white') {
  return `<div class="colorRect" style="background-color: ${color}"></div>`
}

function generateMessages (
  spec: IOnboardingHorizonGraphSpec,
  visElement: Element
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage
  const using = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart is made out of ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.yAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The areas illustrate the <i>${spec.yAxis?.value} (y-axis) </i> over <i>${spec.xAxis?.value} (x-axis)</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    {
      anchor: getAnchor(spec.positiveColor, visElement),
      requires: ['yAxis', 'positiveColor'],
      text: `Light ${createColorRect(
        spec.positiveColor?.value
      )} areas indicate a moderate positive <i>${spec.yAxis?.value} </i> and dark
        ${createColorRect(spec.positiveColor?.value)} areas a high positive <i>${
        spec.yAxis?.value
      }</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 4
    },
    {
      anchor: getAnchor(spec.negativeColor, visElement),
      requires: ['yAxis', 'negativeColor'],
      text: ` The ${createColorRect(
        spec.negativeColor?.value
      )} areas indicate a very low negative <i>${spec.yAxis?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 5
    },
    {
      anchor: spec.yMin?.anchor,
      requires: ['yAxis', 'yMin'],
      text: `The <span class="hT">minimum</span> <i>${spec.yAxis?.value} </i> is ${spec.yMin?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },
    {
      anchor: spec.yMax?.anchor,
      requires: ['yAxis', 'yMax'],
      text: `The <span class="hT">maximum</span> <i>${spec.yAxis?.value} </i> is ${spec.yMax?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.interactDesc, visElement),
      requires: ['yAxis', 'xAxis', 'interactDesc'],
      text: `Hover over the chart to get the <i>${spec.yAxis?.value} </i> for each <i>${spec.xAxis?.value} </i>.`,
      title: 'Interaction with the chart',
      onboardingStage: using,
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
      text: `The horizon graph shows the <i>${spec.chartTitle?.value}</i>.`,
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

export const horizonGraph = {
  generateMessages
}
