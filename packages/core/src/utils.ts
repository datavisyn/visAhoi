import { createPopper } from '@popperjs/core/dist/esm/'
import {
  EDefaultOnboardingStages,
  ISpecProp,
  OnboardingAnchor
} from './interfaces'

/**
 * Returns the dom node which contains the passed text
 * @param textContent the text content of the dom node which should be found
 */
let targetDomNode: HTMLElement | null

const getDomNodeByTextContent = (
  textContent: string,
  visElement: Element
): HTMLElement | null => {
  return document
    .createNodeIterator(
      visElement, // The root node of the chart
      NodeFilter.SHOW_TEXT, // Look for text nodes only
      {
        acceptNode (node) {
          // The filter method of interface NodeFilter
          return new RegExp(textContent).test(node.textContent as string) // Check if text contains target string
            ? NodeFilter.FILTER_ACCEPT // Found: accept node
            : NodeFilter.FILTER_REJECT // Not found: reject and continue
        }
      }
    )
    .nextNode()!?.parentElement
}

/**
 * Returns the anchor for the requested onboarding specification.
 * Returns undefined if the passed property is undefined.
 * @param prop: the property from the onboarding spec for which the anchor should be returned
 */
export const getAnchor = (
  prop: ISpecProp | undefined,
  visElement: Element
): OnboardingAnchor | undefined => {
  if (!prop) {
    // if prop is undefined -> return

  } else if (prop.anchor?.findDomNodeByValue) {
    // the dom node should be found by it's content
    // TODO: can findDomNodeByValue be removed?
    targetDomNode = getDomNodeByTextContent(
      prop.domNodeValue ? prop.domNodeValue : prop.value,
      visElement
    )

    if (targetDomNode === undefined) {
      targetDomNode = document.getElementById('vis')
    }

    // if no node was found by the given text return undefined, otherwise return the dom node
    return targetDomNode
      ? Object.assign({ element: targetDomNode }, prop.anchor || {})
      : undefined
  } else if (prop.anchor) {
    return prop.anchor
  }
}

/**
 * Returns the color for the specific onboarding stage
 * @param stage: the onboarding stage
 */
export const getColor = (stage: string) => {
  switch (stage) {
    case EDefaultOnboardingStages.ANALYZING:
      return '#FE8029'
    case EDefaultOnboardingStages.READING:
      return '#7B5096'
    case EDefaultOnboardingStages.USING:
      return '#003D5C'
    default:
      return 'white'
  }
}

/**
 * Does the popper function for the given tooltip + anchor
 * @param anchor: anchor on which the tooltip should be aligned
 * @param tooltip: tooltip for the given anchor
 */
export const createPopperTooltip = (anchor, tooltip) => {
  createPopper(anchor, tooltip, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 8] }
      }
    ]
  })
}

/**
 * returns the markerId with the visahoi prefix
 * this id is used for the marker dom element
 * @param id
 * @returns
 */
export const getMarkerDomId = (id: string): string => {
  return `visahoi-marker-${id}`
}

/**
 * returns the markerId with the visahoi navigation prefix
 * this id is used for the navigation marker dom element
 * @param id
 * @returns
 */
export const getNavigationMarkerDomId = (id: string): string => {
  return `visahoi-marker-navigation-visahoi-marker-${id}`
}
