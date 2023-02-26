import { navigateTo } from "./Router"
import { router } from "./Router"
import { $query, render } from "./utils"
// NAVIGATION 

const handleSignOut = ()=>{
    const isLogged = localStorage.getItem('user')
    console.log('working')
    if(isLogged){
      localStorage.removeItem('user')
      renderNavbarSignOut()
      navigateTo('/')
    }
  }

 

export const renderNavbar = (route, isLogged) => {
  const renderNavbarLogged = () => {
    render(
       `
    <li class="nav-link" id="loggedIn" >
      <button  id="signout-btn"  class="nav-btn link-tag">SignOut</button> 
    </li>
    <li class="nav-link" id="loggedIn" >
      <a data-link href="/profile" id="profile-btn" class="nav-btn link-tag">
      </a> 
    </li>
   
  
  `
  , $query('#navbar'))
  $query('#signout-btn').addEventListener('click', handleSignOut)
  
  
  }
  
   
   const renderNavbarSignOut = () => {
    render(     `
    <li  class="nav-link" id="loggedOut">
       <a data-link href="/register"  class="nav-btn link-tag">Register</a> 
       </li>
     <li class='nav-link' id="loggedOut">
       <a data-link href="/signin"  class="nav-btn link-tag">Sign In</a>
     </li>
  `
  , $query('#navbar'))
  }
  
  
  // profile navbar
   const renderNavbarProfile  = () => {
    
    render( `
    <li class="nav-link" id="loggedIn" >
      <button    id="signout-btn"  class="nav-btn link-tag">SignOut</button> 
    </li>
    <li class="nav-link" id="loggedIn" >
      <a href="/" data-link id="back-btn" class="nav-btn link-tag">Back</a> 
    </li>
  
  `
  , $query('#navbar'))
  
    $query('#signout-btn').addEventListener('click', handleSignOut)
  }
  if(isLogged){
    switch(route){
      case '/profile': {
        renderNavbarProfile()
        break
      } 
      case "/": {
        renderNavbarLogged()
        break
      }
    }
  } else if (!isLogged) {
    switch(route){
      case '/signin': {
        renderNavbarSignOut()
      } 
      case "/register": {
        renderNavbarSignOut()
        
      }
      case '/': {
        renderNavbarSignOut()
        break
      }
    }
  } 
  
}

window.addEventListener('DOMContentLoaded', async()=>{
    document.body.addEventListener('click', (e)=>{
        if(e.target.matches("[data-link]")){
          e.preventDefault()
          navigateTo(e.target.href)
        }
      })
 
    let loggedUser = await JSON.parse(localStorage.getItem('user'))
    if(loggedUser){
      renderNavbarLogged()
        setTimeout(() => {
            $query('#signout-btn').addEventListener('click', handleSignOut)
        }, 100);
    } 

    router()
  })
  
