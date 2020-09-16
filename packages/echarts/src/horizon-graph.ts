import {
  EVisualizationType,
  IOnboardingMessages,
  IOnboardingHorizonGraphSpec,
  generateOnboardingMessages,
} from "@visahoi/core";

const getMinMax= (values) => {
  // console.log("values: ", values);
  // _chartsViews[0]._data._rawData._data
  const unified: number[] = new Array(values[0].data.length).fill(0);
  // console.log("unified: ", unified);
  values.forEach((v, i) => {
    v.data.forEach((val, index) => {
      // console.log(val, index)
      if(i === 2) {
        unified[index] -= val
      }
      else {
        unified[index] += val
      }
    })
  })
  const min = Math.min(...unified);
  const max = Math.max(...unified);
  return [min, max]
}

function generateOnboardingSpec(chart, coords): IOnboardingHorizonGraphSpec {
  const xAxis = chart._chartsViews[1]._data._itemLayouts[3];
  const positiveColor = chart._chartsViews[1]._data._itemLayouts[5];
  const negativeColor = chart._chartsViews[2]._data._itemLayouts[0];
  const options = chart._model.option;
  const [min, max] = getMinMax(chart._model.option.series);
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        findDomNodeByValue: true,
        offset: {left: -20, top: 10}
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: {x: xAxis[0], y: xAxis[1]}
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
      }
    },
    yMin: {
      value: min,
      anchor: {
        coords: {
          x: chart._chartsViews[2]._data._itemLayouts[1][0],
          y: chart._chartsViews[2]._data._itemLayouts[1][1],
        }
      },
    },
    yMax: {
      value: max,
      anchor: {
        coords: {
          x: chart._chartsViews[1]._data._itemLayouts[6][0],
          y: chart._chartsViews[1]._data._itemLayouts[6][1],
        }
      },
    },
    positiveColor: {
      value: chart._chartsViews[0].__model.option.color,
      anchor: {
        coords: {x: positiveColor[0], y: positiveColor[1]}
      }
    },
    negativeColor: {
      value: chart._chartsViews[2].__model.option.color,
      anchor: {
        coords: {x: negativeColor[0], y: negativeColor[1]},
        offset: {left: 20}
      }
    },
    type: {
      value: "area",
      anchor: {
        coords: {x: chart._chartsViews[0]._data._itemLayouts[8][0], y: chart._chartsViews[0]._data._itemLayouts[3][1]}
      }
    }
  };
}

export function horizonGraphFactory(chart, coords, visElementId: string): IOnboardingMessages[] {
  const onbordingSpec = generateOnboardingSpec(chart, coords);
  return generateOnboardingMessages(EVisualizationType.HORIZON_GRAPH, onbordingSpec, visElementId);
}
