import Plotly from 'plotly.js-dist';
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
  addBasicOnboardingStage,
  getOnboardingStages,
  createBasicOnboardingMessage,
} from '@visahoi/plotly';
import debounce from 'lodash.debounce';
import { importCsv } from './util';
// @ts-ignore
import editIcon from '@visahoi/core/src/assets/pen-solid.svg';

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
  const allX = [];
  const allY = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    const month = `${row.year}-${row.month}`;

    allX.push(`${row.year}-${row.month}-${row.day}`);
    allY.push(row.temp);

    if (x.includes(month)) {
      const idx = x.indexOf(month);
      y[idx].push(parseFloat(row.temp));
    } else {
      x.push(`${row.year}-${row.month}`);
      y.push([parseFloat(row.temp)]);
    }
  }

  const averagedYValues = y.map((tempArray) => {
    const sum = tempArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return sum / tempArray.length;
  });
  return { x, y: averagedYValues };
}

function makePlotly(x, y) {
  document.getElementById('plot');
  const traces = [
    {
      name: 'Between 0 and 15 °C',
      type: 'scatter',
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item < 0 ? 0 : item > 15 ? 15 : item)), // [1.9, 0.1, ...]
      // y: y.map(item => (item < 0 ? (item * -1) : item)), // [1.9, 0.1, ...]
      fill: 'tozeroy',
      fillcolor: 'rgba(161, 215, 106, 0.6)', // #a1d76a + 0.6 opacity
      mode: 'none', // no extra line + points for values
      line: {
        shape: 'spline',
        smoothing: 0.25,
      },
      hovertemplate: '%{y:.2f}',
    },
    {
      name: 'More than 15 °C',
      type: 'scatter',
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item > 15 ? item - 15 : 0)), // [1.9, 0.1, ...]
      fill: 'tozeroy',
      fillcolor: 'rgba(161, 215, 106, 1)', // #a1d76a + 0.6 opacity
      mode: 'none', // no extra line + no points for values,
      line: {
        shape: 'spline',
        smoothing: 0.25,
      },
      hovertemplate: '%{y:.2f}',
    },
    {
      name: 'Less than 0 °C',
      type: 'scatter',
      x: x, // ['2018-01', '2018-01', ...]
      y: y.map((item) => (item < 0 ? item * -1 : 0)), // [1.9, 0.1, ...]
      fill: 'tozeroy',
      fillcolor: 'rgba(5, 113, 176, 1)', // #0571b0 + 1 opacity
      mode: 'none', // no extra line + no points for values
      line: {
        shape: 'spline',
        smoothing: 0.25,
      },
      // hoverinfo: "x+y"
      hovertemplate: '-%{y:.2f}',
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
    showlegend: false,
  };

  const config = {
    responsive: true,
  };

  return Plotly.newPlot('vis', traces, layout, config);
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart.id,
    EVisualizationType.HORIZON_GRAPH,
    chart,
  );
  const newOnboardingStage = addBasicOnboardingStage(chart.id, {
    title: 'New stage',
    icon: `<img src=${editIcon} />`,
    backgroundColor: 'tomato',
  });
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: 'test123',
  }));
  defaultOnboardingMessages[0].onboardingStage = newOnboardingStage;
  defaultOnboardingMessages[0].title = 'New stage';
  defaultOnboardingMessages.push(
    createBasicOnboardingMessage(chart.id, {
      text: "This is the newly added onboarding message for the horizon chart. It's absolutely positioned.",
      title: 'Absolutely positioned message',
      onboardingStage: newOnboardingStage,
      anchor: {
        coords: {
          x: 250,
          y: 250,
        },
      },
    }),
  );
  defaultOnboardingMessages.push(
    createBasicOnboardingMessage(chart.id, {
      text: "This is the newly added onboarding message for the horizon chart. It's attached to a selector.",
      title: 'Selector attached message',
      onboardingStage: newOnboardingStage,
      anchor: {
        sel: '.infolayer .ytitle',
      },
    }),
  );
  defaultOnboardingMessages.push(
    createBasicOnboardingMessage(chart.id, {
      text: "This is the newly added onboarding message for the horizon chart. It's attached to a selector.",
      title: 'Element attached message',
      onboardingStage: newOnboardingStage,
      anchor: {
        element: document.getElementsByClassName('section-title')[0],
      },
    }),
  );
  // const newOnboardingMessage = createBasicOnboardingMessage();
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
    // backdrop: {
    //   show: false,
    // },
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
        chart.id,
        EVisualizationType.HORIZON_GRAPH,
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
