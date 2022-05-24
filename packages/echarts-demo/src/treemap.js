import * as echarts from 'echarts';
import { forEach } from 'lodash';
import debounce from "lodash.debounce";

let chart = null;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

async function render() {
    
    console.log('testing')
    fetch("../data/jobsplan.json").then(response => response.json()).then(data => {
        const value = processData(data); 
        // const value = convertData(data);
        // console.log(value);
        chart = createPlot(value);
        window.addEventListener("resize", debouncedResize);
      
        });
}

function processData(data) {
    debugger;
  console.log(data);
  return data
}

function createPlot(value2) {
    debugger;
 console.log('CReata the plotdata', value2 );
 const d1 = [];
 value2.children.map((d) => d1.push(d))
 console.log(d1)
 const dataArr = [];
 const obj = {};

        if(value2.children.length > 0) {          
          debugger;
             value2.children.map((child,i) => {
               console.log(i)
                  obj[i] = child;
                  // obj[i].itemStyle = child.color; 
                  obj[i].itemStyle = {
                    color: child.color
                  }
                  dataArr.push(obj[i]);
                    console.log(dataArr);
                 }) }
        console.log('outside ', dataArr)
        
                    
                



 

 const options = {

     series: [
        {
          type: 'treemap',
          name: "American Jobs Plan",
          // data: [
          //   {
          //     name: "Community Infrastructure",
          //   //   value: 10,
          //     children: [
          //       {
          //         name: "Clean drinking water",
          //         value: 111
          //       },
          //       {
          //         name: "Broadband",
          //         value: 100
          //       },
          //       {
          //           name: "Other",
          //           value: 28
          //       },
          //       {
          //           name: "Electric",
          //           value: 100
          //       },
          //       {
          //           name: "Housing",
          //           value: 213
          //       },
          //       {
          //           name: "Schools and VA hospitals",
          //           value: 155
          //       }
          //     ],
          //     itemStyle: {
          //       // Color of the point.
          //       color: '#80b1d3'
          //     },
              
          //   },
          //   {
          //     name: 'Transportation',
          //   //   value: 20,
              
                  
          //         children: [
          //           {
          //             name: 'Electrifying vehicles',
          //             value: 174
          //           },
          //           {
          //               name: 'Bridge and road repair',
          //               value: 115
          //           },
          //           {
          //               name: 'Modernizing public transit',
          //               value: 85
          //           },
          //           {
          //               name: 'Rail service',
          //               value: 80
          //           },
          //           {
          //               name: 'Ports',
          //               value: 42
          //           },
          //           {
          //               name: 'Redress historic inequities',
          //               value: 45
          //           },
          //           {
          //               name: 'Infrastructure',
          //               value: 50
          //           },
          //           {
          //               name: 'Other',
          //               value: 30
          //           }
          //         ],
          //         itemStyle: {
          //             color: '#fdb462'
          //         }
          //       },
          //       {
          //           name: 'Workforce Development',
          //         //   value: 20,
                    
                        
          //               children: [
          //                 {
          //                   name: 'Research & development',
          //                   value: 180
          //                 },
          //                 {
          //                     name: 'Manufacturing',
          //                     value: 300
          //                 },
          //                 {
          //                     name: 'Workforce development',
          //                     value: 100
          //                 },
          //                 {
          //                     name: 'Rail service',
          //                     value: 80
          //                 }                          
          //               ],
          //               itemStyle: {
          //                   color: '#b3de69'
          //               }
          //             },
          //             {
          //                 name: 'Elder care',
          //                 children: [
          //                     {
          //                       name:'Home/community-based care',
          //                       value: 400
          //                     },                              
          //                 ],
          //                 itemStyle: {
          //                     color: '#fccde5'
          //                 }
          //             }

          //     ]

          data: dataArr
            }
          ],
        }
  chart.setOption(options);
  return chart;

  };





const createChart = (renderer = 'svg') => {
   
    console.log('test_1');
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer});
  window.addEventListener("resize", () => chart.resize());
//   registerEventListener();
  render();
}

export default createChart;
