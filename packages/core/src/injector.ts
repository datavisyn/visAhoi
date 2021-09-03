import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { createMarkers } from './generate-anchor';
import { EOnboardingStages } from "./onboarding";
import { createPopper } from "@popperjs/core";


export function generateMarkers(visElement: Element, messages: IOnboardingMessages[], activeStep: number, showAllHints: boolean, activeStage: EOnboardingStages | null) {
  createMarkers(messages
    .map((d, i) => ({
    anchor: d.anchor,
    index: i,
    message: d.legend,
    stage: d.onboardingStage
  })), visElement);
}

export function displayMarkers(messages: IOnboardingMessages[], activeStage: EOnboardingStages | null) {
  const popper = (anchor, tooltip) => {
    createPopper(anchor, tooltip, {
      placement: "top",
      modifiers: [{
          name: "offset",
          options: {offset: [0, 8]}
        }]
    });
  }

  messages.forEach((message, i) => {
    const anchor = document.getElementById(`anchor-${i}`);
    const tooltip = document.getElementById(`tooltip-anchor-${i}`)
    if (anchor && tooltip) {
      if (message.onboardingStage === activeStage) {
        anchor.style.display = "block";
        tooltip.style.display = "inline-block";
        popper(anchor, tooltip);
      } else {
        anchor.style.display = "none";
        tooltip.style.display = "none";
      }
    }
  })
}
