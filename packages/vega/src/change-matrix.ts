import { Spec } from 'vega-typings'
import { EVisualizationType, IOnboardingMessage, generateMessages, IOnboardingChangeMatrixSpec } from '@visahoi/core'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingChangeMatrixSpec {
  const v = vegaSpec
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
        coords: elems[0]
      }
    },
    yAxis: {
      value: (<any>v.axes![3]).title.toLowerCase()
    }
  }
}

export function changeMatrixFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(EVisualizationType.CHANGE_MATRIX, onbordingSpec, visElement)
}
