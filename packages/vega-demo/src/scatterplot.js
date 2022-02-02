import vegaEmbed from 'vega-embed';
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';
import debounce from "lodash.debounce";

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

const debouncedResize = debounce(async (event) => {
  const config = await getAhoiConfig();
  onboardingUI?.updateOnboarding(config)
}, 250);

async function render() {
  const response = await fetch('./data/cars.json');
  const json = await response.json();
  chart = await vegaEmbed('#vis', json, opt);
  window.addEventListener("resize", debouncedResize);
};

const getAhoiConfig = async () => {
  const defaultOnboardingMessages = await generateBasicAnnotations(EVisualizationType.SCATTERPLOT, chart);
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: "test123"
  }));
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages,
  }
  return ahoiConfig;
}

const registerEventListener = () => {
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    if(showOnboarding) {
      const config = await getAhoiConfig();
      onboardingUI = await ahoi(EVisualizationType.SCATTERPLOT, chart, config);
    } else {
      onboardingUI?.removeOnboarding();
    }
    showOnboarding = !showOnboarding;
  })
}

registerEventListener();
render();
