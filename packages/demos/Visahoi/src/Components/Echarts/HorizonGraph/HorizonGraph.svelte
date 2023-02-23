<script lang="ts">
    import * as echarts from 'echarts';
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';
    import ResizeObserver from "svelte-resize-observer";
    import { onMount, onDestroy } from "svelte";
  import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey: string = 'horizonGraph';
    let onboardingUI;
    let runtimeObject: echarts.ECharts;

    const x: string[] = ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'];
    const y: number[][] = [[1.9, 0.1, -0.9, 1, -1.2, -3.8, -6.6, -2.8, -6.9, -1.9, -2.1, -3.2, -2.3, -2.7, -1.9, 0, 0, -3.1, -2.9, -2.4, -2.9, -4.4, -1.1, 3, 3.4, -0.6, -3.8, 0.2, -2.1, -4.3, 0.9],[0.5, -6.4, -7.4, -8.4, -8.1, -5.2, -4.7, -4.7, -0.1, -1.4, -2, -1, -3.4, 0.6, -0.2, -1.2, -4.2, -0.8, -1.2, -3.8, -3.1, -4.8, -3.7, -3.8, -6.7, -9.2, -9.5, -11.4],[-11.4, -7.1, -5.8, -4.3, -4.7, -3.9, -1.7, -1.8, -3, -3.3, -3, -0.2, 0.8, -0.7, -2.6, -6.2, -6.3, -6.1, -1.1, 2, 1.7, 1.8, -0.2, 2.8, 3.5, -0.6, -2.6, -2.5, -1.5, -1.9, -1.4],[0.2, 0, -0.1, 2.5, 3.1, 4.6, 3.2, 3.9, 3.3, 4.5, 4.6, 7, 8.4, 10.8, 10.7, 7.6, 7.5, 10.5, 10, 8.3, 10.8, 9.3, 7.4, 7.5, 8.5, 8.3, 7.4, 6.9, 8.1, 8.8],[4.4, 8.2, 7.7, 8.3, 12.5, 13.2, 13.3, 14.6, 16.8, 17.8, 14.5, 13.3, 16.7, 19.4, 19.8, 18.9, 13, 14.4, 15.3, 15.2, 15.8, 16.7, 18.6, 19, 20.6, 21.9, 22.2, 18.7, 21, 24.2, 23],[22, 22.4, 23.3, 19.4, 13.9, 15.5, 20, 21.5, 20.5, 20.5, 16.6, 18.1, 16.7, 14.3, 15.5, 15.8, 13.1, 14.4, 16, 12.1, 11.7, 13.1, 15.9, 18.5, 23.1, 23.4, 22.2, 21.5, 17.6, 17.3],[20.4, 21.7, 23.6, 22.8, 19.4, 21.8, 20.5, 21.4, 17.7, 23.4, 25, 21.5, 22.3, 20.5, 20.7, 21.9, 24.6, 22.1, 22.5, 21.2, 20.6, 20.8, 22.8, 23.3, 22.7, 24.3, 25.9, 24.7, 22.3, 21, 23.5],[21.3, 19.8, 19.8, 21.8, 19.6, 17.1, 18.5, 18.4, 20.7, 16.1, 15.4, 12.8, 15.3, 15.8, 15.6, 17.8, 16, 14.8, 15.9, 13.9, 14.7, 15.5, 15.4, 14.6, 12.8, 12.9, 12.7, 14.8, 14.6, 15.9, 14.7],[14.9, 15.1, 15.8, 16.3, 17, 15.5, 15.8, 14.4, 14.1, 15, 11.8, 12.1, 12, 12.4, 11.7, 9.4, 12.3, 15.8, 16.9, 14, 11.2, 11.2, 9.8, 7.6, 8.1, 13.3, 7.9, 6, 7.8, 9.3],[6.1, 4.4, 6.8, 6.1, 9.5, 6.6, 6.7, 10.6, 12.7, 13, 11.8, 11, 15.2, 14.4, 11.9, 6.7, 10.5, 7.8, 5.9, 6, 9.4, 7.7, 7.6, 3.8, 3.9, 2.5, 1.6, 0.2, -0.3, 1.9, 5.9],[5.3, 6.1, 4.6, 8, 6.6, 7.1, 6.5, 7.5, 7.6, 7.6, 8.8, 8.8, 7.2, 4.5, 9.4, 7.1, 5, 3.2, 0.1, -1.5, 1.8, -3.1, -6.3, -3, -0.4, -5.3, -5.5, -4.8, 1.4, 6.3],[5, 4.2, 5.4, 3.2, -1.2, -2.2, -0.3, -0.2, -1.3, 2.9, 2.4, -3.7, -6.3, -9.2, -5.7, -0.8, -1.9, -4.4, -0.3, 1.2, -1.2, -3.1, -5.4, -7.2, -2, 0.3, 0.1, -3.2, -2.5, -1.6, 1.6]] ;
    const y1: number[][] = [[1.9, 0.1, -0.9, 1, -1.2, -3.8, -6.6, -2.8, -6.9, -1.9, -2.1, -3.2, -2.3, -2.7, -1.9, 0, 0, -3.1, -2.9, -2.4, -2.9, -4.4, -1.1, 3, 3.4, -0.6, -3.8, 0.2, -2.1, -4.3, 0.9],[0.5, -6.4, -7.4, -8.4, -8.1, -5.2, -4.7, -4.7, -0.1, -1.4, -2, -1, -3.4, 0.6, -0.2, -1.2, -4.2, -0.8, -1.2, -3.8, -3.1, -4.8, -3.7, -3.8, -6.7, -9.2, -9.5, -11.4],[-11.4, -7.1, -5.8, -4.3, -4.7, -3.9, -1.7, -1.8, -3, -3.3, -3, -0.2, 0.8, -0.7, -2.6, -6.2, -6.3, -6.1, -1.1, 2, 1.7, 1.8, -0.2, 2.8, 3.5, -0.6, -2.6, -2.5, -1.5, -1.9, -1.4],[0.2, 0, -0.1, 2.5, 3.1, 4.6, 3.2, 3.9, 3.3, 4.5, 4.6, 7, 8.4, 10.8, 10.7, 7.6, 7.5, 10.5, 10, 8.3, 10.8, 9.3, 7.4, 7.5, 8.5, 8.3, 7.4, 6.9, 8.1, 8.8],[4.4, 8.2, 7.7, 8.3, 12.5, 13.2, 13.3, 14.6, 16.8, 17.8, 14.5, 13.3, 16.7, 19.4, 19.8, 18.9, 13, 14.4, 15.3, 15.2, 15.8, 16.7, 18.6, 19, 20.6, 21.9, 22.2, 18.7, 21, 24.2, 23],[22, 22.4, 23.3, 19.4, 13.9, 15.5, 20, 21.5, 20.5, 20.5, 16.6, 18.1, 16.7, 14.3, 15.5, 15.8, 13.1, 14.4, 16, 12.1, 11.7, 13.1, 15.9, 18.5, 23.1, 23.4, 22.2, 21.5, 17.6, 17.3],[20.4, 21.7, 23.6, 22.8, 19.4, 21.8, 20.5, 21.4, 17.7, 23.4, 25, 21.5, 22.3, 20.5, 20.7, 21.9, 24.6, 22.1, 22.5, 21.2, 20.6, 20.8, 22.8, 23.3, 22.7, 24.3, 25.9, 24.7, 22.3, 21, 23.5],[21.3, 19.8, 19.8, 21.8, 19.6, 17.1, 18.5, 18.4, 20.7, 16.1, 15.4, 12.8, 15.3, 15.8, 15.6, 17.8, 16, 14.8, 15.9, 13.9, 14.7, 15.5, 15.4, 14.6, 12.8, 12.9, 12.7, 14.8, 14.6, 15.9, 14.7],[14.9, 15.1, 15.8, 16.3, 17, 15.5, 15.8, 14.4, 14.1, 15, 11.8, 12.1, 12, 12.4, 11.7, 9.4, 12.3, 15.8, 16.9, 14, 11.2, 11.2, 9.8, 7.6, 8.1, 13.3, 7.9, 6, 7.8, 9.3],[6.1, 4.4, 6.8, 6.1, 9.5, 6.6, 6.7, 10.6, 12.7, 13, 11.8, 11, 15.2, 14.4, 11.9, 6.7, 10.5, 7.8, 5.9, 6, 9.4, 7.7, 7.6, 3.8, 3.9, 2.5, 1.6, 0.2, -0.3, 1.9, 5.9],[5.3, 6.1, 4.6, 8, 6.6, 7.1, 6.5, 7.5, 7.6, 7.6, 8.8, 8.8, 7.2, 4.5, 9.4, 7.1, 5, 3.2, 0.1, -1.5, 1.8, -3.1, -6.3, -3, -0.4, -5.3, -5.5, -4.8, 1.4, 6.3],[5, 4.2, 5.4, 3.2, -1.2, -2.2, -0.3, -0.2, -1.3, 2.9, 2.4, -3.7, -6.3, -9.2, -5.7, -0.8, -1.9, -4.4, -0.3, 1.2, -1.2, -3.1, -5.4, -7.2, -2, 0.3, 0.1, -3.2, -2.5, -1.6, 1.6]]

    const options: echarts.EChartsCoreOption = {
    title: {
      text: 'Average temperature in Oslo, Norway in 2018',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        snap: false,
        type: 'none'
      },
      formatter: function (params, ticket, callback) {
        let temperature = 0
        temperature += params[0].value
        temperature += params[1].value
        temperature -= params[2].value

        const result = `Month: ${
          params[0].name
        }<br/> Average temperature in °C: ${temperature}`
        setTimeout(function () {
          callback(ticket, result)
        }, 100)
        return result
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: x,
      axisLabel: {
        formatter: function (value, index) {
          const date = new Date(value)
          return date.getMonth() + 1
        }
      },
      name: 'Month',
      nameLocation: 'middle',
      nameGap: 30
    },
    yAxis: {
      type: 'value',
      min: -1,
      max: 16,
      name: 'Average Temperature in °C',
      nameLocation: 'middle',
      nameGap: 30
    },
    series: [
      {
        data: [0, 0, 0, 6.453333333333334, 15, 15, 15, 15, 12.483333333333336, 7.351612903225806, 3.3533333333333335, 0, NaN],
        type: 'line',
        areaStyle: {
          opacity: 0.6
        },
        color: '#a1d76a',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 0 }
      },
      {
        data: [0, 0, 0, 0, 1.096774193548388, 2.8633333333333333, 7.158064516129031, 1.2903225806451601, 0, 0, 0, 0, 0],
        type: 'line',
        areaStyle: {
          opacity: 1
        },
        color: '#a1d76a',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 0 }
      },
      {
        data: [1.7225806451612902, 4.117857142857144, 2.3000000000000007, 0, 0, 0, 0, 0, 0, 0, 0, 1.2064516129032254, 0],
        type: 'line',
        areaStyle: {
          opacity: 1
        },
        color: '#0571b0',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 0 }
      }
    ]
  }

    const getAhoiConfig = (): IAhoiConfig => {    
        const defaultOnboardingMessages = generateBasicAnnotations(
          contextKey,
          EVisualizationType.HORIZON_GRAPH,
          runtimeObject
        );      
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };
        
        return ahoiConfig;
    };
    
    // option && myChart.setOption(option);
    
    onMount(async () => {
      const chartDom = document.getElementById('changeMatrix');  
      runtimeObject = echarts.init(chartDom, null, {
      renderer: 'svg'
      });
      runtimeObject.setOption(options);  
      if(onboardingUI) {
        onboardingUI.showOnboarding();    
        } else {      
          onboardingUI = await ahoi(
            contextKey,
            EVisualizationType.HORIZON_GRAPH,
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

    const onResize = (e) => {
      if(onboardingUI) {
      // update onboarding
       onboardingUI.updateOnboarding(getAhoiConfig(), runtimeObject)
      }
     if(runtimeObject) {
      runtimeObject.resize();
      }
    }   
    
    
</script>  

<div id="echarts" style="width: 100%; height: 100%;">
  <ResizeObserver on:resize={onResize} />
  <div id="changeMatrix" style="width: 600px; height: 600px;"> </div> 
</div>   
    
<style>
  :global(*) {
    font-family: sans-serif;
  }
</style>
    