import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingHorizonGraphSpec,
  generateMessages
} from '@visahoi/core'

const getMinMax = (values) => {
  const unified: number[] = new Array(values[0].trace.y.length).fill(0)
  values?.forEach((v, i) => {
    v.trace.y.forEach((val, index) => {
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

function extractOnboardingSpec (
  chart: any,
  coords
): IOnboardingHorizonGraphSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll('g.fills')

  const d1 = traceNodes[0].__data__[0]
  const d2 = traceNodes[1].__data__[0]
  const d3 = traceNodes[2].__data__[0]

  const data = [{ ...d1 }, { ...d2 }, { ...d3 }]
  const [min1, max1] = getMinMax(data)

  const posAreaNodes = traceNodes[0].querySelectorAll('path.js-fill')
  const negAreaNodes = traceNodes[2].querySelectorAll('path.js-fill')
  const areaNodesData = Array.from(posAreaNodes).map(
    (point: any) => point.__data__
  )

  const t = areaNodesData[0][0].trace

  const positiveColor = posAreaNodes[0]?.style.fill
  const negativeColor = negAreaNodes[0]?.style.fill

  if (t === undefined || t === null) {
    console.error(
      'Error: The trace is null or undefined, therefore not all onboarding messages can be shown.'
    )
    return {
      chartTitle: {
        value: chart?.layout?.title?.text,
        anchor: {
          findDomNodeByValue: true,
          offset: { left: -20, top: 10 }
        }
      }
    }
  }

  return {
    chartTitle: {
      value: chart?.layout?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    type: {
      value: 'area',
      anchor: {
        coords: {
          x: t._polygons[0].xmax / 2,
          y: t._polygons[0].ymax
        }
      }
    },
    yMax: {
      value: max1.toFixed(2),
      anchor: {
        coords: {
          x: t._polygons[0]?.xmax / 2,
          y: t._polygons[0]?.ymax
        }
      }
    },
    yMin: {
      value: min1.toFixed(2),
      anchor: {
        coords: {
          x: t._polygons[0]?.xmax / 2 - 180,
          y: t._polygons[0]?.ymax + 60
        }
      }
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        coords: {
          x: (t._polygons[0].xmax / 3) * 2,
          y: (t._polygons[0].ymax / 3) * 2
        }
      }
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle'
      }
    },
    interactDesc: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        offset: { top: 30, left: -150 }
      }
    },
    positiveColor: {
      value: positiveColor,
      anchor: {
        coords: {
          x: t._polygons[0]?.xmax / 2,
          y: t._polygons[0]?.ymax
        }
      }
    },
    negativeColor: {
      value: negativeColor,
      anchor: {
        coords: {
          x: t._polygons[0]?.xmax / 3 - 30,
          y: t._polygons[0]?.ymax + 60
        }
      }
    }

  }
}

export function horizonGraphFactory (
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    EVisualizationType.HORIZON_GRAPH,
    onbordingSpec,
    visElementId
  )
}
