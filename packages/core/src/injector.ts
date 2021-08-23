import * as d3 from 'd3';
import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { createAnchor, displayMarkers } from './generate-anchor';
import {EOnboardingStages} from './onboarding';

export function displayGuide(visElement: Element, messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void, onboardingWrapper: any) {
  let reading: [number, IOnboardingMessages][] = [];
  let using: [number, IOnboardingMessages][] = [];
  messages.forEach((message, index) => {
    if(message.onboardingStage === EOnboardingStages.READING) {
      reading.push([index, message])
    } else if(message.onboardingStage === EOnboardingStages.USING) {
      using.push([index, message])
    }
  })

  if(reading.length > 0) {
    createOnboardingStages(activeStep, showAllHints, setOnboardingState, reading, EOnboardingStages.READING, onboardingWrapper);
  }
  if(using.length > 0) {
    createOnboardingStages(activeStep, showAllHints, setOnboardingState, using, EOnboardingStages.USING, onboardingWrapper);
  }
  displayMarkers(messages.map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
  })), activeStep, showAllHints, visElement);
}

const createOnboardingStages = (activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void, messages: [number, IOnboardingMessages][], step: EOnboardingStages, onboardingWrapper: any) => {
  const headline = step.split("-").join(" ");
  let onboardingStep = d3.select(`#${step}`)
  if(d3.select(`#${step}`).size() === 0) {
    onboardingStep = onboardingWrapper.append("div").attr("id", step).attr("class", "onboardingStages");
    onboardingStep.append("h2")
      .attr("class", "onboardingHeadline")
      .html(headline.charAt(0).toUpperCase() + headline.slice(1))
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
    .on('click', (event, d) => {
      if(!showAllHints) {
        setOnboardingState("activeStep", d[0]);
        d3.select((event as any)?.currentTarget).classed("active", true); //as any because of ts-error
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
