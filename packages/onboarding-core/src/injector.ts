import * as d3 from 'd3';
import { IOnboardingMessages } from "./interfaces";
import { createAnchor, generateChartAnchors } from './generate-anchor';
import {active} from 'd3';

export function displayOnboardingMessages(messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, setOnboardingState: (attr: string, value: any) => void) {
  // TODO: only look for #onboardingLegend within onboardingElement
  const onboardingLegend: any = d3
    .select(`#onboardingLegend`)
    .html(null)
    .selectAll('div.vizHint')
    .data(messages.map((d) => d.legend));


  d3.selectAll('.onboardingAnnotations').remove();
  d3.select('svg').append('g').classed('onboardingAnnotations', true);
  generateChartAnchors(messages.map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
  })), activeStep, showAllHints);

  const onVizHintClick = function (this: HTMLElement, text: string, index: number) {
    if(!showAllHints) {
      // d3.select(this).classed('active', d3.select(this).classed('active') ? false : true);
      // d3.select(`#anchor-${index+1}`).classed('active', d3.select(`#anchor-${index+1}`).classed('active') ? false : true);
      setOnboardingState("activeStep", index);
      this.classList.add("active");
    }
  }
  onboardingLegend
    .enter()
    .append('div')
    .classed('vizHint', true)
    .on('click', onVizHintClick)
    .classed('active', (d, i) => activeStep === i ? true : false)
    .append('div')
    .attr('id', (d, i) => `$hint-${i + 1}`)
    .html((d) => d)
    .each(createAnchor);

  onboardingLegend.exit().remove();
}
