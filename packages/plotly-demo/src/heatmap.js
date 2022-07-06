import Plotly from 'plotly.js-dist';
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
} from '@visahoi/plotly';
import debounce from 'lodash.debounce';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

console.log('Testing');

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig());
}, 250);

const render = async () => {
  chart = await makePlotly();
  window.addEventListener('resize', debouncedResize);
};

const makePlotly = () => {
  const data = [
    {
      z: [
        [1, null, 30, 50, 1],
        [20, 1, 60, 80, 30],
        [30, 60, 1, -10, 20],
      ],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap',
      hoverongaps: false,
      colorscale: [
        [0, '#4682b4'],
        [0.5, '#FDFDFD'],
        [1, '#D2B48C'],
      ],
    },
  ];
  const layout = {
    title: 'Average temperature in a week',
    xaxis: {
      title: 'Day',
    },
    yaxis: {
      title: 'Parts of Day',
    },
  };
  const config = {
    responsive: true,
  };
  return Plotly.newPlot('vis', data, layout, config);
};

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    EVisualizationType.HEATMAP,
    chart,
  );
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: 'test123',
  }));
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
  };
  return ahoiConfig;
};

const registerEventListener = () => {
  showOnboarding = !showOnboarding;
  const helpIcon = document.getElementById('show-onboarding');
  if (!helpIcon) {
    return;
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if (showOnboarding) {
      onboardingUI = await ahoi(
        EVisualizationType.HEATMAP,
        chart,
        getAhoiConfig(),
      );
    } else {
      onboardingUI?.removeOnboarding();
    }
  });
};

registerEventListener();
render();
