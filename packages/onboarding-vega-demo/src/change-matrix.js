import vegaEmbed from 'vega-embed';
import { onboarding } from 'onboarding-vega';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

async function render() {
  const response = await fetch('./data/changeMatrix.json');
  const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);

  onboarding('change-matrix', vegaLite);
};

render();
