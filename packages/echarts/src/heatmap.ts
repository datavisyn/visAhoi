
import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingHeatmapSpec } from '@visahoi/core/src/heatmap'

function extractOnboardingSpec (chart, coords): IOnboardingHeatmapSpec {
  const data = chart?._model.option

  const dataArr: number[] = []
  data.series[0].data.map((d) => dataArr.push(d[d.length - 1]))

  // The 0 value is indicated as '-'. Remove this from the data array.
  const index = dataArr.indexOf('-')

  if (index !== -1) {
    dataArr.splice(index, 1)
  }
  const maxValue: number = Math.max(...dataArr)
  const minValue: number = Math.min(...dataArr)

  return {
    chartTitle: {
      value: data.title[0].text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    axisDescription: {
      value: data?.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -40, top: -320 }
      }
    },

    xAxis: {
      value: data?.xAxis[0].name
    },
    yAxis: {
      value: data?.yAxis[0].name
    },
    legendDescription: {
      value: data.visualMap[0].max,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -40, top: 20 }
      }
    },
    hoverDescription: {
      value: dataArr[0],
      anchor: {
        findDomNodeByValue: true,
        offset: { left: 10, top: -10 }
      }
    },
    maxValue: {
      value: maxValue,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: 20, top: -20 }
      }
    },
    minValue: {
      value: minValue,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: 20, top: -20 }
      }
    }
  }
}

export function heatmapFactory (
  chart,
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
