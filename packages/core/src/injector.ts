import * as d3 from 'd3';
import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { createAnchor, generateChartAnchors } from './generate-anchor';
import {OnboardingStages} from './onboarding';

export function displayOnboardingMessages(messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void, onboardingWrapper: any) {
  let reading: [number, IOnboardingMessages][] = [];
  let using: [number, IOnboardingMessages][] = [];
  messages.forEach((message, index) => {
    if(message.onboardingStage === OnboardingStages.reading) {
      reading.push([index, message])
    } else if(message.onboardingStage === OnboardingStages.using) {
      using.push([index, message])
    }
  })

  if(reading.length > 0) {
    createOnboardingStages(activeStep, showAllHints, setOnboardingState, reading, OnboardingStages.reading, onboardingWrapper);
  }
  if(using.length > 0) {
    createOnboardingStages(activeStep, showAllHints, setOnboardingState, using, OnboardingStages.using, onboardingWrapper);
  }
  generateChartAnchors(messages.map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
  })), activeStep, showAllHints);
}

const createOnboardingStages = (activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void, messages: [number, IOnboardingMessages][], step: OnboardingStages, onboardingWrapper: any) => {

  let onboardingStep = d3.select(`#${step}`)
  if(d3.select(`#${step}`).size() === 0) {
    onboardingStep = onboardingWrapper.append("div").attr("id", step).attr("class", "onboardingStages");
    onboardingStep.append("h2")
      .attr("class", "onboardingHeadline")
      .html(step)
    onboardingStep.append('div').attr('id', `${step}-onboardingLegend`)
  }

  const onboardingLegend = d3
    .select(`#${step}-onboardingLegend`)
    .html(null)
    .selectAll('div.vizHint')
    .data(messages)
    .text((d) => d[1].legend);

  d3.selectAll('.onboardingAnnotations').remove();
  d3.select('svg').append('g').classed('onboardingAnnotations', true);

  onboardingLegend
    .enter()
    .append('div')
    .classed('vizHint', true)
    .on('click', (d, i, nodes) => {
      if(!showAllHints) {
        setOnboardingState("activeStep", d[0]);
        d3.select(nodes[i]).classed("active", true);
      }
    })
    .classed('active', (d) => (showAllHints || activeStep === d[0]) ? true : false)
    .style('cursor', () => showAllHints ? 'default' : 'pointer')
    .append('div')
    .attr('id', (d) => `$hint-${d[0] + 1}`)
    .html((d) => d[1].legend)
    .each((d, i, nodes) => createAnchor(d, i, nodes, d[0]));

  onboardingLegend.exit().remove();
}
