import { writable } from 'svelte/store';
import { IMarkerInformation, IOnboardingMessage, IOnboardingStage } from '../interfaces';
import { NavigationAlignment } from '../ahoi_items/OnboardingNavigation';

export const activeStep = writable(null);
export const onboardingMessages = writable<IOnboardingMessage[]>([]);
export const navigationAlignment = writable<NavigationAlignment>('column');
export const onboardingStages = writable<IOnboardingStage[]>();
export const activeOnboardingStage = writable<IOnboardingStage | null>(null);
export const activeMarker = writable<{
  markerId: string;
  markerInformation: IMarkerInformation;
} | null>(null);

