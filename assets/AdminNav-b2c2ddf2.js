import{u as n,e as i,o as e,a as l,E as r,c as o}from"./index-9d7b616c.js";import{g as s}from"./firebase_auth-e27a9424.js";import"./firebase_app-49f60bc4.js";import"./firebase_database-81e1c6ea.js";function f(){s(o);const{adminMode:t}=n(),[a]=i.use();return e("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",background:"var(--warning)",margin:"0 -1rem -0.75rem",marginTop:"1rem",padding:"0.5rem",color:"var(--dark)",gap:"1rem",width:"calc(100vw - 2rem)"},children:[!1,t&&e(l,{children:[e("h3",{style:{margin:0},children:"[ADMIN MODE]"}),e("a",{href:"/",style:{color:"var(--dark)",fontStyle:"italic"},children:"Exit Admin"}),e("div",{style:{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center"},children:[a===r.None&&"All Changes Saved",a===r.Saving&&"Saving Changes...",a===r.Error&&"Error Saving Changes",!1]})]})]})}export{f as AdminNav};