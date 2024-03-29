import {
  IAnchorPosition,
  IMarkerInformation,
  IOnboardingMessage,
  isOnboardingElementAnchor,
  ITooltip,
} from "../interfaces";
import { getColor } from "../utils";

const r = 10;
const w = 30;
const h = 30;
const textOffset = 5;

export function getMarkerInformation(
  visElement: Element,
  onboardingMessages: IOnboardingMessage[]
): IMarkerInformation[] {
  const markerInformation: IMarkerInformation[] = [];
  onboardingMessages.forEach((message, index) => {
    if (!message.anchor) {
      // Return if the anchor is empty
      return;
    }
    const anchorPosition: IAnchorPosition = { x: 0, y: 0, cx: 0, cy: 0 };
    const anchor = message.anchor;

    // tooltip information
    const tooltip: ITooltip = {
      text: message.text,
      title: message.title,
      position: message.tooltipPosition || "bottom",
    };
    // If we have coords we can use them
    if (anchor.coords) {
      // if (anchor.coords.hasOwnProperty("bounds")) {
      //   console.log("2");

      //   // This means we use th coords of a bar chart or anything with x1 and x2
      //   anchorPosition.cy =
      //     (anchor.coords.bounds.y1 + anchor.coords.bounds.y2) / 2;
      //   anchorPosition.cx =
      //     (anchor.coords.bounds.x1 + anchor.coords.bounds.x2) / 2;
      //   anchorPosition.x =
      //     (anchor.coords.bounds.x1 + anchor.coords.bounds.x2) / 2;
      //   anchorPosition.y =
      //     (anchor.coords.bounds.y1 + anchor.coords.bounds.y2) / 2 + textOffset;
      // } else {

      // Otherwise we need to use the passed coords if there are some which require x and y
      // TODO: this must be refactored. eigher I want to add coordinates relative to the document or relative to the chart
      // now we assume we always pass them relative to the chart, which means when passing a boundingClientRect()< from a chart element
      // we have to substract the boundingclientrect().y from it as we add it again below:
      anchorPosition.cx = anchor.coords.x;
      anchorPosition.cy = anchor.coords.y;
      anchorPosition.x = anchor.coords.x;
      anchorPosition.y = anchor.coords.y + textOffset;
      anchorPosition.cy += visElement.getBoundingClientRect().top;
      anchorPosition.y += visElement.getBoundingClientRect().top;
      // anchorPosition.cx += visElement.getBoundingClientRect().left;
      // anchorPosition.x += visElement.getBoundingClientRect().left;
      // }
    } else {
      // Find the positioning only if we provided no coords
      let node;
      if (isOnboardingElementAnchor(anchor)) {
        node = anchor.element;
      } else {
        const elToAppendTo = visElement.querySelector(anchor.sel);
        if (!elToAppendTo) {
          console.error("No element found for selector", anchor.sel);
          return;
        }
        node = elToAppendTo;
      }

      const elRect = node.getBoundingClientRect();
      anchorPosition.cx = elRect.x;
      anchorPosition.cy = elRect.y;
      anchorPosition.x = elRect.x;
      anchorPosition.y = elRect.y + textOffset;
    }
    anchorPosition.offset = anchor.offset;

    anchorPosition.cx = anchorPosition.cx + window.scrollX;
    if (anchorPosition.offset?.left) {
      anchorPosition.cx = anchorPosition.cx - anchorPosition.offset.left;
    }
    if (anchorPosition.offset?.right) {
      anchorPosition.cx = anchorPosition.cx - anchorPosition.offset.right;
    }

    anchorPosition.x = anchorPosition.x + window.scrollX;
    if (anchorPosition.offset?.left) {
      anchorPosition.x = anchorPosition.x - anchorPosition.offset.left;
    }
    if (anchorPosition.offset?.right) {
      anchorPosition.x = anchorPosition.x - anchorPosition.offset.right;
    }

    // anchorPosition.cy =
    // anchorPosition.cy + visElement.getBoundingClientRect().top;
    if (anchorPosition.offset?.top) {
      anchorPosition.cy = anchorPosition.cy - anchorPosition.offset.top;
    }
    if (anchorPosition.offset?.bottom) {
      anchorPosition.cy = anchorPosition.cy - anchorPosition.offset.bottom;
    }

    // anchorPosition.y =
    // anchorPosition.y + visElement.getBoundingClientRect().top;
    if (anchorPosition.offset?.top) {
      anchorPosition.y = anchorPosition.y - anchorPosition.offset.top;
    }
    if (anchorPosition.offset?.bottom) {
      anchorPosition.y = anchorPosition.y - anchorPosition.offset.bottom;
    }
    markerInformation.push({
      message,
      anchorPosition,
      tooltip,
      marker: message.marker,
    });
  });
  return markerInformation;
}
