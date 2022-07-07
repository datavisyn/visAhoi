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

const render = async () => {
  const data = await importCsv('./data/jobsPlan.csv');
  const { label, parent, value, color } = processData(data);
  chart = await makePlotly(label, parent, value, color);
  window.addEventListener('resize', debouncedResize);
};

const processData = (data) => {
  const label = [];
  const parent = [];
  const value = [];
  const color = [];

  data.map((d) => {
    label.push(d.Label);
    parent.push(d.Parent);
    value.push(d.Value);
    color.push(d.Color);
  });

  return { label, parent, value, color };
};

const makePlotly = (label, parent, value, color) => {
  const traces = [
    {
      type: 'treemap',
      branchvalues: 'total',
      labels: label,
      parents: parent,
      values: value,
      marker: {
        colors: color,
        // colorscale: 'Greys',
      },
    },
  ];
  const config = {
    responsive: true,
  };
  const layout = {
    // title: 'Jobs Plan',
  };
  return Plotly.newPlot('vis', traces, layout, config);
};

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    EVisualizationType.TREEMAP,
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
        EVisualizationType.TREEMAP,
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
