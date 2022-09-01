import * as echarts from 'echarts';
import debounce from "lodash.debounce";
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/echarts';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

const render = async() => {
  fetch("../data/jobsplan.json").then(response => response.json()).then(data => {
    const value = processData(data);         
    chart = createPlot(value);
    window.addEventListener("resize", debouncedResize);      
  });
}

const processData = (data) => {  
  const dataArr = [];
  const obj = {};
  if(data.children.length > 0) {      
    data.children.map((child,i) => {           
            obj[i] = child;               
            obj[i].itemStyle = {
              color: child.color,                
            }
            dataArr.push(obj[i]);                
    }) 
  }    
  return dataArr;
}

const getLevelOption = () => {
  return [
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
        gapWidth: 1,        
      },            
      upperLabel: {
        show: true,
        fontWeight: 'bold',
        fontSize: 15,       
      },     
    },
     
  ];
}

const createPlot = (data) => {
  const options = {      
    series: [
      {
        type: 'treemap',
        name: "American Jobs Plan",
        data: data,
        levels: getLevelOption(),         
      }
    ],
    tooltip: {},
    // textStyle: {
    //   color: 'black',
    //   // fontWeight: 'bold',      
    // }
           
  }

chart.setOption(options);
return chart;
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(EVisualizationType.TREEMAP, chart);
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: "test123"
  }));
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
  }
  return ahoiConfig;
}

const registerEventListener = () => {    
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if(showOnboarding) {
      onboardingUI = await ahoi(EVisualizationType.TREEMAP, chart, getAhoiConfig());
    } else {
      onboardingUI?.removeOnboarding();
    }    
  })
}


const createChart = (renderer = 'svg') => {    
  const vis = document.getElementById("vis");
  chart = echarts.init(vis, null, {renderer});
  window.addEventListener("resize", () => chart.resize());
  registerEventListener();
  render();
}

export default createChart;
