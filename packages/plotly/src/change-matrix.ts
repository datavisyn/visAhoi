import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingChangeMatrixSpec,
  generateMessages
} from '@visahoi/core'

/**
 * To get onboarding specifications.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y position. It is optional.
 * @returns {IOnboardingChangeMatrixSpec} - It returns the specification for change matrix.
 */


function extractOnboardingSpec (
  chart: any,
  coords
): IOnboardingChangeMatrixSpec {
  const heatmapData = (<any>(
    Array.from(<NodeList>chart.querySelectorAll('.hm'))[0]
  )).__data__
  const t = heatmapData[0].trace

  const minArr = t.z.map((d) => Math.min(...d))
  const maxArr = t.z.map((d) => Math.max(...d))

  const min = Math.min(...minArr)
  const max = Math.max(...maxArr)
  const minColor = heatmapData[0].trace.colorscale[0]
  const maxColor = heatmapData[0].trace.colorscale[2]

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
        sel: '.heatmaplayer > .hm > image'
      }
    },
    legendTitle: {
      value: t.colorbar.title.text,
      anchor: {
        sel: '.infolayer > .colorbar',
        offset: { top: -10 }
      }
    },
    yMin: {
      value: t._extremes.y.min[0].val // 0 = first trace
    },
    yMax: {
      value: t._extremes.y.max[0].val
    },
    xMin: {
      value: t._extremes.x.min[0].val // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20 }
      }
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle'
      }
    },
    min: {
      value: min,
      anchor: {
        sel: '.heatmaplayer > .hm > image',
        offset: { top: -60, left: -60 }
      }
    },
    max: {
      value: max,
      anchor: {
        sel: '.infolayer .xtitle',
        offset: { top: 80, left: -30 }
      }
    },
    interactionDesc: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: '.infolayer .ytitle',
        offset: { top: 80, left: -30 }
      }
    },
    minColor: {
      value: minColor[1]
    },
    maxColor: {
      value: maxColor[1]
    },
    plotlyModebar: {
      value: "",
      anchor: {
        sel: '.modebar--hover'
      }
    },
  }
}

/**
 * To generate basic onboarding messages for change matrix. 
 * @param {string} contextKey -Context key of the visualization.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y cordinates to which the onboarding is attached.
 * @param {Element} visElementId - The DOM element to which the onboardings to be placed.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages for the visualization.
 */

export function changeMatrixFactory (
  contextKey: string, 
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.CHANGE_MATRIX,
    onbordingSpec,
    visElementId
  )
}
