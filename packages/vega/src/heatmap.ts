import { EVisualizationType, IOnboardingMessage, generateMessages } from '@visahoi/core'
import { Spec } from 'vega-typings'
import { IOnboardingHeatmapSpec } from '@visahoi/core/src/heatmap'
import { vega } from 'vega-embed'

function extractOnboardingSpec (vegaSpec: Spec, elems: any[]): IOnboardingHeatmapSpec {
  console.log(vegaSpec, 'Vega')
  return {
    chartTitle: {
      value: vegaSpec?.title?.text,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: -10 }
      }
    },
    legendDescription: {
      value: vegaSpec?.legends[0]?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: -20, top: 5 }
      }
    },
    axisDescription: {
      value: vegaSpec?.axes[2]?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { left: 80 }
      }
    },
    yAxis: {
      value: vegaSpec?.axes[3]?.title
    },
    xAxis: {
      value: vegaSpec?.axes[2]?.title
    }

  }
}

export function heatmapFactory (vegaSpec: Spec, elems: any[], visElement: Element): IOnboardingMessage[] {
  const onbordingSpec = extractOnboardingSpec(vegaSpec, elems)
  return generateMessages(EVisualizationType.HEATMAP, onbordingSpec, visElement)
}
