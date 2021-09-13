export const importCsv=async o=>{const s=[];return await fetch(o).then(t=>t.text()).then(t=>{const e=t.split(`
`),c=e[0].split(",");return e.forEach((a,r)=>{if(r!=0){let n={};a.split(",").forEach((h,i)=>{n[`${c[i]}`]=h}),s.push(n)}}),s}).catch(t=>console.log(t)),s};
