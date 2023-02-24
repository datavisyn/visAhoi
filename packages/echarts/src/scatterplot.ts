import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { IOnboardingScatterplotSpec } from '@visahoi/core/src/scatterplot'

/**
 * To get onboarding specifications.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y position. It is optional.
 * @returns {IOnboardingBarChartSpec} - It returns the specification for scatterplot.
 */

function extractOnboardingSpec (chart, coords): IOnboardingScatterplotSpec {
  const dataCoords = chart._chartsViews[0]._symbolDraw._data._itemLayouts
  const options = chart._model.option
  const data = options.series[0].data
  const points = data.filter((point) => point[0] && point[1])
  const xVals = [...points.map((point) => point[0])]
  const yVals = [...points.map((point) => point[1])]

  const maxX = Math.max(...xVals)
  const minX = Math.min(...xVals)

  const maxXIndex = xVals.indexOf(maxX)
  const minXIndex = xVals.indexOf(minX)

  const maxY = yVals[maxXIndex]
  const minY = yVals[minXIndex]

  // TODO: Get the value to child nodes only for the rect.
  const maxPositionX = document.getElementsByTagName('g')[0].children[maxXIndex + 40]?.getBoundingClientRect().x
  const maxPositionY = document.getElementsByTagName('g')[0].children[maxXIndex + 40]?.getBoundingClientRect().y

  const minPositionX = document.getElementsByTagName('g')[0].children[minXIndex + 40]?.getBoundingClientRect().x
  const minPositionY = document.getElementsByTagName('g')[0].children[minXIndex + 40]?.getBoundingClientRect().y
  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    type: {
      value: 'scatter',
      anchor: {
        coords: { x: dataCoords[16][0], y: dataCoords[16][1] }
      }
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: -20, left: 10 }
      }
    },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    maxValue: {
      value: maxX,
      anchor: {
        coords: { x: maxPositionX, y: maxPositionY },
        offset: { left: 25 }
      }
    },
    minValue: {
      value: minX,
      anchor: {
        coords: { x: minPositionX, y: minPositionY },
        offset: { left: 25 }
      }
    },
    maxX: {
      value: maxX
    },
    maxY: {
      value: maxY
    },
    minX: {
      value: minX
    },
    minY: {
      value: minY
    },

    interactDesc: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 20, left: -180 }
      }
    }
  }
}

/**
 * To generate basic onboarding messages for scatterplot.
 * @param {string} contextKey -Context key of the visualization.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y cordinates to which the onboarding is attached.
 * @param {Element} visElementId - The DOM element to which the onboardings are to be placed.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages for the visualization.
 */

export function scatterplotFactory (
  contextKey, 
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.SCATTERPLOT,
    onbordingSpec,
    visElementId
  )
}
