import { renderNavbarSignOut } from "./navigation";
import { navigateTo } from "./Router";

// function to select element 
export function $query(selector) {
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
  
export const useState = (defaultValue) => {
    let value = defaultValue;
    const getValue = () => value
    const setValue = newValue => value = newValue
    return [getValue, setValue];
  }
  
window.useState = useState
  

//   RENDER 
export const render = (template, node) =>{
    if(!node) return;
    if(!node && !template) return location.reload()
    // if func isn't null add listener
      
  
    node.innerHTML = template
  }
  
  window.render = render
  

export const protectedRoute = (user) => {
  if(!user) {
    navigateTo('/')
    renderNavbarSignOut()
  }
}