import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
  const traceNodes = chart?.querySelectorAll('g.points')
  let areaNodes
  let areaNodesData
  let t
  let maxX, maxY
  if (traceNodes !== undefined) {
    areaNodes = traceNodes[0]?.querySelectorAll('path.point')
    areaNodesData = (areaNodes)
      ? Array.from(areaNodes).map(
        (point: any) => point.__data__
      )
      : null
    t = (areaNodesData) ? areaNodesData[0].trace : null
  }

  if (areaNodes !== undefined) {
    const grid = document
      .getElementsByClassName('nsewdrag drag')[0]
      .getBoundingClientRect()

    const points = (Array.from(areaNodes) as any[]).filter(
      (point) =>
        point.getBoundingClientRect().x &&
      point.getBoundingClientRect().x <= grid.width + grid.x &&
      point.getBoundingClientRect().y &&
      point.getBoundingClientRect().y <= grid.height + grid.y
    )

    const xVals = points.map((point) => point.getBoundingClientRect().x)
    const yVals = points.map((point) => point.getBoundingClientRect().y)

    maxX = Math.max(...xVals)
    const maxXIndex = xVals.indexOf(maxX)
    maxY = yVals[maxXIndex]
  }

  const title = chart?.layout?.title?.text
  const legend = chart.data[0]?.marker?.colorbar?.title?.text
  let newTitle = ''
  let newLegend = ''
  if (title?.includes('(')) {
    const id = title.indexOf('(')
    newTitle = title.substring(0, id)
  }
  if (legend?.includes('<')) {
    const id = legend.indexOf('<')
    newLegend = legend.substring(0, id)
  }
  console.log('test!!')
  return {
    chartTitle: {
      value: (newTitle !== '') ? newTitle : title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -10 }
      }
    },
    title: {
      value: title
    },
    type: {
      value: t.type,
      anchor: {
        sel: '.points > .point:nth-child(4)'
      }
    },
    xAxisTitle: {
      value: chart.layout.xaxis?.title.text,
      anchor: {
        findDomNodeByValue: true
      }
      // anchor: {
      //   sel: '.infolayer .xtitle',
      //   offset: { left: -20 }
      // }
    },
    yAxisTitle: {
      value: chart.layout.yaxis?.title.text,
      anchor: {
        findDomNodeByValue: true
      }
      // anchor: {
      //   sel: '.infolayer .ytitle',
      //   offset: { top: -25 }
      // }
    },
    legendTitle: {
      value: newLegend,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 20 }
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
  chart: Element,
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
