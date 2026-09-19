const screen=document.getElementById("screen");const history=document.getElementById("history");let expression="";
function render(){screen.textContent=expression||"0"}
function add(value){if(value==="."&&(/(^|[+\-*/%])[^+\-*/%]*\.?$/.test(expression)))return;if(["+","-","*","/","%"].includes(value)){if(!expression&&value!=="-")return;if(/[+\-*/%]$/.test(expression))expression=expression.slice(0,-1);};expression+=value;render()}
function calculate(){if(!expression)return;try{if(!/^[0-9+\-*/%.()\s]+$/.test(expression))throw Error();let result=Function(`"use strict";return (${expression})`)();if(!Number.isFinite(result))throw Error();history.textContent=expression.replaceAll("*","×").replaceAll("/","÷")+" =";expression=String(Number(result.toFixed(10)));render()}catch{screen.textContent="Error";expression=""}}
document.querySelectorAll("[data-value]").forEach(btn=>btn.addEventListener("click",()=>add(btn.dataset.value)));
document.querySelector('[data-action="clear"]').onclick=()=>{expression="";history.textContent="";render()};
document.querySelector('[data-action="delete"]').onclick=()=>{expression=expression.slice(0,-1);render()};
document.querySelector('[data-action="equals"]').onclick=calculate;
document.addEventListener("keydown",e=>{if(/[0-9.+\-*/%]/.test(e.key))add(e.key);else if(e.key==="Enter"||e.key==="=")calculate();else if(e.key==="Escape")document.querySelector('[data-action="clear"]').click();else if(e.key==="Backspace")document.querySelector('[data-action="delete"]').click()});
render();
