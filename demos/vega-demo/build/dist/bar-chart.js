import t from"../web_modules/vega-embed.js";import{ahoi as s}from"../web_modules/@visahoi/vega.js";const n={theme:"default",actions:!1,renderer:"svg"};async function r(){const e=await fetch("./data/barChartOslo2018.json"),a=await e.json();let o=await t("#vis",a,n);s("bar-chart",o,"onboarding")}r();
