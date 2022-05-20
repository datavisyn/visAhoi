import Plotly from 'plotly.js-dist';
import debounce from "lodash.debounce";
import { importCsv } from './util';

let chart = null;
let onboardingUI = null;

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250);

const render = async () => {
const data = await importCsv("./data/jobsPlan.csv");  
  const {label, parent, value, color} = processData(data);
  chart = await makePlotly(label, parent, value, color);
  window.addEventListener('resize', debouncedResize);
}

const processData = (data) => {
    const label = [];
    const parent = [];
    const value = [];
    const color = [];

    data.map((d) => {
        label.push(d.Label);
        parent.push(d.Parent);
        value.push(d.Value);
        color.push(d.Color)
    });

  return {label, parent, value, color};
}

const makePlotly = (label, parent, value, color) => {
    const traces = [
        {
            type: 'treemap',
            labels: label,
            parents: parent,
            values: value,
            marker: {
                colors: color
            },          
        }
    ];
    const config = {
        responsive: true
    };
    const layout = {
        title: 'Jobs Plan'
    };
    return Plotly.newPlot('vis', traces, layout, config)
}

render();
