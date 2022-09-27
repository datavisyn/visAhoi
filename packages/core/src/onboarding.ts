import OnboardingUI from './components/OnboardingUI.svelte'
import {
  onboardingMessages,
  navigationAlignment,
  onboardingStages,
  showBackdrop,
  backdropOpacity,
  showHideCloseText,
  showOnboardingNavigation,
  isEditModeActive,
  markerInformation
} from './components/stores.js'
import debounce from 'lodash.debounce'
import {
  IAhoiConfig,
  IMarker,
  IOnboardingMessage,
  IOnboardingStage,
  NavigationAlignment
} from './interfaces'
import { v4 as uuidv4 } from 'uuid'
import { get } from 'svelte/store'

let onboardingUI: OnboardingUI

export const injectOnboarding = (
  ahoiConfig: IAhoiConfig,
  visElement: Element,
  alignment: NavigationAlignment
) => {
  onboardingMessages.set(ahoiConfig.onboardingMessages)

  if (ahoiConfig?.alignment) {
    navigationAlignment.set(ahoiConfig.alignment)
  }

  if (ahoiConfig?.showOnboardingNavigation) {
    showOnboardingNavigation.set(ahoiConfig?.showOnboardingNavigation)
  }

  // de-duplicate onboarding stages
  const uniqueStages: IOnboardingStage[] = ahoiConfig.onboardingMessages
    .map((m) => m.onboardingStage)
    .reduce((prev: IOnboardingStage[], next: IOnboardingStage) => {
      if (prev.map((p) => p.id).includes(next.id)) {
        return prev
      }
      return [...prev, next]
    }, [] as IOnboardingStage[])
  onboardingStages.set(uniqueStages)

  navigationAlignment.set(alignment)
  if (
    ahoiConfig?.backdrop?.show !== null &&
    ahoiConfig?.backdrop?.show !== undefined
  ) {
    showBackdrop.set(ahoiConfig?.backdrop?.show)
  }
  if (
    ahoiConfig?.backdrop?.opacity !== null &&
    ahoiConfig?.backdrop?.opacity !== undefined
  ) {
    backdropOpacity.set(ahoiConfig?.backdrop?.opacity)
  }
  if (ahoiConfig?.showHelpCloseText === false) {
    showHideCloseText.set(ahoiConfig?.showHelpCloseText)
  }

  const ref = { update: () => {} }

  const updateOnboarding = (config: IAhoiConfig) => {
    onboardingMessages.set(config.onboardingMessages)
    ref.update()
  }

  onboardingUI = new OnboardingUI({
    target: document.body as Element,
    props: {
      ref,
      visElement
    }
  })
  return {
    updateOnboarding: debounce(updateOnboarding),
    removeOnboarding: () => {
      onboardingUI.$destroy()
    }
  }
}

export const getOnboardingStages = (): IOnboardingStage[] => {
  return get(onboardingStages)
}

export const getOnboardingMessages = (): IOnboardingMessage[] => {
  return get(onboardingMessages)
}

export const createBasicOnboardingStage = (stage: IOnboardingStage) => {
  if (!stage.id) {
    stage.id = `visahoi-stage-${uuidv4()}`
  }
  onboardingStages.set([...get(onboardingStages), stage])
  return stage
}

export const createBasicOnboardingMessage = (
  message: Pick<
    IOnboardingMessage,
    'title' | 'text' | 'onboardingStage' | 'anchor' |'id'
  >
) => {
  const marker: IMarker = {
    id: `visahoi-marker-${uuidv4()}`
  }
  const onboardingMessage: IOnboardingMessage = {
    marker,
    ...message
  }
  return onboardingMessage
}

export const deleteOnboardingStage = (id: string) => {
  const stages: IOnboardingStage[] = get(onboardingStages)
  stages.map((m, i) => {
    if (m.id === id) {
      stages.splice(i, 1)
    }
  })
  return onboardingStages.set(stages)
}

export const setOnboardingStage = (stage: Partial<IOnboardingStage>) => {
  if (stage.id === undefined) {
    console.error('Provide the id of stage to be updated')
    return null
  } else {
    const tempOnboardingStages = get(onboardingStages)
    for (const tempStage of tempOnboardingStages) {
      if (tempStage.id === stage.id) {
        tempStage.order = stage.order ? stage.order : tempStage.order
        tempStage.title = stage.title ? stage.title : tempStage.title
        tempStage.activeBackgroundColor = stage.activeBackgroundColor
          ? stage.activeBackgroundColor
          : tempStage.activeBackgroundColor
        tempStage.backgroundColor = stage.backgroundColor
          ? stage.backgroundColor
          : tempStage.backgroundColor
        tempStage.hoverBackgroundColor = stage.hoverBackgroundColor
          ? stage.hoverBackgroundColor
          : tempStage.hoverBackgroundColor
        tempStage.iconClass = stage.iconClass
          ? stage.iconClass
          : tempStage.iconClass
        break
      }
    }
    return onboardingStages.set(tempOnboardingStages)
  }
}

export const setOnboardingMessage = (message: Pick<IOnboardingMessage, 'title' | 'text' | 'id'>) => {
  if (message.id === undefined) {
    console.error('Provide the id of message to be updated')
    return null
  } else {
    const tempOnboardingMessages = get(onboardingMessages)
    const tempMarkerInfo = get(markerInformation)
    for (const tempMessage of tempOnboardingMessages) {
      if (tempMessage.id === message.id) {
        // tempMessage.anchor = message.anchor
        //   ? message.anchor
        //   : tempMessage.anchor;
        tempMessage.text = message.text ? message.text : tempMessage.text

        tempMessage.title = message.title ? message.title : tempMessage.title

        break
      }
    }
    for (const tempMarker of tempMarkerInfo) {
      if (tempMarker.message.id === message.id) {
        tempMarker.tooltip.title = message.title
          ? message.title
          : tempMarker.tooltip.title
        tempMarker.tooltip.text = message.text
          ? message.text
          : tempMarker.tooltip.text

        break
      }
    }

    markerInformation.set(tempMarkerInfo)
    onboardingMessages.set(tempOnboardingMessages)
    return onboardingMessages.set(tempOnboardingMessages)
  }
}

export const setEditMode = (value: boolean) => {
  return isEditModeActive.set(value)
}
