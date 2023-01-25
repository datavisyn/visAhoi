/* eslint-disable comma-dangle */
/* eslint-disable semi */
import * as echarts from 'echarts';
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
} from '@visahoi/echarts';
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
    [0, 0, 14],
    [0, 1, 0],
    [0, 2, 19],
    [0, 3, 24],
    [0, 4, 16],
    [1, 0, 17],
    [1, 1, 15],
    [1, 2, 28],
    [1, 3, 44],
    [1, 4, 20],
    [2, 0, 19],
    [2, 1, 23],
    [2, 2, 48],
    [2, 3, 18],
    [2, 4, 18],
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
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: '13',
      },
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
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: '13',
      },
      nameGap: 75,
    },

    visualMap: {
      min: 10,
      max: 50,
      inRange: {
        color: ['#337ab7', '#f5f5f5', '#ec6836'], // From smaller to bigger value ->
      },

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
          },
        },
      },
    ],
  };

  chart.setOption(option);
  return chart;
};

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart.id,
    EVisualizationType.HEATMAP,
    chart,
  );
  // const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
  //   ...d,
  //   text: 'test123',
  // }));
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
  };
  return ahoiConfig;
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
        chart.id,
        EVisualizationType.HEATMAP,
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
