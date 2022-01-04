import Plotly from 'plotly.js-dist'
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/plotly';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

async function render() {
  const response = await fetch('../data/cars.json');
  const data = await response.json();
  const {x, y} = processData(data);
  chart = await makePlotly(x, y);
  window.addEventListener("resize", () => setTimeout(() => ahoi(EVisualizationType.SCATTERPLOT, chart, '#onboarding'), 100));
}

function processData(allRows) {
  const x = Object.values(allRows).map((d) => d["Horsepower"]);
  const y = Object.values(allRows).map((d) => d["Miles_per_Gallon"]);
  return {x, y};
}

function makePlotly(x, y) {
  document.getElementById("plot");
  const traces = [
    {
      type: "scatter",
      mode: "markers",
      x,
      y,
      marker: {
        size: 5
      }
    }
  ];

  const layout = {
    title: "Some title of cars or something",
    xaxis: {
      title: "Horsepower",
    },
    yaxis: {
      title: "Miles per Gallon"
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
      const defaultOnboardingMessages = generateBasicAnnotations(EVisualizationType.SCATTERPLOT, chart);
      const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
        ...d,
        text: "test123"
      }));
      const ahoiConfig = {
        onboardingMessages: defaultOnboardingMessages,
      }
      onboardingUI = await ahoi(EVisualizationType.SCATTERPLOT, chart, ahoiConfig);
    } else {
      onboardingUI?.removeOnboarding();
    }
    showOnboarding = !showOnboarding;
  })
}

registerEventListener();
render();
