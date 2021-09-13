import * as echarts from 'echarts';
import { ahoi, EVisualizationType } from '@visahoi/echarts';

let chart = null;

function render() {
  fetch("../data/cars.json").then(response => response.json()).then(data => {
    const chart = createPlot(processData(data));
  window.addEventListener("resize", () => ahoi(EVisualizationType.SCATTERPLOT, chart, '#onboarding'));
  ahoi(EVisualizationType.SCATTERPLOT, chart, '#onboarding');
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

const createChart = (renderer = 'svg') => {
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer});
  window.addEventListener("resize", () => chart.resize());
  render();
}

export default createChart;
