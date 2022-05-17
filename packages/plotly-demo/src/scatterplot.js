import Plotly from 'plotly.js-dist'
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/plotly';
import debounce from "lodash.debounce";

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

async function render() {
  const response = await fetch('../data/cars.json');
  const data = await response.json();
  const {x, y} = processData(data);
  chart = await makePlotly(x, y);
  window.addEventListener("resize", debouncedResize);
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

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(EVisualizationType.SCATTERPLOT, chart);
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: "test123"
  }));
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
  }
  return ahoiConfig;
}

const registerEventListener = () => {
  showOnboarding = !showOnboarding;
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    if(showOnboarding) {
      onboardingUI = await ahoi(EVisualizationType.SCATTERPLOT, chart, getAhoiConfig());
    } else {
      onboardingUI?.removeOnboarding();
    }
    showOnboarding = !showOnboarding;
  })
}

registerEventListener();
render();
