/**
 * =======================
 * DEFINE STUFF
 * =======================
 */

// Options for the vega embed
const opt = {
  theme: 'default',
  actions: false,
  renderer: 'svg',
};

/**
 * ========================
 * MAGIC HAPPENS
 * ========================
 */
const render = async () => {
  const response = await fetch('./barChartOslo2018.spec.json');
  const json = await response.json();

  let vegaLite = await vegaEmbed('#vis', json, opt);
  let evaluated = await vegaLite.view.evaluate();

  // data_0 contains the input, output and values which are the aggregated data values
  const { data_0 } = evaluated._runtime.data;
  // Use the aggregated data values
  const values = data_0.values.value;
  // Vega-lite spec after all rendering happend and the aggregations
  const vegaSpec = vegaLite.vgSpec;

  console.log(vegaLite);

  console.log('%cNECESSARY DATA', css);
  console.log(
    'Aggregated Values: ',
    values,
    'Spec with Aggregation: ',
    vegaSpec
  );

  // ADDITIONAL (not used)
  // Get the individual bars
  const vis = d3.select('#vis');
  const bars = getAllNodes(vis);

  // Get the data of the individual bars
  const barsData = bars.map((el) => el.__data__);
  console.log('%cAdditional information about each bar', css2, barsData);
  console.log('- - - - - - - - - -');

  // ONBOARDING
  const onbordingSpec = generateOnboardingSpec(vegaSpec, values, barsData);
  console.log('Generated Spec: ', onbordingSpec);
  const onboardingMsg = generateOnboardingMessages(onbordingSpec);

  const onboardingLegend = d3
    .select('#onboarding')
    .selectAll('div.vizHint')
    .data(onboardingMsg.map((d) => d.legend));

  onboardingLegend
    .enter()
    .append('div')
    .classed('vizHint', true)
    .append('div')
    .attr('id', (d, i) => `$hint-${i + 1}`)
    .html((d) => d)
    .each(createAnchor);

  onboardingLegend.exit().remove();

  d3.select('svg').append('g').classed('onboardingAnnotations', true);
  generateChartAnchors(onboardingMsg.map(d => d.anchor));
};

render();

/**
 * =======================
 * ONBOARDING FUNCTIONS
 * =======================
 */
const generateOnboardingSpec = (vegaSpec, aggregatedValues = [], elems = []) => {
  const v = vegaSpec;
  const a = aggregatedValues;

  const { x, y, b } = getOrientation(v.scales);
  const axesMinMax = getMinMax(a);

  return {
    spec: {
      chartTitle: v.title.text,
      type: v.marks[0].style,
      orientation: '',
      xAxisOrientation: x,
      yAxisOrientation: y,
      barLength: b,
      xMin: axesMinMax[1].min,
      xMax: axesMinMax[1].max,
      yMin: axesMinMax[0].min,
      yMax: axesMinMax[0].max,
      xAxisTitle: v.axes[1].title,
      yAxisTitle: v.axes[2].title,
    },
    anchors: {
      chartTitle_anchor: {
        sel: '.role-title-text',
        nr: 1,
        useDOMRect: true
      },
      type_anchor: {
        sel: 'svg',
        nr: 2,
        coords: elems[4]
      },
      yAxis_anchor: {
        sel: d3.selectAll('.role-axis-title').nodes()[1],
        nr: 3,
        useDOMRect: true
      },
      xAxis_anchor: {
        sel: '.role-axis-title',
        nr: 4
      },
      yMin_anchor: {
        sel: 'svg',
        nr: 5,
        coords: elems[2]
      },
      yMax_anchor: {
        sel: 'svg',
        nr: 6,
        coords: elems[7]
      }
    },
  };
};

const generateOnboardingMessages = ({ spec, anchors }) => {
  const messages = [
    {
      anchor: anchors.chartTitle_anchor,
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle}.`,
    },
    {
      anchor: anchors.type_anchor,
      requires: ['type'],
      legend: `Each ${spec.type} represents a data item.`,
    },
    {
      anchor: anchors.yAxis_anchor,
      requires: ['type', 'barLength', 'yAxisTitle', 'xAxisTitle'],
      legend: `The ${spec.barLength} of each ${spec.type} shows e.g., the <span class="hT">${spec.yAxisTitle} (y-axis)</span> for a certain ${spec.xAxisTitle}.`,
    },
    {
      anchor: anchors.xAxis_anchor,
      requires: ['type', 'xAxisOrientation', 'xAxisTitle'],
      legend: `The ${spec.xAxisOrientation} position of each ${spec.type} represents the <span class="hT">${spec.xAxisTitle} (x-axis)</span>.`,
    },
    {
      anchor: anchors.yMin_anchor,
      requires: ['yAxisTitle', 'yMin'],
      legend: `The <span class="hT">minimum</span> ${spec.yAxisTitle} is ${spec.yMin}.`,
    },
    {
      anchor: anchors.yMax_anchor,
      requires: ['yAxisTitle', 'yMax'],
      legend: `The <span class="hT">maximum</span> ${spec.yAxisTitle} is ${spec.yMax}.`,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
};
