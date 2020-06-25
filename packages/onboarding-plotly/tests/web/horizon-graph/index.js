function makeplot() {
  Plotly.d3.csv("../../data/oslo-2018.csv", function(data) {
    processData(data);
  });
}

function processData(allRows) {
  const x = [];
  const y = [];
  const allX = [];
  const allY = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    const month = `${row.year}-${row.month}`;

    allX.push(`${row.year}-${row.month}-${row.day}`);
    allY.push(row.temp);

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
    return sum / tempArray.length;
  });

  //makePlotly(allX, allY);
  makePlotly(x, averagedYValues);
}

function makePlotly(x, y) {
  document.getElementById("plot");
  const traces = [
    {
      name: "Between 0 and 15 °C",
      type: "scatter",
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map(item => (item < 0 ? 0 : item > 15 ? 15 : item)), // [1.9, 0.1, ...]
      // y: y.map(item => (item < 0 ? (item * -1) : item)), // [1.9, 0.1, ...]
      fill: "tozeroy",
      fillcolor: "rgba(161, 215, 106, 0.6)", // #a1d76a + 0.6 opacity
      mode: "none", // no extra line + points for values
      line: {
        shape: "spline",
        smoothing: 0.25
      },
      hovertemplate: "%{y:.2f}"
    },
    {
      name: "More than 15 °C",
      type: "scatter",
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map(item => (item > 15 ? item - 15 : 0)), // [1.9, 0.1, ...]
      fill: "tozeroy",
      fillcolor: "rgba(161, 215, 106, 1)", // #a1d76a + 0.6 opacity
      mode: "none", // no extra line + no points for values,
      line: {
        shape: "spline",
        smoothing: 0.25
      },
      hovertemplate: "%{y:.2f}"
    },
    {
      name: "Less than 0 °C",
      type: "scatter",
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map(item => (item < 0 ? item * -1 : 0)), // [1.9, 0.1, ...]
      fill: "tozeroy",
      fillcolor: "rgba(5, 113, 176, 1)", // #0571b0 + 1 opacity
      mode: "none", // no extra line + no points for values
      line: {
        shape: "spline",
        smoothing: 0.25
      },
      //hoverinfo: "x+y"
      hovertemplate: "-%{y:.2f}"
    }
  ];

  const layout = {
    title: "Average temperature in Oslo, Norway in 2018",
    xaxis: {
      title: "Month",
      tickformat: "%m",
      nticks: 12
    },
    yaxis: {
      title: "Average temperature in °C"
    },
    showlegend: false
  };

  Plotly.newPlot("vis", traces, layout).then(onboarding);
}

function onboarding(value) {
  /*console.log("Main Plotly object", Plotly);

  console.log("----------------");

  console.log("DOM element", value);
  console.log("traces", value.data);
  console.log("layout", value.layout);

  console.log("----------------");*/

  // adapted from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
  function getAllTraceNodes(node) {
    return node.querySelectorAll("g.fills");
  }

  function getAllPathNodes(node) {
    return node.querySelectorAll("path.js-fill");
  }

  const traceNodes = getAllTraceNodes(value);
  const areaNodes = getAllPathNodes(traceNodes[0]);

  // console.log("getAllTraceNodes", traceNodes);
  // console.log("getAllAreaNodes", areaNodes);

  const areaNodesData = Array.from(areaNodes).map(point => point.__data__);
  // const traceNodesData = Array.from(traceNodes).map(point => point.__data__);

  // console.log("traceNodesData", traceNodesData);
  // console.log("areaNodesData", areaNodesData);

  // console.log("----------------");

  /*areaNodesData.forEach((data, index) => {
    console.log(index, data);
  });

  console.log("----------------");*/

  function generateOnboardingSpec(internalPlotlyTrace, layout) {
    console.log(internalPlotlyTrace);
    // console.log(layout);
    const t = internalPlotlyTrace;
    return {
      chartTitle: layout.title.text,
      type: "area", //t.type,
      yMin: t._extremes.y.min[0].val, // 0 = first trace
      yMax: t._extremes.y.max[0].val,
      xMin: t._extremes.x.min[0].val, // 0 = first trace
      xMax: t._extremes.x.max[0].val,
      xAxis: layout.xaxis.title.text,
      yAxis: layout.yaxis.title.text
      // xAxisLabel (e.g. 01, 02, …)
      // yAxisLabel (e.g. -5, 0, 5, ...)
      // Title (Average Temperature in Oslo)
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
      message.requires.every(tplVars => spec[tplVars] !== undefined)
    );
  }

  const spec = generateOnboardingSpec(areaNodesData[0][0].trace, value.layout);

  const onboardingLegend = Plotly.d3
    .select("#onboarding")
    .selectAll("div.vizHint")
    .data(generateOnboardingMessages(spec).map(d => d.legend));

  onboardingLegend
    .enter()
    .append("div")
    .classed("vizHint", true)
    .html(d => d);

  onboardingLegend.exit().remove();
}

makeplot();
