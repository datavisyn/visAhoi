import embed from 'vega-embed'
import { generateBasicAnnotations, ahoi, EVisualizationType } from '@visahoi/vega'
import debounce from 'lodash.debounce'
import '../public/data/jobsplan.json'

let chart = null
let showOnboarding = false
let onboardingUI = null

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

const opt = {
//   $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  title: {
    text: 'Cars origin and their horsepower based on number of cylinders',
    fontSize: 16
  },
  // actions: false,
  description: 'An example vega-lite heatmap.',
  width: 'container',
  height: 600,
  padding: {
    left: 80,
    top: 30
  },

  data: { url: 'data/carsData.json' },
  mark: { type: 'rect', tooltip: true },
  encoding: {
    y: { field: 'Origin', type: 'nominal', title: 'Origin' },
    x: { field: 'Cylinders', type: 'ordinal', title: 'Cylinders' },
    // color: { aggregate: 'mean', field: 'Horsepower' }
    color: {
      field: 'Horsepower',
      aggregate: 'max',
      type: 'quantitative'
      // legend: { title: 'legend' }
    }
  },
  config: {
    axis: { grid: true, labels: true }
  }

}

const getAhoiConfig = async () => {
  const defaultOnboardingMessages = await generateBasicAnnotations(EVisualizationType.HEATMAP, chart)
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: 'test123'
  }))
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages
  }
  return ahoiConfig
}

async function render () {
  chart = await embed('#vis', opt, { actions: false })
  window.addEventListener('resize', debouncedResize)
}

const registerEventListener = () => {
  const helpIcon = document.getElementById('show-onboarding')
  if (!helpIcon) { return }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding
    if (showOnboarding) {
      const config = await getAhoiConfig()
      onboardingUI = await ahoi(EVisualizationType.HEATMAP, chart, config)
    } else {
      onboardingUI?.removeOnboarding()
    }
  })
}

registerEventListener()
render()
