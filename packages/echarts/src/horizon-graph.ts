
import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingHorizonGraphSpec,
  generateMessages
} from '@visahoi/core'

const getMinMax = (values) => {
  const unified: number[] = new Array(values[0].data.length).fill(0)
  values.forEach((v, i) => {
    v.data.forEach((val, index) => {
      if (i === 2) {
        unified[index] -= val
      } else {
        unified[index] += val
      }
    })
  })
  const removedUnifiedNaN = unified.filter((f) => !isNaN(f))
  const min = Math.min(...removedUnifiedNaN)
  const max = Math.max(...removedUnifiedNaN)

  return [min, max]
}

function extractOnboardingSpec (chart, coords): IOnboardingHorizonGraphSpec {
  // TODO: It is now hardcoded to get the colors and position. It have to be changed.
  const xAxis = [
    chart._chartsViews[0]._points[6],
    chart._chartsViews[0]._points[7]
  ]
  const positiveColor = [
    chart._chartsViews[1]._points[10],
    chart._chartsViews[1]._points[11]
  ]
  const negativeColor = [
    chart._chartsViews[2]._points[0],
    chart._chartsViews[2]._points[1]
  ]
  const options = chart._model.option

  const [min, max] = getMinMax(options.series)

  const tags = document.getElementsByTagName('g')

  const minYPosition = tags[tags.length - 1].childNodes[0].getBoundingClientRect().y
  const maxYPosition = tags[tags.length - 2].childNodes[0].getBoundingClientRect().y

  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: { x: xAxis[0], y: xAxis[1] }
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true
      }
    },
    interactDesc: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -50 }
      }
    },
    yMin: {
      value: min,
      anchor: {
        coords: {
          x: chart._chartsViews[2]._points[2],
          y: minYPosition
        }
      }
    },
    yMax: {
      value: max,
      anchor: {
        coords: {
          x: chart._chartsViews[1]._points[12],
          y: maxYPosition
        }
      }
    },
    positiveColor: {
      value: chart._chartsViews[0].__model.option.color,
      anchor: {
        coords: { x: positiveColor[0], y: positiveColor[1] }
      }
    },
    negativeColor: {
      value: chart._chartsViews[2].__model.option.color,
      anchor: {
        coords: { x: negativeColor[0], y: negativeColor[1] },
        offset: { left: -30, top: 30 }
      }
    },
    type: {
      value: 'area',
      anchor: {
        coords: {
          x: chart._chartsViews[0]._points[16],
          y: chart._chartsViews[0]._points[6]
        }
      }
    }
  }
}

export function horizonGraphFactory (
  contextKey, 
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.HORIZON_GRAPH,
    onbordingSpec,
    visElementId
  )
}
