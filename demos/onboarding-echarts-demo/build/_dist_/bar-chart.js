import echarts2 from "/web_modules/echarts.js";
import * as d3 from "/web_modules/d3.js";
import {onboarding} from "/web_modules/onboarding-echarts.js";
let chart = null;
function render() {
  d3.csv("../data/oslo-2018.csv").then((rows) => {
    const {x, y} = processData(rows);
    const chart2 = createPlot(x, y);
    onboarding("bar-chart", chart2);
  });
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
  const averagedYValues = y.map((tempArray) => {
    const sum = tempArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return Math.round(sum / tempArray.length, 2);
  });
  return {
    x,
    y: averagedYValues
  };
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
    series: [{
      data: y,
      type: "bar",
      color: "steelblue"
    }]
  };
  chart.setOption(options);
  return chart;
}
const createChart = (renderer = "svg") => {
  const vis = document.getElementById("vis");
  chart = echarts2.init(vis, null, {
    renderer
  });
  render();
};
export default createChart;
