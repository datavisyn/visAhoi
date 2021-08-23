import*as c from"../web_modules/echarts.js";import*as u from"../web_modules/d3.js";import{ahoi as m,EVisualizationType as d}from"../web_modules/@visahoi/echarts.js";let l=null;function p(){u.csv("../data/oslo-2018.csv").then(r=>{const{x:t,y:s}=h(r),e=y(t,s);m(d.HORIZON_GRAPH,e,"#onboarding")})}function h(r){const t=[],s=[];for(let o=0;o<r.length;o++){const n=r[o],a=`${n.year}-${n.month}`;if(t.includes(a)){const i=t.indexOf(a);s[i].push(parseFloat(n.temp))}else t.push(`${n.year}-${n.month}`),s.push([parseFloat(n.temp)])}const e=s.map(o=>{const n=o.reduce((a,i)=>a+i,0);return Math.round(n/o.length,2)});return{x:t,y:e}}function y(r,t){const s={title:{text:"Average temperature in Oslo, Norway in 2018",left:"center"},tooltip:{trigger:"axis",axisPointer:{snap:!1,type:"none"},formatter:function(e,o,n){let a=0;a+=e[0].value,a+=e[1].value,a-=e[2].value;const i=`Month: ${e[0].name}<br/> Average temperature in °C: ${a}`;return setTimeout(function(){n(o,i)},100),i}},xAxis:{type:"category",boundaryGap:!1,data:r,axisLabel:{formatter:function(e,o){var n=new Date(e);return n.getMonth()+1}},name:"Month",nameLocation:"middle",nameGap:30},yAxis:{type:"value",min:-1,max:16,name:"Average Temperature in °C",nameLocation:"middle",nameGap:30},series:[{data:t.map(e=>e<0?0:e>15?15:e),type:"line",areaStyle:{opacity:.6},color:"#a1d76a",smooth:!0,symbol:"none",lineStyle:{width:0}},{data:t.map(e=>e>15?e-15:0),type:"line",areaStyle:{opacity:1},color:"#a1d76a",smooth:!0,symbol:"none",lineStyle:{width:0}},{data:t.map(e=>e<0?e*-1:0),type:"line",areaStyle:{opacity:1},color:"#0571b0",smooth:!0,symbol:"none",lineStyle:{width:0}}]};return l.setOption(s),l}const f=(r="svg")=>{const t=document.getElementById("vis");l=c.init(t,null,{renderer:r}),p()};export default f;
