import{g as o}from"./firebase_auth-f63cb495.js";import"./firebase_app-23be643a.js";import{u as d,e as l,p as s,E as n,o as t,a as c}from"./index-e1481d9e.js";import"./firebase_database-4955b4c5.js";import"./firebase_storage-4f68f3a5.js";function u(){o(c);const{adminMode:a}=d(),[e]=l.use();return s(()=>{const r=i=>{i.preventDefault(),i.returnValue=""};return e!==n.None?window.addEventListener("beforeunload",r):window.removeEventListener("beforeunload",r),()=>window.removeEventListener("beforeunload",r)},[e]),t("div",{style:{width:"100%",background:"var(--warning)",color:"var(--dark)",display:"flex",justifyContent:"center"},children:a&&t("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",maxWidth:"var(--max-width)",padding:"0.5rem",gap:"1rem",boxSizing:"border-box"},children:[t("h3",{style:{margin:0},children:"[ADMIN MODE]"}),t("div",{style:{flex:1,textAlign:"center"},children:[e===n.None&&"All Changes Saved",e===n.Saving&&"Saving Changes...",e===n.Error&&"Error Saving Changes"]}),t("a",{href:"/",style:{color:"var(--dark)",fontStyle:"italic"},children:"Exit Admin"}),!1]})})}export{u as AdminNav};
