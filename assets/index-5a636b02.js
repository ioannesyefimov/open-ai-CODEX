(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const T="modulepreload",O=function(e){return"/"+e},w={},p=function(t,n,s){if(!n||n.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=O(i),i in w)return;w[i]=!0;const a=i.endsWith(".css"),g=a?'[rel="stylesheet"]':"";if(!!s)for(let d=r.length-1;d>=0;d--){const m=r[d];if(m.href===i&&(!a||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${g}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":T,a||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),a)return new Promise((d,m)=>{l.addEventListener("load",d),l.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},k="/assets/bot-61bdb6bf.svg",L="/assets/user-bcdeb18e.svg";function o(e){if(typeof e=="object"&&e!==null)return e;{let t=e[0];["*",".","#"].includes(t)||(t="");let n=e.toString().replace(t,"");switch(t){case"#":return document.getElementById(n);case".":return document.getElementsByClassName(n);case"*":return document.getElementsByName(n);case"":return document.getElementsByTagName(e);default:return document.querySelector(e)}}}window.$query=o;const D=e=>{let t=e;return[()=>t,r=>t=r]};window.useState=D;const h=o("#bot-form"),f=o("#chat_container"),N=o("#app");let S;function C(e){e.textContent="",S=setInterval(()=>{e.textContent+=".",e.textContent==="...."&&(e.textContent="")},300)}function P(e,t){let n=0,s=setInterval(()=>{n<t.length?(e.innerHTML+=t.charAt(n),n++):clearInterval(s)},20)}function $(){const e=Date.now(),n=Math.random().toString(16);return`id-${e}-${n}`}function I(e,t,n){return`
      <div class="wrapper ${e&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${e?k:L}" alt="${e?k:L}" />
          </div>
          <div class="message" id="${n}">${t}</div>
        </div>
      </div>
    `}const E=async e=>{e.preventDefault();const t=new FormData(h);f.innerHTML+=I(!1,t.get("prompt")),h.reset();const n=$();f.innerHTML+=I(!0," ",n),f.scrollTop=f.scrollHeight;const s=document.getElementById(n);C(s);const r=await fetch("https://c0dinex.onrender.com/api/v1/codex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:t.get("prompt")})});if(clearInterval(S),s.innerHTML="",r.ok){const i=JSON.parse(localStorage.getItem("user")),g=(await r.json()).bot.trim();i&&t.get("prompt")!==null&&await fetch("https://c0dinex.onrender.com/api/v1/post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i.email,messageId:n,message:g,prompt:t.get("prompt")})}),P(s,g)}else{const i=await r.text();s.innerHTML="Something went wrong",alert(i)}};h.addEventListener("submit",E);h.addEventListener("keyup",e=>{e.keyCode===13&&E(e)});const x=e=>{let t=document.createElement("div");switch(t.classList.add("alert-div"),t.setAttribute("id","alert-div"),t.innerHTML=`

    <h2>It seems you aren't logged in😥</h2>
    <span>You are missing on saving your questions so that you can look back at them later</span>
    <p>Want to get your questions saved?</p>
    <div class="wrapper">
      <a onclick="" href="/register" id="register-btn" class=" nav-btn link-tag login-btn">Register</a> 
      <a onclick="" href="/signin" id="signin-btn" class="nav-btn link-tag login-btn">Sign In</a>
    </div>
    <button class="back-btn" id="hide-btn">No, thanks</button>

  `,e){case"append":{o("body")[0].appendChild(t),o("#hide-btn").addEventListener("click",()=>{o("body")[0].removeChild(t),localStorage.setItem("DND","true"),c(y,u)});return}case"remove":{o("body")[0].removeChild(t);return}}},_=e=>{e=e||window.event,e.preventDefault(),window.history.pushState({},"",e.target.href),b()},v={404:"404","/":["./index"],"/register":["register"],"/signin":["signIn"],"/profile":["profile"]},b=async()=>{const e=localStorage.getItem("user"),t=window.location.pathname,n=v[t]||v[404];if(!e&&t=="/"&&!localStorage.getItem("DND")&&setTimeout(()=>{x("append"),c("",u)},1e4),t=="/")return;!e&&t=="/profile"?history.back():(e&&t=="/signin"||t=="/register")&&window.history.back();const s=await fetch(`./pages/${n}.html`).then(r=>r.text());t!=="/"&&n!==v[404]&&await M(`./pages/${n}.js`),N.innerHTML=s,localStorage.removeItem("DND")};window.onpopstate=b;window.route=_;b();const c=(e,t)=>{if(t){if(!t&&!e)return location.reload();t.innerHTML=e}};window.render=c;const R=`

  <li class="nav-link" id="loggedIn" >
    <a onclick="" href="/" id="signout-btn"  class="nav-btn link-tag">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a onclick="" href="/profile" id="profile-btn" class="nav-btn link-tag">
    </a> 
  </li>
 

`,y=`
   <li  class="nav-link" id="loggedOut">
      <a onclick="" href="/register"  class="link-tag">Register</a> 
      </li>
    <li class='nav-link' id="loggedOut">
      <a onclick="" href="/signin"  class="link-tag">Sign In</a>
    </li>
`,u=o("#navbar"),q=()=>{localStorage.getItem("user")&&(localStorage.removeItem("user"),c(y,u))};window.addEventListener("load",async()=>{let e=await JSON.parse(localStorage.getItem("user"));if(e!=null&&e.name){c(R,u),o("#signout-btn").addEventListener("click",q);const t=o(".nav-link");for(let n of t)n.addEventListener("click",s=>{_(s)})}else e||c(y,u)});function M(e){switch(e){case"./pages/404":case"./pages/404.js":return p(()=>import("./404-9abfa30c.js"),[]);case"./pages/profile":case"./pages/profile.js":return p(()=>import("./profile-eb4e7039.js"),[]);case"./pages/register":case"./pages/register.js":return p(()=>import("./register-74f507b1.js"),[]);case"./pages/signIn":case"./pages/signIn.js":return p(()=>import("./signIn-d88be56f.js"),[]);default:return new Promise(function(t,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})}}
