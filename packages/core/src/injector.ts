import { IOnboardingMessage, IOnboardingStage } from "./interfaces";
import { createMarkers } from './generate-anchor';
import { getColor, createPopperTooltip } from "./utils";


export function generateMarkers(visElement: Element, messages: IOnboardingMessage[], clickEvent: (i: number, stage: IOnboardingStage) => void) {
  createMarkers(messages
    .map((message, i) => ({
      anchor: message.anchor,
      index: i,
      title: message.requires,
      message: message.text,
      stage: message.onboardingStage,
      clickEvent: () => clickEvent(i, message.onboardingStage)
  })), visElement);
}

export function displayAnchors(messages: IOnboardingMessage[], activeStage: IOnboardingStage | null) {
  if (messages?.length === 0) return;
  messages.forEach((message, i) => {
    const anchor = document.getElementById(`anchor-${i}`);
    const tooltip = document.getElementById(`tooltip-anchor-${i}`)
    if (anchor && tooltip) {
      if (message.onboardingStage === activeStage) {
        anchor.classList.remove("hidden");
      } else {
        anchor.classList.add("hidden");
        tooltip.classList.add("hidden");
      }
    }
  })
}

export function displayTooltip(messages: IOnboardingMessage[], activeAnchor: number, activeStage: IOnboardingStage | null) {
  if (messages?.length === 0 || !activeStage) return;
  messages.forEach((message, i) => {
    const anchor = document.getElementById(`anchor-${i}`);
    const tooltip = document.getElementById(`tooltip-anchor-${i}`);
    if (anchor && tooltip) {
      if (message.onboardingStage === activeStage && i === activeAnchor) {
        document.documentElement.style.setProperty("--selection-background", getColor(activeStage.id)); //sets the bg-color for the ::before element of the popper-arrow
        tooltip.classList.remove("hidden");
        createPopperTooltip(anchor, tooltip);
      } else {
        tooltip.classList.add("hidden");
      }
    }
  });
}
