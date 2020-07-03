import echarts from 'echarts';
import * as d3 from 'd3';
import { createAnchor, generateChartAnchors } from './generate-anchor';

// Create an echarts instance
const vis = document.getElementById("vis");
const chart = echarts.init(vis);

function makePlot() {
  d3.csv("./data/oslo-2018.csv").then(rows => {
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
        type: "bar",
        color: "steelblue"
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
  const coords = chart._chartsViews[0]._data._itemLayouts;

  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  // console.log(chart._componentsMap["_ec_\u0000Month\u00000_xAxis.category"].__model.axis.grid._axesList[0].model.axis.grid._coordsList[0].grid._axesList[1].toLocalCoord())
  coords.push({coords: {x: chartTitlePosition[0], y: chartTitlePosition[1], width: 0, height: 50}});
  coords.push({x: 108.7, y: 60, width: (869/2), height: 300});

  const spec = generateOnboardingSpec(barNodesData, options, coords);
  const onboardingMessages = generateOnboardingMessages(spec);
  const onboardingLegend = d3
    .select("#onboarding")
    .selectAll("div.vizHint")
    .data(onboardingMessages.map(d => d.legend));

  onboardingLegend
    .enter()
    .append("div")
    .classed("vizHint", true)
    .append('div')
    .attr('id', (d, i) => `$hint-${i + 1}`)
    .html(d => d)
    .each(createAnchor);

    d3.select('#vis')
      .append('svg')
      .classed('onboardingAnnotations', true)
      .style('width', '100%')
      .style('height', '400px');


    generateChartAnchors(onboardingMessages.map((d, i) => {
      return {
        anchor: d.anchor,
        index: i + 1
      }
    }));
}

function generateOnboardingSpec(data, options, coords) {
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
    chartTitle: {
      value: options.title[0].text,
      anchor: coords[12]
    },
    yMin: {
      value: data._rawExtent.y[0],
      anchor: {
        coords: coords[1]
      }
    },
    type: {
      value: data.hostModel.option.type,
      anchor: {
        coords: coords[3]
      }
    },
    yMax: {
      value: data._rawExtent.y[1],
      anchor: {
        coords: coords[6]
      }
    },
    orientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    yAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    xAxisOrientation: {
      value: mainAxis && (mainAxis === "x" ? "horizontal" : "vertical")
    },
    barLength: {
      value: mainAxis && (mainAxis === "x" ? "height" : "width")
    },
    xMin: {
      value: data._rawExtent.x[0]
    },
    xMax: {
      value: data._rawExtent.x[1]
    },
    xAxisTitle: {
      value: options.xAxis[0].name
    },
    yAxisTitle: {
      value: options.yAxis[0].name,
      anchor: {
        coords: coords[13]
      }
    }
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
      anchor: spec.chartTitle.anchor, // TODO: Set and extract anchors
      requires: ["chartTitle"],
      legend: `The chart shows the ${spec.chartTitle.value}.`
    },
    {
      anchor: spec.type.anchor,
      requires: ["type"],
      legend: `Each ${spec.type.value} represents a data item.`
    },
    {
      anchor: spec.yAxisTitle.anchor,
      requires: ["type", "barLength", "yAxisTitle", "xAxisTitle"],
      legend: `The ${spec.barLength.value} of each ${
        spec.type.value
      } shows e.g., the <span class="hT">${
        spec.yAxisTitle.value
      } (y-axis)</span> for a certain ${spec.xAxisTitle.value}.`
    },
    {
      anchor: null,
      requires: ["type", "xAxisOrientation", "xAxisTitle"],
      legend: `The ${spec.xAxisOrientation.value} position of each ${
        spec.type.value
      } represents the <span class="hT">${spec.xAxisTitle.value} (x-axis)</span>.`
    },
    {
      anchor: spec.yMin.anchor,
      requires: ["yAxisTitle", "yMin"],
      legend: `The <span class="hT">minimum</span> ${spec.yAxisTitle.value} is ${
        spec.yMin.value
      }.`
    },
    {
      anchor: spec.yMax.anchor,
      requires: ["yAxisTitle", "yMax"],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle.value} is ${
        spec.yMax.value
      }.`
    }
  ];

  // filter for messages where all template variables are available in the spec
  return messages.filter(message =>
    message.requires.every(tplVars => spec[tplVars])
  );
}
