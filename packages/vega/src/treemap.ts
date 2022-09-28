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
  return {
    chartTitle: {
      value: vegaSpec?.title,
      anchor: {
        findDomNodeByValue: true,
        offset: { right: -20, top: -30 }
      }
    }
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
