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
    const response = await fetch('./horizonGraphOslo2018.spec.json');
    const json = await response.json();
  
    let vegaLite = await vegaEmbed('#vis', json, opt);
    let evaluated = await vegaLite.view.evaluate();
  
    // data_0 contains the input, output and values which are the aggregated data values
    const { data_1, data_2, data_3, layer_1_marks, layer_2_marks, layer_3_marks } = evaluated._runtime.data;
    // Use the aggregated data values
    const lowerCutoff = data_1.values.value; // Identified by ny0 property
    const middleVals = data_2.values.value; // Identified by ny property
    const upperCutoff = data_3.values.value; // Identified by ny2 property 
  
    // Vega-lite spec after all rendering happend and the aggregations
    const vegaSpec = vegaLite.vgSpec;
    const origSpec = vegaLite.spec;
  
    console.log('%cNECESSARY DATA', css);
    console.log(
      'Aggregated Values: ',
      lowerCutoff, middleVals, upperCutoff,
      'Spec with Aggregation: ',
      vegaSpec
    );
  
    // ONBOARDING
    const onbordingSpec = generateOnboardingSpec({ vegaSpec, origSpec });
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
    let v = null;
    let o = null;
    const a = aggregatedValues;

    if (typeof(vegaSpec) === 'object') {
      v = vegaSpec.vegaSpec;
      o = vegaSpec.origSpec;
    } else {
      v = vegaSpec;
    }
  
    return {
      chartTitle: v.title.text,
      xAxis: v.axes[1].title.toLowerCase(),
      yAxis: v.axes[2].title.toLowerCase(),
      type: v.marks[0].type,
      positiveColor: o.layer[0].mark.color, 
      negativeColor: o.layer[2].mark.color
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
        requires: ['chartTitle'],
        legend: `The chart is made out of <span class="hT">${spec.type}</span> elements.`,
      },
      {
        anchor: null, // TODO: Set and extract anchors
        requires: ['xAxis', 'yAxis'],
        legend: `The areas illustrate the <span class="hT">${spec.yAxis} (y-axis)</span> over <span class="hT">${spec.xAxis} (x-axis)</span>.`,
      },
      {
        anchor: null, // TODO: Set and extract anchors
        requires: ['yAxis'],
        legend: `Light ${createCR(spec.positiveColor)} areas indicate a moderate positive <span class="hT">${spec.yAxis}</span> and dark 
        ${createCR(spec.positiveColor)} areas a high positive <span class="hT">${spec.yAxis}</span>.`,
      },
      {
        anchor: null, // TODO: Set and extract anchors
        requires: ['yAxis'],
        legend: `${createCR(spec.negativeColor)} areas indicate a very low negative <span class="hT">${spec.yAxis}</span>.`,
      }
    ];
  
    // Filter for messages where all template variables are available in the spec
    return messages.filter((message) =>
      message.requires.every((tplVars) => spec[tplVars])
    );
  };
  