import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingChangeMatrixSpec,
  generateMessages,
} from "@visahoi/core";

function extractOnboardingSpec(
  chart: any,
  coords,
  visElement: Element
): IOnboardingChangeMatrixSpec {
  const heatmapData = (<any>(
    Array.from(<NodeList>chart.querySelectorAll(".hm"))[0]
  )).__data__;
  const t = heatmapData[0].trace;

  const minArr = t.z.map((d) => Math.min(...d));
  const maxArr = t.z.map((d) => Math.max(...d));

  const min = Math.min(...minArr);
  const max = Math.max(...maxArr);
  const minColor = heatmapData[0].trace.colorscale[0];
  const maxColor = heatmapData[0].trace.colorscale[2];

  /** To get the position for placing the max, min and empty value markers */

  const xGrids = visElement.getElementsByClassName("xgrid crisp");
  const yGrids = visElement.getElementsByClassName("ygrid crisp");

  const emptyValue = t.z.map((tt) => tt.filter((n) => n === null))[0];
  const getXYPosition = (value) => {
    const ZArray = t.z.map((tt) => tt.indexOf(value));
    const XGridIndex = ZArray.filter((t) => t > -1)[0];
    const YGridIndex = ZArray.indexOf(XGridIndex);
    const x = xGrids[XGridIndex].getBoundingClientRect().x;
    const y =
      yGrids[YGridIndex].getBoundingClientRect().y -
      visElement.getBoundingClientRect().top;
    return [x, y];
  };

  const [minX, minY] = getXYPosition(min);
  const [maxX, maxY] = getXYPosition(max);

  let nullX, nullY;

  if (emptyValue && emptyValue.length > 0) {
    [nullX, nullY] = getXYPosition(null);
  }

  return {
    chartTitle: {
      value: chart?.layout?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 10 },
      },
    },
    type: {
      value: t.type,
      anchor: {
        sel: ".heatmaplayer > .hm > image",
      },
    },
    legendTitle: {
      value: t.colorbar.title.text,
      anchor: {
        sel: ".infolayer > .colorbar",
        offset: { top: -10 },
      },
    },
    yMin: {
      value: t._extremes.y.min[0].val, // 0 = first trace
    },
    yMax: {
      value: t._extremes.y.max[0].val,
    },
    xMin: {
      value: t._extremes.x.min[0].val, // 0 = first trace
    },
    xMax: {
      value: t._extremes.x.max[0].val,
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20 },
      },
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: ".infolayer .ytitle",
      },
    },
    min: {
      value: min,
      anchor: {
        coords: { x: minX, y: minY },
      },
    },
    max: {
      value: max,
      anchor: {
        coords: { x: maxX, y: maxY },
      },
    },
    interactionDesc: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: ".infolayer .ytitle",
        offset: { top: 80, left: -30 },
      },
    },
    minColor: {
      value: minColor[1],
    },
    maxColor: {
      value: maxColor[1],
    },
    plotlyModebar: {
      value: "",
      anchor: {
        sel: ".modebar--hover",
      },
    },
  };
}

export function changeMatrixFactory(
  contextKey: string,
  chart,
  coords,
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.CHANGE_MATRIX,
    onbordingSpec,
    visElement
  );
}
