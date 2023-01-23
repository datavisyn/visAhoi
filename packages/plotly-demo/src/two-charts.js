import Plotly from 'plotly.js-dist'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType
} from '@visahoi/plotly'
import debounce from 'lodash.debounce'
import { importCsv } from './util'

let chart = null
let chart2 = null
let showOnboarding = false
let showOnboarding2 = false
let onboardingUI = null
let onboardingUI2 = null

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
  onboardingUI2?.updateOnboarding(getAhoiConfig2())
}, 250)

async function render () {
  const data = await importCsv('./data/oslo-2018.csv')
  const { x, y } = processData(data)
  chart = await makePlotly(x, y)
  chart2 = await makePlotly2(x, y)
  window.addEventListener('resize', debouncedResize)
}

function processData (allRows) {
  const x = []
  const y = []
  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i]
    x.push(`${row.year}-${row.month}`)
    y.push(row.temp)
  }
  return { x, y }
}

function makePlotly (x, y) {
  document.getElementById('plot')
  const traces = [
    {
      type: 'bar',
      x: x, // ['2018-01', '2018-01', ...]
      y: y, // [1.9, 0.1, ...]
      transforms: [
        {
          type: 'aggregate',
          groups: x,
          aggregations: [{ target: 'y', func: 'avg', enabled: true }]
        }
      ],
      marker: {
        color: 'lightgrey'
      }
    }
  ]

  const layout = {
    title: 'Average temperature in Oslo, Norway in 2018',
    xaxis: {
      title: 'Month',
      tickformat: '%m',
      nticks: 12
    },
    yaxis: {
      title: 'Average temperature in °C'
    }
  }

  const config = {
    responsive: true
  }

  return Plotly.newPlot('vis', traces, layout, config)
}

function makePlotly2 (x, y) {
  document.getElementById('plot')
  const traces = [
    {
      type: 'bar',
      x: x, // ['2018-01', '2018-01', ...]
      y: y, // [1.9, 0.1, ...]
      transforms: [
        {
          type: 'aggregate',
          groups: x,
          aggregations: [{ target: 'y', func: 'avg', enabled: true }]
        }
      ],
      marker: {
        color: 'lightgrey'
      }
    }
  ]

  const layout = {
    title: 'Average temperature in Oslo, Norway in 2018',
    xaxis: {
      title: 'Month',
      tickformat: '%m',
      nticks: 12
    },
    yaxis: {
      title: 'Average temperature in °C'
    }
  }

  const config = {
    responsive: true
  }

  return Plotly.newPlot('vis2', traces, layout, config)
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart.id,
    EVisualizationType.BAR_CHART,
    chart
  )
  const ahoiConfig = {
    onboardingMessages: defaultOnboardingMessages
  }
  return ahoiConfig
}

const getAhoiConfig2 = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart2.id,
    EVisualizationType.BAR_CHART,
    chart2
  )
  const ahoiConfig2 = {
    onboardingMessages: defaultOnboardingMessages
  }
  return ahoiConfig2
}

const registerEventListener = () => {
  const helpIcon = document.getElementById('show-onboarding')
  const helpIcon2 = document.getElementById('show-onboarding2')
  if (!helpIcon || !helpIcon2) {
    return
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding
    if (showOnboarding) {
      // key
      if (onboardingUI) {
        onboardingUI.showOnboarding()
      } else {
        onboardingUI = await ahoi(
          chart.id,
          EVisualizationType.BAR_CHART,
          chart,
          getAhoiConfig()
        )
      }
    } else {
      onboardingUI?.removeOnboarding()
    }
  })

  helpIcon2.addEventListener('click', async () => {
    showOnboarding2 = !showOnboarding2
    if (showOnboarding2) {
      if (onboardingUI2) {
        onboardingUI2.showOnboarding()
      } else {
        onboardingUI2 = await ahoi(
          chart2.id,
          EVisualizationType.BAR_CHART,
          chart2,
          getAhoiConfig2()
        )
      }
    } else {
      onboardingUI2?.removeOnboarding()
    }
  })
}

registerEventListener()
render()
