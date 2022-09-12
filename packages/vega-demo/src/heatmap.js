import embed from 'vega-embed'
import debounce from 'lodash.debounce'
import '../public/data/jobsplan.json'

let chart = null
const onboardingUI = null

const opt = {
//   $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  title: {
    text: 'Cars origin and their horsepower based on number of cylinders',

    fontSize: 14

  },
  description: 'An example vega-lite heatmap.',
  width: 1200,
  height: 600,
  padding: {
    left: window.innerWidth / 2 - 600,
    top: 30
  },
  autosize: 'none',

  data: { url: 'data/carsData.json' },
  mark: { type: 'rect', tooltip: true },
  encoding: {
    y: { field: 'Origin', type: 'nominal', title: 'Origin' },
    x: { field: 'Cylinders', type: 'ordinal', title: 'Cylinders' },
    // color: { aggregate: 'mean', field: 'Horsepower' }
    color: {
      field: 'Horsepower',
      aggregate: 'max',
      type: 'quantitative',
      legend: { title: null }
    }
  },
  config: {
    axis: { grid: true, labels: true }
  }

}

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

async function render () {
  chart = await embed('#vis', opt)
  window.addEventListener('resize', debouncedResize)
}

// registerEventListener();
render()
