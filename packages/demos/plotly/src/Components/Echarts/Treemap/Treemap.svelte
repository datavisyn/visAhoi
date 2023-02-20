<!-- <script lang="ts">
    import * as echarts from 'echarts';
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts'
    import { onMount, onDestroy } from "svelte";
    
    let contextKey = 'changeMatrix';
    let onboardingUI;

    const data = [
        {
            
            children: [
                {name: 'Clean drinking water', desc: 'For replacing lead pipes and upgrading drinking water systems', group: 'community', value: 111, colname: 'level3'},
                {name: 'Broadband', desc: 'Provide funding to build high-speed broadband, red…service, and promote transparency and competition', group: 'community', value: 100, colname: 'level3'},
                {name: 'Electric', desc: 'Investing in the power infrastructure', group: 'community', value: 100, colname: 'level3'},
                {name: 'Housing', desc: 'Used to build and update affordable housing', group: 'community', value: 213, colname: 'level3'},
                {name: 'Schools and VA hospitals', desc: 'Modernize VA hospitals and clinics', group: 'community', value: 155, colname: 'level3'},
                {name: 'Other', desc: 'Other misc. programs', group: 'community', value: 28, colname: 'level3'}
            ],
            colname: "level2",
            color: "#80b1d3",
            itemStyle: {
                color: "#80b1d3",
                name: "Community Infrastructure",
                total: 707
            },
        
        
        },
        {
            children: [
                { name: "Electrifying vehicles", group: "transport", desc: "Invest in Electric Vehicles (EV), including consumer rebates to purchase EVs, grants and incentives to build 500,000 new charging stations, and replacing and electrifying federal", value
: 
174
            ]
        }
        ]

    const dataArr = []
  const obj = {}
  if (data.children.length > 0) {
    data.children.map((child, i) => {
      obj[i] = child
      obj[i].itemStyle = {
        color: child.color
      }
      dataArr.push(obj[i])
    })
  }
    
    const options = {
    series: [
      {
        type: 'treemap',
        name: 'American Jobs Plan',
        data: data,
        levels: getLevelOption()
      }
    ],
    tooltip: {}
  };


    const getAhoiConfig = (contextKey, runtimeObject) => {    
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
    
    // option && myChart.setOption(option);
    
    onMount(async () => {
      const chartDom = document.getElementById('changeMatrix');  
      const runtimeObject = echarts.init(chartDom, null, {
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
            getAhoiConfig(contextKey, runtimeObject)
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
      <h1>Echarts Demo</h1>
      <div id="changeMatrix" style="width: 500px; height: 500px;"> </div>
    </div>
    
    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
     -->