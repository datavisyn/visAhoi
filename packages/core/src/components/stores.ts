import { writable } from 'svelte/store';
import { IMarkerInformation, IOnboardingMessage, IOnboardingStage } from '../interfaces';
import { NavigationAlignment } from '../ahoi_items/OnboardingNavigation';

export const initializeStoreValue = (<T>(defaultValue: any) => {
  const { subscribe, set, update } = writable<T>(defaultValue);
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValue)
  }
});

export const showOnboarding = initializeStoreValue<boolean>(false);
export const activeStep = initializeStoreValue(null);
export const onboardingMessages = initializeStoreValue<IOnboardingMessage[]>([]);
export const navigationAlignment = initializeStoreValue<NavigationAlignment>('column');
export const onboardingStages = initializeStoreValue<IOnboardingStage[]>([]);
export const activeOnboardingStage = initializeStoreValue<IOnboardingStage | null>(null);
export const activeMarker = initializeStoreValue<{
  markerId: string;
  markerInformation: IMarkerInformation;
} | null>(null);


export const resetStore = () => {
  showOnboarding.reset();
  activeStep.reset();
  onboardingMessages.reset();
  navigationAlignment.reset();
  onboardingStages.reset();
  activeOnboardingStage.reset();
  activeMarker.reset();
}
