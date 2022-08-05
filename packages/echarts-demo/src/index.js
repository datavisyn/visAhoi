const demos = [
  {
    title: 'Bar Chart',
    link: './svg/bar-chart.html',
  },
  {
    title: 'Change Matrix',
    link: './svg/change-matrix.html',
  },
  {
    title: 'Horizon Graph',
    link: './svg/horizon-graph.html',
  },
  {
    title: 'Scatterplot',
    link: './svg/scatterplot.html',
  },
  {
    title: 'Treemap',
    link: './svg/treemap.html',
  },
  {
    title: 'Heatmap',
    link: './svg/heatmap.html',
  },
  // {
  //   title: 'Bar Chart Canvas',
  //   link: './canvas/bar-chart.html'
  // },
  // {
  //   title: 'Change Matrix Canvas',
  //   link: './canvas/change-matrix.html'
  // },
  // {
  //   title: 'Horizon Graph Canvas',
  //   link: './canvas/horizon-graph.html'
  // }
];

const ul = document.createElement('ul');

demos.forEach((demo) => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${demo.link}">${demo.title}</a>`;
  ul.append(li);
});

document.getElementById('app').append(ul);
