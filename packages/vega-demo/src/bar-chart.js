import embed from 'vega-embed';
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega';

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

let chart = null;
let showOnboarding = false;
let onboardingUI = null;

async function render() {
  const response = await fetch('./data/barChartOslo2018.json');
  const json = await response.json();

  chart = await embed('#vis', json, opt);
  window.addEventListener("resize", () => onboardingUI?.updateOnboarding());
};

const registerEventListener = () => {
  const helpIcon = document.getElementById("show-onboarding");
  if(!helpIcon) { return; }
  helpIcon.addEventListener('click', async () => {
    if(showOnboarding) {
      generateBasicAnnotations(EVisualizationType.BAR_CHART, chart).then((defaultOnboardingMessages) => {
        const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
          ...d,
          text: "test123"
        }));

        const ahoiConfig = {
          onboardingMessages: defaultOnboardingMessages,
        }
        ahoi(EVisualizationType.BAR_CHART, chart, ahoiConfig).then((result) => {
          onboardingUI = result;
        });
      });
    } else {
      onboardingUI?.removeOnboarding();
    }
    showOnboarding = !showOnboarding;
  })
}

registerEventListener();
render();
