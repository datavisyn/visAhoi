const c=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};c();const s=[{title:"Two Charts",link:"./two-charts.html"},{title:"Bar Chart",link:"./bar-chart.html"},{title:"Change Matrix",link:"./change-matrix.html"},{title:"Horizon Graph",link:"./horizon-graph.html"},{title:"Scatterplot",link:"./scatterplot.html"},{title:"TreeMap",link:"./treeMap.html"},{title:"Heatmap",link:"./heatmap.html"}],i=document.createElement("ul");s.forEach(n=>{const r=document.createElement("li");r.innerHTML=`<a href="${n.link}">${n.title}</a>`,i.append(r)});document.getElementById("app").append(i);
