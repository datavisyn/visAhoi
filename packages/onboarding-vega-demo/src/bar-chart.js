import vegaEmbed from 'vega-embed';
import { onboarding } from 'onboarding-vega';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

const render = async () => {
  const response = await fetch('./data/barChartOslo2018.json');
  const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);

  onboarding('bar-chart', vegaLite);
};

render();
