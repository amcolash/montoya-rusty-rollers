import{g as o}from"./firebase_auth-8b11931c.js";import"./firebase_app-5c6bc232.js";import{g as d,i as l,p as s,E as n,o as t}from"./index-c90a8d39.js";import{a as m}from"./firebase-7334874f.js";import"./firebase_database-d5d358c6.js";function u(){o(m);const{adminMode:a}=d(),[e]=l.use();return s(()=>{const r=i=>{i.preventDefault(),i.returnValue=""};return e!==n.None?window.addEventListener("beforeunload",r):window.removeEventListener("beforeunload",r),()=>window.removeEventListener("beforeunload",r)},[e]),t("div",{style:{width:"100%",background:"var(--warning)",color:"var(--dark)",display:"flex",justifyContent:"center"},children:a&&t("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",maxWidth:"var(--max-width)",padding:"0.5rem",gap:"1rem",boxSizing:"border-box"},children:[t("h3",{style:{margin:0},children:"[ADMIN MODE]"}),t("div",{style:{flex:1,textAlign:"center"},children:[e===n.None&&"All Changes Saved",e===n.Saving&&"Saving Changes...",e===n.Error&&"Error Saving Changes"]}),t("a",{href:"/",style:{color:"var(--dark)",fontStyle:"italic"},children:"Exit Admin"}),!1]})})}export{u as AdminNav};
