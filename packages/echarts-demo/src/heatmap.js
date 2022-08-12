import * as echarts from 'echarts';
// import {
//   generateBasicAnnotations,
//   ahoi,
//   EVisualizationType,
// } from '@visahoi/plotly';
import debounce from 'lodash.debounce';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig());
}, 250);

const render = () => {
  chart = createPlot();
  window.addEventListener('resize', debouncedResize);
};

const createPlot = () => {
  const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayTime = ['Morning', 'Afternoon', 'Evening'];
  const data = [
    [0, 0, 1],
    [0, 1, 0],
    [0, 2, 30],
    [0, 3, 50],
    [0, 4, 1],
    [1, 0, 20],
    [1, 1, 1],
    [1, 2, 60],
    [1, 3, 80],
    [1, 4, 30],
    [2, 0, 30],
    [2, 1, 60],
    [2, 2, 1],
    [2, 3, -10],
    [2, 4, 20],
  ].map(function (item) {
    return [item[1], item[0], item[2] || '-'];
  });
  const option = {
    title: {
      text: 'Average temperature in a week',
      left: 'center',
    },
    tooltip: {
      position: 'right',
    },
    grid: {
      height: '70%',
      top: '10%',
    },
    xAxis: {
      name: 'Weekday',
      type: 'category',
      data: day,
      splitArea: {
        show: true,
      },
      nameLocation: 'middle',
      nameGap: 35,
    },
    yAxis: {
      name: 'Average temperature per day',
      type: 'category',
      data: dayTime,
      splitArea: {
        show: true,
      },
      nameLocation: 'middle',
      nameGap: 75,
      axisName: {
        fontWeight: 'bold',
      },
    },
    // labelLayout: {
    //   fontSize: '30px',
    // },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'vertical',
      right: '3%',
      bottom: '50%',
      height: '80%',
    },
    itemStyle: {},
    series: [
      {
        type: 'heatmap',
        data: data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            fontWeight: 'bold',
            // shadowBlur: 10,
            // shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  chart.setOption(option);
  return chart;
};

const registerEventListener = () => {
  const helpIcon = document.getElementById('show-onboarding');
  if (!helpIcon) {
    return;
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if (showOnboarding) {
      onboardingUI = await ahoi(
        EVisualizationType.TREEMAP,
        chart,
        getAhoiConfig(),
      );
    } else {
      onboardingUI?.removeOnboarding();
    }
  });
};

const createChart = (renderer = 'svg') => {
  const vis = document.getElementById('vis');
  chart = echarts.init(vis, null, { renderer });
  window.addEventListener('resize', () => chart.resize());
  registerEventListener();
  render();
};

export default createChart;
