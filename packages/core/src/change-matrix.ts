import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  TooltipPosition,
  SvgIcons
} from './interfaces';
import { getAnchor, getGeneralChartInteractions, getModeBarMessages } from './utils';


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
  contextKey,
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
  
  const modebarInteractions = getGeneralChartInteractions(modebarText); 
  modebarInteractions.set('Download plot as a png', `${modebarText.includes('Download plot as a png') ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the change-matrix.<br/>`: ''}`)

  const modeBar = getModeBarMessages(modebarInteractions);

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
        id: `visahoi-marker-${contextKey}-1`
      },
      id: `visahoi-message-${contextKey}-1`,
      order: 2
    },
    {
      anchor: getAnchor(spec.legendTitle, visElement),
      requires: ['legendTitle', 'minColor', 'maxColor'],
      text: `The legend shows the <i>${spec.chartTitle?.value}</i> where the ${createColorRect(spec.minColor?.value)} means low and ${createColorRect(spec.maxColor?.value)} means high.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-2`
      },
      id: `visahoi-message-${contextKey}-2`,
      order: 3
    },
    {
      anchor: getAnchor(spec.xAxis, visElement),
      requires: ['xAxis', 'yAxis'],
      text: `The columns show the <i>${spec.xAxis?.value}</i>, while the rows show the <i>${spec.yAxis?.value}</i>.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-3`
      },
      id: `visahoi-message-${contextKey}-3`,
      order: 4
    },
    {
      anchor: getAnchor(spec.min, visElement),
      requires: ['min', 'chartTitle'],
      text: `The minimum <i>${spec.chartTitle?.value}</i> is ${spec.min?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-4`
      },
      id: `visahoi-message-${contextKey}-4`,
      order: 1
    },
    {
      anchor: getAnchor(spec.max, visElement),
      requires: ['max', 'chartTitle'],
      text: `The maximum <i>${spec.chartTitle?.value}</i> is ${spec.max?.value}.`,
      title: 'Analyzing the chart',
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-5`
      },
      id: `visahoi-message-${contextKey}-5`,
      order: 2
    },
    {
      anchor: getAnchor(spec.interactionDesc, visElement),
      requires: ['chartTitle', 'xAxis', 'yAxis'],
      text: `Hover over the chart to get the <i> ${spec.chartTitle?.value} </i> for each <i>${spec.xAxis?.value}</i> in a different <i> ${spec.yAxis?.value}</i>.`,
      title: 'Interaction with the chart',
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-6`
      },
      id: `visahoi-message-${contextKey}-6`,
      order: 1
    },
    {
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebar, visElement),
      requires: ['plotlyModebar'],
      text: modeIconDescription.concat(modeBar.cameraIcon, modeBar.zoomIcon, modeBar.panIcon, modeBar.selectionIcon, modeBar.lassoSelectIcon, modeBar.zoomInIcon, modeBar.zoomOutIcon, modeBar.autoScaleIcon, modeBar.resetIcon),
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-7`
      },
      id: `visahoi-message-${contextKey}-7`,
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
        id: `visahoi-marker-${contextKey}-7`
      },
      id: `visahoi-marker-${contextKey}-7`,
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
