// Use Plotly.js via CDN in HTML template, because we cannot bundle it using Snowpack.
// See https://github.com/ffg-seva/onboarding-prototype/issues/7
// import * as Plotly from 'plotly.js';

import { ahoi, EVisualizationType } from '@visahoi/plotly';

function render() {
  fetch('./data/matrix.json').then(response => response.json()).then(data => {
    const {x, y, z} = processData(data);
    makePlotly(x, y, z).then((chart) => {
      window.addEventListener("resize", () => ahoi(EVisualizationType.CHANGE_MATRIX, chart, '#onboarding'));
      ahoi(EVisualizationType.CHANGE_MATRIX, chart, '#onboarding');
    });
  });
}

function processData(allRows) {

  const nestedDataByCity = new Map();

  allRows.forEach((row) => {
    if (nestedDataByCity.has(row.a)) {
      nestedDataByCity.set(row.a, [...nestedDataByCity.get(row.a), row]);
    } else {
      nestedDataByCity.set(row.a, [row]);
    }
  });

  const x = new Set(allRows.map((row) => row.b));
  const y = [...nestedDataByCity.keys()];
  const z = [...nestedDataByCity.values()].map(value => [...value.map(v => v.c)]);

  return {x, y, z};
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

  const config = {
    responsive: true
  };

  return Plotly.newPlot("vis", traces, layout, config);
}

render();
