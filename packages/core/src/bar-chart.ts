import {
  ISpecProp,
  IOnboardingSpec,
  IOnboardingMessage,
  EDefaultOnboardingStages,
  defaultOnboardingStages,
  IOnboardingStage,
  IAhoiConfig,
  SvgIcons,
} from "./interfaces";
import {
  getAnchor,
  getGeneralChartInteractions,
  getModeBarMessages,
} from "./utils";

export interface IOnboardingBarChartSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  type?: ISpecProp;
  orientation?: ISpecProp;
  xAxisOrientation?: ISpecProp;
  yAxisOrientation?: ISpecProp;
  barLength?: ISpecProp;
  xMin?: ISpecProp;
  xMax?: ISpecProp;
  yMin?: ISpecProp;
  yMax?: ISpecProp;
  xAxisTitle?: ISpecProp;
  yAxisTitle?: ISpecProp;
  interactionDesc?: ISpecProp;
  plotlyModebar?: ISpecProp;
}

function generateMessages(
  contextKey,
  spec: IOnboardingBarChartSpec,
  visElement: Element,
  ahoiConfig?: IAhoiConfig
): IOnboardingMessage[] {
  const reading = defaultOnboardingStages.get(
    EDefaultOnboardingStages.READING
  ) as IOnboardingStage;
  const interacting = defaultOnboardingStages.get(
    EDefaultOnboardingStages.USING
  ) as IOnboardingStage;
  const analyzing = defaultOnboardingStages.get(
    EDefaultOnboardingStages.ANALYZING
  ) as IOnboardingStage;

  const modebar = document.getElementsByClassName("modebar-btn");
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
        ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the bar-chart.<br/><br/>`
        : ""
    }`
  );

  const modeBar = getModeBarMessages(modebarInteractions);

  const messages: IOnboardingMessage[] = [
    {
      anchor: getAnchor(spec.type, visElement),
      requires: ["type"],
      text: `Each ${spec.type?.value} represents a data item.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-1`,
      },
      id: `visahoi-message-${contextKey}-1`,
      order: 2,
    },
    {
      anchor: getAnchor(spec.yAxisTitle, visElement),
      requires: ["type", "barLength", "yAxisTitle", "xAxisTitle"],
      text: `The ${spec.barLength?.value} of each ${spec.type?.value} shows the <i> ${spec.yAxisTitle?.value} (y-axis) </i> for a certain <i>${spec.xAxisTitle?.value} (x-axis)</i>.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-2`,
      },
      id: `visahoi-message-${contextKey}-2`,
      order: 3,
    },
    {
      anchor: getAnchor(spec.xAxisTitle, visElement),
      requires: ["type", "xAxisOrientation", "xAxisTitle"],
      text: `The ${spec.xAxisOrientation?.value} position of each ${spec.type?.value} represents the <i> ${spec.xAxisTitle?.value} (x-axis) </i>.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-3`,
      },
      id: `visahoi-message-${contextKey}-3`,
      order: 4,
    },
    {
      anchor: getAnchor(spec.yMin, visElement),
      requires: ["yAxisTitle", "yMin"],
      text: `The minimum <i> ${spec.yAxisTitle?.value} </i> is ${spec.yMin?.value}.`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-4`,
      },
      id: `visahoi-message-${contextKey}-4`,
      order: 1,
    },

    {
      anchor: getAnchor(spec.yMax, visElement),
      requires: ["yAxisTitle", "yMax"],
      text: `The <span class="hT">maximum</span> <i>${spec.yAxisTitle?.value} </i> is ${spec.yMax?.value}.`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-5`,
      },
      id: `visahoi-message-${contextKey}-5`,
      order: 2,
    },
    {
      anchor: getAnchor(spec.interactionDesc, visElement),
      requires: ["interactionDesc", "xAxisTitle", "yAxisTitle"],
      text: `Hover over the bar to get the <i> ${spec.yAxisTitle?.value} </i> for each <i>${spec.xAxisTitle?.value} </i>.`,
      title: "Interacting with the chart",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-6`,
      },
      id: `visahoi-message-${contextKey}-6`,
      order: 1,
    },
    {
      anchor: getAnchor(spec.plotlyLegendInteractions, visElement),
      requires: ["plotlyLegendInteractions"],
      text: "It is possible to hide or show points of the same category by clicking on the corresponding category in the legend.",
      title: "Legend interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-7`,
      },
      id: `visahoi-message-${contextKey}-7`,
      order: 2,
    },
    {
      // basic chart interactions for plotly
      anchor: getAnchor(spec.plotlyModebarPreMarker, visElement),
      requires: ["plotlyModebarPreMarker", "plotlyModebar"],
      text: "When hovering over the visualization, a modebar appears on top that allows different interactions with the visualization.",
      title: "Chart interactions",
      onboardingStage: interacting,
      marker: {
        id: `visahoi-marker-${contextKey}-8`,
      },
      id: `visahoi-message-${contextKey}-8`,
      order: 3,
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
        id: `visahoi-marker-${contextKey}-9`,
      },
      id: `visahoi-message-${contextKey}-9`,
      order: 4,
    },
  ];

  if (spec.chartTitle?.value !== undefined) {
    messages.unshift({
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ["chartTitle"],
      text: `The bar chart shows the <i> ${spec.chartTitle?.value} </i>.`,
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

export const barChart = {
  generateMessages,
};
