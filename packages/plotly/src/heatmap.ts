import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
  const heatmapData = (<any>(
    Array.from(<NodeList>chart.querySelectorAll('.hm'))[0]
  )).__data__
  const t = heatmapData[0].trace

  return {
    chartTitle: {
      value: chart.layout.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -40, top: -10 }
      }
    },
    heatmapDescription: {
      value: t.type,
      anchor: {
        sel: '.heatmaplayer > .hm > image',
        offset: { left: -50, top: -40 }
      }
    },
    legendDescription: {
      value: t.colorbar.title.text,
      anchor: {
        sel: '.infolayer > .colorbar',
        offset: { top: -10 }
      }
    },
    axisDescription: {
      value: t?.yaxis?.title?.text,
      anchor: {
        sel: '.infolayer > .g-ytitle',
        offset: { bottom: -320, left: -50 }
      }
    },
    xAxis: {
      value: chart.layout?.xaxis?.title?.text
    },
    yAxis: {
      value: chart.layout?.yaxis?.title?.text
    },
    hoverDescription: {
      value: t?.xaxis?.title?.text,
      anchor: {
        sel: '.cartesianlayer',
        offset: { left: -120, top: -90 }
      }
    }
  }
}

export function heatmapFactory (
  chart: Element,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    EVisualizationType.HEATMAP,
    onbordingSpec,
    visElementId
  )
}
