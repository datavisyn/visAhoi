<script lang="ts">
import * as echarts from 'echarts';
const chartDom = document.getElementById('barchart');
console.log(chartDom, 'Chart dom');
const myChart = echarts.init(chartDom);
console.log(myChart, 'Mychart')
var option;
let contextKey;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

option && myChart.setOption(option);


</script>
<div id="echarts">
  <h1>Echarts Demo</h1>
  <div id="barchart"> </div>
</div>



<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
