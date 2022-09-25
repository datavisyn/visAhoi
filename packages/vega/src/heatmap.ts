import { EVisualizationType, IOnboardingMessage, generateMessages } from '@visahoi/core'
import { Spec } from 'vega-typings'
import { IOnboardingHeatmapSpec } from '@visahoi/core/src/heatmap'
// import { vega } from 'vega-embed'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingHeatmapSpec {
  return {
    chartTitle: {
      value: vegaSpec?.title?.text,
      // value: 'Cars origin and their horsepower based on number of cylinders',
      anchor: {
        findDomNodeByValue: true
        // offset: { left: -20, top: 5 }
      }
    },
    legendDescription: {
      value: 'Max of Horsepower',
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    }

  }
}

export function heatmapFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  console.log(vegaSpec, 'chart')
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(EVisualizationType.HEATMAP, onbordingSpec, visElement)
}
