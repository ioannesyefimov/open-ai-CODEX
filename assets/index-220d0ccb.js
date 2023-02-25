(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const T="modulepreload",O=function(e){return"/"+e},_={},c=function(t,n,s){if(!n||n.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=O(r),r in _)return;_[r]=!0;const a=r.endsWith(".css"),m=a?'[rel="stylesheet"]':"";if(!!s)for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.href===r&&(!a||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${m}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":T,a||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),a)return new Promise((d,p)=>{l.addEventListener("load",d),l.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t())},w="/assets/bot-61bdb6bf.svg",I="/assets/user-bcdeb18e.svg";function o(e){if(typeof e=="object"&&e!==null)return e;{let t=e[0];["*",".","#"].includes(t)||(t="");let n=e.toString().replace(t,"");switch(t){case"#":return document.getElementById(n);case".":return document.getElementsByClassName(n);case"*":return document.getElementsByName(n);case"":return document.getElementsByTagName(e);default:return document.querySelector(e)}}}window.$query=o;const D=e=>{let t=e;return[()=>t,i=>t=i]};window.useState=D;const v=o("#bot-form"),f=o("#chat_container"),N=o("#app");let E;function P(e){e.textContent="",E=setInterval(()=>{e.textContent+=".",e.textContent==="...."&&(e.textContent="")},300)}function C(e,t){let n=0,s=setInterval(()=>{n<t.length?(e.innerHTML+=t.charAt(n),n++):clearInterval(s)},20)}function R(){const e=Date.now(),n=Math.random().toString(16);return`id-${e}-${n}`}function L(e,t,n){return`
      <div class="wrapper ${e&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${e?w:I}" alt="${e?w:I}" />
          </div>
          <div class="message" id="${n}">${t}</div>
        </div>
      </div>
    `}const S=async e=>{e.preventDefault();const t=new FormData(v);f.innerHTML+=L(!1,t.get("prompt")),v.reset();const n=R();f.innerHTML+=L(!0," ",n),f.scrollTop=f.scrollHeight;const s=document.getElementById(n);P(s);const i=await fetch("https://c0dinex.onrender.com/api/v1/codex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:t.get("prompt")})});if(clearInterval(E),s.innerHTML="",i.ok){const r=JSON.parse(localStorage.getItem("user")),m=(await i.json()).bot.trim();r&&t.get("prompt")!==null&&await fetch("https://c0dinex.onrender.com/api/v1/post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r.email,messageId:n,message:m,prompt:t.get("prompt")})}),C(s,m)}else{const r=await i.text();s.innerHTML="Something went wrong",alert(r)}};v.addEventListener("submit",S);v.addEventListener("keyup",e=>{e.keyCode===13&&S(e)});const $=e=>{let t=document.createElement("div");switch(t.classList.add("alert-div"),t.setAttribute("id","alert-div"),t.innerHTML=`

    <h2>It seems you aren't logged in😥</h2>
    <span>You are missing on saving your questions so that you can look back at them later</span>
    <p>Want to get your questions saved?</p>
    <div class="wrapper">
      <a href="/register" id="register-btn" class=" nav-btn link-tag login-btn">Register</a> 
      <a href="/signin" id="signin-btn" class="nav-btn link-tag login-btn">Sign In</a>
    </div>
    <button class="back-btn" id="hide-btn">No, thanks</button>

  `,e){case"append":{o("body")[0].appendChild(t),o("#hide-btn").addEventListener("click",()=>{o("body")[0].removeChild(t),localStorage.setItem("DND","true"),u(y,g)});return}case"remove":{o("body")[0].removeChild(t);return}}},k=e=>{e=e||window.event,e.preventDefault(),window.history.pushState({},"",e.target.href),b()},h={404:"404","/":["./index"],"/register":["register"],"/signin":["signIn"],"/profile":["profile"]},b=async()=>{const e=localStorage.getItem("user"),t=window.location.pathname,n=h[t]||h[404];if(console.log(t),!e&&t=="/"&&!localStorage.getItem("DND")&&setTimeout(()=>{$("append"),u("",g)},1e4),t=="/")return console.log("main");!e&&t=="/profile"?history.back():(e&&t=="/signin"||t=="/register")&&window.history.back();const s=await V(`./pages/${n}.html`);t!=="/"&&n!==h[404]&&await x(`./pages/${n}.js`),N.innerHTML=s.default,localStorage.removeItem("DND")};window.onpopstate=b;window.route=k;b();const u=(e,t)=>{if(t){if(!t&&!e)return location.reload();t.innerHTML=e}};window.render=u;const q=`

  <li class="nav-link" id="loggedIn" >
    <a href="/" id="signout-btn"  class="nav-btn link-tag">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a href="/profile" id="profile-btn" class="nav-btn link-tag">
    </a> 
  </li>
 

`,y=`
   <li  class="nav-link" id="loggedOut">
      <a href="/register"  class="link-tag">Register</a> 
      </li>
    <li class='nav-link' id="loggedOut">
      <a href="/signin"  class="link-tag">Sign In</a>
    </li>
`,g=o("#navbar"),M=()=>{localStorage.getItem("user")&&(localStorage.removeItem("user"),u(y,g))};window.addEventListener("load",async()=>{let e=await JSON.parse(localStorage.getItem("user"));if(e!=null&&e.name){u(q,g),o("#signout-btn").addEventListener("click",M);const t=o(".nav-link");for(let n of t)n.addEventListener("click",s=>{k(s)})}else e||u(y,g)});function V(e){switch(e){case"./pages/404":case"./pages/404.html":return c(()=>import("./404-4ed993c7.js"),[]);case"./pages/profile":case"./pages/profile.html":return c(()=>import("./profile-4ed993c7.js"),[]);case"./pages/register":case"./pages/register.html":return c(()=>import("./register-4ed993c7.js"),[]);case"./pages/signIn":case"./pages/signIn.html":return c(()=>import("./signIn-4ed993c7.js"),[]);default:return new Promise(function(t,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})}}function x(e){switch(e){case"./pages/profile":case"./pages/profile.js":return c(()=>import("./profile-3d02b00f.js"),[]);case"./pages/register":case"./pages/register.js":return c(()=>import("./register-74f507b1.js"),[]);case"./pages/signIn":case"./pages/signIn.js":return c(()=>import("./signIn-d88be56f.js"),[]);default:return new Promise(function(t,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})}}
