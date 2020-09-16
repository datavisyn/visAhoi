import {ISpecProp, OnboardingAnchor} from './interfaces';

/**
 * Returns the dom node which contains the passed text
 * @param textContent the text content of the dom node which should be found
 */
const getDomNodeByTextContent = (textContent: string, visElementId: string): HTMLElement | null => document.createNodeIterator(
  document.getElementById(visElementId) as HTMLElement, // The root node of the chart
  NodeFilter.SHOW_TEXT,  // Look for text nodes only
  {
    acceptNode(node) {   // The filter method of interface NodeFilter
      return new RegExp(textContent).test(node.textContent as string) // Check if text contains target string
        ? NodeFilter.FILTER_ACCEPT // Found: accept node
        : NodeFilter.FILTER_REJECT; // Not found: reject and continue
  }
}).nextNode()!.parentElement;

/**
 * Returns the anchor for the requested onboarding specification.
 * Returns undefined if the passed property is undefined.
 * @param prop: the property from the onboarding spec for which the anchor should be returned
 */
export const getAnchor = (prop: ISpecProp | undefined, visElementId: string): OnboardingAnchor | undefined => {
  if(!prop) { // if prop is undefined -> return
    return;
  } else if(prop.findDomNodeByValue) { // the dom node should be found by it's content
    const targetDomNode = getDomNodeByTextContent(prop.domNodeValue ? prop.domNodeValue : prop.value, visElementId);
    // if no node was found by the given text return undefined, otherwise return the dom node
    return targetDomNode ? Object.assign({element: targetDomNode}, (prop.anchor || {})) : undefined;
  } else if(prop.anchor) {
    return prop.anchor;
  }
}
