import profile from "./views1/Classes/profileClass.js";
import signIn from './views1/Classes/signInClass.js'
import home from './views1/Classes/homeClass.js'
import register from "./views1/Classes/registerClass.js";
import { $query, protectedRoute, render } from "./utils.js";
import { renderNavbar } from "./navigation.js";
export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

export const router = async() => {
  let navbar = $query('#navbar')
  let path =window.location.pathname
  let isLogged = localStorage.getItem('user')

  renderNavbar(path, isLogged)

 
  let routes = [{path: '404', view: 404}]
  if(isLogged){
    if(path == '/'){
      renderNavbarLogged()
    }
    routes = [...routes,
      { path: '/', view: home},
      { path: '/profile', view: profile},

    ]
  } 
  else if (!isLogged){
    routes = [...routes, { path: '/', view: home},{ path: '/signin', view: signIn },{ path: '/register', view: register}]
      if(path == '/profile') {
      protectedRoute(isLogged)
      } else if (path == '/'){
        setTimeout(() => {
          alertDivTemplate('append')
        }, 30000);
      } else {
        alertDivTemplate('remove')
      }
  }
  

    const potentialMatches = routes.map(route=>{
        return {
            route:route,
            isMatch: path === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    // render navigation bar 
   
    const view = new match.route.view()



    $query('#app').innerHTML = await view.getHtml();
    await view.smoothRender('slow')
    let JS = await view.getJS()
    let CSS = await view.getCSS()
  };

window.addEventListener('popstate', router)

// ROUTING

export const alertDivTemplate = (ACTION)=>{
  let body = $query('body')[0]
    let ALERT_DIV = document.createElement('div')
    ALERT_DIV.classList.add('alert-div')
    ALERT_DIV.setAttribute('id', 'alert-div')
    ALERT_DIV.innerHTML =  `
  
      <h2>It seems you aren't logged in😥</h2>
      <span>You are missing on saving your questions so that you can look back at them later</span>
      <p>Want to get your questions saved?</p>
      <div class="wrapper">
        <a data-link href="/register" id="register-btn" class=" nav-btn link-tag login-btn">Register</a> 
        <a data-link href="/signin" id="signin-btn" class="nav-btn link-tag login-btn">Sign In</a>
      </div>
      <button class="back-btn" id="hide-btn">No, thanks</button>
  
    ` 
    switch(ACTION){
      case 'append':  {
        $query('#navbar').classList.add('animate', 'smooth-remove')

        ALERT_DIV.classList.add('animate', 'smooth-render', 'animate--slow', 'appear-from-up')
        body.appendChild(ALERT_DIV)
        $query('#hide-btn').addEventListener('click', ()=>{
          ALERT_DIV.classList.remove( 'smooth-render', 'appear-from-up')
          ALERT_DIV.classList.add( 'smooth-remove', 'animate--slow', 'disappear-to-up')

          $query('#navbar').classList.remove('animate', 'smooth-remove')
          $query('#navbar').classList.add('animate', 'smooth-appear')

          setTimeout(() => {
            body.removeChild(ALERT_DIV)


          }, 2000);
          localStorage.setItem('DND', 'true')
          renderNavbarSignOut()
        })
        return
      }
      case 'remove':{
        $query('#navbar').classList.remove('animate', 'smooth-remove')
        $query('#navbar').classList.add('animate', 'smooth-appear')

        ALERT_DIV.classList.add('animate', 'smooth--remove', 'animate--slow')

          $query('#alert-div') ? $query('#alert-div').remove() : null
  
      return
      }
    }
  
   
  }
  
    
  