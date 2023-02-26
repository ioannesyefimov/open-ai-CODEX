import { renderNavbarProfile } from "./navigation"
import { $query } from "./utils"
const [stateQUESTIONS, setStateQuestions] = useState(null)



const profileCredentialsTemplate = (user) =>{
  $query('#searchMessage').addEventListener('change', handleInputChange)

  return (
    `
    <h3>Hello <span id="name">${user.name}!</span> </h3>
    <p>Email: <span id="email">${user.email}</span></p>
    `
  )
}


const handleInputChange = (event)=>{
  if(event.target.value){
    const filteredQuestions = stateQUESTIONS().filter(question => {
       return question.message.toLowerCase().includes(event.target.value.toLowerCase()) ||
       question.messageId.toLowerCase().includes(event.target.value.toLowerCase()) ||
       question.prompt.toLowerCase().includes(event.target.value.toLowerCase())
      })
     render(profileMessagesTemplate(filteredQuestions))
     // render(profileCredentialsTemplate(stateQUESTIONS), $query('#messages-container'))

  }
  else  if(!event.target.value){
      profileHashLoad()
    }

  
}





const profileMessagesTemplate = (messages) => {
     $query('#messages-container').innerHTML = ``

  if(messages.length > 1 ){
    messages.map((msg,i) => {
      const messageContainer = document.createElement('div')
      messageContainer.classList.add('message-container')
      messageContainer.innerHTML = `
      <p class='prompt'>${msg.prompt}</p>
      <p class="message " visible="false" >${msg.message}</p>
      <div class="id-wrapper">
      <label for="messageId" class='messageId-label'>ID of message</label>
      <p id="messageId" class="messageId " visible="false">${msg.messageId}</p>
      </div>
     `
      $query('#messages-container').appendChild(messageContainer)
      $query('.message')[i].addEventListener('click', (event)=>{
       event.target.toggleAttribute('visible')
    }) 
    
    // HIDE all elements that hasn't been targeted. and show element that is clicked
      $query('.message-container')[i].addEventListener('click',(event)=>{
        let DivsLengths = $query('.message-container')
        for (let container of DivsLengths){
           if(container.hasAttribute('unvisible')){
              container.removeAttribute('unvisible')
              $query('.message')[i].setAttribute('visible', 'false')
              $query('.messageId')[i].setAttribute('visible', 'false')


          } else
          if(container !== event.currentTarget){
            container.setAttribute('unvisible', 'true')
            $query('.message')[i].setAttribute('visible', 'true')
            $query('.messageId')[i].setAttribute('visible', 'true')



          } 
        }
      })
    })
   
  } else if(messages.length == 1) {

      const messageContainer = document.createElement('div')
      const backBtn = document.createElement('button')
      backBtn.classList.add('back-btn')
      backBtn.innerHTML = 'Back'
      backBtn.addEventListener('click', ()=>{
        $query('#searchMessage').value = ''
        profileHashLoad()
      })
      messageContainer.classList.add('message-container')
      messageContainer.innerHTML = `
      <p class='prompt'>${messages[0].prompt}</p>
      <p class="message " visible="false">${messages[0].message}</p>
      <div class="id-wrapper">
      <label for="messageId" class='messageId-label'>ID of message</label>
      <p id="messageId" class="messageId " visible="false">${messages[0].messageId}</p>
      </div>
    `
    $query('#messages-container').append(messageContainer)
    messageContainer.addEventListener('click', (e)=>{
        messageContainer.append(backBtn)

      for(const element of e.currentTarget.children){
        if(element.getAttribute('visible') == 'false'){
          element.setAttribute('visible', "true")
        } else {
          element.setAttribute('visible', 'false')

        }
      }
      
    })

    

  } else {
    const messageContainer = document.createElement('div')
      messageContainer.classList.add('message-container')
      messageContainer.innerHTML = `
      <h1  class="notfound">There isn't such a question...</h1>
    `
    $query('#messages-container').append(messageContainer)
  }
 

   
}
// handle search questions


async function profileHashLoad () {
  const LoggedUser = JSON.parse(localStorage.getItem('user'))
  
  if(LoggedUser){
    // wait until state of app is changed
    
    const loadProfileCredentials = setInterval(()=>{
      render(profileCredentialsTemplate(LoggedUser),document.querySelector('#credentials') )
    }, 20)

    const response = await fetch(`https://c0dinex.onrender.com/api/v1/post/profile/messages/${LoggedUser.email}`)

    if(response.ok){
      const messages =  await response.json()
      setStateQuestions(messages.data)
      render(profileMessagesTemplate(messages.data))
      // handle search Input
      
    } else if(response.statusText == 'Not Found'){
      console.log('NOT FOUND')
      render(`<div class="message-container"><p>You didn't send any messages. Try it out!</p></div>`, $query('#messages-container'))
     
    }
    clearInterval(loadProfileCredentials)
  } 
}



// Change state of the app when loaded profile route
  profileHashLoad()


 
  