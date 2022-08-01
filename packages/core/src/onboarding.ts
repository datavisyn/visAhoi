import OnboardingUI from "./components/OnboardingUI.svelte";
import {
  onboardingMessages,
  navigationAlignment,
  onboardingStages,
  showBackdrop,
  backdropOpacity,
  showHideCloseText,
  showOnboardingNavigation,
} from "./components/stores.js";
import debounce from "lodash.debounce";
import {
  IAhoiConfig,
  IMarker,
  IOnboardingMessage,
  IOnboardingStage,
  NavigationAlignment,
} from "./interfaces";
import { v4 as uuidv4 } from "uuid";
import { get } from "svelte/store";

let onboardingUI: OnboardingUI;

export const injectOnboarding = (
  ahoiConfig: IAhoiConfig,
  visElement: Element,
  alignment: NavigationAlignment
) => {
  onboardingMessages.set(ahoiConfig.onboardingMessages);

  if (ahoiConfig?.showOnboardingNavigation) {
    showOnboardingNavigation.set(ahoiConfig?.showOnboardingNavigation);
  }

  const stageIds = ahoiConfig.onboardingMessages.map(
    (m) => m.onboardingStage.id
  );

  onboardingStages.set([
    ...new Set(ahoiConfig.onboardingMessages.map((m) => m.onboardingStage)),
  ]);
  navigationAlignment.set(alignment);
  if (
    ahoiConfig?.backdrop?.show !== null &&
    ahoiConfig?.backdrop?.show !== undefined
  ) {
    showBackdrop.set(ahoiConfig?.backdrop?.show);
  }
  if (
    ahoiConfig?.backdrop?.opacity !== null &&
    ahoiConfig?.backdrop?.opacity !== undefined
  ) {
    backdropOpacity.set(ahoiConfig?.backdrop?.opacity);
  }
  if (ahoiConfig?.showHelpCloseText === false) {
    showHideCloseText.set(ahoiConfig?.showHelpCloseText);
  }

  const ref = { update: () => {} };

  const updateOnboarding = (config: IAhoiConfig) => {
    onboardingMessages.set(config.onboardingMessages);
    ref.update();
  };

  onboardingUI = new OnboardingUI({
    target: document.body as Element,
    props: {
      ref,
      visElement,
    },
  });
  return {
    updateOnboarding: debounce(updateOnboarding),
    removeOnboarding: () => {
      onboardingUI.$destroy();
    },
  };
};

export const getOnboardingStages = (): IOnboardingStage[] => {
  return get(onboardingStages);
};

export const createBasicOnboardingStage = (stage: IOnboardingStage) => {
  if (!stage.id) {
    stage.id = `visahoi-stage-${uuidv4()}`;
  }
  onboardingStages.set([...get(onboardingStages), stage]);
  return stage;
};

export const createBasicOnboardingMessage = (
  message: Pick<
    IOnboardingMessage,
    "title" | "text" | "onboardingStage" | "anchor"
  >
) => {
  const marker: IMarker = {
    id: `visahoi-marker-${uuidv4()}`,
  };
  const onboardingMessage: IOnboardingMessage = {
    marker,
    ...message,
  };
  return onboardingMessage;
};

export const setOnboardingStage = (stage: Partial<IOnboardingStage>) => {
  if (stage.id === undefined) {
    console.error("Provide the id of stage to be updated");
    return null;
  } else {
    const tempOnboardingStages = get(onboardingStages);
    for (const tempStage of tempOnboardingStages) {
      if (tempStage.id === stage.id) {
        tempStage.order = stage.order ? stage.order : tempStage.order;
        tempStage.title = stage.title ? stage.title : tempStage.title;
        tempStage.activeBackgroundColor = stage.activeBackgroundColor
          ? stage.activeBackgroundColor
          : tempStage.activeBackgroundColor;
        tempStage.backgroundColor = stage.backgroundColor
          ? stage.backgroundColor
          : tempStage.backgroundColor;
        tempStage.hoverBackgroundColor = stage.hoverBackgroundColor
          ? stage.hoverBackgroundColor
          : tempStage.hoverBackgroundColor;
        tempStage.iconClass = stage.iconClass
          ? stage.iconClass
          : tempStage.iconClass;
        break;
      }
    }
    return onboardingStages.set(tempOnboardingStages);
  }
};
