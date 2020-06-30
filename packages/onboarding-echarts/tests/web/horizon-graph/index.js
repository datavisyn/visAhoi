function makePlot() {
  d3.csv("../../data/oslo-2018.csv").then(rows => {
    processData(rows);
  });
}

function createPlot(x, y) {
  // Create an echarts instance
  const vis = document.getElementById("vis");
  const chart = echarts.init(vis);
  const options = {
    title: {
      text: "Average temperature in Oslo, Norway in 2018",
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        snap: false,
        type: "none"
      },
      formatter: function(params, ticket, callback) {
        let temperature = 0;
        temperature += params[0].value;
        temperature += params[1].value;
        temperature -= params[2].value;

        const result = `Month: ${
          params[0].name
        }<br/> Average temperature in °C: ${temperature}`;
        setTimeout(function() {
          callback(ticket, result);
        }, 100);
        return result;
      }
    },
    grid: {
      height: "50%",
      top: "10%"
    },
    width: 800,
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth() + 1;
        }
      },
      name: "Month",
      nameLocation: "middle",
      nameGap: 30
    },
    yAxis: {
      type: "value",
      min: -1,
      max: 16,
      name: "Average Temperature in °C",
      nameLocation: "middle",
      nameGap: 30
    },
    series: [
      {
        data: y.map(item => (item < 0 ? 0 : item > 15 ? 15 : item)),
        type: "line",
        areaStyle: {
          opacity: 0.6
        },
        color: "#a1d76a",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
      },
      {
        data: y.map(item => (item > 15 ? item - 15 : 0)),
        type: "line",
        areaStyle: {
          opacity: 1
        },
        color: "#a1d76a",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
      },
      {
        data: y.map(item => (item < 0 ? item * -1 : 0)),
        type: "line",
        areaStyle: {
          opacity: 1
        },
        color: "#0571b0",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 0 }
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
  const barNodesData = chart._chartsViews[0].__model;
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
  return {
    chartTitle: options.title[0].text,
    type: data.option.type,
    xAxis: options.xAxis[0].name,
    yAxis: options.yAxis[0].name
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
      anchor: null, // TODO: Set and extract anchors
      requires: ["chartTitle"],
      legend: `The chart is made out of <span class="hT">${
        spec.type
      }</span> elements.`
    },
    {
      anchor: null, // TODO: Set and extract anchors
      requires: ["xAxis", "yAxis"],
      legend: `The areas illustrate the <span class="hT">${
        spec.yAxis
      } (y-axis)</span> over <span class="hT">${spec.xAxis} (x-axis)</span>.`
    },
    {
      anchor: null, // TODO: Set and extract anchors
      requires: ["yAxis"],
      legend: `Light green areas indicate a moderate positive <span class="hT">${
        spec.yAxis
      }</span> and dark green areas a high positive <span class="hT">${
        spec.yAxis
      }</span>.`
    },
    {
      anchor: null, // TODO: Set and extract anchors
      requires: ["yAxis"],
      legend: `Dark blue areas indicate a very low negative <span class="hT">${
        spec.yAxis
      }</span>.`
    }
  ];

  // filter for messages where all template variables are available in the spec
  return messages.filter(message =>
    message.requires.every(tplVars => spec[tplVars])
  );
}
