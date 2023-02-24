
import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingHeatmapSpec } from '@visahoi/core/src/heatmap'

/**
 * To get onboarding specifications.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y position. It is optional.
 * @returns {IOnboardingBarChartSpec} - It returns the specification for heatmap.
 */

function extractOnboardingSpec (chart, coords): IOnboardingHeatmapSpec {
  const data = chart?._model.option

  const dataArr: number[] = []
  data.series[0].data.map((d) => dataArr.push(d[d.length - 1]))

  // The 0 value is indicated as '-'. Remove this from the data array. 
  const newArray = dataArr.filter(
    element => typeof element === 'number'
  );
 
  const maxValue: number = Math.max(...newArray)
  const minValue: number = Math.min(...newArray)

  const minColor = chart._model.option.visualMap[0].inRange.color[0]
  const maxColor = chart._model.option.visualMap[0].inRange.color[2]
  const midColor = chart._model.option.visualMap[0].inRange.color[1]
 
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
    },
    maxColor: {
      value: maxColor
    },
    minColor: {
      value: minColor
    },
    midColor: {
      value: midColor
    }
  }
}

/**
 * To generate basic onboarding messages for heatmap.
 * @param {string} contextKey -Context key of the visualization.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y cordinates to which the onboarding is attached.
 * @param {Element} visElementId - The DOM element to which the onboardings are to be placed.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages for the visualization.
 */

export function heatmapFactory (
  contextKey, 
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.HEATMAP,
    onbordingSpec,
    visElementId
  )
}
