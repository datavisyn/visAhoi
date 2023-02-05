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
  plotlyModebar?: ISpecProp;
  minColor?: ISpecProp;
  maxColor?: ISpecProp;
  midColor?: ISpecProp;
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

  const modebar = document.getElementsByClassName('modebar-btn');
  const modebarText = []
  
  if(modebar){
    for(let i=0; i<modebar.length; i++){
      modebarText.push(modebar.item(i)?.dataset?.title)
    }    
  }

  let modeIconDescription = ''
  const cameraIcon = `${modebarText.includes('Download plot as a png') ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the heatmap.<br/>`: ''}`
  const zoomIcon = `${modebarText.includes('Zoom') ? `${SvgIcons.ZOOM} <b>Zooming</b>: With the left click you can zoom in the heatmap to get a more detailed view.<br/`: ''}`
  const panIcon = `${modebarText.includes('Pan') ? `${SvgIcons.PAN} <b>Panning</b>: You can move the view left and right while dragging the mouse.<br/`: ''}`
  const selectionIcon = `${modebarText.includes('Box Select') ? `${SvgIcons.BOX_SELECTION} <b>Selection</b>: Drag the mouse over heatmap to select a certain subset of the data.<br/>`: ''}`
  const lassoSelectIcon = `${modebarText.includes('Lasso Select') ? `${SvgIcons.LASSO_SELECTION} <b>Lasso select</b>: Select by drawing a lasso loop.<br/>`: ''}`
  const zoomInIcon = `${modebarText.includes('Zoom in') ? `${SvgIcons.ZOOM_IN} <b>Zoom in</b>: With this you can zoom in the heatmap.<br/>`: ''}`
  const zoomOutIcon = `${modebarText.includes('Zoom out') ? `${SvgIcons.ZOOM_OUT} <b>Zoom out:</b> With this you can zoom out the heatmap.<br/>`: ''}`
  const autoScaleIcon = `${modebarText.includes('Autoscale') ? `${SvgIcons.AUTO_SCALE} <b>Autoscale</b>: Changes the layout to show the complete heatmap.<br/>`: ''}`
  const resetIcon = `${modebarText.includes('Reset axes') ? `${SvgIcons.RESET} <b>Reset</b>: It takes the heatmap to the inital layout settings.<br/>`: ''}`
  

  function createColorRect (color = 'white') { 
    return `<div class="colorRect" style="background-color: ${color}"></div>`
  }

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The heatmap shows the <i>${spec.chartTitle?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },
    {
      anchor: getAnchor(spec.heatmapDescription, visElement),
      requires: ['heatmapDescription'],
      text: 'It is based on colored cells.',
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.legendDescription, visElement),
      requires: ['legendDescription', 'minColor', 'maxColor', 'yAxis'],
      text: `Hightest ${spec.yAxis?.value} is visualized by ${createColorRect(spec.maxColor?.value)} whereas lowest is indicated with ${createColorRect(spec.minColor?.value)}. The medium values are vizualized with ${createColorRect(spec.midColor?.value)}.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    {
      anchor: getAnchor(spec.axisDescription, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `<i>${spec.yAxis?.value}</i> is plotted in rows and the <i>${spec.xAxis?.value}</i> in columns.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 4
    },
    {
      anchor: getAnchor(spec.hoverDescription, visElement),
      requires: ['hoverDescription'],
      text: 'Hover over the chart to get the dedicated value for each cell.',
      title: 'Interacting with the chart',
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
      text: modeIconDescription.concat(cameraIcon, zoomIcon, panIcon, selectionIcon, lassoSelectIcon, zoomInIcon, zoomOutIcon, autoScaleIcon, resetIcon),   
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },

    {
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ['maxValue'],
      text: `The ${createColorRect(spec.maxColor?.value)} rectangle holds the maximum value in the heatmap. In this heatmap the maximum value is ${spec.maxValue?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },
    {
      anchor: getAnchor(spec.minValue, visElement),
      requires: ['minValue'],
      text: `The ${createColorRect(spec.minColor?.value)} rectangle holds the minimum value in the heatmap. In this heatmap the minimum value is ${spec.minValue?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.emptyValue, visElement),
      requires: ['emptyValue'],
      text: 'Transparent rectangles represent missing (null) values.',
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
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
