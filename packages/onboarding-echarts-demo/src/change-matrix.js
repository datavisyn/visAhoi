import echarts from 'echarts';
import * as d3 from 'd3';
import { createAnchor, generateChartAnchors } from './generate-anchor';

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
  d3.csv("./data/oslo-2018.csv").then(rows => {
    processData(rows);
  });
}

function createPlot(x, y) {
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
      data: locations,
      name: "City",
      nameLocation: "middle",
      nameGap: 35
    },
    xAxis: {
      type: "category",
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth();
        }
      },
      name: "Month",
      nameLocation: "middle",
      nameGap: 30
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
      color: ["#D2B48C", "#FDFDFD", "#4682b4"],
      text: ["High", "Low"]
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

makePlot();

function mapCoords(data, width, height) {

  const blockWidth = width / (data.reduce((a,b) => {
    return a > b[0] ? a : b[0];
  },0) +1);

  const maxYIndex = data.reduce((a,b) => {
    return a > b[1] ? a : b[1];
  },0);
  const blockHeight = height / (maxYIndex + 1);
  const coords = [];
  data.forEach((item) => {
    coords.push({x: item[0] * blockWidth, y: (maxYIndex - item[1]) * blockHeight, width: blockWidth, height: blockHeight});
  })
  return coords;
}

function generateOnboarding(chart) {
  const barNodesData = chart._chartsViews[0].__model;
  const options = chart._model.option;
  const coords = mapCoords(chart._chartsViews[0].__model.option.data, chart._chartsMap["_ec_\u0000series\u00000\u00000_series.heatmap"].__model.coordinateSystem._axes.x.grid._rect.width, chart._chartsMap["_ec_\u0000series\u00000\u00000_series.heatmap"].__model.coordinateSystem._axes.x.grid._rect.height);


  const chartTitlePosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_title"].group.position;
  const visualMapPosition = chart._componentsMap["_ec_\u0000series\u00000\u00000_visualMap.continuous"].group.position;
  coords.push({x: chartTitlePosition[0], y: chartTitlePosition[1], width: 0, height: 50});
  coords.push({x: 108.7, y: 60, width: (869/2), height: 300});
  coords.push({x: visualMapPosition[0], y: visualMapPosition[1], width: 100, height: 50});

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
    console.log(d.anchor, i+1);
    return {
      anchor: d.anchor,
      index: i + 1
    }
  }));
}

function generateOnboardingSpec(data, options, coords) {
  return {
    chartTitle: {
      value: options.title[0].text,
      anchor: {
        coords: coords[36]
      }
    },
    type: {
      value: data.option.type,
      anchor: {
        coords: coords[3]
      }
    },
    legendMin: {
      value: options.visualMap[0].text[1],
      anchor: {
        coords: coords[37]
      }
    },
    legendMax: {
      value: options.visualMap[0].text[0],
      anchor: {
        coords: coords[6]
      }
    },
    xAxis: {
      value: options.xAxis[0].name,
      anchor: {
        coords: coords[0]
      }
    },
    yAxis: {
      value: options.yAxis[0].name,
      anchor: {
        anchor: coords[0]
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
      anchor: spec.type.anchor, // TODO: Set and extract anchors
      requires: ["type"],
      legend: `The chart Is based on colored <span class="hT">${
        spec.type.value
      }</span> elements.`
    },
    {
      anchor: spec.legendMin.anchor,
      requires: ["legendMin", "legendMax"],
      legend: `The legend shows the <span class="hT">value change</span>
        for the chart. The colors range from <span class="hT">blue (${
          spec.legendMin.value
        }) to white and brown (${spec.legendMax.value})</span>.`
    },
    {
      anchor: spec.xAxis.anchor,
      requires: ["xAxis", "yAxis"],
      legend: `The columns show the <span class="hT">${
        spec.xAxis.value
      }</span>, while the rows show the <span class="hT">${spec.yAxis.value}</span>.`
    }
  ];

  // filter for messages where all template variables are available in the spec
  return messages.filter(message =>
    message.requires.every(tplVars => spec[tplVars])
  );
}
