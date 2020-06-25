function makeplot() {
  Plotly.d3.csv("../../data/oslo-2018.csv", function(data) {
    processData(data);
  });
}

function processData(allRows) {
  //console.log(allRows);
  const x = [];
  const y = [];

  for (var i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    x.push(`${row.year}-${row.month}`);
    y.push(row.temp);
  }
  //console.log("date", x, "temp", y);
  makePlotly(x, y);
}

function makePlotly(x, y) {
  document.getElementById("plot");
  const traces = [
    {
      type: "bar",
      x: x, // ['2018-01', '2018-01', ...]
      y: y, // [1.9, 0.1, ...]
      transforms: [
        {
          type: "aggregate",
          groups: x,
          aggregations: [{ target: "y", func: "avg", enabled: true }]
        }
      ],
      marker: {
        color: "lightgrey"
      }
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
    }
  };

  Plotly.newPlot("vis", traces, layout).then(onboarding);
}

function onboarding(value) {
  {
    /*console.log("Main Plotly object", Plotly);

    console.log("----------------");

    console.log("DOM element", value);
    console.log("traces", value.data);
    console.log("layout", value.layout);

    console.log("----------------");*/

    // from https://github.com/plotly/plotly.js/blob/bff79dc5e76739f674ac3d4c41b63b0fbd6f2ebc/test/jasmine/tests/bar_test.js
    function getAllTraceNodes(node) {
      return node.querySelectorAll("g.points");
    }

    function getAllBarNodes(node) {
      return node.querySelectorAll("g.point");
    }

    const traceNodes = getAllTraceNodes(value);
    const barNodes = getAllBarNodes(traceNodes[0]);

    const barNodesData = Array.from(barNodes).map(point => point.__data__);
    /*const traceNodesData = Array.from(traceNodes).map(point => point.__data__);
    console.log("getAllTraceNodes", traceNodes);
    console.log("getAllBarNodes", barNodes);
    console.log("traceNodesData", traceNodesData);
    console.log("barNodesData", barNodesData);

    console.log("----------------");*/

    barNodesData.forEach((data, index) => {
      console.log(index, data);
    });

    console.log("----------------");

    function generateOnboardingSpec(internalPlotlyTrace, layout) {
      // console.log(internalPlotlyTrace);
      // console.log(layout);
      const t = internalPlotlyTrace;
      return {
        chartTitle: layout.title.text,
        type: t.type,
        orientation: t.orientation === "v" ? "vertical" : "horizontal",
        yAxisOrientation: t.orientation === "v" ? "vertical" : "horizontal",
        xAxisOrientation: t.orientation === "v" ? "horizontal" : "vertical",
        barLength: t.orientation === "v" ? "height" : "width",
        yMin: t._extremes.y.min[0].val, // 0 = first trace
        yMax: t._extremes.y.max[0].val,
        xMin: t._extremes.x.min[0].val, // 0 = first trace
        xMax: t._extremes.x.max[0].val,
        xAxisTitle: layout.xaxis.title.text,
        yAxisTitle: layout.yaxis.title.text
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

        // `An <span class="hT">average temperature</span> of <span class="hT">-4 °C</span> was measured in <span class="hT">Oslo in February</span>.`,
        // `The <span class="hT">average temperature</span> in <span class="hT">August</span> was higher in <span class="hT">Tallinn</span> than in <span class="hT">Oslo</span>.`,
        //`In 2018, the <span class="hT">average temperature</span> in <span class="hT">February</span> was below 0°C`
      ];

      // filter for messages where all template variables are available in the spec
      return messages.filter(message =>
        message.requires.every(tplVars => spec[tplVars])
      );
    }

    const spec = generateOnboardingSpec(barNodesData[0].trace, value.layout);

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
}


makeplot();
