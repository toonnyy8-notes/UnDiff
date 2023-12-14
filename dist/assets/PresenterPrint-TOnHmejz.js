import{d as _,u as d,a as p,c as m,b as h,r as u,e as a,f as t,t as s,g as r,F as f,h as g,n as v,i as y,o as n,j as x,k as b,l as N,m as k,_ as P}from"./index-sYa7yAVM.js";import{N as w}from"./NoteDisplay-IfhA5GXp.js";const V={class:"m-4"},D={class:"mb-10"},L={class:"text-4xl font-bold mt-2"},S={class:"opacity-50"},T={class:"text-lg"},j={class:"font-bold flex gap-2"},B={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),z={key:0,class:"border-gray-400/50 mb-8"},C=_({__name:"PresenterPrint",setup(F){d(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),p({title:`Notes - ${m.title}`});const i=h(()=>u.map(o=>{var l;return(l=o.meta)==null?void 0:l.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,l)=>(n(),a("div",{id:"page-root",style:v(r(y))},[t("div",V,[t("div",D,[t("h1",L,s(r(m).title),1),t("div",S,s(new Date().toLocaleString()),1)]),(n(!0),a(f,null,g(i.value,(e,c)=>(n(),a("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",T,[t("div",j,[t("div",B,s(e==null?void 0:e.no)+"/"+s(r(x)),1),b(" "+s(e==null?void 0:e.title)+" ",1),H])]),N(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<i.value.length-1?(n(),a("hr",z)):k("v-if",!0)]))),128))])],4))}}),E=P(C,[["__file","/home/toonnyy8/projects/toonnyy8_notes/UnDiff/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
