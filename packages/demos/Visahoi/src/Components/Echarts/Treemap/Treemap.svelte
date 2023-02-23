<script lang="ts">
  import * as echarts from 'echarts';
  import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';
  import ResizeObserver from "svelte-resize-observer";
  import { onMount, onDestroy } from "svelte";
  import type { IAhoiConfig } from '@visahoi/core';
    
    export let contextKey = 'changeMatrix';
    const data: echarts.EChartsOption = require("./data.json");
    let onboardingUI;
    let runtimeObject: echarts.ECharts;

//     const dataArr = []
//     const obj = {}
//     if (data?.children.length > 0) {
//     data.children.map((child, i) => {
//       obj[i] = child
//       obj[i].itemStyle = {
//         color: child.color
//       }
//       dataArr.push(obj[i])
//     })
//   };
    
  const options: echarts.EChartsCoreOption = {
    series: [
      {
        type: 'treemap',
        name: 'American Jobs Plan',
        data: [data],
        levels: [
          {
            itemStyle: {
              borderColor: 'white',
              borderWidth: 0,
              gapWidth: 1,
              color: 'black'
            },
            upperLabel: {
              show: false
            }
          },
          {
            itemStyle: {
              borderColor: 'white',
              borderWidth: 2,
              gapWidth: 1
            },
            upperLabel: {
              show: true,
              fontWeight: 'bold',
              fontSize: 15
            }
          }
        ]
      }
    ],
    tooltip: {}
  };


    const getAhoiConfig = (): IAhoiConfig => {    
        const defaultOnboardingMessages = generateBasicAnnotations(
          contextKey,
          EVisualizationType.TREEMAP,
          runtimeObject
        );      
        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        };       
        return ahoiConfig;
    };    
    
    onMount(async () => {
      const chartDom = document.getElementById('treemap');  
      runtimeObject = echarts.init(chartDom, null, {
      renderer: 'svg'
      });
      runtimeObject.setOption(options);  
      if(onboardingUI) {
        onboardingUI.showOnboarding();    
      } else {      
          onboardingUI = await ahoi(
            contextKey,
            EVisualizationType.TREEMAP,
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
    };
    
    
  </script>
  <div id="echarts" style="width: 100%; height: 100%;">
    <ResizeObserver on:resize={onResize} />
    <div id="treemap" style="width: 500px; height: 500px;"> </div>
  </div>    
    
  <style>
    :global(*) {
      font-family: sans-serif;
    }
  </style>
     