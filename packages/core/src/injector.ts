import { IOnboardingMessages, OnboardingAnchor } from "./interfaces";
import { createMarkers } from './generate-anchor';
import { EOnboardingStages } from "./onboarding";
import { popper } from "./utils";


export function generateMarkers(visElement: Element, messages: IOnboardingMessages[], clickEvent: (i: number, stage: EOnboardingStages) => void) {
  createMarkers(messages
    .map((message, i) => ({
    anchor: message.anchor,
    index: i,
    message: message.legend,
    stage: message.onboardingStage,
    clickEvent: () => clickEvent(i, message.onboardingStage)
  })), visElement);
}

export function displayAnchors(messages: IOnboardingMessages[], activeStage: EOnboardingStages | null) {
  if (messages?.length === 0 || !activeStage) return;
  messages.forEach((message, i) => {
    const anchor = document.getElementById(`anchor-${i}`);
    const tooltip = document.getElementById(`tooltip-anchor-${i}`)
    if (anchor && tooltip) {
      if (message.onboardingStage === activeStage) {
        anchor.style.display = "block";
        popper(anchor, tooltip);
      } else {
        anchor.style.display = "none";
        tooltip.style.display = "none";
      }
    }
  })
}

export function displayTooltip(messages: IOnboardingMessages[], activeAnchor: number, activeStage: EOnboardingStages | null) {
  if (messages?.length === 0 || !activeStage) return;
  messages.forEach((message, i) => {
    const anchor = document.getElementById(`anchor-${i}`);
    const tooltip = document.getElementById(`tooltip-anchor-${i}`)
    if (anchor && tooltip) {
      if (message.onboardingStage === activeStage && i === activeAnchor) {
        tooltip.style.display = "inline-block";
        popper(anchor, tooltip);
      } else {
        tooltip.style.display = "none";
      }
    }
  });
}
