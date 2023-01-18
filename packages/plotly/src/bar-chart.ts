import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingBarChartSpec,
  generateMessages
} from '@visahoi/core'

function extractOnboardingSpec (chart: any, coords): IOnboardingBarChartSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll('g.points')
  const barNodes = traceNodes[0].querySelectorAll('g.point')
  const barNodesData = Array.from(barNodes).map((point: any) => point.__data__)

  const t = barNodesData[0].trace
  const min = t._extremes.y.min[0].val
  const max = t._extremes.y.max[0].val
  const minIndex = chart._fullData[0].y.indexOf(min)
  const maxIndex = chart._fullData[0].y.indexOf(max)
  const minX = barNodes[minIndex].getBoundingClientRect().x
  const minY = barNodes[minIndex].getBoundingClientRect().y
  const maxX = barNodes[maxIndex].getBoundingClientRect().x
  const maxY = barNodes[maxIndex].getBoundingClientRect().y

  return {
    chartTitle: {
      value: chart?.layout?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    type: {
      value: t.type,
      anchor: {
        sel: '.bars > .points > .point:nth-child(4)'
      }
    },
    orientation: {
      value: t.orientation === 'v' ? 'vertical' : 'horizontal'
    },
    yAxisOrientation: {
      value: t.orientation === 'v' ? 'vertical' : 'horizontal'
    },
    xAxisOrientation: {
      value: t.orientation === 'v' ? 'horizontal' : 'vertical'
    },
    barLength: {
      value: t.orientation === 'v' ? 'height' : 'width'
    },
    yMin: {
      value: min.toFixed(1), // 0 = first trace
      anchor: {
        coords: { x: minX, y: minY }
      }
    },
    yMax: {
      value: max.toFixed(1),
      anchor: {
        coords: { x: maxX, y: maxY }
      }
    },
    xMin: {
      value: t._extremes.x.min[0].val // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val
    },
    xAxisTitle: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, bottom: 10 }
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        offset: { top: -25, right: 10 }
      }
    },
    interactionDesc: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.bars > .points > .point:nth-child(1)'
      }
    }

  }
}

export function barChartFactory (
  contextKey: string, 
  chart: Element,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.BAR_CHART,
    onbordingSpec,
    visElementId
  )
}
