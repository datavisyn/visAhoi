import {
  EVisualizationType,
  IOnboardingMessage,
  IOnboardingHorizonGraphSpec,
  generateMessages,
} from "@visahoi/core";

const getMinMax = (values): [number, number, number[]] => {
  const unified: number[] = new Array(values[0].trace.y.length).fill(0);
  values?.forEach((v, i) => {
    v.trace.y.forEach((val, index) => {
      if (i === 2) {
        unified[index] -= val;
      } else {
        unified[index] += val;
      }
    });
  });
  const removedUnifiedNaN = unified.filter((f) => !isNaN(f));
  const min = Math.min(...removedUnifiedNaN);
  const max = Math.max(...removedUnifiedNaN);
  return [min, max, removedUnifiedNaN];
};

function extractOnboardingSpec(
  chart: any,
  coords,
  visElement: Element
): IOnboardingHorizonGraphSpec {
  // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  const traceNodes = chart.querySelectorAll("g.fills");

  const d1 = traceNodes[0].__data__[0];
  const d2 = traceNodes[1].__data__[0];
  const d3 = traceNodes[2].__data__[0];

  const data = [{ ...d1 }, { ...d2 }, { ...d3 }];
  const [min, max, dataArray] = getMinMax(data);
  const minIndex = dataArray.indexOf(min);
  const maxIndex = dataArray.indexOf(max);

  const posAreaNodes = traceNodes[0].querySelectorAll("path.js-fill");
  const negAreaNodes = traceNodes[2].querySelectorAll("path.js-fill");
  const areaNodesData = Array.from(posAreaNodes).map(
    (point: any) => point.__data__
  );

  const t = areaNodesData[0][0].trace;

  const positiveColor = posAreaNodes[0]?.style.fill;
  const negativeColor = negAreaNodes[0]?.style.fill;

  const xGrids = visElement.getElementsByClassName("x");

  if (t === undefined || t === null) {
    console.error(
      "Error: The trace is null or undefined, therefore not all onboarding messages can be shown."
    );
    return {
      chartTitle: {
        value: chart?.layout?.title?.text,
        anchor: {
          findDomNodeByValue: true,
          offset: { left: -20, top: 10 },
        },
      },
    };
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
      value: "area",
      anchor: {
        coords: {
          x: (t._polygons[0].xmax / 3) * 2,
          y: t._polygons[0].ymax / 2,
        },
      },
    },
    yMax: {
      value: max.toFixed(2),
      anchor: {
        coords: {
          // https://stackoverflow.com/questions/1461059/is-there-an-equivalent-to-getboundingclientrect-for-text-nodes
          x: xGrids[1].childNodes[maxIndex - 1]?.getBoundingClientRect().x,
          y:
            traceNodes[1].childNodes[0].getBoundingClientRect().y -
            visElement.getBoundingClientRect().top,
        },
      },
    },
    yMin: {
      value: min.toFixed(2),
      anchor: {
        coords: {
          x: xGrids[minIndex]?.getBoundingClientRect().x,
          y:
            traceNodes[2].childNodes[0].getBoundingClientRect().y -
            visElement.getBoundingClientRect().top,
        },
      },
    },
    xAxis: {
      value: chart.layout.xaxis.title.text,
      anchor: {
        coords: {
          x: (t._polygons[0].xmax / 3) * 2,
          y: (t._polygons[0].ymax / 3) * 2,
        },
      },
    },
    yAxis: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        sel: ".infolayer .ytitle",
      },
    },
    interactDesc: {
      value: chart.layout.yaxis.title.text,
      anchor: {
        coords: {
          x: traceNodes[0].childNodes[0].getBoundingClientRect().width / 2,
          y:
            traceNodes[1].childNodes[0].getBoundingClientRect().y -
            visElement.getBoundingClientRect().top,
        },
      },
    },
    positiveColor: {
      value: positiveColor,
      anchor: {
        coords: {
          x: traceNodes[0].childNodes[0].getBoundingClientRect().width / 2,
          y:
            traceNodes[1].childNodes[0].getBoundingClientRect().y -
            visElement.getBoundingClientRect().top,
        },
      },
    },
    negativeColor: {
      value: negativeColor,
      anchor: {
        coords: {
          x: xGrids[minIndex]?.getBoundingClientRect().x,
          y:
            traceNodes[2].childNodes[0].getBoundingClientRect().y -
            visElement.getBoundingClientRect().top +
            30,
        },
      },
    },
    plotlyModebar: {
      value: "",
      anchor: {
        sel: ".modebar--hover",
      },
    },
  };
}

export function horizonGraphFactory(
  contextKey,
  chart,
  coords,
  visElement: Element
): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(chart, coords, visElement);
  return generateMessages(
    contextKey,
    EVisualizationType.HORIZON_GRAPH,
    onbordingSpec,
    visElement
  );
}
