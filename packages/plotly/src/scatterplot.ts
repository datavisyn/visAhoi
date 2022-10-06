import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
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
    xAxisTitle: {
      value: chart.layout.xaxis?.title.text,
      anchor: {
        findDomNodeByValue: true
      }
    },
    yAxisTitle: {
      value: chart.layout.yaxis?.title.text,
      anchor: {
        findDomNodeByValue: true
      }
    },
    legendTitle: {
      value: newLegend,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 20 }
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
