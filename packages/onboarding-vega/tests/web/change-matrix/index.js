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
    const onboardingMsg = generateOnboardingMessages(onbordingSpec);
  
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

    d3.select('svg').append('g').classed('onboardingAnnotations', true);
    generateChartAnchors(onboardingMsg.map((d, i) => {
      return {
        anchor: d.anchor,
        index: i + 1
      }
    }));
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
  
    return {
      chartTitle: {
        value: v.title.text,
        anchor: {
          sel: '.role-title-text',
          useDOMRect: true,
        },
      },
      type: {
        value: v.marks[0].style,
        anchor: null,
      },
      legendTitle: {
        value: v.legends[0].title.toLowerCase(),
        anchor: null,
      },
      xAxis: {
        value: v.axes[2].title.toLowerCase(),
        anchor: null,
      },
      yAxis: {
        value: v.axes[3].title.toLowerCase(),
        anchor: null,
      },
    };
  };
  
  const generateOnboardingMessages = (spec) => {
    const messages = [
      {
        anchor: spec.chartTitle.anchor,
        requires: ['chartTitle'],
        legend: `The chart shows the ${spec.chartTitle.value}.`,
      },
      {
        anchor: null,
        requires: ['type'],
        legend: `The chart Is based on colored <span class="hT">${spec.type.value}</span> elements.`,
      },
      {
        anchor: null,
        requires: ['legendTitle'],
        legend: `The legend shows the <span class="hT">${spec.legendTitle.value}</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`,
      },
      {
        anchor: null,
        requires: ['xAxis', 'yAxis'],
        legend: `The columns show the <span class="hT">${spec.xAxis.value}</span>, while the rows show the <span class="hT">${spec.yAxis.value}</span>.`,
      },
    ];
  
    // Filter for messages where all template variables are available in the spec
    return messages.filter((message) =>
      message.requires.every((tplVars) => spec[tplVars])
    );
  };
  