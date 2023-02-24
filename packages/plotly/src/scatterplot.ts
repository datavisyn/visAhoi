// is this there?
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
 * @returns {IOnboardingScatterplotSpec} - It returns the specification for scatterplot.
 */

function extractOnboardingSpec (chart: any, coords): IOnboardingScatterplotSpec {
  const traceNodes = chart?.querySelectorAll('g.points')
  const areaNodes = traceNodes ? traceNodes?.[0]?.querySelectorAll('path.point') : null
  const areaNodesData = areaNodes
    ? Array.from(areaNodes).map(
      (point: any) => point.__data__
    )
    : null

  const t = areaNodesData ? areaNodesData[0]?.trace : null
  let maxX, maxY, minX, minY, minYValue, maxYValue, minXValue, maxXValue

  const grid = document
    .getElementsByClassName('nsewdrag drag')[0]
    .getBoundingClientRect()

  const points = areaNodes
    ? (Array.from(areaNodes) as any[]).filter(
        (point) =>
          point.getBoundingClientRect().x &&
      point.getBoundingClientRect().x <= grid.width + grid.x &&
      point.getBoundingClientRect().y &&
      point.getBoundingClientRect().y <= grid.height + grid.y
      )
    : null

  if (points) {
    const xVals = points.map((point) => point.getBoundingClientRect().x)
    const yVals = points.map((point) => point.getBoundingClientRect().y)

    const xData = points.map((point) => point.__data__.x)
    const yData = points.map((point) => point.__data__.y)

    maxX = Math.max(...xVals)
    minX = Math.min(...xVals)

    const maxXIndex = xVals.indexOf(maxX)
    const minXIndex = xVals.indexOf(minX)

    maxY = yVals[maxXIndex]
    minY = yVals[minXIndex]

    minXValue = Math.min(...xData)
    maxXValue = Math.max(...xData)

    const minXValueIndex = xData.indexOf(minXValue)
    const maxXValueIndex = xData.indexOf(maxXValue)

    minYValue = yData[minXValueIndex]
    maxYValue = yData[maxXValueIndex]
  }

  const title = chart?.layout?.title?.text
  const legend = chart?.data[0]?.marker?.colorbar?.title?.text
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
        offset: { left: 15, top: -10 }
      }
    },
    title: {
      value: title
    },
    type: {
      value: t?.type,
      anchor: {
        sel: '.points > .point:nth-child(4)'
      }
    },
    interactDesc: {
      value: t?.type,
      anchor: {
        sel: '.points > .point:nth-child(2)'
      }
    },
    // xAxisTitle: {
    //   value: chart.layout.xaxis.title.text,
    //   anchor: {
    //     sel: '.points > .point:nth-child(2)'
    //   }
    // },
    xAxisTitle: {
      value: chart?.layout.xaxis?.title.text,
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
    },
    maxValue: {
      value: maxX,
      anchor: {
        coords: { x: maxX, y: maxY },
        offset: { left: 25 }
      }
    },
    minValue: {
      value: minX,
      anchor: {
        coords: { x: minX, y: minY }
        // offset: { left: 25 }
      }
    },
    maxX: {
      value: maxXValue
    },
    maxY: {
      value: maxYValue
    },
    minX: {
      value: minXValue
    },
    minY: {
      value: minYValue
    },
    plotlyModebarPreMarker: {
      value: "",
      anchor: {
        sel: '.modebar--hover',
        offset: {
          left: -50,
          top: -chart.offsetHeight / 2
        }
      }
    },
    plotlyModebar: {
      value: "",
      anchor: {
        sel: '.modebar--hover'
      }
    },
    plotlyLegendInteractions: {
      value: "",
      anchor: {
        sel: '.legend'
      }
    }
  }
}

/**
 * To generate basic onboarding messages for scatterplot. 
 * @param {string} contextKey -Context key of the visualization.
 * @param {Element} chart - Runtime object of the visualization.
 * @param {any} coords - x and y cordinates to which the onboarding is attached.
 * @param {Element} visElementId - The DOM element to which the onboardings to be placed.
 * @returns {IOnboardingMessage[]} - It returns all the generated onboarding messages for the visualization.
 */

export function scatterplotFactory (
  contextKey: string, 
  chart: Element,
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
