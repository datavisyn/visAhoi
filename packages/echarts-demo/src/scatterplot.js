import * as echarts from 'echarts';
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

function render() {
  fetch("../data/cars.json").then(response => response.json()).then(data => {
  chart = createPlot(processData(data));
  window.addEventListener("resize", () => onboardingUI?.updateOnboarding());

  });
}

function processData(allRows) {
  const values = Object.values(allRows).map((row => [row.Horsepower, row.Miles_per_Gallon]))
  return values;
}

function createPlot(values) {
  const options = {
    title: {
      text: "Some title of cars or something",
      left: "center"
    },
    tooltip: {},
    xAxis: {
      type: "value",
      name: "Horsepower",
      nameLocation: "middle",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "Miles per Gallon",
      nameLocation: "middle",
      nameGap: 35
    },
    series: [
      {
        data: values,
        type: "scatter",
        symbolSize: 4
      }
    ]
  };

  chart.setOption(options);
  return chart;
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

const createChart = (renderer = 'svg') => {
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer});
  window.addEventListener("resize", () => chart.resize());
  registerEventListener();
  render();
}

export default createChart;
