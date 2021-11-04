import embed from 'vega-embed';
import { ahoi, EVisualizationType } from '@visahoi/vega';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

async function render() {
  const response = await fetch('./data/barChartOslo2018.json');
  const json = await response.json();

  // let vegaLite = await embed('#vis', json, opt);
  window.addEventListener("resize", () => ahoi(EVisualizationType.BAR_CHART, {}, '#onboarding'));
  ahoi(EVisualizationType.BAR_CHART, {}, '#onboarding');
};

render();
