import * as d3 from 'd3';
import { OnboardingMessages } from "./interfaces";
import { createAnchor, generateChartAnchors } from './generate-anchor';

export function displayOnboardingMessages(messages: OnboardingMessages[]) {
  const onboardingLegend: any = d3
    .select('#onboarding')
    .selectAll('div.vizHint')
    .data(messages.map((d) => d.legend));

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
  generateChartAnchors(messages.map((d, i) => ({
    anchor: d.anchor,
    index: i + 1,
  })));
}
