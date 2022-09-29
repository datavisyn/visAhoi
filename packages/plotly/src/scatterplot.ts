import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
  // const traceData = (<any>(
  //   Array.from(<NodeList>chart.querySelectorAll('.traces'))[0]
  // ))?.__data__

  const title = chart?.layout?.title?.text
  let newTitle = ''
  if (title.includes('(')) {
    const id = title.indexOf('(')
    newTitle = title.substring(0, id)
  }
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
    },
    legendTitle: {
      value: chart.data[0]?.marker?.colorbar?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 20 }
      }
    }
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
  console.log(onbordingSpec, 'onboardingSpec')
  return generateMessages(
    EVisualizationType.SCATTERPLOT,
    onbordingSpec,
    visElementId
  )
}
