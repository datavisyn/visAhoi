export const css=`
text-shadow: 0 0 20px #fefcc9,
10px -10px 30px #feec85,
-20px -20px 40px #ffae34,
20px -40px 50px #ec760c,
-20px -60px 60px #cd4606,
0 -80px 70px #973716,
10px -90px 80px #451b0e,
/* 3d effect follows */
1px 1px 0 yellow,
2px 2px 0 orange,
3px 3px 0 red;
font-size: 4vh;
`,css2=`
background-color: lemonchiffon;
color: #003366;
`,getAllNodes=n=>n.select(".role-mark").selectAll("path").nodes(),getOrientation=n=>{const[e,t]=n,{name:p,type:o}=e,{name:r,type:x}=t;return{x:o==="band"?"horizontal":"vertical",y:x==="band"?"horizontal":"vertical",b:o==="band"?"height":"width"}},getMinMax=n=>{const e=c(n),t=Object.keys(e),p=[];return t.forEach(o=>{p.push({key:o,min:Math.min(...e[o]),max:Math.max(...e[o])})}),p};const c=n=>{const e={};return Object.keys(n[0]).forEach(t=>{e[t]=n.map(p=>p[t])}),e};
