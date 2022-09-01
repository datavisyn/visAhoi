import Plotly from 'plotly.js-dist';
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
} from '@visahoi/plotly';
import debounce from 'lodash.debounce';
import { importCsv } from './util';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig());
}, 250);

async function render() {
  const data = await importCsv('./data/oslo-2018.csv');
  const { x, y } = processData(data);
  chart = await makePlotly(x, y);
  window.addEventListener('resize', debouncedResize);
}

function processData(allRows) {
  const x = [];
  const y = [];
  for (var i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    x.push(`${row.year}-${row.month}`);
    y.push(row.temp);
  }
  return { x, y };
}

function makePlotly(x, y) {
  document.getElementById('plot');
  const traces = [
    {
      type: 'bar',
      x: x, // ['2018-01', '2018-01', ...]
      y: y, // [1.9, 0.1, ...]
      transforms: [
        {
          type: 'aggregate',
          groups: x,
          aggregations: [{ target: 'y', func: 'avg', enabled: true }],
        },
      ],
      marker: {
        color: 'lightgrey',
      },
    },
  ];

  const layout = {
    title: 'Average temperature in Oslo, Norway in 2018',
    xaxis: {
      title: 'Month',
      tickformat: '%m',
      nticks: 12,
    },
    yaxis: {
      title: 'Average temperature in °C',
    },
  };

  const config = {
    responsive: true,
  };

  return Plotly.newPlot('vis', traces, layout, config);
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    EVisualizationType.BAR_CHART,
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
  const helpIcon = document.getElementById('show-onboarding');
  if (!helpIcon) {
    return;
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding;
    if (showOnboarding) {
      onboardingUI = await ahoi(
        EVisualizationType.BAR_CHART,
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
