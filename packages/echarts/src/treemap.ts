import { EVisualizationType, IOnboardingMessage, generateMessages } from '@visahoi/core'
import { IOnboardingTreemapSpec } from '@visahoi/core/src/treemap'

function extractOnboardingSpec (chart, coords): IOnboardingTreemapSpec {
  const options = chart._model?.option?.series[0]
  const childrenData = chart._model?.option?.series[0].data[0].children
  const childrenArr = [chart._model.option.series[0].data[0].children]

  let maxValue: number | null = null
  let minValue: number | null = null
  let maxChildName: string = ''
  let minChildName: string = ''

  childrenArr.map((child) => {
    maxValue = Math.max(...child.map((d) => d.value))
    minValue = Math.min(...child.map((d) => d.value))
  })

  childrenData.map((child) => {
    if (child.value === maxValue) {
      maxChildName = child.name
    } else if (child.value === minValue) {
      minChildName = child.name
    }
  })

  return {
    chartTitle: {
      value: options?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },

    desc: {
      value: options?.data[0]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 20 }
      }
    },

    subDesc: {
      value: options?.data[0]?.children[0]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -20 }
      }
    },

    gapDesc: {
      value: (options?.data[0]?.children[1]?.name) ? options?.data[0]?.children[1]?.name : options?.data[0]?.children[0]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -40, top: -40 }
      }
    },

    otherDesc: {
      value: (options?.data[0]?.children[2]?.name) ? options?.data[0]?.children[2]?.name : options?.data[0]?.children[1]?.name ? options?.data[0]?.children[1]?.name : options?.data[0]?.children[0]?.name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -60, top: -30 }
      }
    },

    interactingDesc: {
      value: options?.data[0]?.children[1]?.name,
      anchor: {
        findDomNodeByValue: true
      }
    },

    maxValueDesc: {
      value: maxChildName,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -30 }
      }
    },

    minValueDesc: {
      value: minChildName,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -10 }
      }
    },

    maxValue: {
      value: maxValue
    },

    minValue: {
      value: minValue
    }

  }
}

export function treemapFactory (contextKey, chart, coords, visElementId: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(contextKey, EVisualizationType.TREEMAP, onbordingSpec, visElementId)
}
