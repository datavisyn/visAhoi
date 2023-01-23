import { Writable, writable } from 'svelte/store'
import { IAhoiIcons, IMarkerInformation, IOnboardingMessage, IOnboardingStage, NavigationAlignment } from '../interfaces';

const initializeStoreValue = <T>(defaultValue: any) => {
  const { subscribe, set, update } = writable<T>(defaultValue)
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValue)
  }
}


export class VisahoiState {
  count: Writable<number>;
  visahoiIcons: Writable<IAhoiIcons>;
  showOnboarding: Writable<boolean>;
  showOnboardingSteps: Writable<boolean>;
  onboardingMessages: Writable<IOnboardingMessage[]>;
  navigationAlignment: Writable<NavigationAlignment>;
  onboardingStages: Writable<IOnboardingStage[]>;
  activeOnboardingStage: Writable<IOnboardingStage | null>;
  activeMarker: Writable<IMarkerInformation | null>;
  selectedMarker: Writable<IMarkerInformation | null>;
  showBackdrop: Writable<boolean>;
  backdropOpacity: Writable<number>;
  showOnboardingNavigation: Writable<boolean>;
  previousMarkerId: Writable<string | undefined>;
  markerIndexId: Writable<number | null>;
  showHideCloseText: Writable<boolean>;
  isEditModeActive: Writable<boolean>;
  editTooltip: Writable<boolean>;
  visXPosition: Writable<number>;
  visYPosition: Writable<number>;
  visHeight: Writable<number>;
  visWidth: Writable<number>;
  markerInformation: Writable<IMarkerInformation[]>;
  visElement: Writable<Element>;
  constructor () {
    this.count = initializeStoreValue<number>(0)
    this.visahoiIcons = initializeStoreValue<IAhoiIcons>(null)
    this.showOnboarding = initializeStoreValue<boolean>(false)
    this.showOnboardingSteps = initializeStoreValue<boolean>(false)
    this.onboardingMessages = initializeStoreValue<IOnboardingMessage[]>([])
    this.navigationAlignment = initializeStoreValue<NavigationAlignment>('column')
    this.onboardingStages = initializeStoreValue<IOnboardingStage[]>([])
    this.activeOnboardingStage = initializeStoreValue<IOnboardingStage | null>(null)
    this.activeMarker = initializeStoreValue<IMarkerInformation | null>(null)
    this.selectedMarker = initializeStoreValue<IMarkerInformation | null>(null)
    this.showBackdrop = initializeStoreValue<boolean>(false)
    this.backdropOpacity = initializeStoreValue<number>(0.15)
    this.showOnboardingNavigation = initializeStoreValue<boolean>(false)
    this.previousMarkerId = initializeStoreValue<string | undefined>(undefined) // previously this was '' initially
    this.markerIndexId = initializeStoreValue<number | null>(null)
    this.showHideCloseText = initializeStoreValue<boolean>(true)
    this.isEditModeActive = initializeStoreValue<boolean>(false)
    this.editTooltip = initializeStoreValue<boolean>(false)
    this.visXPosition = initializeStoreValue<number>(0)
    this.visYPosition = initializeStoreValue<number>(0)
    this.visHeight = initializeStoreValue<number>(0)
    this.visWidth = initializeStoreValue<number>(0)
    this.markerInformation = initializeStoreValue<IMarkerInformation[]>([])
    this.visElement = initializeStoreValue<Element>(null)
  }
}
