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
`,getAllNodes=o=>o.select(".role-mark").selectAll("path").nodes(),getOrientation=o=>{const[e,t]=o,{name:n,type:s}=e,{name:p,type:c}=t;return{x:s==="band"?"horizontal":"vertical",y:c==="band"?"horizontal":"vertical",b:s==="band"?"height":"width"}},getMinMax=o=>{const e=l(o),t=Object.keys(e),n=[];return t.forEach(s=>{n.push({key:s,min:Math.min(...e[s]),max:Math.max(...e[s])})}),n};const l=o=>{const e={},t=Object.keys(o[0]);return t.forEach(n=>{e[n]=o.map(s=>s[n])}),e};export const importCsv=async o=>{const e=[];return await fetch(o).then(t=>t.text()).then(t=>{const n=t.split(`
`),s=n[0].split(",");return n.forEach((p,c)=>{if(c!=0){let r={};p.split(",").forEach((a,x)=>{r[`${s[x]}`]=a}),e.push(r)}}),e}).catch(t=>console.log(t)),e};
