import embed from 'vega-embed'
import debounce from 'lodash.debounce'
import '../public/data/jobsplan.json'

let chart = null
const onboardingUI = null

const opt = {
//   $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  title: 'Cars origin and their horsepower based on number of cylinders',
  description: 'An example of heatmap.',
  width: 1200,
  height: 600,
  padding: {
    left: window.innerWidth / 2 - 600,
    top: 30
  },
  autosize: 'none',

  data: { url: 'data/carsData.json' },
  mark: 'rect',
  encoding: {
    y: { field: 'Origin', type: 'nominal', title: 'Origin' },
    x: { field: 'Cylinders', type: 'ordinal', title: 'Cylinders' },
    color: { aggregate: 'mean', field: 'Horsepower' }
  },
  config: {
    axis: { grid: true }
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
