import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart, coords): IOnboardingScatterplotSpec {
  const dataCoords = chart._chartsViews[0]._symbolDraw._data._itemLayouts
  const data = chart._chartsViews[0]._symbolDraw._data
  const options = chart._model.option

  const points = dataCoords.filter((point) => point[0] && point[1])
  const xVals = [...points.map((point) => point[0])]
  const yVals = [...points.map((point) => point[1])]
  let maxX = Math.max(...xVals)
  const maxXIndex = xVals.indexOf(maxX)
  const maxY = yVals[maxXIndex] + chart._dom.offsetTop
  maxX += +chart._dom.offsetLeft

  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    type: {
      value: 'scatter',
      anchor: {
        coords: { x: dataCoords[16][0], y: dataCoords[16][1] }
      }
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: -20, left: 10 }
      }
    },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    maxValue: {
      value: maxX,
      anchor: {
        coords: { x: maxX, y: maxY },
        offset: { left: 25 }
      }
    }
  }
}

export function scatterplotFactory (
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    EVisualizationType.SCATTERPLOT,
    onbordingSpec,
    visElementId
  )
}
