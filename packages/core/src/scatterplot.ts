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
// @ts-ignore
import chevronUp from "../src/assets/chevron-up-solid.svg";
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

const tesst = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em"><path d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z" transform="matrix(1 0 0 -1 0 850)"></path></svg> `;
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
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebarPreMarker, visElement),
      requires: ['plotlyModebarPreMarker', 'plotlyModebar'],
      text: "When hovering over the visualization, a modebar appears on the top.",
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },
    {
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebar, visElement),
      requires: ['plotlyModebar'],
      text: tesst,
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.plotlyLegendInteractions, visElement),
      requires: ['plotlyLegendInteractions'],
      text: "It is possible to hide or show points of the same category by clicking on them in the legend.",
      title: "Legend interactions",
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    // {
    //   anchor: getAnchor(spec.xAxisTitle, visElement),
    //   requires: ['xAxisTitle', 'yAxisTitle'],
    //   text: `The columns show the ${spec.xAxisTitle?.value}, while the rows show the ${spec.yAxisTitle?.value}.`,
    //   title: 'Reading the chart',
    //   onboardingStage: reading,
    //   marker: {
    //     id: uuidv4()
    //   },
    //   id: uuidv4(),
    //   order: 3
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
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },

    {
      anchor: getAnchor(spec.interactDesc, visElement),
      requires: ['interactDesc', 'type'],
      text: 'Hover over the chart to get the dedicated value for each data point.',
      title: 'Interaction with the chart',
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    })
  }

  if (spec.legendTitle?.value !== '') {
    messages.unshift({
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle'],
      text: `The color of the scatterplot elements represents the amount of <i>${spec.legendTitle?.value}  </i>, where ${createColorRect(spec.minColor?.value)} represents the lowest and ${createColorRect(spec.maxColor?.value)} represents the highest value. `,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
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
        id: uuidv4()
      },
      id: uuidv4(),
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
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    })
  }

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The scatterplot shows the <i>${spec.chartTitle?.value}</i>.`,
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

export const scatterplot = {
  generateMessages
}
