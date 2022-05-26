import * as echarts from 'echarts';
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';
import debounce from "lodash.debounce";

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

function render() {
  fetch("../data/cars.json").then(response => response.json()).then(data => {
  chart = createPlot(processData(data));
  window.addEventListener("resize", debouncedResize);

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
  console.log(showOnboarding)   
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if(showOnboarding) {
      onboardingUI = await ahoi(EVisualizationType.SCATTERPLOT, chart, getAhoiConfig());
    } else {
      onboardingUI?.removeOnboarding();
    }    
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
