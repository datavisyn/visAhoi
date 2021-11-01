import { IOnboardingMessage } from "../interfaces";

export type NavigationAlignment = "row" | "column";

export default class OnboardingNavigation {
  constructor(onboardingMessages: IOnboardingMessage[], alignment: NavigationAlignment) {

  }
}
