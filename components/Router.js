import profile from "./views1/Classes/profileClass.js";
import signIn from './views1/Classes/signInClass.js'
import home from './views1/Classes/homeClass.js'
import register from "./views1/Classes/registerClass.js";
import { $query, protectedRoute, render } from "./utils.js";
import { renderNavbarLogged, renderNavbarSignOut, renderNavbarProfile } from "./navigation.js";
export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

export const router = async() => {
let navbar = $query('#navbar')

  let path =window.location.pathname
  switch(path){
    case '/profile':{
      renderNavbarProfile()
      break
    }
    case '/register': 
      renderNavbarSignOut()
    case '/signin':
    renderNavbarSignOut()
    break
  }
  let routes = [{path: '404', view: 404}]
  let isLogged = localStorage.getItem('user')
  if(isLogged){
    if(path == '/'){
      renderNavbarLogged()
    }
    routes = [...routes,
      // { path: '/404', view: ()=> console.log(view)},
      { path: '/', view: home},
      { path: '/profile', view: profile},

    ]
  } else if (!isLogged){
    routes = [...routes,
      // { path: '/404', view: ()=> console.log(view)},
      { path: '/', view: home},
      { path: '/signin', view: signIn },
      { path: '/register', view: register},
       ]
       if(path == '/profile') {
        protectedRoute(isLogged)
       }
    }
  

    const potentialMatches = routes.map(route=>{
        return {
            route:route,
            isMatch: location.pathname === route.path
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
   
    console.log(match)
    const view = new match.route.view()



    $query('#app').innerHTML = await view.getHtml();
    let JS = await view.getJS()
    let CSS = await view.getCSS()
  };

window.addEventListener('popstate', router)

// ROUTING

export const alertDivTemplate = (ACTION)=>{
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
  
    
  