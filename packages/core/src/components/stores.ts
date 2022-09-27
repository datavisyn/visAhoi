import { writable } from 'svelte/store'
import {
  IMarkerInformation,
  IOnboardingMessage,
  IOnboardingStage,
  NavigationAlignment
} from '../interfaces'

export const initializeStoreValue = <T>(defaultValue: any) => {
  const { subscribe, set, update } = writable<T>(defaultValue)
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValue)
  }
}

export const showOnboarding = initializeStoreValue<boolean>(false)
export const showOnboardingSteps = initializeStoreValue<boolean>(false)
export const activeStep = initializeStoreValue(null)
export const onboardingMessages = initializeStoreValue<IOnboardingMessage[]>(
  []
)
export const navigationAlignment =
  initializeStoreValue<NavigationAlignment>('column')
export const onboardingStages = initializeStoreValue<IOnboardingStage[]>([])
export const activeOnboardingStage =
  initializeStoreValue<IOnboardingStage | null>(null)
export const activeMarker = initializeStoreValue<IMarkerInformation | null>(
  null
)
export const selectedMarker = initializeStoreValue<IMarkerInformation | null>(
  null
)

export const showBackdrop = initializeStoreValue<boolean>(false)
export const backdropOpacity = initializeStoreValue<number>(0.15)
export const showOnboardingNavigation = initializeStoreValue<boolean>(false)
export const previousMarkerId = initializeStoreValue<string | undefined>('')
export const markerIndexId = initializeStoreValue<number | null>(null)
export const showHideCloseText = initializeStoreValue<boolean>(true)
export const isEditModeActive = initializeStoreValue<boolean>(false)
export const editTooltip = initializeStoreValue<boolean>(false)

export const visXPosition = writable<number>(0)
export const visYPosition = writable<number>(0)
export const visHeight = writable<number>(0)
export const visWidth = writable<number>(0)
export const markerInformation = writable<IMarkerInformation[]>([])

export const resetStore = () => {
  showOnboarding.reset()
  activeStep.reset()
  onboardingMessages.reset()
  navigationAlignment.reset()
  onboardingStages.reset()
  activeOnboardingStage.reset()
  activeMarker.reset()
  selectedMarker.reset()
  markerIndexId.reset()
}
