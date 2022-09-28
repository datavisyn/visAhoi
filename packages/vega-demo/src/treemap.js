import embed from 'vega-embed'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType
} from '@visahoi/vega'
import debounce from 'lodash.debounce'
import '../public/data/jobsplan.json'

let chart = null
let onboardingUI = null
let showOnboarding = false

const opt = {
  title: 'American jobs plan',
  description: 'An example of treemap layout for hierarchical data.',
  autosize: { type: 'fit', contains: 'padding' },
  padding: 5,
  signals: [
    {
      name: 'layout',
      value: 'squarify'
    },
    {
      name: 'aspectRatio',
      value: 1.6
    },
    {
      name: 'width',
      init: 'containerSize()[0]',
      on: [{ events: 'window:resize', update: 'containerSize()[0]' }]
    },
    {
      name: 'height',
      init: 'containerSize()[1]',
      on: [{ events: 'window:resize', update: 'containerSize()[1]' }]
    }
  ],

  data: [
    {
      name: 'tree',
      url: './data/jobsplan.json',
      transform: [
        {
          type: 'stratify',
          key: 'id',
          parentKey: 'parent'
        },
        {
          type: 'treemap',
          field: 'size',
          sort: { field: 'value' },
          round: true,
          method: { signal: 'layout' },
          ratio: { signal: 'aspectRatio' },
          size: [{ signal: 'width' }, { signal: 'height' }]
        }
      ]
    },
    {
      name: 'nodes',
      source: 'tree',
      transform: [{ type: 'filter', expr: 'datum.children' }]
    },
    {
      name: 'leaves',
      source: 'tree',
      transform: [{ type: 'filter', expr: '!datum.children' }]
    }
  ],

  scales: [
    {
      name: 'color',
      type: 'ordinal',
      domain: { data: 'nodes', field: 'name' },
      range: ['#80b1d3', '#80b1d3', '#fdb462', '#b3de69', '#fccde5']
    },
    {
      name: 'size',
      type: 'ordinal',
      domain: [0, 1, 2, 3],
      range: [120, 25, 20, 14]
    },
    {
      name: 'opacity',
      type: 'ordinal',
      domain: [0, 1, 2, 3],
      range: [0.15, 0.5, 0.8, 1.0]
    }
  ],

  marks: [
    {
      type: 'rect',
      from: { data: 'nodes' },
      interactive: false,
      encode: {
        enter: {
          fill: { scale: 'color', field: 'name' }
        },
        update: {
          x: { field: 'x0' },
          y: { field: 'y0' },
          x2: { field: 'x1' },
          y2: { field: 'y1' }
        }
      }
    },
    {
      type: 'rect',
      from: { data: 'leaves' },
      encode: {
        enter: {
          stroke: { value: '#fff' },
          tooltip: { signal: "{'title': datum.name, 'value': datum.size}" }
        },
        update: {
          x: { field: 'x0' },
          y: { field: 'y0' },
          x2: { field: 'x1' },
          y2: { field: 'y1' },
          fill: { value: 'transparent' }
        },
        hover: {
          fill: { value: 'red' }
        }
      }
    },
    {
      type: 'text',
      from: { data: 'nodes' },
      interactive: false,
      encode: {
        enter: {
          font: { value: 'Helvetica Neue, Arial' },
          align: { value: 'center' },
          baseline: { value: 'middle' },
          fill: { value: '#000' },
          text: { field: 'name' },
          fontSize: { scale: 'size', field: 'depth' },
          fillOpacity: { scale: 'opacity', field: 'depth' }
        },
        update: {
          x: { signal: '0.5 * (datum.x0 + datum.x1)' },
          y: { signal: '0.5 * (datum.y0 + datum.y1)' }
        }
      }
    }
  ]
}

const config = {
  responsive: true,
  renderer: 'svg'
}

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

async function render () {
  chart = await embed('#vis', opt, config)
  window.addEventListener('resize', debouncedResize)
}

const getAhoiConfig = async () => {
  const defaultOnboardingMessages = await generateBasicAnnotations(
    EVisualizationType.TREEMAP,
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
  const helpIcon = document.getElementById('show-onboarding')
  if (!helpIcon) {
    return
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding
    if (showOnboarding) {
      const config = await getAhoiConfig()
      onboardingUI = await ahoi(EVisualizationType.TREEMAP, chart, config)
    } else {
      onboardingUI?.removeOnboarding()
    }
  })
}

registerEventListener()
render()
