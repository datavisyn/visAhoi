/* eslint-disable no-debugger */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages,
} from "@visahoi/core";
import { IOnboardingHeatmapSpec } from "@visahoi/core/src/heatmap";

function extractOnboardingSpec(chart, coords): IOnboardingHeatmapSpec {
  const data = chart?._model.option;
  console.log(data, "Chart detail-5");
  console.log(data.visualMap[0].max, "max value");
  const dataArr: number[] = [];
  data.series[0].data.map((d) => dataArr.push(d[d.length - 1]));
  console.log(dataArr);
  const maxValue: number = Math.max.apply(Math, dataArr);
  const minValue: number = Math.min.apply(Math, dataArr)

  return {
    chartTitle: {
      value: data.title[0].text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    axisDescription: {
      value: data?.yAxis[0].name,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -40, top: -320 },
      },
    },

    xAxis: {
      value: data?.xAxis[0].name,
    },
    yAxis: {
      value: data?.yAxis[0].name,
    },
    legendDescription: {
      value: data.visualMap[0].max,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -40, top: 20 },
      },
    },
  };
}

// eslint-disable-next-line space-before-function-paren
export function heatmapFactory(
  chart,
  coords,
  visElementId: Element
): IOnboardingMessage[] {
  console.log(chart, "Chart");
  const onbordingSpec = extractOnboardingSpec(chart, coords);
  return generateMessages(
    EVisualizationType.HEATMAP,
    onbordingSpec,
    visElementId
  );
}
