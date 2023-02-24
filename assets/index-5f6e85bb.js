(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const O="modulepreload",k=function(e){return"/"+e},w={},c=function(t,n,o){if(!n||n.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=k(i),i in w)return;w[i]=!0;const s=i.endsWith(".css"),m=s?'[rel="stylesheet"]':"";if(!!o)for(let u=r.length-1;u>=0;u--){const p=r[u];if(p.href===i&&(!s||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${m}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":O,s||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),s)return new Promise((u,p)=>{l.addEventListener("load",u),l.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},I=(e,t)=>{const n=e[t];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((o,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+t)))})},L="/assets/bot-61bdb6bf.svg",b="/assets/user-bcdeb18e.svg";function a(e){if(typeof e=="object"&&e!==null)return e;{let t=e[0];["*",".","#"].includes(t)||(t="");let n=e.toString().replace(t,"");switch(t){case"#":return document.getElementById(n);case".":return document.getElementsByClassName(n);case"*":return document.getElementsByName(n);case"":return document.getElementsByTagName(e);default:return document.querySelector(e)}}}window.$query=a;const D=e=>{let t=e;return[()=>t,r=>t=r]};window.useState=D;const h=a("#bot-form"),f=a("#chat_container"),N=a("#app");let E;function P(e){e.textContent="",E=setInterval(()=>{e.textContent+=".",e.textContent==="...."&&(e.textContent="")},300)}function C(e,t){let n=0,o=setInterval(()=>{n<t.length?(e.innerHTML+=t.charAt(n),n++):clearInterval(o)},20)}function R(){const e=Date.now(),n=Math.random().toString(16);return`id-${e}-${n}`}function S(e,t,n){return`
      <div class="wrapper ${e&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${e?L:b}" alt="${e?L:b}" />
          </div>
          <div class="message" id="${n}">${t}</div>
        </div>
      </div>
    `}const T=async e=>{e.preventDefault();const t=new FormData(h);f.innerHTML+=S(!1,t.get("prompt")),h.reset();const n=R();f.innerHTML+=S(!0," ",n),f.scrollTop=f.scrollHeight;const o=document.getElementById(n);P(o);const r=await fetch("https://c0dinex.onrender.com/api/v1/codex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:t.get("prompt")})});if(clearInterval(E),o.innerHTML="",r.ok){const i=JSON.parse(localStorage.getItem("user")),m=(await r.json()).bot.trim();i&&t.get("prompt")!==null&&await fetch("https://c0dinex.onrender.com/api/v1/post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i.email,messageId:n,message:m,prompt:t.get("prompt")})}),C(o,m)}else{const i=await r.text();o.innerHTML="Something went wrong",alert(i)}};h.addEventListener("submit",T);h.addEventListener("keyup",e=>{e.keyCode===13&&T(e)});const $=e=>{let t=document.createElement("div");switch(t.classList.add("alert-div"),t.setAttribute("id","alert-div"),t.innerHTML=`

    <h2>It seems you aren't logged in😥</h2>
    <span>You are missing on saving your questions so that you can look back at them later</span>
    <p>Want to get your questions saved?</p>
    <div class="wrapper">
      <a href="/register" id="register-btn" class=" nav-btn link-tag login-btn">Register</a> 
      <a href="/signin" id="signin-btn" class="nav-btn link-tag login-btn">Sign In</a>
    </div>
    <button class="back-btn" id="hide-btn">No, thanks</button>

  `,e){case"append":{a("body")[0].appendChild(t),a("#hide-btn").addEventListener("click",()=>{a("body")[0].removeChild(t),localStorage.setItem("DND","true"),d(_,g)});return}case"remove":{a("body")[0].removeChild(t);return}}},x=e=>{e=e||window.event,e.preventDefault(),window.history.pushState({},"",e.target.href),y()},v={404:"./pages/404.html","/":["./index.html"],"/register":["register.","register"],"/signin":["signIn","signIn"],"/profile":["profile","profile"]},y=async()=>{const e=localStorage.getItem("user"),t=window.location.pathname,n=v[t][0]||v[404];!e&&t=="/"&&!localStorage.getItem("DND")&&setTimeout(()=>{$("append"),d("",g)},1e4),!e&&n.includes("profile")&&history.back();const o=await I(Object.assign({"./pages/404.html":()=>c(()=>import("./404-4ed993c7.js"),[]),"./pages/profile.html":()=>c(()=>import("./profile-4ed993c7.js"),[]),"./pages/register.html":()=>c(()=>import("./register-4ed993c7.js"),[]),"./pages/signIn.html":()=>c(()=>import("./signIn-4ed993c7.js"),[])}),`./pages/${n}.html`);if(t!=="/"&&await I(Object.assign({"./pages/profile.js":()=>c(()=>import("./profile-10e032b2.js"),[]),"./pages/register.js":()=>c(()=>import("./register-74f507b1.js"),[]),"./pages/signIn.js":()=>c(()=>import("./signIn-f066907f.js"),[])}),`./pages/${v[t][1]}.js`),n=="./index.html")return console.log("main");N.innerHTML=o.default,localStorage.removeItem("DND")};window.onpopstate=y;window.route=x;y();const d=(e,t)=>{if(t){if(!t&&!e)return location.reload();t.innerHTML=e}};window.render=d;const V=`

  <li class="nav-link" id="loggedIn" >
    <a href="/" id="signout-btn"  class="nav-btn">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a href="/profile" id="profile-btn" class="nav-btn"><img id="profile-img" src="${b}" alt="profile image" /></a> 
  </li>
 

`,_=`
   <li  class="nav-link" id="loggedOut">
      <a href="/register" class="link-tag">Register</a> 
      </li>
    <li class='nav-link' id="loggedOut">
      <a href="/signin" class="link-tag">Sign In</a>
    </li>
`,g=a("#navbar"),q=()=>{localStorage.getItem("user")&&(localStorage.removeItem("user"),d(_,g))};window.addEventListener("load",async()=>{let e=await JSON.parse(localStorage.getItem("user"));e!=null&&e.name?(d(V,g),a("#signout-btn").addEventListener("click",q)):e||d(_,g)});
