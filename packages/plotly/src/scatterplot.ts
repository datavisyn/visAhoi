import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
  // console.log(chart, 'chart data')
  // console.log(chart.layout)
  const traceData = (<any>(
    Array.from(<NodeList>chart.querySelectorAll('.traces'))[0]
  ))?.__data__

  // const traceNodes = chart.querySelectorAll('g.points')
  // if (traceNodes === undefined || traceNodes === null) {
  //   console.error(
  //     'Error: The trace is null or undefined, therefore not all onboarding messages can be shown.'
  //   )
  //   return {
  //     chartTitle: {
  //       value: chart?.layout?.title?.text,
  //       anchor: {
  //         findDomNodeByValue: true,
  //         offset: { left: -20, top: 10 }
  //       }
  //     }
  //   }
  // }

  // const areaNodes = traceNodes[0]?.querySelectorAll('path.point')
  // const areaNodesData = Array.from(areaNodes).map(
  //   (point: any) => point.__data__
  // )
  // const t = areaNodesData[0].trace

  // const grid = document
  //   .getElementsByClassName('nsewdrag drag')[0]
  //   .getBoundingClientRect()

  // const points = (Array.from(areaNodes) as any[]).filter(
  //   (point) =>
  //     point.getBoundingClientRect().x &&
  //     point.getBoundingClientRect().x <= grid.width + grid.x &&
  //     point.getBoundingClientRect().y &&
  //     point.getBoundingClientRect().y <= grid.height + grid.y
  // )

  // const xVals = points.map((point) => point.getBoundingClientRect().x)
  // const yVals = points.map((point) => point.getBoundingClientRect().y)

  // const maxX = Math.max(...xVals)
  // const maxXIndex = xVals.indexOf(maxX)
  // const maxY = yVals[maxXIndex]
  const title = chart?.layout?.title?.text
  let newTitle = ''
  // eslint-disable-next-line no-debugger
  debugger
  if (title.includes('(')) {
    const id = title.indexOf('(')
    newTitle = title.substring(0, id)
  }
  return {
    chartTitle: {
      value: (newTitle !== '') ? newTitle : title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    // type: {
    //   value: t.type,
    //   anchor: {
    //     sel: '.points > .point:nth-child(4)'
    //   }
    // },
    xAxisTitle: {
      value: chart.layout.xaxis?.title.text,
      anchor: {
        // sel: '.infolayer .xtitle',
        findDomNodeByValue: true
        // offset: { left: -20 }
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis?.title.text,
      anchor: {
        // sel: '.infolayer .ytitle',
        findDomNodeByValue: true
        // offset: { top: -25 }
      }
    }
    // legendTitle: {
    //   value: traceData[3]?.trace?.name,
    //   anchor: {
    //     findDomNodeByValue: true,
    //     offset: { top: 20 }
    //   }
    // }
  }
  // maxValue: {
  //   value: maxX,
  //   anchor: {
  //     coords: { x: maxX, y: maxY },
  //     offset: { left: 25 }
  //   }
  // }
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
