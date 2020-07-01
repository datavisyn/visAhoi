// Create an echarts instance
const vis = document.getElementById("vis");
const chart = echarts.init(vis);

function makePlot() {
  d3.csv("../../data/oslo-2018.csv").then(rows => {
    processData(rows);
  });
}

function createPlot(x, y) {
  const options = {
    title: {
      text: "Average temperature in Oslo, Norway in 2018",
      left: "center"
    },
    tooltip: {},
    xAxis: {
      type: "category",
      name: "Month",
      nameLocation: "middle",
      nameGap: 30,
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth() + 1;
        }
      }
    },
    yAxis: {
      type: "value",
      name: "Average Temperature in °C",
      nameLocation: "middle",
      nameGap: 35
    },
    series: [
      {
        data: y,
        type: "bar"
      }
    ]
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

makePlot();


function generateOnboarding(chart) {
  const barNodesData = chart._chartsViews[0]._data;
  const options = chart._model.option;

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

  // model.option.title
  return {
    chartTitle: options.title[0].text,
    type: data.hostModel.option.type,
    orientation: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    yAxisOrientation:
      mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    xAxisOrientation:
      mainAxis && (mainAxis === "x" ? "horizontal" : "vertical"),
    barLength: mainAxis && (mainAxis === "x" ? "height" : "width"),
    yMin: data._rawExtent.y[0],
    yMax: data._rawExtent.y[1],
    xMin: data._rawExtent.x[0],
    xMax: data._rawExtent.x[1],
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
