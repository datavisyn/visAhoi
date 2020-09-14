// Use Plotly.js via CDN in HTML template, because we cannot bundle it using Snowpack.
// See https://github.com/ffg-seva/onboarding-prototype/issues/7
// import * as Plotly from 'plotly.js';

import { ahoi } from '@visahoi/plotly';

function render() {
  Plotly.d3.csv("./data/oslo-2018.csv", function(data) {
    const {x, y} = processData(data);

    makePlotly(x, y).then((chart) => {
      ahoi('bar-chart', chart, 'onboarding');
    });
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
  // console.log("date", x, "temp", y);
  return {x, y};
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

  return Plotly.newPlot("vis", traces, layout);
}

render();
