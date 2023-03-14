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

export interface IOnboardingHeatmapSpec extends IOnboardingSpec {
  chartTitle?: ISpecProp;
  heatmapDescription?: ISpecProp;
  legendDescription?: ISpecProp;
  axisDescription?: ISpecProp;
  xAxis?: ISpecProp;
  yAxis?: ISpecProp;
  hoverDescription?: ISpecProp;
  missingDataDescription?: ISpecProp;
  maxValue?: ISpecProp;
  minValue?: ISpecProp;
  emptyValue?: ISpecProp;
  plotlyModebar?: ISpecProp;
  minColor?: ISpecProp;
  maxColor?: ISpecProp;
  midColor?: ISpecProp;
}

function generateMessages(
  contextKey,
  spec: IOnboardingHeatmapSpec,
  visElement: Element
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
        ? `${SvgIcons.CAMERA} <b>Screenshot</b>: You can download a .png of the scatterplot.<br/><br/>`
        : ""
    }`
  );

  const modeBar = getModeBarMessages(modebarInteractions);

  function createColorRect(color = "white") {
    return `<div class="colorRect" style="background-color: ${color}; display: inline-block; position: relative; top: 4px;
    margin: 0 0 2px 0; width: 20px; height: 10px; border-radius: 4px; border: 1px solid black;"></div>`;
  }

  const messages = [
    {
      anchor: getAnchor(spec.chartTitle, visElement),
      requires: ["chartTitle"],
      text: `The heatmap shows the <i>${spec.chartTitle?.value}</i>.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-1`,
      },
      id: `visahoi-message-${contextKey}-1`,
      order: 1,
    },
    {
      anchor: getAnchor(spec.heatmapDescription, visElement),
      requires: ["heatmapDescription"],
      text: "It is based on colored cells.",
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-2`,
      },
      id: `visahoi-message-${contextKey}-2`,
      order: 2,
    },
    {
      anchor: getAnchor(spec.legendDescription, visElement),
      requires: ["legendDescription", "minColor", "maxColor", "yAxis"],
      text: `Hightest ${spec.yAxis?.value} is visualized by ${createColorRect(
        spec.maxColor?.value
      )} whereas lowest is indicated with ${createColorRect(
        spec.minColor?.value
      )}. The medium values are vizualized with ${createColorRect(
        spec.midColor?.value
      )}.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-3`,
      },
      id: `visahoi-message-${contextKey}-3`,
      order: 3,
    },
    {
      anchor: getAnchor(spec.axisDescription, visElement),
      requires: ["xAxis", "yAxis"],
      text: `<i>${spec.yAxis?.value}</i> is plotted in rows and the <i>${spec.xAxis?.value}</i> in columns.`,
      title: "Reading the chart",
      onboardingStage: reading,
      marker: {
        id: `visahoi-marker-${contextKey}-4`,
      },
      id: `visahoi-message-${contextKey}-4`,
      order: 4,
    },
    {
      anchor: getAnchor(spec.hoverDescription, visElement),
      requires: ["hoverDescription"],
      text: "Hover over the chart to get the dedicated value for each cell.",
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
      anchor: getAnchor(spec.maxValue, visElement),
      requires: ["maxValue"],
      text: `The ${createColorRect(
        spec.maxColor?.value
      )} rectangle holds the maximum value in the heatmap. In this heatmap the maximum value is ${
        spec.maxValue?.value
      }.`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-6`,
      },
      id: `visahoi-message-${contextKey}-6`,
      order: 1,
    },
    {
      anchor: getAnchor(spec.minValue, visElement),
      requires: ["minValue"],
      text: `The ${createColorRect(
        spec.minColor?.value
      )} rectangle holds the minimum value in the heatmap. In this heatmap the minimum value is ${
        spec.minValue?.value
      }.`,
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-7`,
      },
      id: `visahoi-message-${contextKey}-7`,
      order: 2,
    },
    {
      anchor: getAnchor(spec.emptyValue, visElement),
      requires: ["emptyValue"],
      text: "Transparent rectangles represent missing (null) values.",
      title: "Analyzing the chart",
      onboardingStage: analyzing,
      marker: {
        id: `visahoi-marker-${contextKey}-8`,
      },
      id: `visahoi-message-${contextKey}-8`,
      order: 3,
    },
  ];

  // Filter for messages where all template variables are available in the spec
  return messages.filter((message) =>
    message.requires.every((tplVars) => spec[tplVars])
  );
}

export const heatmap = {
  generateMessages,
};
