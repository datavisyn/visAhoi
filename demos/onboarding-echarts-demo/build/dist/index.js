const demos=[{title:"Bar Chart SVG",link:"./svg/bar-chart.html"},{title:"Change Matrix SVG",link:"./svg/change-matrix.html"},{title:"Horizon Graph SVG",link:"./svg/horizon-graph.html"},{title:"Bar Chart Canvas",link:"./canvas/bar-chart.html"},{title:"Change Matrix Canvas",link:"./canvas/change-matrix.html"},{title:"Horizon Graph Canvas",link:"./canvas/horizon-graph.html"}],ul=document.createElement("ul");demos.forEach(t=>{const a=document.createElement("li");a.innerHTML=`<a href="${t.link}">${t.title}</a>`,ul.append(a)}),document.getElementById("app").append(ul);
