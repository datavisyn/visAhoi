import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingBarChartSpec,
  generateMessages
} from '@visahoi/core'
import { Spec } from 'vega-typings'

function getOrientation (scales) {
  const [s1, s2] = scales
  const { name: s1Name, type: s1Type } = s1
  const { name: s2Name, type: s2Type } = s2

  return {
    x: s1Type === 'band' ? 'horizontal' : 'vertical',
    y: s2Type === 'band' ? 'horizontal' : 'vertical',
    b: s1Type === 'band' ? 'height' : 'width'
  }
}

export function getMinMax (data) {
  const values = getPropertyValues(data)
  const keys = Object.keys(values)
  const res: {key: string, min: number, max: number}[] = []

  keys.forEach((k) => {
    res.push({
      key: k,
      min: Math.min(...values[k]),
      max: Math.max(...values[k])

    })
  })

  return res
}

function getPropertyValues (arr) {
  const res = {}
  const keys = Object.keys(arr[0])

  keys.forEach((k) => {
    res[k] = arr.map((e) => e[k])
  })

  return res
}

function extractOnboardingSpec (vegaSpec: Spec, aggregatedValues: any[], elems: any[]): IOnboardingBarChartSpec {
  const v = vegaSpec
  const a = aggregatedValues

  const { x, y, b } = getOrientation(v.scales)
  const axesMinMax = getMinMax(a)

  const dataArray = getPropertyValues(a)
  const minIndex = dataArray?.temp?.indexOf(axesMinMax[0].min)
  const maxIndex = dataArray?.temp?.indexOf(axesMinMax[0].max)

  const rectBars = document.getElementsByClassName('mark-rect role-mark marks')

  return {
    chartTitle: {
      value: typeof v.title === 'string' ? v.title : v.title?.text,
      anchor: {
        sel: '.role-title-text',
        offset: { left: -20 }
      }
    },
    type: {
      value: (<any>v.marks![0]).style,
      anchor: {
        sel: 'svg',
        coords: {
          x: rectBars[0].childNodes[3]?.getBoundingClientRect()?.x,
          y: rectBars[0].childNodes[3]?.getBoundingClientRect()?.y
        }
      }
    },
    orientation: {
      value: null
    },
    xAxisOrientation: {
      value: x
    },
    yAxisOrientation: {
      value: y
    },
    barLength: {
      value: b
    },
    xMin: {
      value: axesMinMax[1].min
    },
    xMax: {
      value: axesMinMax[1].max
    },
    yMin: {
      value: axesMinMax[0].min.toFixed(1),
      anchor: {
        sel: 'svg',
        coords: minIndex
          ? {
              x: rectBars[0].childNodes[minIndex]?.getBoundingClientRect()?.x,
              y: rectBars[0].childNodes[minIndex]?.getBoundingClientRect()?.y
            }
          : elems[2]
      }
    },
    yMax: {
      value: axesMinMax[0].max.toFixed(1),
      anchor: {
        sel: 'svg',
        coords: maxIndex
          ? {
              x: rectBars[0].childNodes[maxIndex]?.getBoundingClientRect()?.x,
              y: rectBars[0].childNodes[maxIndex]?.getBoundingClientRect()?.y
            }
          : elems[7]
      }
    },
    xAxisTitle: {
      value: (<any>v.axes![1]).title,
      anchor: {
        sel: "g[aria-label~='x-axis' i] .role-axis-title > text",
        offset: { left: -30, top: 10 }
      }
    },
    yAxisTitle: {
      value: (<any>v.axes![2]).title,
      anchor: {
        sel: "g[aria-label~='y-axis' i] .role-axis-title > text",
        offset: { top: -30 }
      }
    },
    interactionDesc: {
      value: (<any>v.axes![2]).title,
      anchor: {
        coords: {
          x: rectBars[0].childNodes[2]?.getBoundingClientRect()?.x,
          y: rectBars[0].childNodes[2]?.getBoundingClientRect()?.y
        }
      }
    }
  }
}

export function barChartFactory (contextKey: string, vegaSpec: Spec, aggregatedValues: any[], elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, aggregatedValues, elems)
  return generateMessages(contextKey, EVisualizationType.BAR_CHART, onbordingSpec, visElement)
}
