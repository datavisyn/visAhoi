import { EVisualizationType, IOnboardingMessage, IOnboardingHorizonGraphSpec, generateMessages } from '@visahoi/core'
import { Spec } from 'vega-typings'
import { VisualizationSpec } from 'vega-embed'
import { getMinMax } from './bar-chart'

function extractOnboardingSpec (vegaSpec: Spec, visualizationSpec: VisualizationSpec, elems: any[], aggregatedValues: any[]): IOnboardingHorizonGraphSpec {
  const v = vegaSpec
  const o = visualizationSpec
  const axesMinMax = getMinMax(aggregatedValues)
  const maxLayer = document.getElementsByClassName('mark-area role-mark layer_1_marks')
  const minLayer = document.getElementsByClassName('mark-area role-mark layer_2_marks')
  const maxYPosition = maxLayer[0].getBoundingClientRect().y
  const minYPosition = minLayer[0].getBoundingClientRect().y

  // TODO: Get the minXPosition and maxXPosition

  return {
    chartTitle: {
      value: (typeof (v.title) === 'string') ? v.title : v.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    },
    xAxis: {
      value: (<any>v.axes![1]).title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    },
    yMin: {
      value: axesMinMax[0].min.toFixed(1),
      anchor: {
        coords: {
          x: elems[2].mark.items[1].x,
          y: minYPosition
        },
        offset: { left: 40, top: 10 }
      }
    },
    yMax: {
      value: axesMinMax[0].max.toFixed(1),
      anchor: {
        coords: {
          x: elems[1].mark.items[6].x,
          y: maxYPosition
        },
        offset: { left: 20, top: 10 }
      }
    },
    yAxis: {
      value: ((<any>v.axes![2]).title.charAt(0).toLowerCase() + (<any>v.axes![2]).title.slice(1))
    },
    type: {
      value: (<any>v.marks![0]).type,
      anchor: {
        coords: {
          x: elems[2].mark.items[5].x,
          y: elems[2].mark.items[5].y
        }
      }
    },
    positiveColor: {
      value: (<any>o).layer[0].mark.color,
      anchor: {
        coords: {
          x: elems[0].mark.items[elems[0].mark.items.length - 1].x,
          y: elems[0].mark.items[elems[0].mark.items.length - 1].y
        }
      }
    },
    negativeColor: {
      value: (<any>o).layer[2].mark.color,
      anchor: {
        coords: {
          x: elems[1].mark.items[1].x,
          y: elems[1].mark.items[1].y
        },
        offset: { top: 10 }
      }
    },
    interactDesc: {
      value: (<any>v.axes![2]).title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -180, top: 30 }
      }
    }
  }
}

export function horizonGraphFactory (vegaSpec: Spec, visualizationSpec: VisualizationSpec, elems: any[], aggregatedValues: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, visualizationSpec, elems, aggregatedValues)
  return generateMessages(EVisualizationType.HORIZON_GRAPH, onbordingSpec, visElement)
}
