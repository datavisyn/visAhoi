import * as echarts from 'echarts';
import { ahoi, EVisualizationType } from '@visahoi/echarts';
import { importCsv } from './utils';

let chart = null;

async function render() {
  const data = await importCsv("../data/oslo-2018.csv");
  const {x, y} = processData(data);
  const chart = createPlot(x, y);
  window.addEventListener("resize", () => ahoi(EVisualizationType.BAR_CHART, chart, '#onboarding'));
  ahoi(EVisualizationType.BAR_CHART, chart, '#onboarding');
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

function createPlot(x, y) {
  const options = {
    title: {
      text: "Average temperature in Oslo, Norway in 2018",
      left: "center"
    },
    tooltip: {},
    xAxis: {
      type: "category",
      name: "Month",
      nameLocation: "middle",
      nameGap: 30,
      data: x,
      axisLabel: {
        formatter: function(value) {
          var date = new Date(value);
          return date.getMonth() + 1;
        }
      }
    },
    yAxis: {
      type: "value",
      name: "Average Temperature in °C",
      nameLocation: "middle",
      nameGap: 35
    },
    series: [
      {
        data: y,
        type: "bar",
        color: "lightgrey"
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
