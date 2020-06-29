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
    const response = await fetch('./changeMatrix.spec.json');
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
    // Get the individual cells
    const vis = d3.select('#vis');
    const cells = getAllNodes(vis);
  
    // Get the data of the individual cells
    const cellData = cells.map((el) => el.__data__);
    console.log('%cAdditional information about each bar', css2, cellData);
    console.log('- - - - - - - - - -');
  
    // ONBOARDING
    const onbordingSpec = generateOnboardingSpec(vegaSpec, values);
    console.log('Generated Spec: ', onbordingSpec);
  
    const onboardingLegend = d3
      .select('#onboarding')
      .selectAll('div.vizHint')
      .data(generateOnboardingMessages(onbordingSpec).map((d) => d.legend));
  
    onboardingLegend
      .enter()
      .append('div')
      .classed('vizHint', true)
      .append('div')
      .attr('id', (d, i) => `$hint-${i + 1}`)
      .html((d) => d)
      .each(createAnchor);
  
    onboardingLegend.exit().remove();
  };
  
  render();
  
  /**
   * =======================
   * ONBOARDING FUNCTIONS
   * =======================
   */
  const generateOnboardingSpec = (vegaSpec, aggregatedValues = []) => {
    const v = vegaSpec;
    const a = aggregatedValues;
  
    // const {x, y, b} = getOrientation(v.scales);
    // const axesMinMax = getMinMax(a);
  
    return {
      chartTitle: v.title.text,
      type: v.marks[0].style,
      legendTitle: v.legends[0].title.toLowerCase(),
      xAxis: v.axes[2].title.toLowerCase(),
      yAxis: v.axes[3].title.toLowerCase(),
      // barLength: b,
      // xMin: axesMinMax[1].min,
      // xMax: axesMinMax[1].max,
      // yMin: axesMinMax[0].min,
      // yMax: axesMinMax[0].max,
      // xAxisTitle: v.axes[1].title,
      // yAxisTitle: v.axes[2].title,
    };
  };
  
  const generateOnboardingMessages = (spec) => {
    const messages = [
      {
        anchor: null,
        requires: ['undefinedTemplateVariable'],
        legend: `Legend that is filtered out, because it requires an undefined template variable.`,
      },
      {
        anchor: null, // TODO: Set and extract anchors
        requires: ['chartTitle'],
        legend: `The chart shows the ${spec.chartTitle}.`,
      },
      {
        anchor: null, // TODO: Set and extract anchors
        requires: ['type'],
        legend: `The chart Is based on colored <span class="hT">${spec.type}</span> elements.`,
      },
      {
        anchor: null,
        requires: ['legendTitle'],
        legend: `The legend shows the <span class="hT">${spec.legendTitle}</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`,
      },
      {
        anchor: null,
        requires: ['xAxis', 'yAxis'],
        legend: `The columns show the <span class="hT">${spec.xAxis}</span>, while the rows show the <span class="hT">${spec.yAxis}</span>.`,
      },
    ];
  
    // Filter for messages where all template variables are available in the spec
    return messages.filter((message) =>
      message.requires.every((tplVars) => spec[tplVars])
    );
  };
  