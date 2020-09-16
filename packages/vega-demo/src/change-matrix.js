import vegaEmbed from 'vega-embed';
import { ahoi, EVisualizationType } from '@visahoi/vega';

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

  ahoi(EVisualizationType.CHANGE_MATRIX, vegaLite, 'onboarding');
};

render();
