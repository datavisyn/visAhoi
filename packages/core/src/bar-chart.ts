import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  EDefaultOnboardingStages,
  defaultOnboardingStages,
  IOnboardingStage,
  IAhoiConfig,
  SvgIcons
} from './interfaces'
import { getAnchor } from './utils'
import { v4 as uuidv4 } from "uuid";


export interface IOnboardingBarChartSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  orientation?: ISpecProp;
  xAxisOrientation?: ISpecProp;
  yAxisOrientation?: ISpecProp;
  barLength?: ISpecProp;
  xMin?: ISpecProp;
  xMax?: ISpecProp;
  yMin?: ISpecProp;
  yMax?: ISpecProp;
  xAxisTitle?: ISpecProp;
  yAxisTitle?: ISpecProp;
  interactionDesc?: ISpecProp;
  plotlyModebar?: ISpecProp;
}

function generateMessages (
  spec: IOnboardingBarChartSpec,
  visElement: Element,
  ahoiConfig?: IAhoiConfig
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
      text: `Each ${spec.type?.value} represents a data item.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      text: `The ${spec.barLength?.value} of each ${spec.type?.value} shows the <i> ${spec.yAxisTitle?.value} (y-axis) </i> for a certain <i>${spec.xAxisTitle?.value} (x-axis)</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      text: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the <i> ${spec.xAxisTitle?.value} (x-axis) </i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 4
    },
    {
      anchor: getAnchor(spec.yMin, visElement),
      requires: ['yAxisTitle', 'yMin'],
      text: `The minimum <i> ${spec.yAxisTitle?.value} </i> is ${spec.yMin?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
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
      text: `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the bar chart.<br/>${SvgIcons.ZOOM} <b>Zooming</b>: With the left click you can zoom in the bar chart to get a more detailed view on the data.</br>${SvgIcons.PAN} <b>Panning</b>: You can move the view left and right while dragging the mouse.</br>${SvgIcons.BOX_SELECTION} <b>Selection</b>: Drag the mouse over the bar chart to select a certain data.</br>${SvgIcons.LASSO_SELECTION} <b>Lasso select</b>: Select the desired data by drawing a lasso loop the chart.</br>${SvgIcons.ZOOM_IN} <b>Zoom in</b>: With this you can zoom in the bars of the chart.</br>${SvgIcons.ZOOM_OUT} <b>Zoom out:</b> With this you can zoom out the bars in the chart.<br/>${SvgIcons.AUTO_SCALE} <b>Autoscale</b>: Looks at all the data points in the plot and changes the layout to show all of them.<br/>${SvgIcons.RESET} <b>Reset</b>: It takes the chart to the inital layout settings.</br>`,      
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.yMax, visElement),
      requires: ['yAxisTitle', 'yMax'],
      text: `The <span class="hT">maximum</span> <i>${spec.yAxisTitle?.value} </i> is ${spec.yMax?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.interactionDesc, visElement),
      requires: ['interactionDesc', 'xAxisTitle', 'yAxisTitle'],
      text: `Hover over the bar to get the <i> ${spec.yAxisTitle?.value} </i> for each <i>${spec.xAxisTitle?.value} </i>.`,
      title: 'Interacting with the chart',
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
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
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The bar chart shows the <i> ${spec.chartTitle?.value} </i>.`,
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

export const barChart = {
  generateMessages
}
