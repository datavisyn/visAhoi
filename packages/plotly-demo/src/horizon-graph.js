// Use Plotly.js via CDN in HTML template, because we cannot bundle it using Snowpack.
// See https://github.com/ffg-seva/onboarding-prototype/issues/7
// import * as Plotly from 'plotly.js';

import { ahoi, EVisualizationType } from '@visahoi/plotly';
import { importCsv } from './util';

async function render() {
  const data = await importCsv("./data/oslo-2018.csv");
  const {x, y} = processData(data);
  makePlotly(x, y).then((chart) => {
    ahoi(EVisualizationType.HORIZON_GRAPH, chart, '#onboarding');
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
  return {x, y: averagedYValues};
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

  return Plotly.newPlot("vis", traces, layout);
}

render();
