import { EVisualizationType, IOnboardingMessage, generateMessages } from '@visahoi/core'
import { Spec } from 'vega-typings'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingScatterplotSpec {
  const v = vegaSpec

  const grid = document
    .getElementsByClassName('background')[0]
    .getBoundingClientRect()

  const points = Array.from(
    document
      .getElementsByClassName('mark-symbol role-mark marks')[0]
      .getElementsByTagName('path')
  ).filter(
    (point) =>
      point.getBoundingClientRect().x &&
      point.getBoundingClientRect().x <= grid.width + grid.x &&
      point.getBoundingClientRect().y &&
      point.getBoundingClientRect().y <= grid.height + grid.y
  )

  const xVals = points.map((point) => point.getBoundingClientRect().x)
  const yVals = points.map((point) => point.getBoundingClientRect().y)

  const data = points.map((point) => point)

  const ttt = data.map((tt) => tt?.__data__.datum)

  const horsepowerArray = ttt.map(t => t.Horsepower)
  const milePerGallonArray = ttt.map(t => t.Miles_per_Gallon)

  const maxX = Math.max(...horsepowerArray)
  const minX = Math.min(...horsepowerArray)

  const maxIndex = horsepowerArray.indexOf(maxX)
  const minIndex = horsepowerArray.indexOf(minX)

  const maxY = milePerGallonArray[maxIndex]
  const minY = milePerGallonArray[minIndex]

  const maxPositionX = xVals[maxIndex]
  const maxPositionY = yVals[maxIndex]
  const minPositionX = xVals[minIndex]
  const minPositionY = yVals[minIndex]

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
        coords: elems[4]
      }
    },
    legendTitle: {
      value: (<any>v.legends![0]).title.toLowerCase(),
      anchor: {
        sel: '.role-legend-title',
        offset: { top: -20 }
      }
    },
    xAxisTitle: {
      value: (<any>v.axes![2]).title,
      anchor: {
        sel: "g[aria-label~='x-axis' i] .role-axis-title > text",
        offset: { left: -30, top: 10 }
      }
    },
    yAxisTitle: {
      value: (<any>v.axes![3]).title,
      anchor: {
        sel: "g[aria-label~='y-axis' i] .role-axis-title > text",
        offset: { top: -30 }
      }
    },
    maxValue: {
      value: maxPositionX,
      anchor: {
        coords: { x: maxPositionX, y: maxPositionY },
        offset: { left: 25 }
      }
    },
    maxX: {
      value: maxX
    },
    maxY: {
      value: maxY
    },
    minValue: {
      value: minPositionX,
      anchor: {
        coords: { x: minPositionX, y: minPositionY },
        offset: { left: 25 }
      }
    },
    minX: {
      value: minX
    },
    minY: {
      value: minY
    },
    interactDesc: {
      value: (<any>v.marks![0]).style,
      anchor: {
        sel: 'svg',
        coords: elems[4]
      }
    }
  }
}

export function scatterplotFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(EVisualizationType.SCATTERPLOT, onbordingSpec, visElement)
}
