import {
  EVisualizationType,
  IOnboardingMessage,
  generateMessages
} from '@visahoi/core'
import { Spec } from 'vega-typings'
import { IOnboardingTreemapSpec } from '@visahoi/core/src/treemap'

async function extractOnboardingSpec (
  vegaSpec: Spec,
  elems: any[]
): Promise<IOnboardingTreemapSpec> {
  console.log('chart', vegaSpec)

  console.log(
    vegaSpec?.marks[1].encode?.enter?.tooltip,

    'name'
  )
  // debugger;
  // const dataUrl = vegaSpec?.data[0]?.url;
  // const response = await fetch(dataUrl);
  // const data = await response.json();
  // console.log('response', data)
  //   const v = vegaSpec;

  //   const grid = document
  //   .getElementsByClassName("background")[0]
  //   .getBoundingClientRect();

  //   const points = Array.from(
  //     document
  //       .getElementsByClassName("mark-symbol role-mark marks")[0]
  //       .getElementsByTagName("path")
  //   ).filter(
  //     (point) =>
  //       point.getBoundingClientRect().x &&
  //       point.getBoundingClientRect().x <= grid.width + grid.x &&
  //       point.getBoundingClientRect().y &&
  //       point.getBoundingClientRect().y <= grid.height + grid.y
  //   );

  //   const xVals = points.map((point) => point.getBoundingClientRect().x);
  //   const yVals = points.map((point) => point.getBoundingClientRect().y);

  //   const maxX = Math.max(...xVals);
  //   const maxXIndex = xVals.indexOf(maxX);
  //   const maxY = yVals[maxXIndex];
  // debugger;
  return {
    chartTitle: {
      value: vegaSpec?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -30, top: -10 }
        // offset: { right: -500, top: -30 },
        // offset: { left: 80, top: 10 },
      }
    }
    // desc: {
    //   value: "Elder care",
    //   anchor: {
    //     findDomNodeByValue: true,
    //     offset: {
    //       left: -50,
    //       top: -60,
    //     },
    //   },
    // },

    // desc: {
    //   value: data[1].name,
    //   anchor: {
    //     findDomNodeByValue: true,
    //     offset: {left: -20, top: 20}
    //   }
    // },

    // chartTitle: {
    //   value: typeof v.title === "string" ? v.title : v.title?.text,
    //   anchor: {
    //     sel: ".role-title-text",
    //     offset: {left: -20}
    //   },
    // },
  }
}

export async function treemapFactory (
  vegaSpec: Spec,
  elems: any[],
  visElement: Element
): Promise<IOnboardingMessage[]> {
  const onbordingSpec = await extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(
    EVisualizationType.TREEMAP,
    onbordingSpec,
    visElement
  )
}
