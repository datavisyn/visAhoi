<script lang="ts">
    import * as echarts from 'echarts';
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';
    import ResizeObserver from "svelte-resize-observer";
    import { onMount, onDestroy } from "svelte";
    
    export let contextKey = 'changeMatrix';
    let onboardingUI;
    let runtimeObject;

    const locations = ['Tallin', 'Oslo', 'Munich'];

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

    
    const options = {
        title: {
          text: 'Average temperature change in °C between 1990 and 1991',
          left: 'center'
        },
        tooltip: {},
        grid: {
          height: '50%',
          top: '10%'
        },
        yAxis: {
          type: 'category',
          data: locations,
          name: 'City',
          nameLocation: 'middle',
          nameGap: 35
        },
        xAxis: {
          type: 'category',
          data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', 'undefined-undefined'],
          axisLabel: {
            formatter: function (value, index) {
              const date = new Date(value)
              return date.getMonth()
            }
          },
          name: 'Month',
          nameLocation: 'middle',
          nameGap: 30
        },
        series: [
          {
            type: 'heatmap',
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
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          color: ['#D2B48C', '#FDFDFD', '#4682b4'],
          text: ['High', 'Low']
        }
    };

    const getAhoiConfig = () => {    
        const defaultOnboardingMessages = generateBasicAnnotations(
          contextKey,
          EVisualizationType.CHANGE_MATRIX,
          runtimeObject
        );      
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };       
        return ahoiConfig;
    };
     
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
            EVisualizationType.CHANGE_MATRIX,
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
     <!-- <ResizeObserver on:resize={onResize} /> -->
      <div id="changeMatrix" style="width: 500px; height: 500px;"> </div>
    </div>
    
    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
    