// function to select element 
function $query(selector) {
  if (typeof selector === 'object' && selector !== null) {
    return selector;
  } else {
    let choice = selector[0]; // # or . etc
    if (!['*', '.', '#'].includes(choice)) {
      choice = '';
    }
    let selectorName = selector.toString().replace(choice, '');
    switch (choice) {
      case '#':
        return document.getElementById(selectorName);

      case '.':
        return document.getElementsByClassName(selectorName);
      case '*':
        return document.getElementsByName(selectorName);
      case '':
        return document.getElementsByTagName(selector);
      default:
        return document.querySelector(selector);
    }
  }
}
window.$query = $query

const useState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value
  const setValue = newValue => value = newValue
  return [getValue, setValue];
}

window.useState = useState



import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = $query('#bot-form');
const chatContainer = $query('#chat_container')

const appContainer = $query('#app')

let loadInterval; 



function loader(element){
  element.textContent = ''

  loadInterval = setInterval(()=> {
      element.textContent += '.';

      if(element.textContent === '....'){
        element.textContent = '';
      }
  }, 300)
}

function typeText(element, text){
  let index = 0;
  
  let interval = setInterval(()=>{
    if(index < text.length ){
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)

}

function generateUniqueId(){
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`
}

function chatStripe (isAi, value, uniqueId){
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img src="${isAi ? bot : user}" alt="${isAi ? bot : user}" />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async (e)=>{
  e.preventDefault()
  
  const Formdata= new FormData(form);

  // user's chatstripe

  chatContainer.innerHTML += chatStripe(false, Formdata.get('prompt'));
  form.reset()

  const uniqueId = generateUniqueId()

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueId);
 

  loader(messageDiv)

  // fetch data from server -> bot's response

  const response = await fetch('https://c0dinex.onrender.com/api/v1/codex',{
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: Formdata.get('prompt')
    })
  })

  clearInterval(loadInterval)

  messageDiv.innerHTML = '';

  if(response.ok){
  const isLogged = JSON.parse(localStorage.getItem('user'))

    const data = await response.json()
    const parsedData = data.bot.trim();

    // save message to db if user is logged in
    if(isLogged && Formdata.get('prompt') !== null){
        const MessageResponse = await fetch('https://c0dinex.onrender.com/api/v1/post', {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: isLogged.email,
            messageId: uniqueId,
            message: parsedData,
            prompt: Formdata.get('prompt'),
          })
        })
    }

    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = `Something went wrong`

    alert(err)
  }

}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    handleSubmit(e)
  }
})

// ROUTING

const alertDivTemplate = (ACTION)=>{
  let ALERT_DIV = document.createElement('div')
  ALERT_DIV.classList.add('alert-div')
  ALERT_DIV.setAttribute('id', 'alert-div')
  ALERT_DIV.innerHTML =  `

    <h2>It seems you aren't logged in😥</h2>
    <span>You are missing on saving your questions so that you can look back at them later</span>
    <p>Want to get your questions saved?</p>
    <div class="wrapper">
      <a href="/register" id="register-btn" class=" nav-btn link-tag login-btn">Register</a> 
      <a href="/signin" id="signin-btn" class="nav-btn link-tag login-btn">Sign In</a>
    </div>
    <button class="back-btn" id="hide-btn">No, thanks</button>

  ` 
  switch(ACTION){
    case 'append':  {
      $query('body')[0].appendChild(ALERT_DIV)
      $query('#hide-btn').addEventListener('click', ()=>{
        $query('body')[0].removeChild(ALERT_DIV)
        localStorage.setItem('DND', 'true')
        render(navbarTemplateLoggedOut, navbar)
      })
      return
    }
    case 'remove':{
      $query('body')[0].removeChild(ALERT_DIV)

    return
    }
  }

 
}

const route = (event) => {
  event = event || window.event
  event.preventDefault();

  window.history.pushState({},"", event.target.href)
  handleLocation();
}

const routes = {
  404: './pages/404.html',
  "/": ["./index.html"],
  '/register': ["./pages/register.html", 'register'],
  "/signin": ["./pages/signIn.html", "signIn"],
  "/profile": ["./pages/profile.html", 'profile']
}
const handleLocation = async () => {
  const isLogged = localStorage.getItem('user')
  const path = window.location.pathname;
  const route = routes[path][0] || routes[404];
  // append alert div if user is logged out and didn't set DND previously, and remove if they aren't
  if(!isLogged && path == '/' && !localStorage.getItem('DND') ){
    setTimeout (()=>{
      alertDivTemplate('append')
      render('', navbar)
    },10000)
   
  } 
  if(!isLogged &&  route.includes('profile')) {
    history.back()
  }
  const html = await fetch(route).then(data=> data.text())
  if(path !== '/'){
    const JS = await import(`./pages/${routes[path][1]}.js`)
  }
  if(route == './index.html') return console.log('main')
  appContainer.innerHTML = html;
  localStorage.removeItem('DND')

};



window.onpopstate = handleLocation;
window.route = route;

handleLocation();

// NAVIGATION 
const render = (template, node) =>{
  if(!node) return;
  if(!node && !template) return location.reload()
  // if func isn't null add listener
    

  node.innerHTML = template
}

window.render = render


const navbarTemplateSignIn = 
 `

  <li class="nav-link" id="loggedIn" >
    <a href="/" id="signout-btn"  class="nav-btn">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a href="/profile" id="profile-btn" class="nav-btn"><img id="profile-img" src="${user}" alt="profile image" /></a> 
  </li>
 

`
 
const navbarTemplateLoggedOut = 
    `
   <li  class="nav-link" id="loggedOut">
      <a href="/register" class="link-tag">Register</a> 
      </li>
    <li class='nav-link' id="loggedOut">
      <a href="/signin" class="link-tag">Sign In</a>
    </li>
`
  
const navbar = $query('#navbar')

const handleSignOut = ()=>{
  const isLogged = localStorage.getItem('user')

  if(isLogged){
    localStorage.removeItem('user')
    render(navbarTemplateLoggedOut, navbar)
  }
}







window.addEventListener('load', async()=>{
  let loggedUser = await JSON.parse(localStorage.getItem('user'))
  if(loggedUser?.name){
    render(navbarTemplateSignIn, navbar )
    $query('#signout-btn').addEventListener('click', handleSignOut)
      
  } else if(!loggedUser) {
    render(navbarTemplateLoggedOut, navbar )
    // delete user from memory -> sign out user

  }
})







