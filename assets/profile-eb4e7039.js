const[c,d]=useState(null),u=`
  <li class="nav-link" id="loggedIn" >
    <a href="#" onclick=(onNavClick('/'); return false) id="signout-btn"  class="nav-btn link-tag">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a href="#" onclick=(onNavClick('/'); return false) id="back-btn" class="nav-btn link-tag">Back</a> 
  </li>

`,g=e=>($query("#searchMessage").addEventListener("change",m),`
    <h3>Hello <span id="name">${e.name}!</span> </h3>
    <p>Email: <span id="email">${e.email}</span></p>
    `),m=e=>{if(e.target.value){const a=c().filter(s=>s.message.toLowerCase().includes(e.target.value.toLowerCase())||s.messageId.toLowerCase().includes(e.target.value.toLowerCase())||s.prompt.toLowerCase().includes(e.target.value.toLowerCase()));render(l(a))}else e.target.value||r()},l=e=>{if($query("#messages-container").innerHTML="",e.length>1)e.map((a,s)=>{const t=document.createElement("div");t.classList.add("message-container"),t.innerHTML=`
      <p class='prompt'>${a.prompt}</p>
      <p class="message " visible="false" >${a.message}</p>
      <div class="id-wrapper">
      <label for="messageId" class='messageId-label'>ID of message</label>
      <p id="messageId" class="messageId " visible="false">${a.messageId}</p>
      </div>
     `,$query("#messages-container").appendChild(t),$query(".message")[s].addEventListener("click",n=>{n.target.toggleAttribute("visible")}),$query(".message-container")[s].addEventListener("click",n=>{let o=$query(".message-container");for(let i of o)i.hasAttribute("unvisible")?(i.removeAttribute("unvisible"),$query(".message")[s].setAttribute("visible","false"),$query(".messageId")[s].setAttribute("visible","false")):i!==n.currentTarget&&(i.setAttribute("unvisible","true"),$query(".message")[s].setAttribute("visible","true"),$query(".messageId")[s].setAttribute("visible","true"))})});else if(e.length==1){const a=document.createElement("div"),s=document.createElement("button");s.classList.add("back-btn"),s.innerHTML="Back",s.addEventListener("click",()=>{$query("#searchMessage").value="",r()}),a.classList.add("message-container"),a.innerHTML=`
      <p class='prompt'>${e[0].prompt}</p>
      <p class="message " visible="false">${e[0].message}</p>
      <div class="id-wrapper">
      <label for="messageId" class='messageId-label'>ID of message</label>
      <p id="messageId" class="messageId " visible="false">${e[0].messageId}</p>
      </div>
    `,$query("#messages-container").append(a),a.addEventListener("click",t=>{a.append(s);for(const n of t.currentTarget.children)n.getAttribute("visible")=="false"?n.setAttribute("visible","true"):n.setAttribute("visible","false")})}else{const a=document.createElement("div");a.classList.add("message-container"),a.innerHTML=`
      <h1  class="notfound">There isn't such a question...</h1>
    `,$query("#messages-container").append(a)}};async function r(){const e=JSON.parse(localStorage.getItem("user"));if(e){const a=setInterval(()=>{render(g(e),document.querySelector("#credentials"))},20),s=await fetch(`https://c0dinex.onrender.com/api/v1/post/profile/messages/${e.email}`);if(s.ok){const t=await s.json();d(t.data),render(l(t.data))}else s.statusText=="Not Found"&&(console.log("NOT FOUND"),render(`<div class="message-container"><p>You didn't send any messages. Try it out!</p></div>`,$query("#messages-container")));clearInterval(a)}}window.location.pathname==="/profile"&&r();render(u,document.querySelector("#navbar"));
