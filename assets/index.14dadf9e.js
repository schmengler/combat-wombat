var H=Object.defineProperty,q=Object.defineProperties;var Q=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var V=(r,n,t)=>n in r?H(r,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[n]=t,E=(r,n)=>{for(var t in n||(n={}))U.call(n,t)&&V(r,t,n[t]);if(A)for(var t of A(n))D.call(n,t)&&V(r,t,n[t]);return r},F=(r,n)=>q(r,Q(n));var W=(r,n)=>{var t={};for(var o in r)U.call(r,o)&&n.indexOf(o)<0&&(t[o]=r[o]);if(r!=null&&A)for(var o of A(r))n.indexOf(o)<0&&D.call(r,o)&&(t[o]=r[o]);return t};var p=(r,n,t)=>(V(r,typeof n!="symbol"?n+"":n,t),t);import{j as J,t as X,r as N,R as Y,a as Z}from"./vendor.56f34d6f.js";const _=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}};_();var L;(function(r){r.None="keine Wunde",r.Muscle="Muskel",r.Sinew="Sehne",r.Bones="Knochen",r.Organ="Organ"})(L||(L={}));class M{constructor(n){p(this,"characterId");p(this,"value",0);p(this,"rounds",0);p(this,"woundType",L.None);p(this,"inflictedByCharacterId",null);p(this,"fresh",!0);this.characterId=n}isEmpty(){return this.rounds==0}isInflictedBy(n){return n.id==this.inflictedByCharacterId}isInflictedByAny(n){const t=n.map(o=>o.id);return this.inflictedByCharacterId!==null&&t.includes(this.inflictedByCharacterId)}withRounds(n){return Object.assign(this,{rounds:this.rounds+n})}static clone(n){return Object.assign(new M(n.characterId),n)}withFresh(n){return Object.assign(this,{fresh:n})}isNotFresh(){return!this.fresh}}const R=class{constructor(n,t){p(this,"id");p(this,"name");p(this,"ini");p(this,"nextRoundIni");p(this,"originalIni");p(this,"hits",0);p(this,"exhaustion",0);p(this,"exhaustionPerRound",0);p(this,"bleeding",0);p(this,"boniOrMali",[]);p(this,"parryWithMali",[]);p(this,"noParry");p(this,"dizzy");p(this,"diesInRounds",0);p(this,"onGround",!1);p(this,"disarmed",!1);p(this,"unconscious",!1);p(this,"dead",!1);p(this,"notes","");this.id=R.nextId++,this.name=n,this.ini=t,this.nextRoundIni=t,this.originalIni=t,this.dizzy=new M(this.id),this.noParry=new M(this.id)}static turnModifiers(n,t){return n.map(o=>M.clone(o)).map(o=>t(o)?o.withRounds(-1):o).map(o=>o.withFresh(!1)).filter(o=>o.rounds>0)}static turnModifier(n,t){let o=M.clone(n);return t(o)&&(o=o.withRounds(-1)),o.rounds<=0&&(o=new M(o.characterId)),o.withFresh(!1)}beforeTurn(n){const t=R.clone(this);return n.filter(o=>o.id!==t.id).forEach(o=>{const i=l=>l.isInflictedBy(t);o.boniOrMali=R.turnModifiers(o.boniOrMali,i),o.parryWithMali=R.turnModifiers(o.parryWithMali,i),o.noParry=R.turnModifier(o.noParry,i),o.dizzy=R.turnModifier(o.dizzy,i)}),t.hits+=t.bleeding,t.exhaustion+=t.exhaustionPerRound,t.diesInRounds=Math.max(0,t.diesInRounds-1),t.diesInRounds==0&&this.diesInRounds>0&&(t.dead=!0),t}afterTurn(n){const t=R.clone(this),o=i=>i.isInflictedBy(t)&&i.isNotFresh()||!i.isInflictedByAny(n);return t.boniOrMali=R.turnModifiers(t.boniOrMali,o),t.parryWithMali=R.turnModifiers(t.parryWithMali,o),t.dizzy=R.turnModifier(t.dizzy,o),t.noParry=R.turnModifier(t.noParry,o),t}canAct(){return!this.dead&&!this.unconscious}static clone(n){return Object.assign(new R("",0),n)}};let B=R;p(B,"nextId",1);const e=J.exports.jsx,f=J.exports.jsxs;X.exports.Simulate.input;function ee({characters:r,setCharacters:n}){return f("form",{onSubmit:o=>{o.preventDefault();const i=o.target.elements.namedItem("addText");if(i.value.trim()=="")return;const l=i.value.match(/^(?:(\d+) )?(.*?)(?: (\d+))?$/),s=Number.parseInt(l[1])||1,d=l[2],u=Number.parseInt(l[3])||0,c=r.map(a=>a.name.match(new RegExp("^"+d+"(?: (\\d+))?"))).filter(a=>a!==null).map(a=>parseInt(a[1])||1).sort((a,w)=>a-w).pop()||0,h=Array.from({length:s},(a,w)=>new B(d+(s+c>1?" "+(c+1+w):""),u));n(a=>[...a,...h]),i.value=""},className:"inline-block mx-2",children:[e("input",{name:"addText",type:"text",className:"mx-2",placeholder:"[Anzahl] Name [Ini]"}),e("button",{type:"submit",className:"inline-block px-7 py-3 bg-green-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out",children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"})})})]})}function ne({characters:r,setCharacters:n,currentId:t,setCurrentId:o,characterTable:i}){const l=(h,a)=>{n(w=>{const b=w.map(B.clone);h===0&&d(b);const y=b[h].id,I=b.findIndex(g=>g.id==a);return b[I]&&(b[I]=b[I].afterTurn(b)),b[h]=b[h].beforeTurn(b),o(y),b[h].canAct()||l((h+1)%b.length,y),i.current.querySelector('tr[data-character-id="'+y+'"]').scrollIntoView({behavior:"smooth",block:"center"}),b})};function s(){return t==null&&r.length>0?new B("Niemand",0):r.find(h=>h.id==t)||new B("Niemand",0)}function d(h){h.forEach(a=>{[a.ini,a.nextRoundIni]=[a.nextRoundIni,a.originalIni]}),h.sort((a,w)=>w.ini-a.ini)}function u(){if(r.length==0)return;const a=(r.findIndex(w=>w.id==t)+1)%r.length;l(a,t)}const c=s();return f("div",{className:"text-left inline-block",children:[f("button",{type:"button",className:"inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out",onClick:u,children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 inline-block",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 inline-block",viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{d:"M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"})})]}),e("span",{className:"text-2xl px-6",children:e("span",{className:"font-bold",children:c.name})})]})}function te({setCharacters:r,characterId:n}){return e("button",{onClick:()=>{r(o=>{const i=o.findIndex(l=>l.id==n);return o.filter((l,s)=>s!=i)})},children:e("svg",{className:"w-6 h-6 inline text-red-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"})})})}function re({entity:r,property:n,setEntity:t}){const o=N.exports.useRef(null),i=s=>{t(d=>Object.assign(Object.create(Object.getPrototypeOf(d)),F(E({},d),{[n]:s.target.elements[n].value}))),s.preventDefault()},l=()=>o.current.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}));return e("form",{onSubmit:i,ref:o,children:e("input",{type:"number",name:n,defaultValue:r[n],className:"w-12",onBlur:l})})}function K({entity:r,property:n,setEntity:t,decorateUpdate:o,propertyToNumber:i,minValue:l=Number.MIN_SAFE_INTEGER,invertColors:s=!1,useBigSteps:d=!1}){const u=N.exports.useRef(null),c=N.exports.useRef(null),h=N.exports.useRef(null),[a,w]=N.exports.useState(!1);function b(C){t(z=>{const T=Object.assign(Object.create(Object.getPrototypeOf(z)),z);return T[n]=o(C)(T[n]),T})}const y=(C=1)=>()=>{b(z=>Math.max(l,z+C)),k()},I=(C=1)=>y(-C),g=C=>{b(()=>Math.max(l,Number.parseInt(C.target.value)))},k=()=>w(!0),O=function(){setTimeout(()=>{document.activeElement?w(h.current==document.activeElement.parentElement||c.current==document.activeElement.parentElement):w(!1)},10)},m=C=>C.key=="Enter"&&C.target.blur(),x="inline-block m-1 rounded-full bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9",v="inline-block m-1 rounded-full bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9",S=i(r[n]);return e("div",{className:"custom-number-input h-full w-full",children:f("div",{ref:h,className:"flex flex-col h-full w-full rounded-lg relative bg-transparent mt-1 items-center",children:[e("button",{className:"bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-10 rounded-r cursor-pointer",onClick:y(),onBlur:O,children:e("span",{className:"m-auto text-md font-thin",children:"+"})}),e("input",{readOnly:!0,type:"number",ref:u,className:"outline-none focus:outline-none text-center w-10 bg-amber-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-amber-700  outline-none border-0 focus:ring-0 px-0 text-sm",value:S,onClick:k,onChange:g,onKeyPress:m,onBlur:O}),e("button",{className:" bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-10 rounded-l cursor-pointer outline-none",onClick:I(),onBlur:O,children:e("span",{className:"m-auto text-md font-thin",children:"\u2212"})}),f("div",{ref:c,hidden:!a||!d,className:"absolute bg-amber-100 left-full p-2 z-10 drop-shadow",children:[e("button",{className:s?v:x,onClick:y(10),onBlur:O,children:"+10"}),e("button",{className:s?v:x,onClick:y(100),onBlur:O,children:"+100"}),e("br",{}),e("button",{className:s?x:v,onClick:I(10),onBlur:O,children:"-10"}),e("button",{className:s?x:v,onClick:I(100),onBlur:O,children:"-100"})]})]})})}const oe=r=>t=>{var n=W(t,[]);return e(r,E({decorateUpdate:l=>l,propertyToNumber:l=>l},n))};var j=oe(K);function G({entity:r,property:n,setEntity:t,getCurrentCharacter:o,invertColors:i=!0,useWoundType:l=!1,showMarker:s=!1}){const d=r.id,[u,c]=N.exports.useState(!1),[h,a]=N.exports.useState(new M(d)),w=m=>{a(x=>{const v=Object.assign(new M(d),x);return v.woundType=L[m.target.value],v})},b=m=>{t(x=>{if(h.isEmpty())return x;const v=Object.assign(new B("",0),x),S=Object.assign(new M(d),h);return S.inflictedByCharacterId=o().id,a(new M(d)),v[n]=[...v[n],S],c(!1),v})},y=m=>()=>t(x=>{const v=Object.assign(new B("",0),x);return v[n]=v[n].filter(S=>S!==m),v}),I=N.exports.useRef(null),g=()=>{c(!1)};N.exports.useEffect(()=>{const m=x=>{I.current&&!I.current.contains(x.target)&&g&&g()};return document.addEventListener("click",m,!0),()=>{document.removeEventListener("click",m,!0)}},[g]);const k=r[n],O=m=>{a(x=>{const v=M.clone(x);return v.rounds=m.target.checked?1/0:0,v})};return f("div",{className:"w-full h-12 relative cursor-help",children:[f("div",{className:"w-full h-full flex items-center justify-center",onClick:()=>c(m=>!m),children:[s&&k.length>0&&e("span",{children:"\u2714 "}),k.reduce((m,x)=>m+x.value,0)]}),f("div",{ref:I,hidden:!u,className:"absolute bg-amber-100 top-10 p-2 z-10 drop-shadow text-left",children:[e("ol",{children:k.map((m,x)=>f("li",{className:"text-xl",children:[e("button",{className:"inline-block text-orange-400",onClick:y(m),children:e("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),"\xA0",e("strong",{className:m.value>0?"text-green-600":"text-red-600",children:m.value}),"\xA0(",m.rounds,") \xA0",l&&e("strong",{children:m.woundType})]},x))}),e("button",{className:"block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out",onClick:b,children:e("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 11l7-7 7 7M5 19l7-7 7 7"})})}),f("table",{children:[e("thead",{children:f("tr",{children:[e("th",{className:"font-bold text-center",children:"Runden"}),e("th",{className:"font-bold text-center",children:"Bonus/Malus"})]})}),f("tbody",{children:[f("tr",{children:[f("td",{className:"align-top",children:[e(j,{entity:h,setEntity:a,property:"rounds",minValue:0}),e("br",{}),f("label",{className:"select-none container block relative cursor-pointer text-xl",children:[e("input",{className:"text-amber-600 focus:ring-amber-400",type:"checkbox",onChange:O,checked:h.rounds===1/0}),"\u221E"]})]}),e("td",{className:"align-top text-center",children:e(j,{entity:h,setEntity:a,property:"value",useBigSteps:!0,invertColors:i})})]}),l&&e("tr",{children:e("td",{colSpan:2,children:e("fieldset",{children:Object.entries(L).map(m=>f("label",{className:"block py-2 cursor-pointer",children:[e("input",{name:"woundType",value:m[0],type:"radio",onChange:w,className:"text-amber-600 focus:ring-amber-400"})," ",m[1]]},m[0]))})})})]})]})]})]})}function P({entity:r,setEntity:n,property:t}){const o=i=>{n(l=>{const s=Object.assign(Object.create(Object.getPrototypeOf(l)),l);return s[t]=i.target.checked,s})};return e("div",{className:"w-full relative flex justify-center align-center",children:f("label",{className:"select-none container block relative cursor-pointer text-xl pl-8 left-1/2 -mt-2 -ml-4",children:[e("input",{className:"absolute opacity-0 left-0 top-0 cursor-pointer",type:"checkbox",checked:r[t],onChange:o}),e("span",{className:"h-6 w-6 checkmark absolute top-0 left-0 bg-amber-100"})]})})}function ie({entity:r,property:n,setEntity:t}){const o=N.exports.useRef(null),i=s=>{t(d=>Object.assign(Object.create(Object.getPrototypeOf(d)),F(E({},d),{[n]:s.target.elements[n].value}))),s.preventDefault()},l=()=>o.current.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}));return e("form",{onSubmit:i,ref:o,children:e("textarea",{name:n,defaultValue:r[n],className:"w-full h-20 p-1 text-sm",onBlur:l})})}const se=r=>o=>{var i=o,{getCurrentCharacter:n}=i,t=W(i,["getCurrentCharacter"]);return e(r,E({decorateUpdate:d=>u=>{const c=M.clone(u);return c.rounds=d(c.rounds),c.inflictedByCharacterId=n().id,c},propertyToNumber:d=>d&&d.rounds||0},t))};var $=se(K);function le({entity:r,setEntity:n,getCurrentCharacter:t}){const o=l=>{n(s=>{const d=Object.assign(Object.create(Object.getPrototypeOf(s)),s);return d.nextRoundIni=Math.min(d.nextRoundIni,t().nextRoundIni-1),d})},i=r.nextRoundIni>=t().nextRoundIni&&r.id!==t().id;return f("div",{children:[f("div",{className:r.ini<r.originalIni?"font-bold text-red-600":"",children:["Aktuell: ",r.ini]}),f("div",{className:r.nextRoundIni<r.originalIni?"font-bold text-red-600":"",children:["N\xE4chste: ",r.nextRoundIni]}),e("button",{title:"Verliere Initiative",onClick:o,type:"button",disabled:!i,className:i?"text-red-600":"text-gray-400",children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z",clipRule:"evenodd"})})})]})}function ae({tdClass:r,isEven:n,isCurrent:t,currentId:o,characters:i,setCharacters:l,characterId:s}){const d=i.findIndex(g=>g.id==s),u=i[d],c=g=>{l(k=>{const O=k.findIndex(x=>x.id==s),m=[...k];return m[O]=g(m[O]),m})},h=()=>o==null&&i.length>0?u:i.find(g=>g.id==o)||u,a="",w="bg-amber-50",b=" bg-green-200",y=" bg-red-300 opacity-50",I=(n?w:a)+(t?b:"")+(u.canAct()?"":y);return f("tr",{className:I,"data-character-id":s,children:[e("td",{className:r+"overflow-hidden",children:e("div",{className:"inline-block font-bold text-lg",children:u.name})}),f("td",{className:r,children:[e(re,{entity:u,setEntity:c,property:"originalIni"}),e(le,{setEntity:c,entity:u,getCurrentCharacter:h})]}),e("td",{className:r,children:e(j,{entity:u,setEntity:c,property:"hits",minValue:0,useBigSteps:!0})}),e("td",{className:r,children:e(j,{entity:u,setEntity:c,property:"bleeding",minValue:0})}),e("td",{className:r,children:e(j,{entity:u,setEntity:c,property:"exhaustion",minValue:0,useBigSteps:!0})}),e("td",{className:r,children:e(j,{entity:u,setEntity:c,property:"exhaustionPerRound",minValue:0})}),e("td",{className:r,children:e(G,{entity:u,getCurrentCharacter:h,setEntity:c,property:"boniOrMali",useWoundType:!0})}),e("td",{className:r,children:e(G,{entity:u,getCurrentCharacter:h,setEntity:c,property:"parryWithMali",showMarker:!0})}),e("td",{className:r,children:e($,{entity:u,getCurrentCharacter:h,setEntity:c,property:"noParry",minValue:0})}),e("td",{className:r,children:e($,{entity:u,getCurrentCharacter:h,setEntity:c,property:"dizzy",minValue:0})}),e("td",{className:r,children:e(P,{entity:u,setEntity:c,property:"disarmed"})}),e("td",{className:r,children:e(P,{entity:u,setEntity:c,property:"onGround"})}),e("td",{className:r,children:e(P,{entity:u,setEntity:c,property:"unconscious"})}),e("td",{className:r,children:e(j,{entity:u,setEntity:c,property:"diesInRounds",minValue:0})}),e("td",{className:r,children:e(P,{entity:u,setEntity:c,property:"dead"})}),e("td",{className:r,children:e(ie,{entity:u,setEntity:c,property:"notes"})}),e("td",{className:r,children:e(te,{setCharacters:l,characterId:s})})]})}function ce({characters:r,currentId:n}){function t(){const o=prompt("Save as","rolemaster-"+new Date().toISOString()+".json");if(!o)return;let i=document.createElement("a");i.download=o,i.href=URL.createObjectURL(new Blob([JSON.stringify({characters:r,currentId:n})],{type:"application/json"})),i.click(),URL.revokeObjectURL(i.href)}return e("div",{className:"text-left inline-block mx-2",children:e("button",{type:"button",className:"inline-block px-2 py-2 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out",onClick:t,children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})})})}function de({setCharacters:r,setCurrentId:n}){const t=N.exports.useRef(null);function o(){t.current.value="",t.current.click()}function i(l){l.stopPropagation(),l.preventDefault();const s=l.target.files[0],d=new FileReader;d.addEventListener("loadend",()=>{try{const{characters:u,currentId:c}=JSON.parse(d.result);if(!(u instanceof Array&&typeof c=="number")){alert("Invalid file format");return}r(h=>{try{return u.map(a=>Object.assign(new B("",0),a)).map(a=>(a.originalIni||(a.originalIni=a.ini),a.nextRoundIni||(a.nextRoundIni=a.ini),a))}catch{return alert("Could not read characters from save file"),h}}),n(()=>c)}catch{alert("File is not valid JSON")}}),d.readAsText(s)}return f("div",{className:"text-left inline-block mx-2",children:[e("input",{type:"file",ref:t,style:{display:"none"},onInput:i}),e("button",{type:"button",className:"inline-block px-2 py-2 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out",onClick:o,children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})})})]})}function ue({characters:r,setCharacters:n,currentId:t,setCurrentId:o}){const i="min-w-full divide-y divide-amber-200 table-auto dark:divide-amber-700 w-full",l="bg-amber-100 dark:bg-amber-700 w-full z-10 sticky top-0 drop-shadow",s="py-1 px-2 text-xs xl:text-sm font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400 h-32 rotate-180 sideways",d="py-1 px-2 text-xs xl:text-sm font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400 h-32 text-center",u="bg-white divide-y divide-amber-200 dark:bg-amber-800 dark:divide-amber-700",c="bottom-0 sticky bg-white/80",h=N.exports.useRef(null),a="py-1 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white px-1 align-middle text-center";function w(){confirm("Alles l\xF6schen?")&&(n([]),o(null))}const b=N.exports.useRef(null),y=N.exports.useRef(null),I=g=>{const k=g.currentTarget.visualViewport.height<300;b.current&&(b.current.hidden=k),y.current&&(y.current.hidden=k)};return window.addEventListener("resize",I,!0),r.sort((g,k)=>k.ini-g.ini),f("table",{className:i,children:[e("thead",{className:l,ref:b,children:f("tr",{children:[e("th",{scope:"col",className:s,children:"Chara"}),e("th",{scope:"col",className:s,children:"Ini"}),e("th",{scope:"col",className:s,children:"Treffer"}),e("th",{scope:"col",className:s,children:"Blutung / Runde"}),e("th",{scope:"col",className:s,children:"Ersch\xF6pfung"}),e("th",{scope:"col",className:s,children:"EP / Runde"}),e("th",{scope:"col",className:s,children:"Boni/Mali"}),e("th",{scope:"col",className:s,children:"Muss mit ___ parieren"}),e("th",{scope:"col",className:s,children:"Runden Keine Parade"}),e("th",{scope:"col",className:s,children:"Runden Benommen"}),e("th",{scope:"col",className:s,children:"Entwaffnet"}),e("th",{scope:"col",className:s,children:"Am\xA0Boden"}),e("th",{scope:"col",className:s,children:"Bewusstlos"}),e("th",{scope:"col",className:s,children:"stirbt in __ Runden"}),e("th",{scope:"col",className:s,children:"tot"}),e("th",{scope:"col",className:s+" w-100",children:"Notizen"}),f("th",{scope:"col",className:d,children:[e(de,{setCharacters:n,setCurrentId:o}),e(ce,{characters:r,currentId:t})]})]})}),e("tbody",{className:u,ref:h,children:r.map((g,k)=>e(ae,{tdClass:a,isCurrent:t==g.id,currentId:t,isEven:k%2==0,characters:r,setCharacters:n,characterId:g.id},g.id))}),e("tfoot",{className:c,ref:y,children:f("tr",{children:[e("td",{className:a,colSpan:14,children:f("div",{className:"text-left",children:[e(ee,{characters:r,setCharacters:n}),e(ne,{characters:r,characterTable:h,setCharacters:n,currentId:t,setCurrentId:o})]})}),e("td",{className:a,children:e("button",{type:"button",className:"inline-block px-7 py-3 bg-red-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",onClick:w,children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 inline-block",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})})]})})]})}function he(){function r(){return JSON.parse(localStorage.getItem("characters")||"[]").map(d=>Object.assign(new B("",0),d))}function n(){return Number.parseInt(localStorage.getItem("currentId")||"")||null}function t(){localStorage.setItem("characters",JSON.stringify(l)),localStorage.setItem("currentId",JSON.stringify(o))}const[o,i]=N.exports.useState(n()),[l,s]=N.exports.useState(r());return N.exports.useEffect(t,[l]),e("div",{className:"App",children:e(ue,{characters:l,setCharacters:s,currentId:o,setCurrentId:i})})}Y.render(e(Z.StrictMode,{children:e(he,{})}),document.getElementById("root"));
