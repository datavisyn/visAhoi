<p align="center"><img src="/docs/img/logo.png" alt="AboardVis" width="35%" /></p>
<p align="center">
  <a href="https://github.com/ffg-seva/onboarding-prototype/actions">
    <img src="https://github.com/ffg-seva/onboarding-prototype/workflows/Build%20and%20deploy%20demos/badge.svg?branch=develop" alt="CI" />
  </a>
</p>


# What is AboardVis?

**AboardVis is a library to onboard users to visualizations by explaining the data and visual encoding.** AboardVis employs the visualization specifications of high-level descriptive visualization grammars from [ECharts](https://echarts.apache.org), [Plotly.js](https://plotly.com/javascript/), or [Vega-Lite](https://vega.github.io/vega-lite), and provides onboarding messages and anchors for different visualization types (e.g., bar chart, change matrix, horizon graph).

# Key Features

* Integrable
* Extensible
* Reusable
* Automated
* Customizable

# Getting Started

AboardVis offers adapter packages for [ECharts](https://echarts.apache.org), [Plotly.js](https://plotly.com/javascript/), or [Vega-Lite](https://vega.github.io/vega-lite). Choose the AboardVis adapter for your visualization library below and follow the instructions.

## AboardVis for ECharts

Install the AboardVis adapter:

```
npm install @aboardvis/echarts --save
# or with yarn
yarn add @aboardvis/echarts
```

Let's enhance a bar chart with AboardVis:

```js
import echarts from 'echarts';
import { aboard } from '@aboardvis/echarts';

function render() {
  const data = { /* bar chart data */ };

  const chart = echarts.init(document.getElementById('vis'), null, { renderer: 'svg' });
  chart.setOption({
    /* EChart specification */
  });

  aboard('bar-chart', chart);
};

render();
```

Please note that AboardVis supports currently only the SVG renderer.

📊 See the [entire source code of the bar chart example](./packages/onboarding-echarts-demo/src/bar-chart.js) or explore the other [ECharts demos](https://ffg-seva.github.io/onboarding-prototype/demos/onboarding-echarts-demo/build/).


## AboardVis for Plotly.js

Install the AboardVis adapter:

```
npm install @aboardvis/plotly --save
# or with yarn
yarn add @aboardvis/plotly
```

Let's enhance a bar chart with AboardVis:

```js
import { aboard } from '@aboardvis/plotly';

async function render() {
  const traces = { /* bar chart data */ };
  const layout = { /* bar chart specification */ };

  const chart = await Plotly.newPlot('vis', traces, layout);

  aboard('bar-chart', chart);
}

render();
```

📊 See the [entire source code of the bar chart example](./packages/onboarding-plotly-demo/src/bar-chart.js) or explore the other [Plotly.js demos](https://ffg-seva.github.io/onboarding-prototype/demos/onboarding-plotly-demo/build/).


## AboardVis for Vega-Lite

Install the AboardVis adapter:

```
npm install @aboardvis/vega --save
# or with yarn
yarn add @aboardvis/vega
```

Let's enhance a bar chart with AboardVis:

```js
import vegaEmbed from 'vega-embed';
import { aboard } from '@aboardvis/vega';

async function render() {
  const spec = { /* Vega-Lite specification with data */ };

  const chart = await vegaEmbed('#vis', spec, { renderer: 'svg' });

  aboard('bar-chart', chart);
};

render();
```

Please note that AboardVis supports currently only the SVG renderer.

📊 See the [entire source code of the bar chart example](./packages/onboarding-vega-demo/src/bar-chart.js) or explore the other [Vega-Lite demos](https://ffg-seva.github.io/onboarding-prototype/demos/onboarding-vega-demo/build/).


# Supported Visualization Types

Currently AboardVis provides the onboarding messages for following visualization types:

* Bar Chart (`bar-chart`)
* Change Matrix (`change-matrix`)
* Horizon Graph (`horizon-graph`)

The visualization type is passed as first parameter to the `aboard(type, chart)` function. The second paramter is the the chart instance of the used visualization library.


# Developer Information

AboardVis uses [lerna.js](https://[lernajs.org](https://lerna.js.org/)) to divide the soruce code into separate npm packages and demos.


## Build Instructions

For a basic setup allowing you to build and run examples:

```
git clone https://github.com/ffg-seva/onboarding-prototype.git
cd onboarding-prototype
npm install
npm run bootstrap
```

Afterwards you can run the following npm scripts:

* `npm run build` compiles all npm packages and builds the sources of the demo pages
* `npm start` runs all demo pages and opens them in the browser

In case you want to start a specific demo page for a chosen visualization library (`echarts`, `plotly`, or `vega`):

```
cd ./packages/onboarding-<visualization-library>-demo
npm start
```

<!--
## Publish (internal)

TBD
-->
