import Plotly from 'plotly.js-dist'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
  setOnboardingStage,
  setEditMode,
  createBasicOnboardingStage
} from '@visahoi/plotly'
import debounce from 'lodash.debounce'

let chart = null
let showOnboarding = false
let editMode = false
let onboardingUI = null
const deleteStageId = null

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

async function render () {
  const response = await fetch('../data/cars.json')
  const data = await response.json()
  const { x, y } = processData(data)
  chart = await makePlotly(x, y)
  window.addEventListener('resize', debouncedResize)
}

function processData (allRows) {
  const x = Object.values(allRows).map((d) => d.Horsepower)
  const y = Object.values(allRows).map((d) => d.Miles_per_Gallon)
  return { x, y }
}

function makePlotly (x, y) {
  document.getElementById('plot')
  const traces = [
    {
      type: 'scatter',
      mode: 'markers',
      x,
      y,
      marker: {
        size: 5
      }
    }
  ]

  const layout = {
    title: 'Horsepower and miles per gallon for various cars',
    xaxis: {
      title: 'Horsepower'
    },
    yaxis: {
      title: 'Miles per Gallon'
    }
  }

  const config = {
    responsive: true
  }

  return Plotly.newPlot('vis', traces, layout, config)
}

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    EVisualizationType.SCATTERPLOT,
    chart
  )

  const extendedOnboardingMessages = defaultOnboardingMessages.map(
    (message) => ({
      ...message,
      marker: {
        ...message.marker,
        fontSize: '12px',
        radius: 10
      }
    })
  )

  // To delete the onboarding stage
  // deleteStageId = 'reading-the-chart';
  // deleteOnboardingStage(deleteStageId);

  const ahoiConfig = {
    // Check whether the deleteStageId is defined if filter the onboarding messages with the deleted onboarding stage.

    onboardingMessages: deleteStageId
      ? defaultOnboardingMessages.filter(
        (m) => m.onboardingStage.id !== deleteStageId
      )
      : defaultOnboardingMessages
    // showOnboardingNavigation: true,
  }
  return ahoiConfig
}

const registerEventListener = () => {
  const helpIcon = document.getElementById('show-onboarding')
  const editButton = document.getElementById('editModeButton')
  const newButton = document.getElementById('btn-test')

  if (!helpIcon) {
    return
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding

    if (showOnboarding) {
      editButton.style.display = 'block'
      onboardingUI = await ahoi(
        EVisualizationType.SCATTERPLOT,
        chart,
        getAhoiConfig()
      )
    } else {
      onboardingUI?.removeOnboarding()
      editButton.style.display = 'none'
    }
  })
  editButton.addEventListener('click', async () => {
    editMode = !editMode
    if (editMode) {
      editButton.innerText = 'Exit edit mode'
    } else {
      editButton.innerText = 'Enter edit mode'
    }
    setEditMode(editMode)
  })

  newButton.addEventListener('click', async () => {
    setOnboardingStage({
      id: 'using-the-chart',
      title: 'Interact',
      iconClass: 'fas fa-microphone',
      backgroundColor: 'red',
      order: 2
    })
    createBasicOnboardingStage({
      title: 'New stage',
      iconClass: 'fas fa-flask',
      backgroundColor: 'tomato'
    })
  })
}

registerEventListener()
render()
