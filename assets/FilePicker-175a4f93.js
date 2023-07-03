import{p as C,o as r,i as P,h as p,T as S,b as F,_ as x,I as b,j as D,l as _,c as T,m as j,f as I,n as B,q as E,t as N,v as U,x as L,a as O,z}from"./index-f59dcc3d.js";import{u as A,g as H,r as J,d as G}from"./firebase_storage-3d3d4e70.js";import"./firebase_database-12542b98.js";import"./firebase_app-08d7da12.js";function M(o){return C(()=>{const s=n=>{n.key==="Escape"&&o.onClose()};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[]),r("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",position:"absolute",top:0,left:0,background:"rgba(0,0,0,0.5)",zIndex:50},onMouseDown:s=>{s.target===s.currentTarget&&(o.onClose(),s.stopPropagation(),s.preventDefault())},children:r("div",{style:{width:"85vw",background:"var(--light)",position:"relative"},children:[r("div",{style:{display:"flex",justifyContent:"center",position:"relative",background:"var(--dark)",color:"var(--light)",padding:"0.5rem"},children:[r("h3",{style:{margin:0,display:"flex",alignItems:"center",gap:"0.5rem"},children:o.title}),r("button",{onClick:()=>o.onClose(),style:{position:"absolute",right:"0.5rem",paddingTop:"0.2rem"},children:r(P,{})})]}),r("div",{style:{height:"85vh",overflowY:"auto"},children:o.children})]})})}function W(o,s,n,i){function a(e){return e instanceof n?e:new n(function(u){u(e)})}return new(n||(n=Promise))(function(e,u){function m(c){try{t(i.next(c))}catch(g){u(g)}}function f(c){try{t(i.throw(c))}catch(g){u(g)}}function t(c){c.done?e(c.value):a(c.value).then(m,f)}t((i=i.apply(o,s||[])).next())})}function $(o,s){var n={label:0,sent:function(){if(e[0]&1)throw e[1];return e[1]},trys:[],ops:[]},i,a,e,u;return u={next:m(0),throw:m(1),return:m(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function m(t){return function(c){return f([t,c])}}function f(t){if(i)throw new TypeError("Generator is already executing.");for(;n;)try{if(i=1,a&&(e=t[0]&2?a.return:t[0]?a.throw||((e=a.return)&&e.call(a),0):a.next)&&!(e=e.call(a,t[1])).done)return e;switch(a=0,e&&(t=[t[0]&2,e.value]),t[0]){case 0:case 1:e=t;break;case 4:return n.label++,{value:t[1],done:!1};case 5:n.label++,a=t[1],t=[0];continue;case 7:t=n.ops.pop(),n.trys.pop();continue;default:if(e=n.trys,!(e=e.length>0&&e[e.length-1])&&(t[0]===6||t[0]===2)){n=0;continue}if(t[0]===3&&(!e||t[1]>e[0]&&t[1]<e[3])){n.label=t[1];break}if(t[0]===6&&n.label<e[1]){n.label=e[1],e=t;break}if(e&&n.label<e[2]){n.label=e[2],n.ops.push(t);break}e[2]&&n.ops.pop(),n.trys.pop();continue}t=s.call(o,n)}catch(c){t=[6,c],a=0}finally{i=e=0}if(t[0]&5)throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}var q=function(){var o=p(),s=o[0],n=o[1],i=p(!1),a=i[0],e=i[1],u=p(),m=u[0],f=u[1],t=S(function(c,g,k){return W(void 0,void 0,void 0,function(){return $(this,function(w){return[2,new Promise(function(h,l){e(!0),n(void 0);var y=A(c,g,k);y.on("state_changed",function(d){f(d)},function(d){e(!1),n(d),h(void 0)},function(){e(!1),f(void 0),h({metadata:y.snapshot.metadata,ref:y.snapshot.ref})})})]})})},[]);return[t,a,m,s]};const V=F({$nest:{"&::file-selector-button":{marginRight:"20px",padding:"0.5rem 1rem",background:"var(--cta)",border:"1px solid var(--cta-border)",color:"white",cursor:"pointer",transition:"background .2s ease-in-out"},"&::file-selector-button:hover":{background:"var(--cta-hover)"}}});function Y(o){const s=H(T),n=x(null),[i,a]=p(),[e,u,m,f]=q();return r("div",{style:{display:"flex",justifyContent:"center"},children:r("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:"1rem",margin:"1rem"},children:[r("div",{children:r("input",{id:"file",type:"file",accept:"image/*",ref:n,onChange:t=>{const c=t.target.files?t.target.files[0]:void 0;a(c)},className:V,disabled:u})}),r(b,{icon:r(D,{}),disabled:u||!i,onClick:async()=>{if(i){const t=J(s,"images/"+i.name);try{await e(t,i,{contentType:i.type}),n.current&&(n.current.value=""),a(void 0)}catch(c){console.error(c)}o.reloadFiles()}},children:"Upload Image"}),u&&r(_,{})]})})}const K=F({width:"10rem",height:"10rem",padding:"0.25rem",marginBottom:"0.5rem",background:"transparent",border:"1px solid",borderRadius:"0.5rem",$nest:{"&:hover":{background:"lightgrey"},"& img":{width:"100%",height:"100%",objectFit:"cover",borderRadius:"0.5rem"}}});function Q(o){const s=x(null),[n,i]=j("images/",o.reloadCounter),[a,e]=I.use(),[u,m]=p(!1);if(!a)return null;const[f,t,c,g,k]=B(a.ref),[w,h]=p([]);return C(()=>{if(!f||!a.multi){h([]);return}try{const l=JSON.parse(f||"");h(l)}catch(l){console.error(l),h([])}},[f]),r("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[r("div",{style:{borderBottom:"1px solid #bbb",width:"80%",margin:"0 0 1rem",textAlign:"center"}}),!i&&n.length>0&&a.multi&&r(b,{icon:r(E,{}),buttonType:"success",onClick:()=>{g(JSON.stringify(w)),e(void 0)},style:{margin:"0.75rem"},disabled:!u||k,children:"Save Selected Images"}),r("div",{ref:s,style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"1rem",padding:"0.75rem"},children:[i&&r("div",{children:"Loading Images..."}),!i&&n.length===0&&r("div",{children:"No Images Have Been Uploaded"}),!i&&n.map(l=>{const y=x(null);return r("div",{style:{display:"flex",flexDirection:"column"},children:[r("button",{className:K,onClick:d=>{a.multi&&y.current?y.current.click():(g(JSON.stringify({url:l.url,itemPath:l.ref.fullPath})),e(void 0))},style:{position:"relative"},title:l.name,children:[a.multi&&r("input",{type:"checkbox",ref:y,onClick:d=>{d.stopPropagation(),m(!0),h(v=>d.target.checked?[...v,{url:l.url,thumbnail:l.thumbnail,itemPath:l.ref.fullPath}]:v.filter(R=>R.url!==l.url))},style:{position:"absolute",top:"0.25rem",right:"0.25rem"},"data-url":l.url,"data-thumbnail":l.thumbnail,"data-item-path":l.ref.fullPath,checked:w.some(d=>d.url===l.url)}),r("img",{src:l.thumbnail,loading:"lazy",onError:d=>setTimeout(()=>{d.target.src="",d.target.src=l.thumbnail},1500)})]}),r("div",{style:{display:"flex",gap:"0.25rem"},children:[r(b,{icon:r(N,{}),onClick:()=>window.open(l.url,"_blank"),style:{width:"100%",padding:"0.25rem"},title:"Download Image"}),r(b,{icon:r(U,{}),buttonType:"destructive",onClick:async()=>{if(confirm("Are you sure you want to delete this image?")){const d=L(l.ref);await Promise.all(d.map(v=>G(v))),o.setReloadCounter(o.reloadCounter+1)}},style:{width:"100%",padding:"0.25rem"},title:"Delete Image"})]})]},l.url)})]})]})}function ne(){const[o,s]=I.use(),[n,i]=p(0);return o?r(M,{title:r(O,{children:["Choose an Image ",r(z,{})]}),onClose:()=>s(void 0),children:[r(Y,{reloadFiles:()=>i(()=>n+1)}),r(Q,{reloadCounter:n,setReloadCounter:i})]}):null}export{ne as FilePicker};
