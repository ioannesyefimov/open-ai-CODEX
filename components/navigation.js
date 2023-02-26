import { navigateTo } from "./Router"
import { router } from "./Router"
import { $query, render } from "./utils"
import { alertDivTemplate } from "./Router"
const navbar = $query('#navbar')
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

export const renderNavbarLogged = () => {
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

 
export const renderNavbarSignOut = () => {
  render(     `
  <li  class="nav-link" id="loggedOut">
     <a data-link href="/register"  class="link-tag">Register</a> 
     </li>
   <li class='nav-link' id="loggedOut">
     <a data-link href="/signin"  class="link-tag">Sign In</a>
   </li>
`
, $query('#navbar'))
}


// profile navbar
export const renderNavbarProfile  = () => {
  
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
    } else if(!loggedUser && window.location.pathname == '/') {
        renderNavbarSignOut()      
        setTimeout(()=>{
          alertDivTemplate('append')
        }, 10000)
      // delete user from memory -> sign out user
  
    }

    router()
  })
  
