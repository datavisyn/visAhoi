import Plotly from 'plotly.js-dist'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType
} from '@visahoi/plotly'
import debounce from 'lodash.debounce'

let chart = null
let showOnboarding = false
let onboardingUI = null

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

const render = async () => {
  chart = await makePlotly()
  window.addEventListener('resize', debouncedResize)
}

const makePlotly = () => {
  const data = [
    {
      z: [
        [14, null, 19, 24, 16],
        [17, 15, 28, 33, 20],
        [19, 23, 29, 18, 18]
      ],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap',
      hoverongaps: false,
      colorscale: [
        [0, '#337ab7'],
        [0.5, '#f5f5f5'],
        [1, '#ec6836']
      ]
    }
  ]
  const layout = {
    title: 'Average temperature in a week',
    xaxis: {
      title: 'Weekday'
    },
    yaxis: {
      title: 'Average temperature per day time'
    }
  }
  const config = {
    responsive: true
  }
  return Plotly.newPlot('vis', data, layout, config)
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart.id,
    EVisualizationType.HEATMAP,
    chart
  )
  const extendedOnboardingMessages = defaultOnboardingMessages.map((d) => ({
    ...d,
    text: 'test123'
  }))
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages
  }
  return ahoiConfig
}

const registerEventListener = () => {
  showOnboarding = !showOnboarding
  const helpIcon = document.getElementById('show-onboarding')
  if (!helpIcon) {
    return
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding
    if (showOnboarding) {
      onboardingUI = await ahoi(
        chart.id,
        EVisualizationType.HEATMAP,
        chart,
        getAhoiConfig()
      )
    } else {
      onboardingUI?.removeOnboarding()
    }
  })
}

registerEventListener()
render()
