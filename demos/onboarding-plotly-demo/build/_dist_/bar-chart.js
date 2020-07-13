import {onboarding} from "../web_modules/onboarding-plotly.js";
function render() {
  Plotly.d3.csv("./data/oslo-2018.csv", function(data) {
    const {x, y} = processData(data);
    makePlotly(x, y).then((chart) => {
      onboarding("bar-chart", chart);
    });
  });
}
function processData(allRows) {
  const x = [];
  const y = [];
  for (var i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    x.push(`${row.year}-${row.month}`);
    y.push(row.temp);
  }
  return {
    x,
    y
  };
}
function makePlotly(x, y) {
  document.getElementById("plot");
  const traces = [{
    type: "bar",
    x,
    y,
    transforms: [{
      type: "aggregate",
      groups: x,
      aggregations: [{
        target: "y",
        func: "avg",
        enabled: true
      }]
    }],
    marker: {
      color: "lightgrey"
    }
  }];
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
  return Plotly.newPlot("vis", traces, layout);
}
render();
