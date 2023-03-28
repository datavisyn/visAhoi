import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  defaultOnboardingStages,
  EDefaultOnboardingStages,
  IOnboardingStage,
  SvgIcons,
} from "./interfaces";
import {
  getAnchor,
  getGeneralChartInteractions,
  getModeBarMessages,
} from "./utils";

export interface IOnboardingTreemapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  desc?: ISpecProp;
  subDesc?: ISpecProp;
  otherDesc?: ISpecProp;
  gapDesc?: ISpecProp;
  interactingDesc?: ISpecProp;
  maxValueDesc?: ISpecProp;
  minValueDesc?: ISpecProp;
  minValue?: ISpecProp;
  maxValue?: ISpecProp;
  plotlyModebar?: ISpecProp;
}

function generateMessages(
  contextKey,
  spec: IOnboardingTreemapSpec,
  visElement: Element
): IOnboardingMessage[] {
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage;
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage;

  const modebar = visElement.getElementsByClassName("modebar-btn");
  const modebarText = [];

  if (modebar) {
    for (let i = 0; i < modebar.length; i++) {
      modebarText.push(modebar.item(i)?.dataset?.title);
    }
  }

  let modeIconDescription = "";
  const modebarInteractions = getGeneralChartInteractions(modebarText);
  modebarInteractions.set(
    "Download plot as a png",
    `${
      modebarText.includes("Download plot as a png")
        ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the treemap.<br/><br/>`
        : ""
    }`
  );

  const modeBar = getModeBarMessages(modebarInteractions);

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.desc, visElement),
      requires: ["desc"],
      text: "The treemap visualization shows the breakdown of hierarchical data level by level. The size of each rectangle represents a quantitative value associated with each element in the hierarchy.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-1`,
      },
      id: `visahoi-message-${contextKey}-1`,
      order: 2,
    },
    {
      anchor: getAnchor(spec.subDesc, visElement),
      requires: ["subDesc"],
      text: "The area covered by the whole treemap is subdivided recursively into sub-categories according to their quantitative values, level by level.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-2`,
      },
      id: `visahoi-message-${contextKey}-2`,
      order: 3,
    },
    {
      anchor: getAnchor(spec.otherDesc, visElement),
      requires: ["otherDesc"],
      text: "Items on the bottom level that belong to the same sub-category are visually represented by the same color.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-3`,
      },
      id: `visahoi-message-${contextKey}-3`,
      order: 4,
    },
    {
      anchor: getAnchor(spec.gapDesc, visElement),
      requires: ["gapDesc"],
      text: "Items within a sub-category are represented by rectangles that are closely packed together with increasingly larger gaps to the neighboring categories.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-4`,
      },
      id: `visahoi-message-${contextKey}-4`,
      order: 5,
    },

    {
      anchor: getAnchor(spec.interactingDesc, visElement),
      requires: ["interactingDesc"],
      text: "Hover over the rectangles to get the dedicated value of the sub-category.",
      title: "Interacting with the chart",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-5`,
      },
      id: `visahoi-message-${contextKey}-5`,
      order: 1,
    },

    {
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebar, visElement),
      requires: ["plotlyModebar"],
      text: modeIconDescription.concat(
        modeBar.cameraIcon,
        modeBar.zoomIcon,
        modeBar.panIcon,
        modeBar.selectionIcon,
        modeBar.lassoSelectIcon,
        modeBar.zoomInIcon,
        modeBar.zoomOutIcon,
        modeBar.autoScaleIcon,
        modeBar.resetIcon
      ),
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-6`,
      },
      id: `visahoi-message-${contextKey}-6`,
      order: 2,
    },

    {
      anchor: getAnchor(spec.maxValueDesc, visElement),
      requires: ["maxValueDesc", "maxValue"],
      text: `The largest rectangle holds the maximum value in the sub-category. The sub-category <i>${spec.maxValueDesc?.value}</i> holds the maximum value, which is <i>${spec.maxValue?.value}</i>.`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-8`,
      },
      id: `visahoi-message-${contextKey}-8`,
      order: 2,
    },

    {
      anchor: getAnchor(spec.minValueDesc, visElement),
      requires: ["minValueDesc", "minValue"],
      text: ` The smallest rectangle holds the minimum value in the sub-category. The sub-category <i>${spec.minValueDesc?.value}</i> holds the minimum value <i>${spec.minValue?.value}</i>`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-9`,
      },
      id: `visahoi-message-${contextKey}-9`,
      order: 1,
    },
  ];

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ["chartTitle"],
      text: `This treemap shows the <i>${spec.chartTitle?.value}</i>.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-10`,
      },
      id: `visahoi-message-${contextKey}-10`,
      order: 1,
    });
  }

  // Filter for messages where all template variables are available in the spec

  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
}

export const treemap = {
  generateMessages,
};
