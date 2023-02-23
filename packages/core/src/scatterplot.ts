
import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  SvgIcons
} from './interfaces';
import { getAnchor, getGeneralChartInteractions, getModeBarMessages } from './utils';

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

/**
 * To create a small div inside the tooltip.
 * @param {string} color - The background color required for html element. 
 * @returns It returns html element.
 */

function createColorRect (color = 'white') {
  return `<div class="colorRect" style="background-color: ${color}"></div>`
}

/**
 * To generate onbaording messages for scatterplot.
 * @param {string} contextKey - Context key of the visualization.
 * @param {IOnboardingBarChartSpec} spec - The values to be displaced and the position to place the markers.
 * @param {Element} visElement - The DOM element to which the onbaording message are mounted.
 * @param {IAhoiConfig} ahoiConfig - The configuration for the onboarding.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages.
 */

function generateMessages (
  contextKey,
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

  // const modebar = document.getElementsByClassName('modebar-btn');
  // const modebarText = []
  
  // if(modebar){
  //   for(let i=0; i<modebar.length; i++){
  //     modebarText.push(modebar.item(i)?.dataset?.title)
  //   }    
  // }

  // let modeIconDescription = ''
  
  // const modebarInteractions = getGeneralChartInteractions(modebarText); 
  // modebarInteractions.set('Download plot as a png', `${modebarText.includes('Download plot as a png') ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the scatterplot.<br/><br/>`: ''}`)

  // const modeBar = getModeBarMessages(modebarInteractions);
  


  const messages: IOnboardingMessage[] = [
    {
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebarPreMarker, visElement),
      requires: ['plotlyModebarPreMarker', 'plotlyModebar'],
      text: "When hovering over the visualization, a modebar appears on the top.",
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-1`
      },
      id: `visahoi-message-${contextKey}-1`,
      order: 1
    },
    // {
    //   // basic chart interactions for plotly
    //   anchor: getAnchor(spec.plotlyModebar, visElement),
    //   requires: ['plotlyModebar'],   
    //   text: modeIconDescription.concat(modeBar.cameraIcon, modeBar.zoomIcon, modeBar.panIcon, modeBar.selectionIcon, modeBar.lassoSelectIcon, modeBar.zoomInIcon, modeBar.zoomOutIcon, modeBar.autoScaleIcon, modeBar.resetIcon),
    //   title: "Chart interactions",
    //   onboardingStage: interacting,
    //   marker: {
    //     id: `visahoi-marker-${contextKey}-2`
    //   },
    //   id: `visahoi-message-${contextKey}-2`,
    //   order: 2
    // },
    {
      anchor: getAnchor(spec.plotlyLegendInteractions, visElement),
      requires: ['plotlyLegendInteractions'],
      text: "It is possible to hide or show points of the same category by clicking on them in the legend.",
      title: "Legend interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-3`
      },
      id: `visahoi-message-${contextKey}-3`,
      order: 3
    },
  ]

  if (spec.type?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.type, visElement),
      requires: ['type'],
      text: `The chart is based on colored ${spec.type?.value} elements.`,
      title: 'Reading the chart',
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-4`
      },
      id: `visahoi-message-${contextKey}-4`,
      order: 2
    },

    {
      anchor: getAnchor(spec.interactDesc, visElement),
      requires: ['interactDesc', 'type'],
      text: 'Hover over the chart to get the dedicated value for each data point.',
      title: 'Interaction with the chart',
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-5`
      },
      id: `visahoi-message-${contextKey}-5`,
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
        id: `visahoi-marker-${contextKey}-6`
      },
      id: `visahoi-message-${contextKey}-6`,
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
        id: `visahoi-marker-${contextKey}-7`
      },
      id: `visahoi-message-${contextKey}-7`,
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
        id: `visahoi-marker-${contextKey}-8`
      },
      id: `visahoi-message-${contextKey}-8`,
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
        id: `visahoi-marker-${contextKey}-9`
      },
      id: `visahoi-message-${contextKey}-9`,
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
