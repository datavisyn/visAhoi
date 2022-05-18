import * as echarts from 'echarts';
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';
import debounce from "lodash.debounce";
import { importCsv } from './utils';


let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

async function render() {
  const data = await importCsv("../data/oslo-2018.csv");
  const {x, y} = processData(data);
  chart = createPlot(x, y);
  window.addEventListener("resize", debouncedResize);
}


const locations = ["Tallin", "Oslo", "Munich"];

const data = [
  [0, 2, -0.6],
  [1, 2, -8.4],
  [2, 2, -2.2],
  [3, 2, 1.35],
  [4, 2, -6.2],
  [5, 2, 1.1],
  [6, 2, 1.1],
  [7, 2, -1.2],
  [8, 2, 3.8],
  [9, 2, 0.5],
  [10, 2, -1.45],
  [11, 2, 0],
  [0, 1, -3.5],
  [1, 1, -8.65],
  [2, 1, -3.8],
  [3, 1, -0.5],
  [4, 1, -2.4],
  [5, 1, -3.55],
  [6, 1, 2],
  [7, 1, 0.4],
  [8, 1, 0.25],
  [9, 1, -0.3],
  [10, 1, 2.3],
  [11, 1, 0.5],
  [0, 0, 0.2],
  [1, 0, -6.95],
  [2, 0, -1.5],
  [3, 0, -3.1],
  [4, 0, -2.1],
  [5, 0, -1],
  [6, 0, 0.8],
  [7, 0, 1.1],
  [8, 0, 0.95],
  [9, 0, 2],
  [10, 0, 2.65],
  [11, 0, 2.4]
];

function createPlot(x, y) {
  const options = {
    title: {
      text: "Average temperature change in °C between 1990 and 1991",
      left: "center"
    },
    tooltip: {},
    grid: {
      height: "50%",
      top: "10%"
    },
    yAxis: {
      type: "category",
      data: locations,
      name: "City",
      nameLocation: "middle",
      nameGap: 35
    },
    xAxis: {
      type: "category",
      data: x,
      axisLabel: {
        formatter: function(value, index) {
          var date = new Date(value);
          return date.getMonth();
        }
      },
      name: "Month",
      nameLocation: "middle",
      nameGap: 30
    },
    series: [
      {
        type: "heatmap",
        data: data,
        label: {
          show: false
        }
      }
    ],
    visualMap: {
      min: -9,
      max: 9,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
      color: ["#D2B48C", "#FDFDFD", "#4682b4"],
      text: ["High", "Low"]
    }
  };

  chart.setOption(options);
  return chart;
}

function processData(allRows) {
  const x = [];
  const y = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    const month = `${row.year}-${row.month}`;
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
    return Math.round(sum / tempArray.length, 2);
  });
  return {x, y: averagedYValues};
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(EVisualizationType.CHANGE_MATRIX, chart);
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
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if(showOnboarding) {
      onboardingUI = await ahoi(EVisualizationType.CHANGE_MATRIX, chart, getAhoiConfig());
    } else {
      onboardingUI?.removeOnboarding();
    }    
  })
}

const createChart = (renderer = 'svg') => {
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer})
  window.addEventListener("resize", () => chart.resize());
  registerEventListener();
  render();
}

export default createChart;
