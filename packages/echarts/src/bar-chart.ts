import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingBarChartSpec,
  generateMessages
} from '@visahoi/core'

/**
 * To get onboarding specifications.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y position. It is optional.
 * @returns {IOnboardingBarChartSpec} - It returns the specification for barchart.
 */

function extractOnboardingSpec (chart, coords): IOnboardingBarChartSpec {
  const dataCoords = chart._chartsViews[0]._data._itemLayouts
  const data = chart._chartsViews[0]._data
  const options = chart._model.option

  const dataArray = options.series[0].data.filter(d => !isNaN(d))

  const min = Math.min(...dataArray)
  const max = Math.max(...dataArray)

  const minIndex = dataArray.indexOf(min)
  const maxIndex = dataArray.indexOf(max)

  function getMainAxis (xType, yType) {
    if (xType === 'value' && yType === 'category') {
      return 'y'
    } else if (yType === 'value' && xType === 'category') {
      return 'x'
    }
  }
  const mainAxis = getMainAxis(options.xAxis[0].type, options.yAxis[0].type)
  return {
    chartTitle: {
      value: options?.title[0]?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 }
      }
    },
    yMin: {
      value: data._store._rawExtent[1][0],
      anchor: {
        coords: {
          x: dataCoords[minIndex].x,
          y: dataCoords[minIndex].y + (3 * dataCoords[minIndex].height)

        }
      }
    },
    type: {
      value: data.hostModel.option.type,
      anchor: {
        coords: dataCoords[8]
      }
    },
    yMax: {
      value: data._store._rawExtent[1][1],
      anchor: {
        coords: {
          x: dataCoords[maxIndex].x + dataCoords[maxIndex].width / 2,
          y: dataCoords[maxIndex].y + dataCoords[maxIndex].height / 2
        }
      }
    },
    // orientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    // yAxisOrientation: {
    //   value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    // },
    xAxisOrientation: {
      value: mainAxis && (mainAxis === 'x' ? 'horizontal' : 'vertical')
    },
    barLength: {
      value: mainAxis && (mainAxis === 'x' ? 'height' : 'width')
    },
    // xMin: {
    //   value: data._rawExtent.x[0]
    // },
    // xMax: {
    //   value: data._rawExtent.x[1]
    // },
    xAxisTitle: {
      value: options.xAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: -20 }
      }
    },
    interactionDesc: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { top: 30, left: -150 }
      }
    }
  }
}

/**
 * To generate basic onboarding messages for barchart.
 * @param {string} contextKey -Context key of the visualization.
 * @param {any} chart - Runtime object of the visualization.
 * @param {any} coords - x and y cordinates to which the onboarding is attached.
 * @param {Element} visElementId - The DOM element to which the onboardings are to be placed.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages for the visualization.
 */

export function barChartFactory (
  contextKey, 
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords)
  return generateMessages(
    contextKey, 
    EVisualizationType.BAR_CHART,
    onbordingSpec,
    visElementId
  )
}
