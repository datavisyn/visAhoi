import { EVisualizationType, IOnboardingMessage, generateMessages } from '@visahoi/core'
import { Spec } from 'vega-typings'
import { IOnboardingHeatmapSpec } from '@visahoi/core/src/heatmap'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingHeatmapSpec {
  console.log(vegaSpec, 'Vega specification')

  return {
    chartTitle: {
    //   value: vegaSpec.title,
      value: 'Cars origin and their horsepower based on number of cylinders',
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    },
    legendDescription: {
      value: 'Max of Horsepower',
      anchor: {
        findDomNodeByValue: true
        // offset: {}
      }
    }

  }
}

export function heatmapFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  console.log(onbordingSpec, 'Onboardidning speex')
  return generateMessages(EVisualizationType.HEATMAP, onbordingSpec, visElement)
}
