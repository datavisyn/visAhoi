import { SpecProp, OnboardingSpec, OnboardingMessages } from "./interfaces";

export interface OnboardingChangeMatrixSpec extends OnboardingSpec {
  chartTitle?: SpecProp;
  type?: SpecProp;
  legendTitle?: SpecProp;
  xAxis?: SpecProp;
  yAxis?: SpecProp;
}


function generateOnboardingMessages(spec: OnboardingChangeMatrixSpec): OnboardingMessages[] {
  const messages = [
    {
      anchor: spec.chartTitle?.anchor,
      requires: ['chartTitle'],
      legend: `The chart shows the ${spec.chartTitle?.value}.`,
    },
    {
      anchor: spec.type?.anchor,
      requires: ['type'],
      legend: `The chart Is based on colored <span class="hT">${spec.type?.value}</span> elements.`,
    },
    {
      anchor: spec.legendTitle?.anchor,
      requires: ['legendTitle'],
      legend: `The legend shows the <span class="hT">${spec.legendTitle?.value}</span> for the chart. The colors range from <span class="hT">blue to white and brown</span>.`,
    },
    {
      anchor: spec.xAxis?.anchor,
      requires: ['xAxis', 'yAxis'],
      legend: `The columns show the <span class="hT">${spec.xAxis?.value}</span>, while the rows show the <span class="hT">${spec.yAxis?.value}</span>.`,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) => message.requires.every((tplVars) => spec[tplVars]));
};

export const changeMatrix = {
  generateOnboardingMessages
};
