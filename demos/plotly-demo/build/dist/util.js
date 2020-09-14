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
`,getAllNodes=e=>e.select(".role-mark").selectAll("path").nodes(),getOrientation=e=>{const[t,p]=e,{name:s,type:o}=t,{name:x,type:n}=p;return{x:o==="band"?"horizontal":"vertical",y:n==="band"?"horizontal":"vertical",b:o==="band"?"height":"width"}},getMinMax=e=>{const t=c(e),p=Object.keys(t),s=[];return p.forEach(o=>{s.push({key:o,min:Math.min(...t[o]),max:Math.max(...t[o])})}),s};const c=e=>{const t={},p=Object.keys(e[0]);return p.forEach(s=>{t[s]=e.map(o=>o[s])}),t};
