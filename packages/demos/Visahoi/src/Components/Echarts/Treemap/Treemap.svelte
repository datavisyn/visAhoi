<script lang="ts">
    import * as echarts from 'echarts';
    import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts'
    import { onMount, onDestroy } from "svelte";
    
    let contextKey = 'changeMatrix';
    let onboardingUI;

    const data = 
      {
          "children": [
              {
                  "name": "Community Infrastructure",
                  "children": [
                      {
                          "name": "Clean drinking water",
                          "desc": "For replacing lead pipes and upgrading drinking water systems",
                          "group": "community",
                          "value": 111,
                          "colname": "level3"
                      },
                      {
                          "name": "Broadband",
                          "desc": "Provide funding to build high-speed broadband, reduce the cost of broadband internet service, and promote transparency and competition",
                          "group": "community",
                          "value": 100,
                          "colname": "level3"
                      },
                      {
                          "name": "Electric",
                          "desc": "Investing in the power infrastructure",
                          "group": "community",
                          "value": 100,
                          "colname": "level3"
                      },
                      {
                          "name": "Housing",
                          "desc": "Used to build and update affordable housing",
                          "group": "community",
                          "value": 213,
                          "colname": "level3"
                      },
                      {
                          "name": "Schools and VA hospitals",
                          "desc": "Modernize VA hospitals and clinics",
                          "group": "community",
                          "value": 155,
                          "colname": "level3"
                      },
                      {
                          "name": "Other",
                          "desc": "Other misc. programs",
                          "group": "community",
                          "value": 28,
                          "colname": "level3"
                      }
                  ],
                  "colname": "level2",
                  "color": "#80b1d3",
                  "total": 707
              },
              {
                  "name": "Transportation",
                  "children": [
                      {
                          "name": "Electrifying vehicles",
                          "desc": "Invest in Electric Vehicles (EV), including consumer rebates to purchase EVs, grants and incentives to build 500,000 new charging stations, and replacing and electrifying federal vehicle fleet",
                          "group": "transport",
                          "value": 174,
                          "colname": "level3"
                      },
                      {
                          "name": "Bridge and road repair",
                          "desc": "Modernize bridges, highways, roads, and main streets in critical need of repair",
                          "group": "transport",
                          "value": 115,
                          "colname": "level3"
                      },
                      {
                          "name": "Modernizing public transit",
                          "desc": "Modernize public transit",
                          "group": "transport",
                          "value": 85,
                          "colname": "level3"
                      },
                      {
                          "name": "Rail service",
                          "desc": "Improve passenger and freight rail service",
                          "group": "transport",
                          "value": 80,
                          "colname": "level3"
                      },
                      {
                          "name": "Ports",
                          "desc": "Airports, water transit",
                          "group": "transport",
                          "value": 42,
                          "colname": "level3"
                      },
                      {
                          "name": "Redress historic inequities",
                          "desc": "Transportation inequities; Establish program to reconnect neighborhoods and ensure new projects increase opportunity",
                          "group": "transport",
                          "value": 45,
                          "colname": "level3"
                      },
                      {
                          "name": "Infrastructure",
                          "desc": "Improve infrastructure resilience by safeguarding critical infrastructure and services, defending vulnerable communities, and maximizing resilience of land and water resources",
                          "group": "transport",
                          "value": 50,
                          "colname": "level3"
                      },
                      {
                          "name": "Other",
                          "desc": "Other misc. programs",
                          "group": "transport",
                          "value": 30,
                          "colname": "level3"
                      }
                  ],
                  "colname": "level2",
                  "color": "#fdb462",
                  "total": 621
              },
              {
                  "name": "Workforce Development",
                  "alt": "R&D, Workforce, Manufacturing",
                  "children": [
                      {
                          "name": "Research & development",
                          "desc": "Spending in research and development",
                          "group": "research",
                          "value": 180,
                          "colname": "level3"
                      },
                      {
                          "name": "Manufacturing",
                          "desc": "For manufacturing including strengthening supply chains",
                          "group": "research",
                          "value": 300,
                          "colname": "level3"
                      },
                      {
                          "name": "Workforce development",
                          "desc": "For workforce development",
                          "group": "research",
                          "value": 100,
                          "colname": "level3"
                      }
                  ],
                  "colname": "level2",
                  "color": "#b3de69",
                  "total": 580
              },
              {
                  "name": "Elder care",
                  "children": [
                      {
                          "name": "Home/community-based care",
                          "desc": "For home and community care and industry workers",
                          "group": "eldercare",
                          "value": 400,
                          "colname": "level3"
                      }
                  ],
                  "colname": "level2",
                  "color": "#fccde5",
                  "total": 400
              }
          ],
          "name": "American Jobs Plan",
          "total": 2308
      }



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

//   console.log(da) 
    
  const options = {
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


    const getAhoiConfig = (contextKey, runtimeObject) => {    
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
      const runtimeObject = echarts.init(chartDom, null, {
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
      <div id="treemap" style="width: 500px; height: 500px;"> </div>
    </div>
    
    
    
    <style>
      :global(*) {
        font-family: sans-serif;
      }
    </style>
     