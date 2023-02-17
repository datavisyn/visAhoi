<script lang="ts">
import * as echarts from 'echarts';
import { onMount, onDestroy } from "svelte";

let contextKey;

const options = {
    title: {
      text: 'Average temperature in Oslo, Norway in 2018',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      name: 'Month',
      nameLocation: 'middle',
      nameGap: 30,
      data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'],
      axisLabel: {
        formatter: function (value) {
          const date = new Date(value)
          return date.getMonth() + 1
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Average Temperature in °C',
      nameLocation: 'middle',
      nameGap: 35
    },
    series: [
      {
        data: [-2, -4, -2, 6, 16, 18, 22, 16, 12, 7, 3, -1, NaN],
        type: 'bar',
        color: 'lightgrey'
      }
    ]
  }


// option && myChart.setOption(option);

onMount(async () => {
  const chartDom = document.getElementById('barchart');
  console.log(chartDom, 'Chart dom');
  const myChart = echarts.init(chartDom, null, {
  renderer: 'svg'
});
  myChart.setOption(options)
console.log(myChart, 'Mychart')
    });


</script>
<div id="echarts" style="width: 100%; height: 100%;">
  <h1>Echarts Demo</h1>
  <div id="barchart" style="width: 500px; height: 500px;"> </div>
</div>



<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
