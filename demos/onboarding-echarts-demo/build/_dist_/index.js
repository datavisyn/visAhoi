const demos = [{
  title: "Bar Chart SVG",
  link: "./svg/bar-chart.html"
}, {
  title: "Change Matrix SVG",
  link: "./svg/change-matrix.html"
}, {
  title: "Horizon Graph SVG",
  link: "./svg/horizon-graph.html"
}, {
  title: "Bar Chart Canvas",
  link: "./canvas/bar-chart.html"
}, {
  title: "Change Matrix Canvas",
  link: "./canvas/change-matrix.html"
}, {
  title: "Horizon Graph Canvas",
  link: "./canvas/horizon-graph.html"
}];
const ul = document.createElement("ul");
demos.forEach((demo) => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${demo.link}">${demo.title}</a>`;
  ul.append(li);
});
document.getElementById("app").append(ul);
