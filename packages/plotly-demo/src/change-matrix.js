import Plotly from 'plotly.js-dist'
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/plotly';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

async function render() {
  const response = await fetch('./data/matrix.json');
  const data = await response.json();
  const {x, y, z} = processData(data);
  chart = await makePlotly(x, y, z)
  window.addEventListener("resize", () => onboardingUI?.updateOnboarding());
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

const registerEventListener = () => {
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    if(showOnboarding) {
      const defaultOnboardingMessages = generateBasicAnnotations(EVisualizationType.CHANGE_MATRIX, chart);
      const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
        ...d,
        text: "test123"
      }));
      const ahoiConfig = {
        onboardingMessages: defaultOnboardingMessages,
      }
      onboardingUI = await ahoi(EVisualizationType.CHANGE_MATRIX, chart, ahoiConfig);
    } else {
      onboardingUI?.removeOnboarding();
    }
    showOnboarding = !showOnboarding;
  })
}

registerEventListener();
render();
