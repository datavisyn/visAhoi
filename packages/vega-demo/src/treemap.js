import embed from 'vega-embed';
import debounce from "lodash.debounce";

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

let chart = null;
let onboardingUI = null;

const debouncedResize = debounce(async (event) => {
  const config = await getAhoiConfig();
  onboardingUI?.updateOnboarding(config)
}, 250);

async function render() {
  const response = await fetch('./data/jobsplan.json');
  const json = await response.json();

  chart = await embed('#vis', json, opt);
  window.addEventListener("resize", debouncedResize);
};



// registerEventListener();
render();
