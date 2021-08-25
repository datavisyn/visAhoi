import vegaEmbed from 'vega-embed';
import { ahoi, EVisualizationType } from '@visahoi/vega';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

async function render() {
  const response = await fetch('./data/horizonGraphOslo2018.json');
  const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);

  ahoi(EVisualizationType.SCATTERPLOT, vegaLite, '#onboarding');
};

render();
