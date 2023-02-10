import { createPopper } from '@popperjs/core/dist/esm/'
import {
  EDefaultOnboardingStages,
  ISpecProp,
  OnboardingAnchor,
  SvgIcons
} from './interfaces'

/**
 * Returns the dom node which contains the passed text
 * @param textContent the text content of the dom node which should be found
 */
const getDomNodeByTextContent = (
  textContent: string,
  visElement: Element
): HTMLElement | null =>
  document
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
    return
  } else if (prop.anchor?.findDomNodeByValue) {
    // the dom node should be found by it's content
    // TODO: can findDomNodeByValue be removed?
    const targetDomNode = getDomNodeByTextContent(
      prop.domNodeValue ? prop.domNodeValue : prop.value,
      visElement
    )
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

export const getGeneralChartInteractions = (text: string[]) => {
  const modeBarDescriptions = new Map([
    ['Download plot as a png', `${text.includes('Download plot as a png') ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the chart.<br/>`: ''}`],
    ['Zoom', `${text.includes('Zoom') ? `${SvgIcons.ZOOM} <b>Zooming</b>: Click and drag the mouse over a certain part of the visualization to zoom in and get a more detailed view of the data.<br/>`: ''}`],
    ['Pan', `${text.includes('Pan') ? `${SvgIcons.PAN} <b>Panning</b>: You can move the view left and right while dragging the mouse.<br/>`: ''}`],
    ['Box Select', `${text.includes('Box Select') ? `${SvgIcons.BOX_SELECTION} <b>Selection</b>: Drag the mouse over the chart to select some data.<br/>`: ''}`],
    ['Lasso Select', `${text.includes('Lasso Select') ? `${SvgIcons.LASSO_SELECTION} <b>Lasso Select</b>: Select the desired data by drawing a lasso loop.<br/>`: ''}`],
    ['Zoom in', `${text.includes('Zoom in') ? `${SvgIcons.ZOOM_IN} <b>Zoom in</b>: Zoom in to get a more detailed view of the chart.<br/>`: ''}`],
    ['Zoom out', `${text.includes('Zoom out') ? `${SvgIcons.ZOOM_OUT} <b>Zoom out</b>: Zoom out to get a better overview of the chart.<br/>`: ''}`],
    ['Autoscale', `${text.includes('Autoscale') ? `${SvgIcons.AUTO_SCALE} <b>Autoscale</b>: Zooms out to get a view of the whole visualization.<br/>`: ''}`],
    ['Reset axes', `${text.includes('Reset axes') ? `${SvgIcons.RESET} <b>Reset</b>: It takes the chart to the inital layout settings.<br/>`: ''}`]
  ]) 
  return modeBarDescriptions
}

export const getModeBarMessages = (modebarInteractions: Map<string,string>) => { 
  const cameraIcon = modebarInteractions.get('Download plot as a png') || '';  
  const zoomIcon = modebarInteractions.get('Zoom') || '';
  const panIcon = modebarInteractions.get('Pan') || '';
  const selectionIcon = modebarInteractions.get('Box Select') || '';
  const lassoSelectIcon = modebarInteractions.get('Lasso Select') || '';
  const zoomInIcon = modebarInteractions.get('Zoom in') || '';
  const zoomOutIcon = modebarInteractions.get('Zoom out') || '';
  const autoScaleIcon = modebarInteractions.get('Autoscale') || '';
  const resetIcon = modebarInteractions.get('Reset axes') || '';  
  return {cameraIcon, zoomIcon, panIcon, selectionIcon, lassoSelectIcon, zoomInIcon, zoomOutIcon, autoScaleIcon, resetIcon};
}
