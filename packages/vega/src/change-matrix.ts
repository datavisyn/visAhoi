import { Spec } from 'vega-typings'
import { EVisualizationType, IOnboardingMessage, generateMessages, IOnboardingChangeMatrixSpec } from '@visahoi/core'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingChangeMatrixSpec {
  const v = vegaSpec

  const changeValueArray = v?.data[0]?.values.map((dd) => dd.c)
  const max = Math.max(...changeValueArray)
  const min = Math.min(...changeValueArray)
  const minIndex = changeValueArray.indexOf(min)
  const maxIndex = changeValueArray.indexOf(max)

  const pathArray = document.getElementsByClassName('mark-rect role-mark layer_0_marks')[0].childNodes
  const minPositionX = pathArray[minIndex].__data__.bounds.x2
  const minPositionY = pathArray[minIndex].__data__.bounds.y2
  const maxPositionX = pathArray[maxIndex].__data__.bounds.x2
  const maxPositionY = pathArray[maxIndex].__data__.bounds.y2

  return {
    chartTitle: {
      value: (typeof (v.title) === 'string') ? v.title : v.title?.text,
      anchor: {
        sel: '.role-title-text',
        offset: { left: -20 }
      }
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        coords: elems[elems.length - 1]
      }
    },
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
        sel: '.role-legend-title',
        offset: { top: -20 }
      }
    },
    xAxis: {
      value: (<any>v.axes![2]).title.toLowerCase(),
      anchor: {
        coords: elems[0],
        offset: { top: -120 }
      }
    },
    yAxis: {
      value: (<any>v.axes![3]).title.toLowerCase()
    },
    interactionDesc: {
      value: (<any>v.marks![0]).style,
      anchor: {
        coords: elems[elems.length - 1]
      }
    },
    min: {
      value: min,
      anchor: {
        coords: { x: minPositionX, y: minPositionY },
        offset: { top: -100 }
      }
    },
    max: {
      value: max,
      anchor: {
        coords: { x: maxPositionX, y: maxPositionY },
        offset: { top: -100 }
      }
    }
  }
}

export function changeMatrixFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(EVisualizationType.CHANGE_MATRIX, onbordingSpec, visElement)
}
