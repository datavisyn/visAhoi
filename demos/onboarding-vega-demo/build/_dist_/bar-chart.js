import vegaEmbed from "/web_modules/vega-embed.js";
import {onboarding} from "/web_modules/onboarding-vega.js";
const opt = {
  theme: "default",
  actions: false,
  renderer: "svg"
};
async function render() {
  const response = await fetch("./data/barChartOslo2018.json");
  const json = await response.json();
  let vegaLite = await vegaEmbed("#vis", json, opt);
  onboarding("bar-chart", vegaLite);
}
;
render();
