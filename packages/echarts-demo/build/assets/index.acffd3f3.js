import"https://cdn.skypack.dev/@fortawesome/fontawesome-free";const s=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};s();const c=[{title:"Bar Chart",link:"./svg/bar-chart.html"},{title:"Change Matrix",link:"./svg/change-matrix.html"},{title:"Horizon Graph",link:"./svg/horizon-graph.html"},{title:"Scatterplot",link:"./svg/scatterplot.html"},{title:"Treemap",link:"./svg/treemap.html"},{title:"Heatmap",link:"./svg/heatmap.html"}],l=document.createElement("ul");c.forEach(n=>{const r=document.createElement("li");r.innerHTML=`<a href="${n.link}">${n.title}</a>`,l.append(r)});document.getElementById("app").append(l);
