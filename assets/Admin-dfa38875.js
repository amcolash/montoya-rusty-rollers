import{o as A,G as S,g as x,s as M}from"./firebase_auth-43c6f5e5.js";import"./firebase_app-66b96a84.js";import{b as L,s as N}from"./firebase_database-5a5f9de6.js";import{p as v,s as C,T as h,F as k,a as y,o as l,c as j,b as I,d as D,h as G,f as z,e as m,g as T,U as P,i as O,W as U,j as Z}from"./index-247dde23.js";import"./preact-8b6c8b24.js";function W(t,o,r,a){function i(e){return e instanceof r?e:new r(function(u){u(e)})}return new(r||(r=Promise))(function(e,u){function d(s){try{n(a.next(s))}catch(g){u(g)}}function c(s){try{n(a.throw(s))}catch(g){u(g)}}function n(s){s.done?e(s.value):i(s.value).then(d,c)}n((a=a.apply(t,o||[])).next())})}function B(t,o){var r={label:0,sent:function(){if(e[0]&1)throw e[1];return e[1]},trys:[],ops:[]},a,i,e,u;return u={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function d(n){return function(s){return c([n,s])}}function c(n){if(a)throw new TypeError("Generator is already executing.");for(;r;)try{if(a=1,i&&(e=n[0]&2?i.return:n[0]?i.throw||((e=i.return)&&e.call(i),0):i.next)&&!(e=e.call(i,n[1])).done)return e;switch(i=0,e&&(n=[n[0]&2,e.value]),n[0]){case 0:case 1:e=n;break;case 4:return r.label++,{value:n[1],done:!1};case 5:r.label++,i=n[1],n=[0];continue;case 7:n=r.ops.pop(),r.trys.pop();continue;default:if(e=r.trys,!(e=e.length>0&&e[e.length-1])&&(n[0]===6||n[0]===2)){r=0;continue}if(n[0]===3&&(!e||n[1]>e[0]&&n[1]<e[3])){r.label=n[1];break}if(n[0]===6&&r.label<e[1]){r.label=e[1],e=n;break}if(e&&r.label<e[2]){r.label=e[2],r.ops.push(n);break}e[2]&&r.ops.pop(),r.trys.pop();continue}n=o.call(t,r)}catch(s){n=[6,s],i=0}finally{a=e=0}if(n[0]&5)throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}}var f=function(){return f=Object.assign||function(o){for(var r,a=1,i=arguments.length;a<i;a++){r=arguments[a];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(o[e]=r[e])}return o},f.apply(this,arguments)},p=function(t){return{loading:t==null,value:t}},E=function(){return function(t,o){switch(o.type){case"error":return f(f({},t),{error:o.error,loading:!1,value:void 0});case"reset":return p(o.defaultValue);case"value":return f(f({},t),{error:void 0,loading:!1,value:o.value});default:return t}}},R=function(t){var o=t?t():void 0,r=C(E(),p(o)),a=r[0],i=r[1],e=h(function(){var c=t?t():void 0;i({type:"reset",defaultValue:c})},[t]),u=h(function(c){i({type:"error",error:c})},[]),d=h(function(c){i({type:"value",value:c})},[]);return k(function(){return{error:a.error,loading:a.loading,reset:e,setError:u,setValue:d,value:a.value}},[a.error,a.loading,e,u,d,a.value])},w=function(t,o){var r=R(function(){return t.currentUser}),a=r.error,i=r.loading,e=r.setError,u=r.setValue,d=r.value;return v(function(){var c=A(t,function(n){return W(void 0,void 0,void 0,function(){var s;return B(this,function(g){switch(g.label){case 0:if(!(o!=null&&o.onUserChanged))return[3,4];g.label=1;case 1:return g.trys.push([1,3,,4]),[4,o.onUserChanged(n)];case 2:return g.sent(),[3,4];case 3:return s=g.sent(),e(s),[3,4];case 4:return u(n),[2]}})})},e);return function(){c()}},[t]),[d,i,a]};const J=y({transition:"background-color .3s, box-shadow .3s",padding:"12px 16px 12px 42px",border:"none",borderRadius:"3px",boxShadow:"0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",color:"var(--dark)",fontSize:"16px",fontWeight:"500",fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif',backgroundImage:"url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",backgroundColor:"white",backgroundRepeat:"no-repeat",backgroundPosition:"12px 11px",$nest:{"&:hover":{boxShadow:"0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)"},"&:active":{backgroundColor:"#eeeeee"},"&:focus":{outline:"none",boxShadow:"0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25), 0 0 0 3px #c8dafc"},"&:disabled":{filter:"grayscale(100%)",backgroundColor:"#ebebeb",boxShadow:"0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",cursor:"not-allowed"}}});function F(t){return l("button",{className:j(J,t.className),...t,children:t.children||"Sign in with Google"})}const V=new S,b=y({display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100dvh",width:"calc(100vw - 2rem)",margin:"auto",textAlign:"center"});function Y(t){const o=x(I),[r,a,i]=w(o),[e,u]=D.use();return v(()=>{setTimeout(()=>{},250)},[r,e]),a?l("div",{className:b,children:"Loading..."}):i?l("div",{className:b,children:["An error occurred: ",i.message]}):r?null:l("div",{className:b,children:[l("h2",{children:"To access this page, you need to login"}),t.invalidUser&&l("h3",{style:{color:"red"},children:"You are not authorized to access this page"}),l(F,{onClick:()=>M(o,V),style:{width:"fit-content"}}),l("a",{href:"/",style:{marginTop:"4rem"},children:"Return to Website"})]})}function $(){const t=x(I),[o,r]=G(!1),[a,i,e]=w(t),[u,d]=z.use();return v(()=>{if(a){const c=L(Z,"content/admin-test");N(c,"test").then(()=>{localStorage.setItem(m,"true")}).catch(n=>{console.error("invalid user",n),localStorage.removeItem(m),t.signOut(),r(!0)})}},[a]),!i&&(!a||e)?l(Y,{invalidUser:o}):l("div",{children:[u&&l(T,{children:l(P,{children:l(O,{})})}),l(U,{})]})}export{$ as Admin};
