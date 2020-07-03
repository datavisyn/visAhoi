// Use Plotly.js via CDN in HTML template, because we cannot bundle it using Snowpack.
// See https://github.com/ffg-seva/onboarding-prototype/issues/7
// import * as Plotly from 'plotly.js';

function makeplot() {
  Plotly.d3.json("../../data/matrix.json", function(data) {
    processData(data);
  });
}

function processData(allRows) {
  // console.log(allRows);

  const nestedDataByDate = Plotly.d3
    .nest()
    .key(d => d.b)
    .sortKeys(Plotly.d3.ascending)
    .entries(allRows);

  const x = nestedDataByDate.map(d => d.key);

  const nestedDataByCity = Plotly.d3
    .nest()
    .key(d => d.a)
    .sortKeys(Plotly.d3.descending)
    .sortValues((a, b) => parseFloat(a.b) - parseFloat(b.b))
    .entries(allRows);

  const y = nestedDataByCity.map(d => d.key);
  const z = nestedDataByCity.map(city => {
    return city.values.map(d => d.c);
  });

  // console.log("date", x, "city", y, "value", z);
  makePlotly(x, y, z);
}

function makePlotly(x, y, z) {
  document.getElementById("plot");
  const traces = [
    {
      type: "heatmap",
      x, // date
      y, // city
      z, // values,
      zmin: -9,
      zmax: 9,
      colorscale: [[0, "#4682b4"], [0.5, "#FDFDFD"], [1, "#D2B48C"]],
      //showscale: false.
      colorbar: {
        title: {
          text: "Value Change"
        }
      }
    }
  ];

  const layout = {
    title: "Average temperature change in °C between 1990 and 1991",
    xaxis: {
      title: "Month"
    },
    yaxis: {
      title: "City"
    }
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

  const heatmapData = Array.from(value.querySelectorAll(".hm"))[0].__data__;

  // console.log(heatmapData);
  // console.log("----------------");

  function generateOnboardingSpec(internalPlotlyTrace, layout) {
    console.log(internalPlotlyTrace);
    console.log(layout);
    const t = internalPlotlyTrace;
    return {
      chartTitle: layout.title.text,
      type: t.type,
      legendTitle: t.colorbar.title.text,
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
        requires: ["type"],
        legend: `The chart Is based on colored <span class="hT">${
          spec.type
        }</span> elements.`
      },
      {
        anchor: null,
        requires: ["legendTitle"],
        legend: `The legend shows the <span class="hT">${
          spec.legendTitle
        }</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`
      },
      {
        anchor: null,
        requires: ["xAxis", "yAxis"],
        legend: `The columns show the <span class="hT">${
          spec.xAxis
        }</span>, while the rows show the <span class="hT">${
          spec.yAxis
        }</span>.`
      }
    ];

    // filter for messages where all template variables are available in the spec
    return messages.filter(message =>
      message.requires.every(tplVars => spec[tplVars])
    );
  }

  const spec = generateOnboardingSpec(heatmapData[0].trace, value.layout);

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
