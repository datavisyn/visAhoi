
const locations = ["Tallin", "Oslo", "Munich"];

const data = [
  [0, 2, -0.6],
  [1, 2, -8.4],
  [2, 2, -2.2],
  [3, 2, 1.35],
  [4, 2, -6.2],
  [5, 2, 1.1],
  [6, 2, 1.1],
  [7, 2, -1.2],
  [8, 2, 3.8],
  [9, 2, 0.5],
  [10, 2, -1.45],
  [11, 2, 0],
  [0, 1, -3.5],
  [1, 1, -8.65],
  [2, 1, -3.8],
  [3, 1, -0.5],
  [4, 1, -2.4],
  [5, 1, -3.55],
  [6, 1, 2],
  [7, 1, 0.4],
  [8, 1, 0.25],
  [9, 1, -0.3],
  [10, 1, 2.3],
  [11, 1, 0.5],
  [0, 0, 0.2],
  [1, 0, -6.95],
  [2, 0, -1.5],
  [3, 0, -3.1],
  [4, 0, -2.1],
  [5, 0, -1],
  [6, 0, 0.8],
  [7, 0, 1.1],
  [8, 0, 0.95],
  [9, 0, 2],
  [10, 0, 2.65],
  [11, 0, 2.4]
];

function makePlot() {
  d3.csv("../../data/oslo-2018.csv").then(rows => {
    processData(rows);
  });
}

function createPlot(x, y) {
  console.log(y.length);
  // Create an echarts instance
  const vis = document.getElementById("vis");
  const chart = echarts.init(vis);

  const options = {
    title: {
      text: "Average temperature change in °C between 1990 and 1991",
      left: "center"
    },
    tooltip: {},
    grid: {
      height: "50%",
      top: "10%"
    },
    yAxis: {
      type: "category",
      data: location
    },
    xAxis: {
      type: "category",
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth();
        }
      }
    },
    series: [
      {
        type: "heatmap",
        data: data,
        label: {
          show: false
        }
      }
    ],
    visualMap: {
      min: -9,
      max: 9,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
      color: ["#D2B48C", "#FDFDFD", "steelblue"]
    }
  };

  chart.setOption(options);
  generateOnboarding(chart);
}

function processData(allRows) {
  const x = [];
  const y = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    const month = `${row.year}-${row.month}`;
    if (x.includes(month)) {
      const idx = x.indexOf(month);
      y[idx].push(parseFloat(row.temp));
    } else {
      x.push(`${row.year}-${row.month}`);
      y.push([parseFloat(row.temp)]);
    }
  }
  const averagedYValues = y.map(tempArray => {
    const sum = tempArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return Math.round(sum / tempArray.length, 2);
  });
  createPlot(x, averagedYValues);
}

function generateOnboarding(chart) {
  const barNodesData = chart._chartsViews[0].__model;
  const options = chart._model.option;
  console.log("options: ", options);
  console.log("data: ", barNodesData);

  // console.log(chart._model.option, chart._chartsViews[0]._data);
  const spec = generateOnboardingSpec(barNodesData, options);
  const onboardingLegend = d3
    .select("#onboarding")
    .selectAll("div.vizHint")
    .data(generateOnboardingMessages(spec).map(d => d.legend));

  onboardingLegend
    .enter()
    .append("div")
    .classed("vizHint", true)
    .html(d => d);
}

function generateOnboardingSpec(data, options) {
  function getMainAxis(xType, yType) {
    if (xType === "value" && yType === "category") {
      return "y";
    } else if (yType === "value" && xType === "category") {
      return "x";
    }
  }
  const mainAxis = getMainAxis(options.xAxis[0].type, options.yAxis[0].type);
  // console.log(internalPlotlyTrace);
  console.log(data);

  // model.option.title
  return {
    chartTitle: options.title[0].text,
    type: data.option.type,
    orientation: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    yAxisOrientation:
      mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    xAxisOrientation:
      mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    barLength: mainAxis && (mainAxis === "x" ? "height" : "width"),
    // yMin: data._rawExtent.y[0],
    // yMax: data._rawExtent.y[1],
    // xMin: data._rawExtent.x[0],
    // xMax: data._rawExtent.x[1],
    xAxisTitle: options.xAxis[0].name,
    yAxisTitle: options.yAxis[0].name
  };
}

function generateOnboardingMessages(spec) {
  const messages = [
    {
      anchor: null,
      requires: ["undefinedTemplateVariable"],
      legend: `Legend that is filtered out, because it requires an undefined template variable.`
    },
    {
      anchor: null, // TODO: Set and extract anchors
      requires: ["chartTitle"],
      legend: `The chart shows the ${spec.chartTitle}.`
    },
    {
      anchor: null,
      requires: ["type"],
      legend: `Each ${spec.type} represents a data item.`
    },
    {
      anchor: null,
      requires: ["type", "barLength", "yAxisTitle", "xAxisTitle"],
      legend: `The ${spec.barLength} of each ${
        spec.type
      } shows e.g., the <span class="hT">${
        spec.yAxisTitle
      } (y-axis)</span> for a certain ${spec.xAxisTitle}.`
    },
    {
      anchor: null,
      requires: ["type", "xAxisOrientation", "xAxisTitle"],
      legend: `The ${spec.xAxisOrientation} position of each ${
        spec.type
      } represents the <span class="hT">${spec.xAxisTitle} (x-axis)</span>.`
    },
    {
      anchor: null,
      requires: ["yAxisTitle", "yMin"],
      legend: `The <span class="hT">minimum</span> ${spec.yAxisTitle} is ${
        spec.yMin
      }.`
    },
    {
      anchor: null,
      requires: ["yAxisTitle", "yMax"],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle} is ${
        spec.yMax
      }.`
    }
  ];

  // filter for messages where all template variables are available in the spec
  return messages.filter(message =>
    message.requires.every(tplVars => spec[tplVars])
  );
}

makePlot();
