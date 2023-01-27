import Plotly from 'plotly.js-dist'
import {
  generateBasicAnnotations,
  ahoi,
  EVisualizationType,
  setOnboardingStage,
  setEditMode,
  createBasicOnboardingMessage,
  createBasicOnboardingStage,
  getOnboardingMessages
} from '@visahoi/plotly'
import { defaultOnboardingStages, EDefaultOnboardingStages } from '@visahoi/core'
// @ts-ignore
import editIcon from '@visahoi/core/src/assets/pen-solid.svg';

import debounce from 'lodash.debounce'

let chart = null
let showOnboarding = false
let editMode = false
let onboardingUI = null
const deleteStageId = null

const debouncedResize = debounce((event) => {
  onboardingUI?.updateOnboarding(getAhoiConfig())
}, 250)

const reading = defaultOnboardingStages.get(
  EDefaultOnboardingStages.READING
)

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

// Customize icons
// const getIcons = () => {
//   const trashIcon = document.createElement('i')
//   trashIcon.innerHTML = '&#128465;'
//   return {
//     // trash: trashIcon.outerHTML.toString()
//   }
// }

const getAhoiConfig = () => {
  const defaultOnboardingMessages = generateBasicAnnotations(
    chart.id,
    EVisualizationType.SCATTERPLOT,
    chart
  )
  defaultOnboardingMessages.push(
    createBasicOnboardingMessage(chart.id, {
      text: "This is the newly added onboarding message for the scatter chart. It's absolutely positioned.",
      title: 'Absolutely positioned message',
      onboardingStage: reading,
      anchor: {
        coords: {
          x: 250,
          y: 250
        }
      }
    })
  )

  // const extendedOnboardingMessages = defaultOnboardingMessages.map(
  //   (message) => ({
  //     ...message,
  //     marker: {
  //       ...message.marker,
  //       fontSize: '12px',
  //       radius: 10
  //     }
  //   })
  // )

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
  const newMessageBtn = document.getElementById('btn-message')

  if (!helpIcon) {
    return
  }
  helpIcon.addEventListener('click', async () => {
    showOnboarding = !showOnboarding

    if (showOnboarding) {
      editButton.style.display = 'block'
      onboardingUI = await ahoi(
        chart.id,
        EVisualizationType.SCATTERPLOT,
        chart,
        getAhoiConfig()
        // getIcons()
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
    setOnboardingStage(chart.id, {      
      id: 'reading-the-chart',
      title: 'reading',
      icon: `<img src=${editIcon} />`,
      backgroundColor: 'red',
      activeBackgroundColor: 'purple',
      hoverBackgroundColor: 'green'
    })
  })


  newMessageBtn.addEventListener('click', async () => { 
    const newOnboardingStage = createBasicOnboardingStage(chart.id, {      
      title: 'stage-1',      
      icon: `<img src=${editIcon} />`,
      backgroundColor: 'green'
    })

    const messages = getOnboardingMessages(chart.id)  
    
    messages.push(createBasicOnboardingMessage(chart.id,{    
      text: 'Check the default order',
      title: 'New message',
      onboardingStage: newOnboardingStage,
      anchor: {
        coords: {
          x: 250,
          y: 250
        }
      },
    }))
  })
}

registerEventListener()
render()
