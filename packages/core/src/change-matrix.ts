import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  TooltipPosition,
  SvgIcons
} from './interfaces'
import { getAnchor } from './utils'
import { v4 as uuidv4 } from "uuid";


export interface IOnboardingChangeMatrixSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  legendTitle?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  min?: ISpecProp;
  max?: ISpecProp;
  interactionDesc?: ISpecProp;
  minColor?: ISpecProp;
  maxColor?: ISpecProp;
  plotlyModebar?: ISpecProp;
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

  const modebar = document.getElementsByClassName('modebar-btn');
  const modebarText = []
  
  if(modebar){
    for(let i=0; i<modebar.length; i++){
      modebarText.push(modebar.item(i)?.dataset?.title)
    }    
  }

  let modeIconDescription = ''
  const cameraIcon = `${modebarText.includes('Download plot as a png') ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the change-matrix.<br/>`: ''}`
  const zoomIcon = `${modebarText.includes('Zoom') ? `${SvgIcons.ZOOM} <b>Zooming</b>: With the left click you can zoom in the chart to get a more detailed view on the data.<br/>`: ''}`
  const panIcon = `${modebarText.includes('Pan') ? `${SvgIcons.PAN} <b>Panning</b>: You can move the view left and right while dragging the mouse.<br/>`: ''}`
  const selectionIcon = `${modebarText.includes('Box Select') ? `${SvgIcons.BOX_SELECTION} <b>Selection</b>: Drag the mouse over the chart to select a certain subset of the data.<br/>`: ''}`
  const lassoSelectIcon = `${modebarText.includes('Lasso Select') ? `${SvgIcons.LASSO_SELECTION} <b>Lasso select</b>: Select by drawing a lasso loop in the chart.<br/>`: ''}`
  const zoomInIcon = `${modebarText.includes('Zoom in') ? `${SvgIcons.ZOOM_IN} <b>Zoom in</b>: With this you can zoom in chart.<br/>`: ''}`
  const zoomOutIcon = `${modebarText.includes('Zoom out') ? `${SvgIcons.ZOOM_OUT} <b>Zoom out:</b> With this you can zoom out the chart.<br/>`: ''}`
  const autoScaleIcon = `${modebarText.includes('Autoscale') ? `${SvgIcons.AUTO_SCALE} <b>Autoscale</b>: Changes the layout to show the complete chart.<br/>`: ''}`
  const resetIcon = `${modebarText.includes('Reset axes') ? `${SvgIcons.RESET} <b>Reset</b>: It takes the chart to the inital layout settings.<br/>`: ''}`

  function createColorRect (color = 'white') {
    return `<div class="colorRect" style="background-color: ${color}"></div>`
  }

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart is based on colored ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      tooltipPosition: 'left' as TooltipPosition,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 2
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle', 'minColor', 'maxColor'],
      text: `The legend shows the <i>${spec.chartTitle?.value}</i> where the ${createColorRect(spec.minColor?.value)} means low and ${createColorRect(spec.maxColor?.value)} means high.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 3
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The columns show the <i>${spec.xAxis?.value}</i>, while the rows show the <i>${spec.yAxis?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 4
    },
    {
      anchor: getAnchor(spec.min, visElement),
      requires: ['min', 'chartTitle'],
      text: `The minimum <i>${spec.chartTitle?.value}</i> is ${spec.min?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: uuidv4()
      },
      id: uuidv4(),
      order: 1
    },
    {
      anchor: getAnchor(spec.max, visElement),
      requires: ['max', 'chartTitle'],
      text: `The maximum <i>${spec.chartTitle?.value}</i> is ${spec.max?.value}.`,
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
      requires: ['chartTitle', 'xAxis', 'yAxis'],
      text: `Hover over the chart to get the <i> ${spec.chartTitle?.value} </i> for each <i>${spec.xAxis?.value}</i> in a different <i> ${spec.yAxis?.value}</i>.`,
      title: 'Interaction with the chart',
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
  ]

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ['chartTitle'],
      text: `The change matrix shows the <i>${spec.chartTitle?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      tooltipPosition: 'top' as TooltipPosition, // this causes the "jumping" of the tooltip when resizing
      marker: {
        radius: 8,
        content: '',
        fontSize: '20px',
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

export const changeMatrix = {
  generateMessages
}
