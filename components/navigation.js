import { navigateTo } from "./Router"
import { router } from "./Router"
import { $query } from "./utils"
const navbar = $query('#navbar')
// NAVIGATION 

const handleSignOut = ()=>{
    const isLogged = localStorage.getItem('user')
  
    if(isLogged){
      localStorage.removeItem('user')
      render(navbarTemplateLoggedOut, navbar)
      // navigateTo('/')
    }
  }

export const navbarTemplateSignIn = 
 `

  <li class="nav-link" id="loggedIn" >
    <a data-link href="/" id="signout-btn"  class="nav-btn link-tag">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a data-link href="/profile" id="profile-btn" class="nav-btn link-tag">
    </a> 
  </li>
 

`
 
export const navbarTemplateLoggedOut = 
    `
   <li  class="nav-link" id="loggedOut">
      <a data-link href="/register"  class="link-tag">Register</a> 
      </li>
    <li class='nav-link' id="loggedOut">
      <a data-link href="/signin"  class="link-tag">Sign In</a>
    </li>
`

// profile navbar
export const navbarTemplateProfile = 
 `
  <li class="nav-link" id="loggedIn" >
    <a href="#" data-link  id="signout-btn"  class="nav-btn link-tag">SignOut</a> 
  </li>
  <li class="nav-link" id="loggedIn" >
    <a href="/" data-link id="back-btn" class="nav-btn link-tag">Back</a> 
  </li>

`


window.addEventListener('DOMContentLoaded', async()=>{
    document.body.addEventListener('click', (e)=>{
        if(e.target.matches("[data-link]")){
          e.preventDefault()
          navigateTo(e.target.href)
        }
      })
 
    let loggedUser = await JSON.parse(localStorage.getItem('user'))
    if(loggedUser?.name){
      render(navbarTemplateSignIn, navbar )
      $query('#signout-btn').addEventListener('click', handleSignOut)
        
    } else if(!loggedUser) {
      render(navbarTemplateLoggedOut, navbar )
      // delete user from memory -> sign out user
  
    }
    router()
  })
  
