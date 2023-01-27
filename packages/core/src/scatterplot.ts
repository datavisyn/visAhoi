import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  SvgIcons
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

// export const cameraIcon = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z" transform="matrix(1 0 0 -1 0 850)"></path></svg> `;
// export const zoomIcon = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m1000-25l-250 251c40 63 63 138 63 218 0 224-182 406-407 406-224 0-406-182-406-406s183-406 407-406c80 0 155 22 218 62l250-250 125 125z m-812 250l0 438 437 0 0-438-437 0z m62 375l313 0 0-312-313 0 0 312z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const panIcon = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m1000 350l-187 188 0-125-250 0 0 250 125 0-188 187-187-187 125 0 0-250-250 0 0 125-188-188 186-187 0 125 252 0 0-250-125 0 187-188 188 188-125 0 0 250 250 0 0-126 187 188z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const boxSelectIcon = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m0 850l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m285 0l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m-857-286l0-143 143 0 0 143-143 0z m857 0l0-143 143 0 0 143-143 0z m-857-285l0-143 143 0 0 143-143 0z m857 0l0-143 143 0 0 143-143 0z m-857-286l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z m285 0l0-143 143 0 0 143-143 0z m286 0l0-143 143 0 0 143-143 0z" transform="matrix(1 0 0 -1 0 850)"></path></svg>`
// export const lassoSelectIcon = `<svg viewBox="0 0 1031 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m1018 538c-36 207-290 336-568 286-277-48-473-256-436-463 10-57 36-108 76-151-13-66 11-137 68-183 34-28 75-41 114-42l-55-70 0 0c-2-1-3-2-4-3-10-14-8-34 5-45 14-11 34-8 45 4 1 1 2 3 2 5l0 0 113 140c16 11 31 24 45 40 4 3 6 7 8 11 48-3 100 0 151 9 278 48 473 255 436 462z m-624-379c-80 14-149 48-197 96 42 42 109 47 156 9 33-26 47-66 41-105z m-187-74c-19 16-33 37-39 60 50-32 109-55 174-68-42-25-95-24-135 8z m360 75c-34-7-69-9-102-8 8 62-16 128-68 170-73 59-175 54-244-5-9 20-16 40-20 61-28 159 121 317 333 354s407-60 434-217c28-159-121-318-333-355z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const zoomInIcon = `<svg viewBox="0 0 875 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m1 787l0-875 875 0 0 875-875 0z m687-500l-187 0 0-187-125 0 0 187-188 0 0 125 188 0 0 187 125 0 0-187 187 0 0-125z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const zoomOutIcon = `<svg viewBox="0 0 875 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m1 787l0-875 875 0 0 875-875 0z m687-500l-187 0 0-187-125 0 0 187-188 0 0 125 188 0 0 187 125 0 0-187 187 0 0-125z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const autoScaleIcon = `<svg viewBox="0 0 1000 1000" class="icon" height="1em" width="1em" fill="gray"><path d="m250 850l-187 0-63 0 0-62 0-188 63 0 0 188 187 0 0 62z m688 0l-188 0 0-62 188 0 0-188 62 0 0 188 0 62-62 0z m-875-938l0 188-63 0 0-188 0-62 63 0 187 0 0 62-187 0z m875 188l0-188-188 0 0-62 188 0 62 0 0 62 0 188-62 0z m-125 188l-1 0-93-94-156 156 156 156 92-93 2 0 0 250-250 0 0-2 93-92-156-156-156 156 94 92 0 2-250 0 0-250 0 0 93 93 157-156-157-156-93 94 0 0 0-250 250 0 0 0-94 93 156 157 156-157-93-93 0 0 250 0 0 250z" transform="matrix(1 0 0 -1 0 850)"></path></svg`
// export const resetIcon = `<svg viewBox="0 0 928.6 1000" class="icon" height="1em" width="1em"><path d="m786 296v-267q0-15-11-26t-25-10h-214v214h-143v-214h-214q-15 0-25 10t-11 26v267q0 1 0 2t0 2l321 264 321-264q1-1 1-4z m124 39l-34-41q-5-5-12-6h-2q-7 0-12 3l-386 322-386-322q-7-4-13-4-7 2-12 7l-35 41q-4 5-3 13t6 12l401 334q18 15 42 15t43-15l136-114v109q0 8 5 13t13 5h107q8 0 13-5t5-13v-227l122-102q5-5 6-12t-4-13z" transform="matrix(1 0 0 -1 0 850)"></path></svg`

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
      text: `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the scatterplot.<br/>${SvgIcons.ZOOM} <b>Zooming</b>: With the left click you can zoom in the scatterplot to get a more detailed view on the data.</br>${SvgIcons.PAN} <b>Panning</b>: You can move the view left and right while dragging the mouse.</br>${SvgIcons.BOX_SELECTION} <b>Selection</b>: Drag the mouse over the dots in the scatterplot to select a certain subset of the data.</br>${SvgIcons.LASSO_SELECTION} <b>Lasso select</b>: Select points by drawing a lasso loop around the points in the graph.</br>${SvgIcons.ZOOM_IN} <b>Zoom in</b>: With this you can zoom in the data points of the graph.</br>${SvgIcons.ZOOM_OUT} <b>Zoom out:</b> With this you can zoom out the data points in the graph.<br/>${SvgIcons.AUTO_SCALE} <b>Autoscale</b>: Looks at all the data points in the plot and changes the layout to show all of them.<br/>${SvgIcons.RESET} <b>Reset</b>: It takes the plot to the inital layout settings.</br>`,      
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
