const demos = [
  {
    title: 'Two Charts',
    link: './two-charts.html'
  },
  {
    title: 'Bar Chart',
    link: './bar-chart.html'
  },
  {
    title: 'Change Matrix',
    link: './change-matrix.html'
  },
  {
    title: 'Horizon Graph',
    link: './horizon-graph.html'
  },
  {
    title: 'Scatterplot',
    link: './scatterplot.html'
  },
  {
    title: 'TreeMap',
    link: './treeMap.html'
  },
  {
    title: 'Heatmap',
    link: './heatmap.html'
  }
]

const ul = document.createElement('ul')

demos.forEach((demo) => {
  const li = document.createElement('li')
  li.innerHTML = `<a href="${demo.link}">${demo.title}</a>`
  ul.append(li)
})

document.getElementById('app').append(ul)
