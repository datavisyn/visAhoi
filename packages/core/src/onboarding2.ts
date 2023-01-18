import OnboardingUI from './components/OnboardingUI.svelte'

import {
  onboardingMessages,
  showOnboardingNavigation,
  onboardingStages,
  navigationAlignment,
  showBackdrop,
  backdropOpacity,
  showHideCloseText,
  showOnboarding,
  showOnboardingSteps
} from './components/stores'
import {
  IAhoiConfig,
  NavigationAlignment,
  IOnboardingStage,
} from './interfaces'

export class Onboarding {
  contextKey: String;
  ahoiConfig: IAhoiConfig;
  visElement: Element;
  alignment: NavigationAlignment;
  onboardingUI;
  constructor (contextKey: string, ahoiConfig: IAhoiConfig, visElement: Element, alignment: NavigationAlignment) {
    this.contextKey = contextKey
    this.ahoiConfig = ahoiConfig
    this.visElement = visElement
    this.alignment = alignment

    onboardingMessages.set(ahoiConfig.onboardingMessages)

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

    // const ref = { update: () => {} }

    // const updateOnboarding = (config: IAhoiConfig) => {
    //   onboardingMessages.set(config.onboardingMessages)
    //   ref.update()
    // }
    // this.onboardingUI = new OnboardingUI({
    //   target: document.body as Element,
    //   props: {
    //     ref,
    //     visElement,
    //     contextKey: visElement.id,
    //   },
    // })
  }

  injectOnboarding () {
    

    const ref = { update: () => {} }

    const updateOnboarding = (config: IAhoiConfig) => {
      onboardingMessages.set(config.onboardingMessages)
      ref.update()
    }


    return {
      contextKey,
      updateOnboarding: debounce(updateOnboarding),
      showOnboarding: (contextKey) => {
        console.log('showing')
      },
      removeOnboarding: () => {
        // onboardingUI.$destroy()
        showOnboarding.set(false)
        showOnboardingSteps.set(false)
        // TODO: This have to be added to avoid duplicate tooltip. But somehow it is not working in hidden have to fix and then comment it out
        // showOnboardingSteps.set(false)
        // showOnboarding.set(false)
      },
    }
  }
}
