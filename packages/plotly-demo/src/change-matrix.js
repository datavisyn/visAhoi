// Use Plotly.js via CDN in HTML template, because we cannot bundle it using Snowpack.
// See https://github.com/ffg-seva/onboarding-prototype/issues/7
// import * as Plotly from 'plotly.js';

import { ahoi } from '@visahoi/plotly';

function render() {
  Plotly.d3.json("./data/matrix.json", function(data) {
    const {x, y, z} = processData(data);

    makePlotly(x, y, z).then((chart) => {
      ahoi('change-matrix', chart, 'onboarding');
    });
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

  return Plotly.newPlot("vis", traces, layout);
}

render();
