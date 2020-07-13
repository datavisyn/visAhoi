import {onboarding} from "/web_modules/onboarding-plotly.js";
function render() {
  Plotly.d3.csv("./data/oslo-2018.csv", function(data) {
    const {x, y} = processData(data);
    makePlotly(x, y).then((chart) => {
      onboarding("horizon-graph", chart);
    });
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
  const averagedYValues = y.map((tempArray) => {
    const sum = tempArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return sum / tempArray.length;
  });
  return {
    x,
    y: averagedYValues
  };
}
function makePlotly(x, y) {
  document.getElementById("plot");
  const traces = [{
    name: "Between 0 and 15 °C",
    type: "scatter",
    x,
    y: y.map((item) => item < 0 ? 0 : item > 15 ? 15 : item),
    fill: "tozeroy",
    fillcolor: "rgba(161, 215, 106, 0.6)",
    mode: "none",
    line: {
      shape: "spline",
      smoothing: 0.25
    },
    hovertemplate: "%{y:.2f}"
  }, {
    name: "More than 15 °C",
    type: "scatter",
    x,
    y: y.map((item) => item > 15 ? item - 15 : 0),
    fill: "tozeroy",
    fillcolor: "rgba(161, 215, 106, 1)",
    mode: "none",
    line: {
      shape: "spline",
      smoothing: 0.25
    },
    hovertemplate: "%{y:.2f}"
  }, {
    name: "Less than 0 °C",
    type: "scatter",
    x,
    y: y.map((item) => item < 0 ? item * -1 : 0),
    fill: "tozeroy",
    fillcolor: "rgba(5, 113, 176, 1)",
    mode: "none",
    line: {
      shape: "spline",
      smoothing: 0.25
    },
    hovertemplate: "-%{y:.2f}"
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
    },
    showlegend: false
  };
  return Plotly.newPlot("vis", traces, layout);
}
render();
