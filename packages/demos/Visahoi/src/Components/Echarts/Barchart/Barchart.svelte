<script lang="ts">
import * as echarts from 'echarts';
import ResizeObserver from "svelte-resize-observer";
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts'
import { onMount, onDestroy } from "svelte";

export let contextKey = 'barchart';
let onboardingUI;
let runtimeObject;

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

  const getAhoiConfig = () => {    
      const defaultOnboardingMessages = generateBasicAnnotations(
        contextKey,
        EVisualizationType.BAR_CHART,
        runtimeObject
      );      
      const ahoiConfig = {
        onboardingMessages: defaultOnboardingMessages,
      };
  
    return ahoiConfig;
  };

  const onResize = (e) => {
    if(onboardingUI) {
      // update onboarding
      onboardingUI.updateOnboarding(getAhoiConfig(), runtimeObject)
    }
    if(runtimeObject) {
      runtimeObject.resize();
    }
  }

  onMount(async () => {
    const chartDom = document.getElementById('barchart');  
    runtimeObject = echarts.init(chartDom, null, {
    renderer: 'svg'
    });
    runtimeObject.setOption(options);  
    if(onboardingUI) {
      onboardingUI.showOnboarding();    
      } else {      
        onboardingUI = await ahoi(
          contextKey,
          EVisualizationType.BAR_CHART,
          runtimeObject,
          getAhoiConfig()
        );
      }
  });
  
  onDestroy(() => {
    if(onboardingUI) {
      onboardingUI.removeOnboarding();
    }
  });


</script>

<div id="echarts" style="width: 100%; height: 100%;">
  <!-- <ResizeObserver on:resize={onResize} /> -->
  <div id="barchart" style="width: 500px; height: 500px;"> </div>
</div>



<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
