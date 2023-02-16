import Plotly from 'plotly.js-dist'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
  createBasicOnboardingMessage,
  createBasicOnboardingStage,  
} from '@visahoi/plotly';
import debounce from 'lodash.debounce';
// @ts-ignore
import editIcon from '@visahoi/core/src/assets/pen-solid.svg';

let chart = null;
let showOnboarding = false;
let onboardingUI = null;
let defaultOnboardingMessages

const debouncedResize = debounce(() => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

const render = async () => {
    chart = await makePlotly();
    window.addEventListener('resize', debouncedResize);
};

const makePlotly = () => {

let y0 = [];
let y1 = [];
for (let i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 1;
};

let trace1 = {
  y: y0,
  type: 'box'
};

let trace2 = {
  y: y1,
  type: 'box'
};

const data = [trace1, trace2];

const config = {
  responsive: true
}

return Plotly.newPlot('vis', data, config);
};

const getAhoiConfig = () => {
    defaultOnboardingMessages = generateBasicAnnotations(
      'boxplot',
      EVisualizationType.GENERIC,
      chart
    );   

    const ahoiConfig = {
      onboardingMessages: defaultOnboardingMessages,
      showHelpCloseText: false
    };
  return ahoiConfig;
};
  
const registerEventListener = () => {
    const helpIcon = document.getElementById('show-onboarding');
    if (!helpIcon) {
      return
    };
    helpIcon.addEventListener('click', async () => {
      showOnboarding = !showOnboarding;
      if (showOnboarding) {          
        onboardingUI = await ahoi(
          'boxplot',
          EVisualizationType.GENERIC,
          chart,
          getAhoiConfig()
        );
        
        // Create a new onboardingstage and add onboarding messages.
           
        const newStage = createBasicOnboardingStage('boxplot', {      
          title: 'stage-1',      
          icon: `<img src=${editIcon} />`,
          backgroundColor: 'green'
        });
       
        defaultOnboardingMessages[0] = {
          onboardingStage: newStage,
          title: 'New stage'
        };
        
    defaultOnboardingMessages.push(
      createBasicOnboardingMessage('boxplot', {
        title: 'Boxplot Visualization',
        text: 'It allows to examine the distribution of data, especially to compare with multiple groups.',
        onboardingStage: newStage,
        anchor: {
          coords: {
            x: 250,
            y: 250
          }
        }
      })
    );          
  } else {
      onboardingUI?.removeOnboarding();
    }
  })
}
  
registerEventListener();
render();

